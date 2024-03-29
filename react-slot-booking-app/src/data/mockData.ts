import { v4 as uuidv4 } from 'uuid';
// type Slots {
// 	id: String!
// 	day_of_week: String!
//   start_time: String!
// 	end_time: String!
// 	from_date: String!
// 	end_date: String!
// 	user_id: String!
// 	time_zone: Int!
// 	step: Int!
// 	status: Boolean
// }
export const slotData = [
  {
    id: 'slot_001',
    day_of_week: ['Friday', 'Saturday'],
    start_time: '08:00',
    end_time: '09:30',
    from_date: '2023/10/20',
    end_date: '2023/10/21',
    user_id: 'user_001',
    time_zone: 7,
    step: 30,
    status: true,
  },
  {
    id: 'slot_002',
    day_of_week: ['Friday', 'Saturday'],
    start_time: '08:00',
    end_time: '09:00',
    from_date: '2023/09/15',
    end_date: '2023/09/16',
    user_id: 'user_001',
    time_zone: 7,
    step: 30,
    status: true,
  },
];

export const bookData = [
  {
    id: uuidv4(),
    start_time: '08:00',
    end_time: '08:30',
    date: '2023/10/20',
    user_id: 'user_001',
    slot_id: 'slot_001',
    timezone: 7,
    is_active: false,
    status: true,
    day_of_week: ['Friday', 'Saturday'],
  },
  {
    id: uuidv4(),
    start_time: '08:30',
    end_time: '09:00',
    date: '2023/10/20',
    user_id: 'user_001',
    slot_id: 'slot_001',
    timezone: 7,
    is_active: false,
    status: true,
    day_of_week: ['Friday', 'Saturday'],
  },
  {
    id: uuidv4(),
    start_time: '09:00',
    end_time: '09:30',
    date: '2023/10/20',
    user_id: 'user_001',
    slot_id: 'slot_001',
    timezone: 7,
    is_active: false,
    status: true,
    day_of_week: ['Friday', 'Saturday'],
  },
  {
    id: uuidv4(),
    start_time: '08:00',
    end_time: '08:30',
    date: '2023/10/21',
    user_id: 'user_001',
    slot_id: 'slot_001',
    timezone: 7,
    is_active: false,
    status: true,
    day_of_week: ['Friday', 'Saturday'],
  },
  {
    id: uuidv4(),
    start_time: '08:30',
    end_time: '09:00',
    date: '2023/10/21',
    user_id: 'user_001',
    slot_id: 'slot_001',
    timezone: 7,
    is_active: false,
    status: true,
    day_of_week: ['Friday', 'Saturday'],
  },
  {
    id: uuidv4(),
    start_time: '09:00',
    end_time: '09:30',
    date: '2023/10/21',
    user_id: 'user_001',
    slot_id: 'slot_001',
    timezone: 7,
    is_active: false,
    status: true,
    day_of_week: ['Friday', 'Saturday'],
  },
  {
    id: uuidv4(),
    start_time: '08:00',
    end_time: '08:30',
    date: '2023/09/15',
    user_id: 'user_001',
    slot_id: 'slot_002',
    timezone: 7,
    is_active: false,
    status: true,
    day_of_week: ['Friday', 'Saturday'],
  },
  {
    id: uuidv4(),
    start_time: '08:30',
    end_time: '09:00',
    date: '2023/09/15',
    user_id: 'user_001',
    slot_id: 'slot_002',
    timezone: 7,
    is_active: false,
    status: true,
    day_of_week: ['Friday', 'Saturday'],
  },
  {
    id: uuidv4(),
    start_time: '08:00',
    end_time: '08:30',
    date: '2023/09/16',
    user_id: 'user_001',
    slot_id: 'slot_002',
    timezone: 7,
    is_active: false,
    status: true,
    day_of_week: ['Friday', 'Saturday'],
  },
  {
    id: uuidv4(),
    start_time: '08:30',
    end_time: '09:00',
    date: '2023/09/16',
    user_id: 'user_001',
    slot_id: 'slot_002',
    timezone: 7,
    is_active: false,
    status: true,
    day_of_week: ['Friday', 'Saturday'],
  },
];
