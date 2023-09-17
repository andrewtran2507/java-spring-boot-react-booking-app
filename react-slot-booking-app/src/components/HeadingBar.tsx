import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';

export interface Props {
  children?: ReactNode;
  value?: string;
  data?: any;

  // any props that come into the component
}

function HeadingBar({ children }: Props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar style={{ minHeight: '3em' }}>
          <Typography color="inherit" noWrap>
            {children}
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default HeadingBar;
