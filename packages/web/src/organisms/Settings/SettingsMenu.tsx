import React, { useState } from 'react';
import { Button, Menu, MenuItem, Modal, Box, Typography } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { useDeleteUserMutation } from '../../pages/user/query.generated';

const SettingsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUser] = useDeleteUserMutation();

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleMenuClose();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleDeleteUser = async () => {
    try {
      localStorage.removeItem('accessToken');
      await deleteUser();
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <Button onClick={handleMenuOpen}>
        <Settings color="disabled" />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOpenModal}>退会処理</MenuItem>
      </Menu>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <Box style={{ margin: 'auto', width: '30%', padding: '20px', marginTop: '10%', background: 'grey', borderRadius: '10px' }}>
          <Typography variant="h6" gutterBottom>
            本当に退会しますか？
          </Typography>
          <Box mt={3}>
            <Button variant="contained" onClick={handleCloseModal}>
              キャンセル
            </Button>
            <Button style={{marginLeft: 10}} variant="outlined" color="secondary" onClick={() => {
              console.log('脱退処理'); // ここで脱退処理を実装
              handleCloseModal();
            }}>
              退会する
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SettingsMenu;
