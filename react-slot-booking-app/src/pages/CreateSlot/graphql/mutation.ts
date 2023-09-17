import { gql } from '@apollo/client';

export const USER_CREATE_A_SLOT = gql`
  mutation CreateSlot($input: SlotInput!) {
    createSlot(input: $input) {
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
