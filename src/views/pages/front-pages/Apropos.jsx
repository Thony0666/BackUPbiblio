import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import bgImage from '../../../assets/images/bgApropos.jpg';
import { siteUrlApi } from 'utils/base_url_api';
import { Box } from '@mui/system';
import Waiter from 'composants/common/Waiter';
import WaiterInGrid from 'composants/common/WaiterInGrid';

function Apropos(props) {
    const loading = props.load;
    const [aboutDataTitle, setAboutDataTitle] = useState([]);
    const [aboutDataBody, setAboutDataBody] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        axios
            .get(siteUrlApi(`about`))
            .then((response) => {
                setAboutDataTitle(response.data.items[0]);
                setAboutDataBody(response.data.items[1]);
                console.log('okey azo leka ');
                console.log(response);
                setLoad(false);
            })
            .catch((error) => {
                console.error('tsy mandeha url articles');
                console.error(error);
                setLoad(false);
            });
    }, [loading]);
    return (
        <>
            <Grid
                container
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '80vh',
                    overflow: 'hidden'
                }}
                position={'relative'}
                // borderRadius={3}
            >
                {load && <WaiterInGrid />}
                <Grid
                    container
                    justifyContent={'center'}
                    alignItems={'center'}
                    height={'100%'}
                    sx={{
                        backdropFilter: 'blur(1px)', // Appliquer un flou de 5px à l'arrière-plan
                        backgroundColor: 'rgba(0, 0, 0, 0.3)' // Couleur de fond avec transparence pour l'effet de flou
                    }}
                >
                    <Box width={'50%'} textAlign={'center'}>
                        <Typography color={'white'} variant="h1" m={3}>
                            {aboutDataTitle.textValue}
                        </Typography>
                        <Typography color="white" variant="body1" dangerouslySetInnerHTML={{ __html: aboutDataBody.textValue }} />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Apropos;
