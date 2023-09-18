import React from 'react';
import { useUsersQuery } from '../../pages/user/query.generated';
import { Typography, List, ListItem, Divider } from '@mui/material';

const Users = () => {
  const { data } = useUsersQuery();

  return (
    <div>
      <List>
        {data?.users?.map((user) => (
          <React.Fragment key={user.id}>
            <ListItem>
              <Typography>{user.username}</Typography>
            </ListItem>
            <ListItem>
              <Typography>{user.id}</Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default Users;