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
import BoutonAction from 'composants/thony/component/BoutonAction';
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

function Profile() {
    const auth = useAuthTemp();
    const userFront = auth.getUserFront();
    const idUser = userFront.id;
    // console.log('this is the userBack user', userFront.firstName);
    console.log('this is the userBack user', idUser);

    // const { id } = useParams();
    const [datas, setMyDatas] = useState([]);
    useEffect(() => {
        axios
            .get(siteUrlApi(`users-front/id/${idUser}`))
            .then((response) => {
                setMyDatas(response.data.items);
                console.log('okey azo user');
            })
            .catch((error) => {
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
                            <Box textAlign={'center'} sx={{ width: '20vh', height: '20vh', position: 'relative', ml: '8vw', mb: '-8vh' }}>
                                <StyledFab aria-label="add">
                                    {datas.gender !== 'homme' && <Face3Icon sx={{ bgcolor: grey[300], width: '100%', height: '100%' }} />}
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
            <Box sx={{ my: 4 }}>
                <Grid container justifyContent={'center'}>
                    <Grid xs={12} md={4} mb={3}>
                        <Grid
                            boxShadow={10}
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                p: 2,
                                mx: 2
                            }}
                        >
                            <Typography variant="body1" sx={{ m: 2, textAlign: 'left' }}>
                                <span style={{ fontWeight: 'bold' }}>Mailaka :</span> {datas.email}
                            </Typography>
                            <Typography variant="body1" sx={{ m: 2, textAlign: 'left' }}>
                                <span style={{ fontWeight: 'bold' }}>Lany daty amin`ny :</span> {formatDate(datas.expirationDate)}
                            </Typography>
                            <Grid container justifyContent={'flex-end'}>
                                <Button variant="contained" color="secondary">
                                    Hanavao fisoratana anarana
                                </Button>
                            </Grid>
                            {/* <Typography variant="body1" sx={{ m: 2, textAlign: 'left' }}>
                            <span style={{ fontWeight: 'bold' }}>Lot :</span> {datas.adress}
                        </Typography> */}
                        </Grid>
                        <Grid
                            boxShadow={10}
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                pb: 2,
                                m: 2
                                // overflowY: 'scroll'
                            }}
                            justifyContent={'center'}
                            // border={'green solid 2px'}
                            // height={'60vh'}
                            // overflowY={'scroll'}
                        >
                            <Grid container py={2} justifyContent={'center'}>
                                <Typography variant="h3">Sesika novidiako</Typography>
                            </Grid>
                            <Grid
                                sx={{
                                    p: 2,
                                    overflowY: 'scroll'
                                }}
                                justifyContent={'center'}
                                height={'60vh'}
                            >
                                {data &&
                                    data.map((option) => (
                                        <>
                                            {' '}
                                            <Grid container justifyContent={'center'}>
                                                <Card
                                                    sx={{
                                                        p: 1,
                                                        my: 3,
                                                        maxWidth: {
                                                            xs: 600,
                                                            md: 345
                                                        },
                                                        maxHeight: 325,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        boxShadow: '0px 0px 5px 0.001px rgba(0,0,0,0.75)'
                                                    }}
                                                >
                                                    <CardActionArea /*component={Link} to={`${data.id}`}*/>
                                                        <Box>
                                                            <CardMedia component="img" height="180" image={imgDesc2} alt="Image" />
                                                        </Box>

                                                        <CardContent>
                                                            <Box
                                                                style={{
                                                                    width: 'auto',
                                                                    height: 'auto',
                                                                    padding: '5px',
                                                                    position: 'absolute',
                                                                    top: 8,
                                                                    right: 8,
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    aligndata: 'center',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: '#EBCC24',
                                                                    zIndex: 1
                                                                }}
                                                            >
                                                                {/* <BoutonAction size={25} style={{ color: '#000', zIndex: 1 }} /> */}
                                                            </Box>

                                                            <Grid
                                                                container
                                                                direction={'column'}
                                                                justifyContent={'flex-start'}
                                                                aligndata={'flex-start'}
                                                                borderRadius={2}
                                                                p={1}
                                                                sx={{
                                                                    backgroundImage: 'linear-gradient(120deg, #EBCC24 50%, #95c732 50%)'
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="h5"
                                                                    component="div"
                                                                    sx={{
                                                                        fontWeight: 'bold',
                                                                        textDecoration: 'none',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace: 'nowrap',
                                                                        maxWidth: '100%' // Assure que le texte ne dépasse pas la largeur du conteneur
                                                                    }}
                                                                >
                                                                    {option.name}
                                                                </Typography>
                                                                <Typography variant="h6">
                                                                    <Grid container justifyContent={'flex-start'} alignItems={'center'}>
                                                                        <AttachMoneyIcon /> :
                                                                        <span style={{ fontSize: '14px', color: 'blue' }}>
                                                                            {option.unit_price}
                                                                            ,00MGA
                                                                        </span>
                                                                    </Grid>
                                                                </Typography>
                                                            </Grid>
                                                            {/* <Grid container justifyContent={'flex-end'}>
                                                            <Button variant="contained" sx={{ backgroundColor: '#EBCC24', marginTop: 1 }}>
                                                                Acheter
                                                                <MonetizationOnIcon />
                                                            </Button>
                                                        </Grid> */}
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </Grid>
                                        </>
                                    ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        xs={12}
                        md={7}
                        mb={3}
                        boxShadow={10}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            p: 2,
                            mx: 2
                        }}
                    >
                        <Typography variant="h3" sx={{ color: 'secondary', m: 2, textAlign: 'center' }}>
                            Mombamomba anao
                        </Typography>
                        <Typography variant="body1" sx={{ m: 2, textAlign: 'left' }}>
                            <span style={{ fontWeight: 'bolder' }}>Gaty nahaterahana :</span> {formatDate(datas.birthday)}
                        </Typography>
                        <Typography variant="body1" sx={{ m: 2, textAlign: 'left' }}>
                            <span style={{ fontWeight: 'bolder' }}>Lehilahy/Vehivavy :</span> {datas.gender}
                        </Typography>
                        {datas.homeAddress !== null && (
                            <Typography variant="body1" sx={{ m: 2, textAlign: 'left' }}>
                                <span style={{ fontWeight: 'bolder' }}>Fonenana :{datas.homeAddress}</span> {}
                            </Typography>
                        )}
                        <Typography variant="body1" sx={{ m: 2, textAlign: 'left' }}>
                            <span style={{ fontWeight: 'bolder' }}>Karapanondro :</span> {datas.cin} fait le {formatDate(datas.cinDate)}
                        </Typography>
                        <Grid container justifyContent={'space-around'}>
                            <Button variant="contained" color="secondary">
                                Ijery sary karapanondro
                            </Button>
                        </Grid>
                        <Typography variant="body1" sx={{ m: 2, textAlign: 'left' }}>
                            <span style={{ fontWeight: 'bolder' }}>Tra-pahasembanana ve? :</span> {datas.handicapName}
                        </Typography>
                        <Grid container justifyContent={'flex-end'}>
                            <Button variant="contained" color="primary">
                                HANOVA
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default Profile;
