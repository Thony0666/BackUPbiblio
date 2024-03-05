import { Grid, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { siteUrlApi } from 'utils/base_url_api';
function NewProf(props) {
    const fonction = props.fonction;
    const relode = props.loading;
    const [newProf, setProf] = useState('');
    const hideInput = () => {
        fonction();
    };
    const handleChangeProf = (event) => {
        setProf(event.target.value);
    };

    const handleSendProf = () => {
        const postData = {
            name: newProf
        };
        console.log(JSON.stringify({ postData }));

        axios
            .post(siteUrlApi('professions'), postData)
            .then((response) => {
                console.log('Réponse du serveur:', response.data);
                setTheme('');
                fonction();
                relode(true);
            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi des données:", error);
                fonction();
                relode(true);
            });
    };
    const handelEnvoyer = () => {
        handleSendProf();
        relode(false);
    };
    return (
        <>
            <Grid
                container
                borderBottom={'1px solid rgba(0, 0, 0, 0.12)'}
                borderTop={'1px solid rgba(0, 0, 0, 0.12)'}
                sx={{ width: '100%' }}
                justifyContent={'space-between'}
                alignItems={'center'}
                p={1}
            >
                <Grid container item xs={1.5} justifyContent={'flex-start'}>
                    <IconButton onClick={hideInput} variant="contained" style={{ color: 'grey' }}>
                        <ClearIcon />
                    </IconButton>
                </Grid>
                <Grid container item xs={9}>
                    <TextField
                        id="outlined-basic"
                        label="Profession"
                        variant="outlined"
                        fullWidth
                        value={newProf}
                        onChange={handleChangeProf}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handelEnvoyer} color="secondary" edge="end" aria-label="Valider">
                                    <CheckIcon />
                                </IconButton>
                            )
                        }}
                    />{' '}
                </Grid>
            </Grid>
        </>
    );
}

export default NewProf;
