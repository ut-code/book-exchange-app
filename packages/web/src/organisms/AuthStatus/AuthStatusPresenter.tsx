import React from 'react';
import { Typography, Box, Card, CardHeader, Avatar, CardContent, Alert } from '@mui/material';
import SettingsMenu from '../Settings/SettingsMenu';

export type AuthSuccessStatusPresenterProps = {
  user: {
    username: string;
    id: string;
  };
}

export default function AuthSuccessStatusPresenter(props: AuthSuccessStatusPresenterProps) {
  return (
    <Box my={4}>
      <Card variant="outlined">
        <CardHeader
          avatar={
            <Avatar>{props.user.username.charAt(0)}</Avatar>
          }
          title={`Welcome, ${props.user.username}`}
          subheader="authenticated"
          action={ 
            <SettingsMenu />
          } 
        />         
        <CardContent>
          <Typography variant="body2" color="textSecondary">User ID: {props.user.id}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
