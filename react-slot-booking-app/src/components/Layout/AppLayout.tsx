import React, { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthType } from '../../types/type';

const AppLayout: FC<{ auth: AuthType }> = ({ auth }: { auth: AuthType }) => {
  const [authData, setAuthData] = useState<any>(null);
  const navigate = useNavigate();
  const onSignOutClick = () => {
    localStorage.removeItem('auth');
    navigate('sign-in');
    setAuthData(null);
  };

  useEffect(() => {
    setAuthData(auth);
  }, [auth]);

  return (
    <>
      <div
        style={{
          textAlign: 'right',
          position: 'absolute',
          top: 4,
          right: 4,
          width: '100%',
          zIndex: 9999,
        }}>
        {authData && authData.email && (
          <>
            Hi <b>{auth?.name}</b>, Have a nice day
            <br />
            <br />
            <Button variant="contained" color="success" onClick={onSignOutClick}>
              Sign Out
            </Button>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default AppLayout;
