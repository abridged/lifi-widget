import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const LoadingScreen = () => {
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prevDot) => (prevDot + 1) % 5); // Assuming 3 dots
    }, 500); // Adjust the interval based on your preference

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      display={'flex'}
      gap={1}
      alignItems="center"
      justifyContent="center"
      className="loading-screen"
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <FiberManualRecordIcon
          key={index}
          fontSize={activeDot === index ? 'medium' : 'small'}
          color={activeDot === index ? 'warning' : 'inherit'}
        />
      ))}
    </Box>
  );
};

export default LoadingScreen;
