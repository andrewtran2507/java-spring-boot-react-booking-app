import React, { useState, useEffect, FC } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import dayjs, { Dayjs } from 'dayjs';
import { useMutation } from '@apollo/client';

import { StartDateComponent, EndDateComponent } from '../../../components/DateComponent';
import { StartTimeComponent, EndTimeComponent } from '../../../components/TimeComponent';
import HourComponent from '../../../components/HourComponent';
import WeekDayChoice from '../../../components/WeekDayChoice';
import { AuthType, Slots } from '../../../types/type';
import { daysBetweenTwoDates, formatDate, getDaysOfWeek } from '../../../functions/common';
import { USER_CREATE_A_SLOT } from '../graphql/mutation';
import AlertCMP from '../../../components/AlertCMP';

const TimeSlotBox: FC<{ auth: AuthType }> = ({ auth }: { auth: AuthType }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [startTime, setStartTime] = useState<Dayjs | null | string>(dayjs(new Date()));
  const [endTime, setEndTime] = useState<Dayjs | null | string>(dayjs(new Date()));
  const [isCheckBoxSelect, setIsCheckBoxSelect] = useState(false);
  const [weekDayOption, setWeekDayOption] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });
  const [selectedDays, setSelectedDays] = useState<any>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [stepTime, setStepTime] = useState<number>(15);
  const [isRangeTimeValid, setIsRangeTimeValid] = useState(false);
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);

  const [createSlot, { data, loading, error }] = useMutation(USER_CREATE_A_SLOT);
  console.log({ data, loading, error });

  const compareDate = (startDate: any, endDate: any, startTime: any, endTime: any) => {
    const fromTime = `${formatDate(startDate).dateFormat} ${startTime}`;
    const toTime = `${formatDate(endDate).dateFormat} ${endTime}`;
    const dayjsFromTime = dayjs(fromTime);
    const dayjsToTime = dayjs(toTime);
    //check if END TIME later than START TIME (2023-10-01 10:00 AM > 2023-10-01 08:00 AM)
    const isRangeTimeValid = dayjsToTime.isAfter(dayjsFromTime);
    return isRangeTimeValid;
  };

  const handleStartDate = (selectDate: Dayjs | null) => {
    setStartDate(selectDate);
  };
  const handleEndDate = (selectDate: Dayjs | null) => {
    setEndDate(selectDate);
  };
  const handleStartTime = (selectTime: Dayjs | null | string) => {
    console.log(selectTime);
    setStartTime(selectTime);
  };
  const handleEndTime = (selectTime: Dayjs | null | string) => {
    setEndTime(selectTime);
  };
  const handleSelectCheckBox = (newState: boolean, selectedDay: { [x: string]: boolean }) => {
    const newSelectedDays: any = { ...selectedDays, ...selectedDay };

    setIsCheckBoxSelect(!getIsAllUnchecked(newSelectedDays));
    setSelectedDays(newSelectedDays);
  };
  const handleStepTime = (value: number) => {
    setStepTime(value);
  };

  const getIsAllUnchecked = (newSelectedDays: any) => {
    let isAllUnchecked = true;
    for (const key in newSelectedDays) {
      if (newSelectedDays[key] === true) {
        isAllUnchecked = false;
        break;
      }
    }
    return isAllUnchecked;
  };

  const handleCreateSlot = () => {
    const dayOfWeek = Object.entries(selectedDays)
      .filter(([weekday, value]) => value === true)
      .map(([weekday]) => weekday);
    const userId = auth?.id || '';
    const d = new Date();
    const n = d.getTimezoneOffset();
    const timezone = n / -60;
    const payload: Slots = {
      day_of_week: dayOfWeek.join(', '),
      start_time: startTime as string,
      end_time: endTime as string,
      from_date: startDate?.format('MM-DD-YYYY'),
      end_date: endDate?.format('MM-DD-YYYY'),
      user_id: userId,
      time_zone: timezone,
      step: stepTime,
      status: true,
    };
    //API INTERGRATION
    console.log('PAYLOAD', payload);
    createSlot({ variables: { input: payload } });
  };

  //date (day and hour validation)
  useEffect(() => {
    const check = compareDate(startDate, endDate, startTime, endTime);
    if (check) {
      setIsRangeTimeValid(true);
    } else {
      setIsRangeTimeValid(false);
    }
  }, [startTime, endTime, startDate, endDate]);

  useEffect(() => {
    const daysBetween = daysBetweenTwoDates(startDate, endDate);
    if (daysBetween >= 7) {
      setWeekDayOption({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      });
    } else {
      const startWeekDayOfEvent = formatDate(startDate).dateFormat;
      const endWeekDayOfEvent = formatDate(endDate).dateFormat;
      const weekDayList = getDaysOfWeek(startWeekDayOfEvent, endWeekDayOfEvent);
      const checkName = (name: string) => {
        const result = weekDayList.includes(name);
        return result;
      };
      const newWeekDayOptions: any = {
        monday: checkName('Monday') ? true : false,
        tuesday: checkName('Tuesday') ? true : false,
        wednesday: checkName('Wednesday') ? true : false,
        thursday: checkName('Thursday') ? true : false,
        friday: checkName('Friday') ? true : false,
        saturday: checkName('Saturday') ? true : false,
        sunday: checkName('Sunday') ? true : false,
      };
      setWeekDayOption({ ...newWeekDayOptions });

      for (const key in newWeekDayOptions) {
        if (newWeekDayOptions[key] === false) {
          selectedDays[key] = false;
        }
      }
      setSelectedDays({ ...selectedDays });
      setIsCheckBoxSelect(!getIsAllUnchecked({ ...selectedDays }));
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (data?.createSlot) {
      setIsOpenSnackBar(true);
    }
  }, [data?.createSlot]);

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 4 }, p: { xs: 2, md: 3 } }}>
        <Typography sx={{ color: '#dd2c00', textAlign: 'center' }} variant="h4">
          Create Slot
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ flexGrow: 1, margin: '2em auto' }}>
            <Grid container direction="column" rowGap={5}>
              {/* Days Of The Event */}
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography>Days Of The Event</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Grid container direction="row" columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={5}>
                      <StartDateComponent startDate={startDate} handleStartDate={handleStartDate} />{' '}
                    </Grid>
                    <Typography sx={{ display: 'flex', alignItems: 'center', margin: '0 1em' }}>
                      To
                    </Typography>
                    <Grid item xs={5}>
                      {' '}
                      <EndDateComponent endDate={endDate} handleEndDate={handleEndDate} />{' '}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* Including These Days */}
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Typography>Including These Days</Typography>
                </Grid>
                <Grid item xs={9}>
                  <WeekDayChoice
                    today={weekDayOption}
                    selectedDays={selectedDays}
                    handleSelectCheckBox={handleSelectCheckBox}
                  />
                </Grid>
              </Grid>
              {/* Time Range */}
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography>Time Range</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Grid container direction="row" columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={5}>
                      <StartTimeComponent startTime={startTime} handleStartTime={handleStartTime} />
                    </Grid>
                    <Typography sx={{ display: 'flex', alignItems: 'center', margin: '0 1em' }}>
                      To
                    </Typography>
                    <Grid item xs={5}>
                      <EndTimeComponent endTime={endTime} handleEndTime={handleEndTime} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* Time Slot Increment */}
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography>Time Slot Increment</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Grid container direction="row" columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Typography sx={{ display: 'flex', alignItems: 'center', marginRight: '1em' }}>
                      Every
                    </Typography>
                    <Grid item xs={2}>
                      <HourComponent handleStepTime={handleStepTime} />
                    </Grid>
                    <Typography sx={{ display: 'flex', alignItems: 'center', marginLeft: '1em' }}>
                      Minute
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            variant="contained"
            disabled={isCheckBoxSelect && isRangeTimeValid ? false : true}
            onClick={handleCreateSlot}>
            Create
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={isOpenSnackBar}
        autoHideDuration={6000}
        onClose={() => setIsOpenSnackBar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <AlertCMP
          onClose={() => setIsOpenSnackBar(false)}
          severity={data?.createSlot?.id ? 'success' : 'error'}
          sx={{ width: '100%' }}>
          {data?.createSlot?.id ? 'Your Slot is created!' : 'Something went wrong, Thanks!'}
        </AlertCMP>
      </Snackbar>
    </Container>
  );
};

export default TimeSlotBox;
