import Chip from '@mui/material/Chip';
import internal from 'stream';

export interface TimeBtn {
  id?: string | undefined;
  slot_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  date: string;
  timezone: number;
  day_of_week: string[];
  is_active?: boolean;
  status?: boolean;
  __typename?: any;
  from_date?: string;
  end_date?: string;
  step?: number;
}
export interface Chips {
  value: TimeBtn;
  index: number;
  updateBtnState: (id: string) => void;
}

function ChipItem({ value, updateBtnState }: Chips) {
  return (
    <Chip
      label={value.start_time}
      clickable
      sx={{ width: '5em', height: '3em', fontSize: '1em' }}
      onClick={() => updateBtnState(value.id as string)}
      color={value?.is_active ? 'primary' : 'primary'}
      variant={value?.is_active ? 'filled' : 'outlined'}
    />
  );
}

export default ChipItem;
