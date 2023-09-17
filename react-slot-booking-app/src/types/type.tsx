export type Slots = {
  // id: string;
  day_of_week: string | string[];
  start_time: string;
  end_time: string;
  from_date: string | undefined;
  end_date: string | undefined;
  user_id: string;
  time_zone: number;
  step: number;
  status: boolean;
};

export type Booking = {
  // id: string;
  slot_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  date: string;
  timezone: number;
  day_of_week: string[];
  is_active: boolean;
  status: boolean;
};

export type DayOfWeek = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};

export type HourComponentType = {
  handleStepTime: (value: number) => void;
};

export type TimeComponentType = {
  startTime?: any;
  endTime?: any;
  handleStartTime?: any;
  handleEndTime?: any;
};

export type AuthType = {
  id: string;
  email: string;
  name: string;
  password: string;
  type: number;
} | null;
