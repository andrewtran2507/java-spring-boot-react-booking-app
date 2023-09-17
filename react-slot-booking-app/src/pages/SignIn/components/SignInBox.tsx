import React, { FC, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { USER_SIGN_IN_GQL } from '../graphql/query';

const SignInBox: FC = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(USER_SIGN_IN_GQL, {
    variables: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const objData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log('DATA SUBMIT');
    refetch(objData);
  };

  useEffect(() => {
    // User sign-in successfully
    if (data?.signIn?.email) {
      localStorage.setItem('auth', JSON.stringify(data?.signIn));
      navigate(0);
    }
    return () => {};
  }, [data]);

  if (loading) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1.5em 1.5em',
            borderRadius: 1,
            border: '1px solid',
            borderColor: '#b0bec5',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </CssBaseline>
    </Container>
  );
};

export default SignInBox;
