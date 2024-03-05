/* eslint-disable prettier/prettier */
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import { Box, ListItemIcon, ListItemText, Modal, Stack } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
//import Teste from './teste';
export default function TrashButton(props) {
    /*resaka modal*/

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
        setOpenModalRestore(true);
    };
    const handleCloseModalRestore = () => {
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

    return (
        <>
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
                    <p id="parent-modal-description">Vous êtes sur pour efffacer definitivement {props.data.title}</p>
                    <Stack spacing={3} direction={'row'} justifyContent={'flex-end'}>
                        {/* <Box spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', p: 1 }}> */}
                        <Button variant="text">Annule</Button>
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
                    <p id="parent-modal-description">Vous êtes sur pour restorer {props.data.title}</p>
                    <Stack spacing={3} direction={'row'} justifyContent={'flex-end'}>
                        {/* <Box spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', p: 1 }}> */}
                        <Button variant="text">Annule</Button>
                        <Button variant="text" color="secondary">
                            Restorer
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
                    <MenuItem component={Button} onClick={handleOpenModalRestore} sx={{ color: 'text.secondary' }} fullWidth>
                        <ListItemIcon>
                            <ClearOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Restore" style={alignStart} />
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
