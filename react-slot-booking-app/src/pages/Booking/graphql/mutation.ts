import { gql } from '@apollo/client';

export const USER_CREATE_A_BOOKING = gql`
  mutation createBooking($input: BookingInput!) {
    createBooking(input: $input) {
      id
      day_of_week
      start_time
      end_time
      date
      slot_id
      user_id
      time_zone
      is_active
      status
    }
  }
`;
