/* eslint-disable prettier/prettier */
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Face3Icon from '@mui/icons-material/Face3';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
    Avatar,
    Box,
    Divider,
    Fab,
    Grid,
    IconButton,
    ListItemIcon,
    ListItemText,
    Modal,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { siteUrlApi } from 'utils/base_url_api';
import axios from 'axios';
import { useState } from 'react';
import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
export default function VoirContact(props) {
    const datas = props.data;
    const message = props.data.message;
    // const relode = props.function;

    const [openModalValidation, setOpenModalValidation] = useState(false);
    // const [newHand, setHand] = React.useState(nameHandicap);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50vw',
        bgcolor: 'background.paper',
        // border: '1px solid #000',
        boxShadow: 24,
        borderRadius: 3
        // pt: 2,
        // px: 4,
        // py: 3
    };
    const handleChangeHandicap = (event) => {
        setHand(event.target.value);
    };
    const handeUp = () => {
        relode(false);
        handleSendRemark();
        setOpenModalValidation(false);
    };
    const handleOpenModalValidation = () => {
        setOpenModalValidation(true);
        setAnchorEl(null);
    };
    const handleCloseModalValidation = () => {
        setOpenModalValidation(false);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleSendRemark = () => {
        const postData = {
            id: idHandicap,
            name: newHand
        };
        console.log(JSON.stringify({ postData }));

        axios
            .put(siteUrlApi(`handicaps`), postData)
            .then((response) => {
                relode(true);
                console.log('Réponse du serveur:', response.data);
                <alert> Votre maj a bien été succes</alert>;
            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi des données:", error);
                <alert> Veuillez ressayer </alert>;
                relode(true);
            });
    };
    const Delete = () => {
        const config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: siteUrlApi(`handicaps/id/${idHandicap}`),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        axios
            .request(config)
            .then((response) => {
                // setLoad(true);
                relode(true);
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                // setLoad(true);
                console.log(error);
                relode(true);
            });
    };
   
    const StyledFab = styled(Fab)({
        zIndex: 2,
        // top: '-50%',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        border: '0.7vh solid white'
    });
    return (
        <>
            {/* miantso modal */}
            <Modal
                open={openModalValidation}
                onClose={handleCloseModalValidation}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '50vw' }} position={'relative'}>
                    <Grid container direction={'column'} position={'relative'}>
                        <Grid container justifyContent={'flex-end'} position={'absolute'} zIndex={3} p={1}>
                            {' '}
                            <IconButton variant="texte" onClick={handleCloseModalValidation} sx={{ color: 'grey' }}>
                                <ClearIcon />
                            </IconButton>
                        </Grid>
                        <Grid container alignItems={'center'} direction={'row'} px={3} py={1}>
                            <Box textAlign={'center'} sx={{ width: '13vh', height: '13vh', position: 'relative' }}>
                                <StyledFab aria-label="add">
                                    <Avatar
                                        src="/broken-image.jpg"
                                        sx={{ bgcolor: grey[300], color: 'white', width: '100%', height: '100%' }}
                                    />
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
                                    {datas.email}
                                    {/* <IconButton style={{ padding: 0 }}>
                                    <PersonRoundedIcon />
                                </IconButton> */}
                                </Typography>
                            </Stack>
                        </Grid>
                        {/* <Grid contenair direction={'column'} px={3}>
                            <Grid container justifyContent={'flex-end'}>
                                {' '}
                                <IconButton variant="texte" onClick={handleCloseModalValidation} sx={{ color: 'grey' }}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>
                            <Typography variant="h3" sx={{ wordWrap: 'break-word' }}>
                                Nom et prénom :{' '}
                                <span style={{ fontWeight: 'initial' }}>
                                    {' '}
                                    {datas.lastName} {datas.firstName}
                                </span>
                            </Typography>
                            <Typography variant="h3" sx={{ wordWrap: 'break-word' }}>
                                Email : <span style={{ fontWeight: 'initial' }}> {datas.email} </span>
                            </Typography>
                        </Grid> */}
                        <Divider />
                    </Grid>
                    <Grid container p={3} direction={'column'}>
                        <Typography variant="h3" textAlign={'center'} sx={{ wordWrap: 'break-word' }}>
                            {datas.object}
                        </Typography>

                        {/* <TextField
                        id="outlined-multiline-static"
                        label="Handicap"
                        variant="outlined"
                        fullWidth
                        value={newHand}
                        defaultValue={nameHandicap}
                        onChange={handleChangeHandicap}
                        // defaultValue={formik.values.name}
                        sx={{ my: 2 }}
                    /> */}
                        <Grid
                            container
                            border={'solid #ccc 1px'}
                            // overflow={'scroll'}
                            borderRadius={2}
                            p={1}
                            maxHeight={'50vh'}
                            minHeight={'20vh'}
                            sx={{
                                overflowY: 'auto',
                                scrollbarWidth: 'unset', // Pour les navigateurs basés sur WebKit
                                '&::-webkit-scrollbar': {
                                    width: '6px',
                                    borderRadius: '3px' // Largeur de la barre de défilement pour les navigateurs basés sur WebKit
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    borderRadius: '3px', // Largeur de la barre de défilement pour les navigateurs basés sur WebKit
                                    background: '#888' // Couleur de la poignée de défilement pour les navigateurs basés sur WebKit
                                }
                            }}
                        >
                            <Typography variant="body1">{message}</Typography>
                        </Grid>
                    </Grid>

                    {/* <Stack spacing={3} direction={'row'} justifyContent={'flex-end'}>
                        <Button variant="texte" onClick={handleCloseModalValidation} sx={{ color: 'grey' }}>
                            Annuler
                        </Button>
                        <Button onClick={handeUp} variant="texte" sx={{ color: 'green' }}>
                            Modifier
                        </Button>
                    </Stack> */}
                </Box>
            </Modal>

            {/* toutes les actions */}
            <Box>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleOpenModalValidation}
                    color="secondary"
                >
                    <RemoveRedEyeIcon />
                </Button>
                {/* <Menu
                    idMenu="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button'
                    }}
                >
                    <MenuItem component={Button} onClick={handleOpenModalValidation} fullWidth sx={{ color: 'text.secondary' }}>
                        <ListItemIcon>
                            <EditOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Modifier" style={alignStart} />
                    </MenuItem>
                    <MenuItem component={Button} onClick={handleOpenModalDelete} sx={{ color: 'text.secondary' }} fullWidth>
                        <ListItemIcon>
                            <DeleteOutlineOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Supprimer" style={alignStart} />
                    </MenuItem>
                </Menu> */}
            </Box>
        </>
    );
}
