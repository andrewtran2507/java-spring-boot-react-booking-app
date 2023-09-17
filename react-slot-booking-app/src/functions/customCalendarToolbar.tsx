import { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { DatePickerToolbar, DatePickerToolbarProps } from '@mui/x-date-pickers/DatePicker';

export default function CustomToolbar(props: DatePickerToolbarProps<Dayjs>) {
  return (
    <Box
      // Pass the className to the root element to get correct layout
      className={props.className}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <DatePickerToolbar {...props} />
      <RocketLaunchIcon fontSize="large" sx={{ m: 5 }} />
    </Box>
  );
}
