import React, { useEffect, useState, FC } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { CustomActionBar } from '../../../functions/customActionBar';
import CustomToolbar from '../../../functions/customCalendarToolbar';
import { AuthType } from '../../../types/type';
import ChipItem, { TimeBtn } from '../../../components/ChipItem';
import { getTimesRange } from '../../../functions/common';
import AlertCMP from '../../../components/AlertCMP';

import { GET_SLOT_BY_DATE } from '../graphql/query';
import { USER_CREATE_A_BOOKING } from '../graphql/mutation';

const BookingBox: FC<{ auth: AuthType }> = ({ auth }: { auth: AuthType }) => {
  const timeOptions: TimeBtn[] = [];
  const [slotStatus, setSlotStatus] = useState({
    items: timeOptions,
  });
  const [isActiveBookButton, setIsActiveBookButton] = useState(false);
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);

  const slotData = useQuery(GET_SLOT_BY_DATE, {
    variables: {
      date: dayjs(new Date()).format('MM-DD-YYYY'),
    },
  });

  const [createBooking, bookingRes] = useMutation(USER_CREATE_A_BOOKING);

  const updateBtnState = (id: string | undefined) => {
    if (!id) {
      return;
    }
    setSlotStatus((data) => ({
      items: data.items.map((item) => ({
        ...item,
        is_active: item.id === id ? !item.is_active : false,
      })),
    }));
  };

  const handleConfirmBooking = () => {
    console.log('API INTEGRATION');
    const bookingItem = slotStatus.items.find((sl) => sl.is_active === true);
    if (bookingItem) {
      delete bookingItem.id;
      delete bookingItem.__typename;
      delete bookingItem.from_date;
      delete bookingItem.end_date;
      delete bookingItem.step;
      createBooking({ variables: { input: { ...bookingItem } } });
    }
  };

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setSlotStatus({ items: handleCreateBookingList(newDate) });
  };

  const handleCreateBookingList = (currentDate: dayjs.Dayjs | null) => {
    if (!currentDate) {
      return slotStatus.items;
    }
    const currSlotData = slotData?.data?.getSlotByCurrentDate.find(
      ({ from_date, end_date, status }: any) => {
        return (
          from_date <= currentDate.format('YYYY-MM-DD') &&
          currentDate.format('YYYY-MM-DD') <= end_date &&
          status === true
        );
      },
    );

    console.log('currSlotData', currSlotData);
    console.log('currentDate', currentDate);
    if (!currSlotData) {
      return [];
    }

    const arrTimeRange: any = getTimesRange(
      currSlotData.start_time,
      currSlotData.end_time,
      currSlotData.step,
    );

    return arrTimeRange
      .map((item: string, count: number) => ({
        ...currSlotData,
        id: uuidv4(),
        slot_id: currSlotData.id,
        user_id: auth?.id,
        date: currentDate.format('MM-DD-YYYY'),
        start_time: item,
        end_time: count + 1 === arrTimeRange.length ? null : arrTimeRange[count + 1],
        is_active: false,
        status: true,
      }))
      .filter((item: any) => item.end_time !== null);
  };

  useEffect(() => {
    if (slotStatus.items.some((item) => item.is_active)) {
      setIsActiveBookButton(true);
    } else {
      setIsActiveBookButton(false);
    }
  }, [slotStatus]);

  useEffect(() => {
    if (slotData?.data?.getSlotByCurrentDate?.length > 0) {
      setSlotStatus({ items: handleCreateBookingList(dayjs(new Date())) });
    }
  }, [slotData]);

  useEffect(() => {
    if (bookingRes?.data?.createBooking) {
      setIsOpenSnackBar(true);
    }
  }, [bookingRes?.data?.createBooking]);

  console.log('slotStatus', slotStatus);

  return (
    <Container style={{ paddingTop: 33 }} component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 4 }, p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            sx={{ color: '#000000', textAlign: 'left', marginBottom: '1em', fontWeight: '500' }}
            variant="h4">
            Choose a convenient time for your initial
            <br /> meeting with Dr.Annika Martin
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ margin: '0 1em' }}>
          <Typography sx={{ margin: '0.25em 0', color: '#ef5350' }} variant="h6">
            What is an online coaching session?
          </Typography>
          <Grid
            container
            direction="row"
            spacing={2}
            sx={{ margin: '0.25em 0', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Grid item xs={6} lg={6} style={{ paddingLeft: 0 }}>
              <StaticDatePicker
                defaultValue={dayjs(new Date())}
                disablePast
                sx={{
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: '#b0bec5',
                }}
                slotProps={{
                  actionBar: {
                    actions: ['today'],
                    hidden: true,
                  },
                }}
                slots={{
                  toolbar: CustomToolbar,
                  actionBar: CustomActionBar,
                }}
                onChange={(newValue: dayjs.Dayjs | null) => handleDateChange(newValue)}
              />
            </Grid>
            <Grid
              item
              xs={6}
              md={6}
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ margin: '3em 0', alignItems: 'center' }}>
              <Grid item>
                <Typography sx={{ margin: '0.5em auto' }} variant="h5">
                  Dr&rsquo;s Slot Time
                </Typography>
              </Grid>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 1 }}
                sx={{ margin: '2em 0', alignItems: 'center' }}>
                {slotStatus.items.length !== 0 ? (
                  slotStatus.items.map((value: any, index: any) => (
                    <Grid item key={index}>
                      <ChipItem
                        value={value}
                        index={index}
                        updateBtnState={updateBtnState}></ChipItem>
                    </Grid>
                  ))
                ) : (
                  <Typography
                    sx={{
                      margin: '0.5em auto',
                      fontSize: '1em',
                      fontStyle: 'italic',
                      textAlign: 'center',
                    }}>
                    Slot for this date is unavailable yet.
                    <br />
                    Please select other dates
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1.5em' }}>
            <Button
              variant="contained"
              sx={{ fontSize: '1em', borderRadius: '10px' }}
              onClick={handleConfirmBooking}
              disabled={isActiveBookButton ? false : true}>
              Next
            </Button>
          </Box>
          <Typography
            sx={{
              color: '#37474f',
              textAlign: 'center',
              margin: '0.5em 0',
              fontSize: '1em',
              fontWeight: 200,
            }}>
            Select a time slot above to continue
          </Typography>
        </Box>
      </Paper>
      <Snackbar
        open={isOpenSnackBar}
        autoHideDuration={6000}
        onClose={() => setIsOpenSnackBar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <AlertCMP
          onClose={() => setIsOpenSnackBar(false)}
          severity={bookingRes?.data?.createBooking?.id ? 'success' : 'error'}
          sx={{ width: '100%' }}>
          {bookingRes?.data?.createBooking?.id
            ? 'Your Meeting is scheduled!'
            : 'Something went wrong, Thanks!'}
        </AlertCMP>
      </Snackbar>
    </Container>
  );
};

export default BookingBox;
