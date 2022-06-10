import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 200,
  bgcolor: 'background.paper',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  borderRadius: '10px',
  padding: '10px',
  textAlign: 'center',
};

const ChangeRoleModal = ({ open, setOpen, role, firstName, lastName }) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography component="h2" id="modal-modal-title" variant="h6">
            Роль у пользователя
            {' '}
            {`${firstName} ${lastName} `}
            изменена на
            {' '}
            {role}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ChangeRoleModal;
