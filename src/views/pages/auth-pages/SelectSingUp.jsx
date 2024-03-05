import { Button, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';

const SelectSignUp = () => {
    const [selectedValue, setSelectedValue] = useState(1); // état local pour suivre la valeur sélectionnée
    const navigate = useNavigate(); // hook pour la navigation

    const handleButtonClick = () => {
        if (selectedValue === 1) {
            navigate('/inscription/public');
        } else if (selectedValue === 2) {
            navigate('/inscription');
        }
    };

    const handleRadioChange = (event) => {
        setSelectedValue(parseInt(event.target.value));
    };

    return (
        <>
            <Grid container justifyContent={'center'} alignItems={'center'} height={'100vh'}>
                <Grid borderRadius={5} boxShadow={5} p={4}>
                    <Grid pb={3}>
                        <Typography variant="h3">Hiditra pikambana TAFOMIAAVO ve ianao sa olo-tsotra ?</Typography>
                    </Grid>
                    <Grid direction={'row'} container justifyContent={'center'}>
                        <Grid container item xs={8} justifyContent={'center'} borderRadius={4} border={'black solid 1px'}>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                // sx={{ my: 2 }}
                                fullWidth
                                id="sex"
                                name="sex"
                                value={selectedValue}
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value={1} control={<Radio />} label="Olo-tsotra" />
                                <FormControlLabel value={2} control={<Radio />} label="Mpikambana" />
                            </RadioGroup>
                        </Grid>
                        <Grid container item xs={4} justifyContent={'center'}>
                            <Button variant="outlined" color="secondary" onClick={handleButtonClick}>
                                Hanamafy
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default SelectSignUp;
