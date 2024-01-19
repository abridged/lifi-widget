import { useNavigate } from 'react-router-dom';
import { navigationRoutes } from '../../../utils';
import { Box, Button, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React from 'react';

export const AdvanceOptions = () => {
  const navigate = useNavigate();
  const handleBridgeClick = () => {
    navigate(navigationRoutes.bridgeHome);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} gap={1}>
      <Typography
        color={'#AAA'}
        fontSize={18}
        fontWeight={600}
        display={'flex'}
        gap={1}
        alignItems={'center'}
      >
        Advanced Option <InfoOutlinedIcon />
      </Typography>
      <Box
        borderRadius={1}
        bgcolor={'#333'}
        display={'flex'}
        alignItems={'center'}
        padding={2}
      >
        <Typography color={'#AAA'} fontSize={14} fontWeight={400}>
          Copy here about Bridging and brief into to idea.
        </Typography>
        <Button
          style={{
            borderRadius: '24px',
            backgroundColor: 'transparent',
            border: '2px solid #EDC803',
            fontWeight: 700,
            height: '32px',
          }}
          onClick={handleBridgeClick}
          variant="contained"
        >
          Bridge
        </Button>
      </Box>
    </Box>
  );
};
