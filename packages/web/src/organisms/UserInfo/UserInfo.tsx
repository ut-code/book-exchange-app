import React from 'react';
import { useUserQuery } from '../../pages/user/query.generated';
import { Box, Card, CardHeader, Avatar, Alert } from '@mui/material';

type UserInfoProps = {
  user: {
    username: string;
  }
  isAuthenticated: boolean;
}

export default function UserInfo(props: UserInfoProps) {

  return (
    <Box mt={2}>
      {
        <Card variant="outlined">
          <CardHeader
           style={{ height: 60 }}
            avatar={
              <Avatar>{props.user.username.charAt(0)}</Avatar>
            }
            title={`${props.user.username}`}
            subheader={props.isAuthenticated ? "authenticated" : "public view"}
          />         
        </Card>
      }
    </Box>
  );
}
