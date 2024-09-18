import React from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system'; // Import Box from MUI for layout

const LoadingSpinner = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh', // Full viewport height
                width: '100vw',  // Full viewport width
                zIndex: 3,
                position: 'absolute',
                top: 0,
                left: 0
            }}
        >
            <CircularProgress color="success" />
        </Box>
    );
};

export default LoadingSpinner;
