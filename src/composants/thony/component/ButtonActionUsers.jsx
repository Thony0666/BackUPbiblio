/* eslint-disable prettier/prettier */
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, ListItemIcon, ListItemText, Modal, Stack } from '@mui/material';
import qs from 'qs';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import axios from 'axios';
import Waiter from 'composants/common/Waiter';
import { Link } from 'react-router-dom';
//import Teste from './teste';

export default function ButtonActionUsers(props) {
    const [isLoading, setLoading] = React.useState(false);
    /*resaka modal*/
    function updateStatusUserActif() {
        let data = qs.stringify({
            status: 100
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `https://api.tafomihaavo.mg/tahiry/v3/users-front/status/${props.data.id}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }
    function updateStatusUserInactif() {
        let data = qs.stringify({
            status: 0
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `https://api.tafomihaavo.mg/tahiry/v3/users-front/status/${props.data.id}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }
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

    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const handleOpenModalDelete = () => {
        setOpenModalDelete(true);
    };
    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
    };
    const [openModalRestore, setOpenModalRestore] = React.useState(false);
    const handleOpenModalRestore = () => {
        setAnchorEl(null);
        setOpenModalRestore(true);
    };
    const handleCloseModalRestore = () => {
        setAnchorEl(null);
        setOpenModalRestore(false);
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
    const handelActif = () => {
        setOpenModalRestore(false);
        updateStatusUserActif();

        setLoading(true);
    };
    const handelInactif = () => {
        setOpenModalRestore(false);
        updateStatusUserInactif();

        setLoading(true);
    };
    return (
        <>
            <Waiter loadingState={isLoading} />
            <Modal
                open={openModalDelete}
                onClose={handleCloseModalDelete}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">
                        Attention <ReportProblemOutlinedIcon />
                    </h2>
                    <p id="parent-modal-description">
                        Vous êtes sur pour efffacer definitivement <span style={{ fontWeight: 'bold' }}>{props.data.firstName}</span>
                    </p>
                    <Stack spacing={3} direction={'row'} justifyContent={'flex-end'}>
                        {/* <Box spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', p: 1 }}> */}
                        <Button variant="text" onClick={handleCloseModalDelete}>
                            Annule
                        </Button>
                        <Button variant="text" color="error">
                            Delete
                        </Button>
                        {/* </Box> */}
                    </Stack>
                </Box>
            </Modal>
            <Modal
                open={openModalRestore}
                onClose={handleCloseModalRestore}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">
                        Attention <ReportProblemOutlinedIcon />
                    </h2>
                    <p id="parent-modal-description">
                        Vous êtes sur pour {props.data.status === 0 ? <span>activer </span> : <span>desactiver </span>}
                        <span style={{ fontWeight: 'bold' }}>{props.data.firstName}</span>
                    </p>
                    <Stack spacing={3} direction={'row'} justifyContent={'flex-end'}>
                        <Button variant="text" onClick={handleCloseModalRestore}>
                            Annule
                        </Button>

                        {props.data.status === 0 ? (
                            <Button variant="text" color="secondary" onClick={handelActif}>
                                Activer
                            </Button>
                        ) : (
                            <Button variant="text" color="error" onClick={handelInactif}>
                                Desactiver
                            </Button>
                        )}
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
                    <MenuItem component={Link} to={`${props.data.id}`} sx={{ color: 'text.secondary' }} fullWidth>
                        <ListItemIcon>
                            <RemoveRedEyeOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Voir" style={alignStart} />
                    </MenuItem>
                    {props.data.status === 0 ? (
                        <MenuItem component={Button} onClick={handleOpenModalRestore} sx={{ color: 'text.secondary' }} fullWidth>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Activer" style={alignStart} />
                        </MenuItem>
                    ) : (
                        <MenuItem component={Button} onClick={handleOpenModalRestore} sx={{ color: 'text.secondary' }} fullWidth>
                            <ListItemIcon>
                                <ClearOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Desactiver" style={alignStart} />
                        </MenuItem>
                    )}
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
