import { gql } from '@apollo/client';

export const USER_SIGN_IN_GQL = gql`
  query signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      name
      email
      password
      type
    }
  }
`;
