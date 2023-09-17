import { useEffect, useState } from 'react';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { HourComponentType } from '../types/type';

function HourComponent({ handleStepTime }: HourComponentType) {
  const defaultStep = dayjs('2022-04-17T15:15');
  const [value, setValue] = useState<Dayjs | null>(defaultStep);
  const shouldDisableTime: TimePickerProps<Dayjs>['shouldDisableTime'] = (value, view) =>
    view === 'minutes' && value.minute() !== 15 && value.minute() !== 30 && value.minute() !== 45;

  useEffect(() => {
    const interval = Number(value?.get('minutes'));
    handleStepTime(interval);
  }, [value]);
  return (
    <TimePicker
      value={value}
      onChange={(newValue) => setValue(newValue)}
      views={['minutes']}
      minutesStep={15}
      slotProps={{
        // Targets the `IconButton` component.
        openPickerButton: {
          color: 'primary',
        },
      }}
      shouldDisableTime={shouldDisableTime}
    />
  );
}

export default HourComponent;
