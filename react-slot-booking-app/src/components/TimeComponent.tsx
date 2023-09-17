import React, { useEffect } from 'react';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';

import { TimeComponentType } from '../types/type';
import { formatDate } from '../functions/common';

function StartTimeComponent({ handleStartTime }: TimeComponentType) {
  const defaultTime = dayjs('2022-04-17T10:00');
  const [value, setValue] = React.useState<Dayjs | null>(defaultTime);
  useEffect(() => {
    //two digit format
    const startTime = formatDate(value).hour; //e.g.: 10:00 AM
    handleStartTime(startTime);
  }, [value]);

  return (
    <TimePicker
      value={value}
      onChange={(newValue) => setValue(newValue)}
      timeSteps={{ hours: 1, minutes: 15, seconds: 0 }}
      ampm={false}
      slotProps={{
        openPickerButton: {
          color: 'primary',
        },
        inputAdornment: {
          position: 'end',
        },
      }}
    />
  );
}

function EndTimeComponent({ handleEndTime }: TimeComponentType) {
  const defaultTime = dayjs('2022-04-17T11:00');
  const [value, setValue] = React.useState<Dayjs | null>(defaultTime);
  useEffect(() => {
    //two digit format
    const endTime = formatDate(value).hour; //e.g.: 11:00 AM
    handleEndTime(endTime);
  }, [value]);
  return (
    <TimePicker
      value={value}
      onChange={(newValue) => setValue(newValue)}
      timeSteps={{ hours: 1, minutes: 15, seconds: 0 }}
      ampm={false}
      slotProps={{
        openPickerButton: {
          color: 'primary',
        },
        inputAdornment: {
          position: 'end',
        },
      }}
    />
  );
}

export { StartTimeComponent, EndTimeComponent };
