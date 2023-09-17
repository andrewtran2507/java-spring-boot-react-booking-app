import React, { useState, lazy, FC, Suspense, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppLayout from './components/Layout/AppLayout';
import RequireAuth from './components/Layout/RequireAuth';
import { AuthType } from './types/type';

const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const Slot = lazy(() => import('./pages/CreateSlot/Slot'));
const Booking = lazy(() => import('./pages/Booking/Booking'));
const defaultTheme = createTheme();
// const locales = ['en', 'en-gb', 'zh-cn', 'de'];
// type LocaleKey = (typeof locales)[number];

function PublicPage() {
  return <h3>Public</h3>;
}

const App: FC = () => {
  const [auth, setAuth] = useState<AuthType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // const [locale, setLocale] = useState<LocaleKey>('en-gb');

  useEffect(() => {
    const authData: any = JSON.parse(localStorage.getItem('auth') || '{}');
    if (authData?.id && authData.email) {
      setAuth(authData);
    } else {
      navigate('sign-in');
    }
    const tm = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(tm);
    };
  }, []);

  useEffect(() => {
    if (auth && typeof auth.type === 'number' && !isLoading) {
      if (auth?.type === 1) {
        navigate('/slot-booking');
      } else if (auth?.type === 2) {
        navigate('/create-slot');
      }
    }
  }, [auth, isLoading]);

  if (isLoading) {
    return <></>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Suspense fallback={<p>@ Loading...</p>}>
          <Routes>
            <Route element={<AppLayout auth={auth} />}>
              <Route path="/" element={<PublicPage />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route
                path="create-slot"
                element={
                  <RequireAuth>
                    <Slot auth={auth} />
                  </RequireAuth>
                }
              />
              <Route
                path="slot-booking"
                element={
                  <RequireAuth>
                    <Booking auth={auth} />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
