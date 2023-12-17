import React from 'react';
import { Card, CardHeader, Avatar } from '@mui/material';

type UserInfoProps = {
  user: {
    username: string;
  }
  isAuthenticated: boolean;
}

export default function UserInfo(props: UserInfoProps) {

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar>{props.user.username.charAt(0)}</Avatar>
        }
        title={`${props.user.username}`}
        subheader={props.isAuthenticated ? "authenticated" : "public view"}
      />         
    </Card>
  );
}
