import { Alert, Box, Collapse, IconButton } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/CloseRounded';

export const ErrorMessage = ({
  error,
  onClose,
}: {
  error?: string;
  onClose: () => void;
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={!!error}>
        <Alert
          variant="filled"
          severity={'error'}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      </Collapse>
    </Box>
  );
};
