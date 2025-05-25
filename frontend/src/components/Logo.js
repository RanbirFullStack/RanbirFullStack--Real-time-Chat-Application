import React from 'react';
import { Box } from '@mui/material';

const Logo = ({ size = 40 }) => {
  return (
    <Box
      component="img"
      src="https://cdn-icons-png.flaticon.com/512/134/134914.png"
      alt="Chat Logo"
      sx={{
        width: size,
        height: size,
        objectFit: 'contain',
        filter: 'brightness(0) invert(1)', // Makes the logo white
      }}
    />
  );
};

export default Logo; 