/* eslint-disable prettier/prettier */
import bannerImage from 'assets/images/profile/fond-profile.jpg';
import Fab from '@mui/material/Fab';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import imgDesc2 from 'assets/images/profile/fond-profile.jpg';
import {
    Stack,
    Box,
    Avatar,
    Grid,
    Button,
    IconButton,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Tabs
} from '@mui/material';
import Face3Icon from '@mui/icons-material/Face3';
import * as React from 'react';
// import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { siteUrlApi } from 'utils/base_url_api';
import { useAuthTemp } from 'utils/auth';
import { useParams } from 'react-router-dom';
import RectoCin from 'composants/thony/component/cin-photo/RectoCIN';
import VersoCIN from 'composants/thony/component/cin-photo/VersoCIN';
import Waiter from 'composants/common/Waiter';
const data = [
    {
        name: 'Lahatsoratra 1',
        unit_price: 25,
        quantity: 10
    },
    {
        name: 'Lahatsoratra 2',
        unit_price: 30,
        quantity: 8
    },
    {
        name: 'Lahatsoratra 3',
        unit_price: 35,
        quantity: 15
    },
    {
        name: 'Lahatsoratra 4',
        unit_price: 40,
        quantity: 20
    },
    {
        name: 'Lahatsoratra 5',
        unit_price: 45,
        quantity: 25
    },
    {
        name: 'Lahatsoratra 6',
        unit_price: 50,
        quantity: 30
    },
    {
        name: 'Video 7',
        unit_price: 55,
        quantity: 35
    },
    {
        name: 'Video 8',
        unit_price: 60,
        quantity: 40
    },
    {
        name: 'Video 9',
        unit_price: 65,
        quantity: 45
    },
    {
        name: 'Audio 10',
        unit_price: 70,
        quantity: 50
    },
    {
        name: 'Audio 11',
        unit_price: 75,
        quantity: 55
    },
    {
        name: 'Audio 12',
        unit_price: 80,
        quantity: 60
    }
];

