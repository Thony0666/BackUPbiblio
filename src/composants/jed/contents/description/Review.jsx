// Import necessary components and styles
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { Box, Modal, Typography } from '@mui/material';

// Review component
const Review = () => {
    const [ratingValue, setRatingValue] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
        console.log(newValue);
    };

    const handleSignalerClick = () => {
        // Open the modal when Signaler button is clicked
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        // Close the modal
        setIsModalOpen(false);
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={1} marginLeft={3} marginRight={3}>
            <Rating name="rating" defaultValue={0} precision={0.5} onChange={handleRatingChange} />

            {/* <div style={{ marginLeft: '10px' }}>{ratingValue !== null && <span>{ratingValue}</span>}</div> */}

            <Button variant="contained" color="primary" onClick={handleSignalerClick}>
                HITORAKA
            </Button>

            {/* Modal signaler */}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <Typography variant="h6" component="div">
                        SIGNALER LA PUBLICATION
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Veuiller specifier la raison du signalement.
                    </Typography>
                    {/* Add your form or input fields for reporting here */}
                    <Button variant="contained" color="primary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default Review;
