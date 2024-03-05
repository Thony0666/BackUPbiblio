import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function WaiterInGrid() {
    return (
        <>
            <Box
                width={'100%'}
                height={'100%'}
                zIndex={10}
                // border={'red solid 2px'}
                position={'absolute'}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backdropFilter: 'blur(1px)', // Appliquer un flou de 5px à l'arrière-plan
                    backgroundColor: 'rgba(0, 0, 0, 0.1)' // Couleur de fond avec transparence pour l'effet de flou
                }}
            >
                <CircularProgress color="secondary" />
            </Box>
        </>
    );
}

export default WaiterInGrid;
