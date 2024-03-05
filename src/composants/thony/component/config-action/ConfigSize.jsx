/* eslint-disable prettier/prettier */
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Grid, ListItemIcon, ListItemText, Modal, Stack, TextField, Typography } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { siteUrlApi } from 'utils/base_url_api';
import axios from 'axios';
export default function ConfigSize(props) {
    const idSize = props.id;
    const nameSize = props.name;
    const relode = props.function;

    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [openModalValidation, setOpenModalValidation] = React.useState(false);
    const [newSize, setSize] = React.useState(nameSize);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        borderRadius: 3,
        pt: 2,
        px: 4,
        pb: 3
    };
    const handleChangeSize = (event) => {
        setSize(event.target.value);
    };
    const handleOpenModalDelete = () => {
        setOpenModalDelete(true);
        setAnchorEl(null);
    };
    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
    };
    const handeUp = () => {
        relode(false);
        handleSendSize();
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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const alignStart = {
        display: 'flex',
        justifyContent: 'flex-start'
    };
    const handleSendSize = () => {
        const postData = {
            id: idSize,
            name: newSize
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
            url: siteUrlApi(`handicaps/id/${idSize}`),
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
    const handeleDelete = () => {
        Delete();
        relode(false);
        setOpenModalDelete(false);
    };
    return (
        <>
            {/* miantso modal */}
            <Modal
                open={openModalValidation}
                onClose={handleCloseModalValidation}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Modification</h2>

                    <TextField
                        id="outlined-multiline-static"
                        label="Handicap"
                        variant="outlined"
                        fullWidth
                        value={newSize}
                        defaultValue={nameSize}
                        onChange={handleChangeSize}
                        // defaultValue={formik.values.name}
                        sx={{ my: 2 }}
                    />
                    <Stack spacing={3} direction={'row'} justifyContent={'flex-end'}>
                        <Button variant="texte" onClick={handleCloseModalValidation} sx={{ color: 'grey' }}>
                            Annuler
                        </Button>
                        <Button onClick={handeUp} variant="texte" sx={{ color: 'green' }}>
                            Modifier
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            <Modal
                open={openModalDelete}
                onClose={handleCloseModalDelete}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <Grid container direction={'row'}>
                        <Typography variant="h3" mr={1} style={{ color: 'red' }}>
                            Attention{' '}
                        </Typography>
                        <ReportProblemOutlinedIcon style={{ color: 'red' }} />
                    </Grid>

                    <p id="parent-modal-description">
                        Vous êtes sur pour efffacer <span style={{ fontWeight: 'bold' }}>{nameSize}</span>
                    </p>
                    <Stack spacing={3} direction={'row'} justifyContent={'flex-end'}>
                        {/* <Box spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', p: 1 }}> */}
                        <Button onClick={handleCloseModalDelete} variant="texte" sx={{ color: 'grey' }}>
                            Annule
                        </Button>
                        <Button onClick={handeleDelete} variant="texte" sx={{ color: 'red' }}>
                            Delete
                        </Button>
                        {/* </Box> */}
                    </Stack>
                </Box>
            </Modal>
            {/* toutes les actions */}
            <Box>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    color="secondary"
                >
                    <MoreVertIcon />
                </Button>
                <Menu
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
                </Menu>
            </Box>
        </>
    );
}
