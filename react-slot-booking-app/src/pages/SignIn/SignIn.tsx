import React, { FC } from 'react';
import SignInBox from './components/SignInBox';

const SignIn: FC = (props) => {
  console.log('props', props);
  return (
    <div className="signin">
      <SignInBox />
    </div>
  );
};

export default SignIn;