function ProfileUSerBack() {
    /*loader*/
    const [load, setLoad] = useState(true);
    const { idUser } = useParams();
    const [isLoading, setLoading] = useState(true);
    // console.log('this is the userBack user', userFront.firstName);
    console.log('this is the userBack user', idUser);

    // const { id } = useParams();
    const [datas, setMyDatas] = useState([]);
    useEffect(() => {
        axios
            .get(siteUrlApi(`users-front/id/${idUser}`))
            .then((response) => {
                console.log('data from profile', response.data.items);
                setLoading(false);
                setMyDatas(response.data.items);
                console.log('okey azo user');
                setLoad(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error('tsy mandeha user');
                console.error(error);
            });
    }, []);
    const StyledFab = styled(Fab)({
        zIndex: 2,
        top: '-50%',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        border: '0.7vh solid white'
    });
    function formatDate(rawDate) {
        const date = new Date(rawDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
        return formattedDate;
    }
    if (load) {
        return <h1>Miandry elah</h1>;
    } else {
        return (
            <>
                <Stack direction={'row'}>
                    <Stack direction={'column'} sx={{ width: '100%' }}>
                        <Box
                            mb={3}
                            boxShadow={10}
                            padding={1}
                            sx={{
                                width: '100%',
                                backgroundColor: 'white',
                                borderRadius: '8px'
                            }}
                        >
                            <Typography variant="h2">Profile</Typography>
                        </Box>
                        <Box>
                            <img src={bannerImage} alt="sary-fandrakofana" style={{ width: '100%', height: 'auto', borderRadius: 5 }} />
                        </Box>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction={'row'}>
                                <Box
                                    textAlign={'center'}
                                    sx={{ width: '20vh', height: '20vh', position: 'relative', ml: '8vw', mb: '-8vh' }}
                                >
                                    <StyledFab aria-label="add">
                                        {datas.gender !== 'homme' && (
                                            <Face3Icon sx={{ bgcolor: grey[300], width: '100%', height: '100%' }} />
                                        )}
                                        {datas.gender === 'homme' && (
                                            <Avatar
                                                src="/broken-image.jpg"
                                                sx={{ bgcolor: grey[300], color: 'white', width: '100%', height: '100%' }}
                                            />
                                        )}
                                    </StyledFab>
                                    {/* <IconButton
                                        style={{
                                            zIndex: 2,
                                            position: 'absolute',
                                            top: '4vh',
                                            right: 8,
                                            border: '2px solid white',
                                            padding: 2,
                                            backgroundColor: 'white',
                                            boxShadow: '10px 2px 10px rgba(0, 0, 0, 0.1)'
                                        }}
                                    >
                                        <PhotoCameraIcon type="file" />
                                    </IconButton> */}
                                </Box>
                                <Stack ml={2} direction={'column'}>
                                    <Typography variant="h3">
                                        {datas.firstName} {datas.lastName}
                                    </Typography>
                                    <Typography variant="body1">
                                        {datas.professionName}
                                        {/* <IconButton style={{ padding: 0 }}>
                                        <PersonRoundedIcon />
                                    </IconButton> */}
                                    </Typography>
                                </Stack>
                            </Stack>
                            {/* <Stack direction={'row'} sx={{ ml: 'auto' }}>
                                <Button
                                    sx={{ mr: 5, mb: 4, mt: { xs: -5, sm: 0, md: 0 } }}
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<MessageRoundedIcon />}
                                >
                                    Message
                                </Button>
                            </Stack> */}
                        </Grid>
                    </Stack>
                </Stack>
                <Grid container sx={{ my: 4 }} justifyContent={'center'}>
                    <Grid container justifyContent={'center'} height={'100%'} alignItems={'center'} my={2}>
                        <Grid
                            xs={12}
                            md={5}
                            boxShadow={10}
                            height={'100%'}
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                p: 2,
                                m: 2
                            }}
                        >
                            <Typography variant="h3" sx={{ color: 'secondary', m: 2, textAlign: 'center' }}>
                                Compte de {datas.firstName}
                            </Typography>
                            <Grid container justifyContent={'center0'} direction={'column'}>
                                <Grid container item xs={6} direction={'row'}>
                                    <Grid container item xs={6} md={4}>
                                        <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                            <span style={{ fontWeight: 'bold' }}>Mailaka :</span>
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                            {datas.email}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6} direction={'row'}>
                                    <Grid container item xs={6} md={4}>
                                        <Typography variant="body1" sx={{ my: 2, textAlign: 'left' }}>
                                            <span style={{ fontWeight: 'bold' }}>Lany daty amin`ny :</span>
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography variant="body1" sx={{ my: 2, textAlign: 'left' }}>
                                            {formatDate(datas.expirationDate)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            height={'100%'}
                            xs={12}
                            md={5}
                            boxShadow={10}
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                p: 2,
                                m: 2
                            }}
                        >
                            <Typography variant="h3" sx={{ color: 'secondary', m: 2, textAlign: 'center' }}>
                                Apropos de {datas.firstName}
                            </Typography>
                            <Grid container justifyContent={'center0'} direction={'column'}>
                                <Grid container item xs={6} direction={'row'}>
                                    <Grid container item xs={6} md={4}>
                                        <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                            <span style={{ fontWeight: 'bolder' }}>Date De naissance :</span>
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                            {formatDate(datas.birthday)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6} direction={'row'}>
                                    <Grid container item xs={6} md={4}>
                                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>
                                            <span style={{ fontWeight: 'bolder' }}>Homme/Femme :</span>
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>
                                            {datas.gender}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6} direction={'row'}>
                                    <Grid container item xs={6} md={4}>
                                        {datas.homeAddress !== null && (
                                            <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>
                                                <span style={{ fontWeight: 'bolder' }}>Domicil :</span>
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid>
                                        {datas.homeAddress !== null && (
                                            <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>
                                                {datas.homeAddress}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6} direction={'row'}>
                                    <Grid container item xs={6} md={4}>
                                        {datas?.cin && (
                                            <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>
                                                <span style={{ fontWeight: 'bolder' }}>CIN :</span>
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid>
                                        {datas?.cin && (
                                            <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>
                                                {datas.cin} fait le {formatDate(datas.cinDate)}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6} direction={'row'}>
                                    <Grid container item xs={6} md={4}>
                                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>
                                            <span style={{ fontWeight: 'bolder' }}>Handicape ? :</span>
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>
                                            {datas.handicapName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'center'} height={'100%'}>
                        <Grid
                            xs={12}
                            md={5}
                            height={'100%'}
                            sx={{
                                m: 2
                            }}
                        >
                            <Waiter loadingState={isLoading} />
                            <RectoCin data={datas.cinRectoFileName} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={5}
                            height={'100%'}
                            sx={{
                                m: 2
                            }}
                        >
                            <Waiter loadingState={isLoading} />
                            <VersoCIN data={datas.cinVersoFileName} />
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}
export default ProfileUSerBack;
