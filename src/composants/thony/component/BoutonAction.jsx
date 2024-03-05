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
export default function BoutonAction(props) {
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
    pb: 3,
  };

  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
  };
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const [openModalValidation, setOpenModalValidation] = React.useState(false);
  const handleOpenModalValidation = () => {
    setOpenModalValidation(true);
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
    display: 'flex', justifyContent: 'flex-start'
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
          <h2 id="parent-modal-title" >Attention <ReportProblemOutlinedIcon /></h2>

          {props.data.lastValidationInstitutionStatus === '0' && <p id="parent-modal-description" style={{ fontSize: '17px',textAlign: 'center'}}>
            Vous êtes sur pour <span style={{ fontWeight:900 ,color:'green'}}>Valider</span> <br /><p style={{fontWeight:900 }}>{props.data.title}</p></p>}
          {props.data.lastValidationInstitutionStatus === '2' && <p id="parent-modal-description" style={{ fontSize: '17px',textAlign: 'center'}}>
            Vous êtes sur pour <span style={{ fontWeight:900 ,color:'red'}}>Invalider</span> <br /><p style={{fontWeight:900 }}>{props.data.title}</p></p>}
          {props.data.lastValidationInstitutionStatus === null && <p id="parent-modal-description" style={{ fontSize: '17px',textAlign: 'center'}}>
            Vous êtes sur pour <span style={{ fontWeight:900 ,color:'red'}}>Invalider</span> <br /><p style={{fontWeight:900 }}>{props.data.title}</p></p>}
          <Stack spacing={3} direction={"row"} justifyContent={"flex-end"}>
            <Button variant="contained" color="secondary">
              Annuler
            </Button>
            {props.data.lastValidationInstitutionStatus === '0' && <Button variant="contained" color='success'>Valider </Button>}
          {props.data.lastValidationInstitutionStatus === '2' && <Button variant="contained" color='error'>Invalider </Button>}
          {props.data.lastValidationInstitutionStatus === null && <Button variant="contained" color='error'>Invalider </Button>}
            {/* </Box> */}
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
          <h2 id="parent-modal-title">Attention <ReportProblemOutlinedIcon /></h2>
          <p id="parent-modal-description">
            Vous êtes sur pour efffacer {props.data.title}
          </p>
          <Stack spacing={3} direction={"row"} justifyContent={"flex-end"}>
            {/* <Box spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', p: 1 }}> */}
            <Button variant="contained" color="secondary">
              Annule
            </Button>
            <Button variant="contained" color='error'>
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
          color='secondary'
        >
          <MoreVertIcon />
        </Button>
        <Menu
          idMenu="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>

          <MenuItem component={Button} onClick={handleClose} fullWidth sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <RemoveRedEyeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Voir" style={alignStart} />
          </MenuItem>
          <MenuItem component={Button} onClick={handleClose} sx={{ color: 'text.secondary' }} fullWidth>
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Modifier" style={alignStart} />
          </MenuItem>

          <>
            {props.data.lastValidationInstitutionStatus === '0' && <MenuItem component={Button} onClick={handleOpenModalValidation} fullWidth sx={{ color: 'text.secondary' }}>
              <ListItemIcon>
                <DoneOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Valider" style={alignStart} />
            </MenuItem>}
            {props.data.lastValidationInstitutionStatus === '2' && <MenuItem component={Button} onClick={handleOpenModalValidation} fullWidth sx={{ color: 'text.secondary' }}>
              <ListItemIcon>
                <ClearOutlinedIcon  />
              </ListItemIcon >
              <ListItemText primary="Invalider" style={alignStart} />
            </MenuItem>}
            {props.data.lastValidationInstitutionStatus === null && <MenuItem component={Button} onClick={handleOpenModalValidation} fullWidth sx={{ color: 'text.secondary' }}>
              <ListItemIcon>
                <ClearOutlinedIcon  />
              </ListItemIcon>
              <ListItemText primary="Invalider" style={alignStart} />
            </MenuItem>}
          </>
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
