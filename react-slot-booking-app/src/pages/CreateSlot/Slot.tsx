import React, { FC } from 'react';
import HeadingBar from '../../components/HeadingBar';
import TimeSlotBox from './components/TimeSlotBox';
import { AuthType } from '../../types/type';

const Slot: FC<{ auth: AuthType }> = ({ auth }: { auth: AuthType }) => {
  return (
    <React.Fragment>
      <HeadingBar>
        Hello DR. {auth?.name}, please create a slot so patients can connect with you
      </HeadingBar>
      <TimeSlotBox auth={auth} />
    </React.Fragment>
  );
};

export default Slot;
