import { gql } from '@apollo/client';

export const GET_ALL_BOOKING_GQL = gql`
  query allBookings {
    allBookings {
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

export const GET_SLOT_BY_DATE = gql`
  query getSlotByCurrentDate($date: String!) {
    getSlotByCurrentDate(currentDate: $date) {
      id
      day_of_week
      start_time
      end_time
      from_date
      end_date
      user_id
      time_zone
      step
      status
    }
  }
`;
