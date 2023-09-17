import React, { FC } from 'react';
import BookingBox from './components/BookingBox';
import { AuthType } from '../../types/type';

const Booking: FC<{ auth: AuthType }> = ({ auth }: { auth: AuthType }) => {
  return (
    <React.Fragment>
      <BookingBox auth={auth} />
    </React.Fragment>
  );
};

export default Booking;
