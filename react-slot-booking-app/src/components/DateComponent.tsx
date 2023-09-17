import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface Date {
  startDate?: any;
  endDate?: any;
  handleStartDate?: any;
  handleEndDate?: any;
}

function StartDateComponent({ startDate, handleStartDate }: Date) {
  const handleDateChange = (date: Dayjs | null) => {
    handleStartDate(date);
  };
  return (
    <DatePicker
      // defaultValue={startDate}
      value={startDate}
      onChange={(newValue) => handleDateChange(newValue)}
      disablePast
      slotProps={{
        // Targets the `IconButton` component.
        openPickerButton: {
          color: 'primary',
        },
        // Targets the `InputAdornment` component.
        inputAdornment: {
          position: 'start',
        },
      }}
    />
  );
}

function EndDateComponent({ endDate, handleEndDate }: Date) {
  const handleDateChange = (date: Dayjs | null) => {
    handleEndDate(date);
  };
  return (
    <DatePicker
      // defaultValue={endDate}
      value={endDate}
      onChange={(newValue) => handleDateChange(newValue)}
      disablePast
      slotProps={{
        // Targets the `IconButton` component.
        openPickerButton: {
          color: 'primary',
        },
        // Targets the `InputAdornment` component.
        inputAdornment: {
          position: 'start',
        },
      }}
    />
  );
}

export { StartDateComponent, EndDateComponent };
