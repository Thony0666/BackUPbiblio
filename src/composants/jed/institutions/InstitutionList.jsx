/* eslint-disable prettier/prettier */
import React, {useEffect,useState,useRef} from 'react';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack,Button, Table, Chip } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import { useTheme } from '@mui/material/styles';
import { Delete, Edit, MoreVert, ToggleOff, ToggleOn, Visibility } from '@mui/icons-material';

import axios from 'axios';
import { Link } from 'react-router-dom';

const MenuProfile = (props) => {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const alignStart = { display: 'flex', justifyContent: 'flex-start' };
  
    const clickDetail = () => {
      props.handleOpenDetail();
      setIsOpen(false);
    };
  
    const clickEdit = () => {
      props.handleOpenEdit();
      setIsOpen(false);
    };
  
    const clickDisable = () => {
      props.handleOpenDisable();
      setIsOpen(false);
    };
  
    const clickEnable = () => {
      props.handleOpenEnable();
      setIsOpen(false);
    };
    const clickDelete = () => {
      props.handleOpenDelete();
      setIsOpen(false);
    };
  
    return (
      <>
        <IconButton ref={ref} onClick={() => setIsOpen(true)}>
          <MoreVert />
        </IconButton>
  
        <Menu
          open={isOpen}
          anchorEl={ref.current}
          onClose={() => setIsOpen(false)}
          PaperProps={{
            sx: { width: 200, maxWidth: '100%' },
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          
          <MenuItem component={Button} sx={{ color: 'text.secondary' }} fullWidth>
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Modifier" style={alignStart} />
          </MenuItem>
          <MenuItem component={Button} sx={{ color: 'text.secondary' }} fullWidth>
            <ListItemIcon>
              <DeleteOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Supprimer" style={alignStart} />
          </MenuItem>
          {props.data.status > 0 ? (
            <MenuItem component={Button} sx={{ color: 'text.secondary' }} fullWidth>
              <ListItemIcon>
                <DangerousOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Suspendre" style={alignStart} />
            </MenuItem>
          ) : (
            <MenuItem component={Button} sx={{ color: 'text.secondary' }} fullWidth>
              <ListItemIcon>
                <ToggleOn />
              </ListItemIcon>
              <ListItemText primary="Activer" style={alignStart} />
            </MenuItem>
          )}
          {new Date(props.data.expAbonnement) < new Date() ? (
            <MenuItem component={Button} sx={{ color: 'text.secondary' }} fullWidth>
              <ListItemIcon>
                <RefreshOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Réabonner" style={alignStart} />
            </MenuItem>
          ) : (
            <MenuItem component={Button} sx={{ color: 'text.secondary' }} fullWidth>
              <ListItemIcon>
                <DoneOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Abonné" style={alignStart} />
            </MenuItem>
          )}
        </Menu>
      </>
    );
  };

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    
    
  const date = new Date(dateString);
    
   
  return date.toLocaleDateString('fr-FR', options);
  };

const ListInstitution = () => {
  const theme = useTheme();
  const API_URL = "https://api.tafomihaavo.mg/tahiry/v1/";

//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     axios.get(API_URL+`contents/national`).then(response => {
//       setTableData(response.data.items.contents); console.log("okey azo");
//       console.log(response.data.items.contents);
//     }).catch(error => {console.error("tsy mandeha"); console.error(error)});
//   },[]);

const tableData = {
    status : 200,
    nbResult: 5,
    items:[
    
    {
        id:1,
        type: "VOI", 
        nom: "Tamboho Be Madagasikara",
        sigle: "TBM",
        status:1,
        expAbonnement: "2024-01-12T09:25:43.957Z",
    },
    {
        id:2,
        type: "VOI", 
        nom: "Mpamokatra Atsimo Antsinanana",
        sigle: "MAA",
        status:0,
        expAbonnement: "2024-01-20T09:25:43.957Z",
    },
    {
        id:3,
        type: "Association", 
        nom: "Fikambanan'ny ***",
        sigle: "FNM",
        status:0,
        expAbonnement: "2024-01-14T09:25:43.957Z",
    },
    {
        id:4,
        type: "Cooperative", 
        nom: "Soatrans",
        sigle: "STR",
        status:1,
        expAbonnement: "2024-01-20T09:25:43.957Z",
    },
    {
        id:5,
        type: "Fokonolona", 
        nom: "Fokonolona Boeny",
        sigle: "FB",
        status:1,
        expAbonnement: "2024-01-20T09:25:43.957Z",
    },
    
]};




  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action) => {
    // Handle the action (e.g., delete, edit, info)
    console.log(`Performing ${action} action`);
    handleMenuClose();
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
    <h1>Liste des institutions de base</h1>

    <Paper sx={{ width: '100%',marginTop:'5' ,overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>TYPE</TableCell>
              <TableCell>NOM {'(SIGLE)'}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>EXP ABONNEMENT</TableCell> 
              <TableCell style={{ textAlign: 'center' }}>STATUT</TableCell> 
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {tableData.items.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.nom} ({row.sigle})</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{formatDate(row.expAbonnement)}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {row.status === 1 ? (
                    <Chip label="Actif" size="small" 
                    sx={{
                        background:
                            theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.main,
                        color: theme.palette.primary.contrastText
                    }} />
                )
                   : (
                    <Chip label="Suspendu" size="small"
                    sx={{
                        background:
                            theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.error.main,
                        color: theme.palette.primary.contrastText
                    }} />
                )}
              </TableCell>
              <TableCell>
              < MenuProfile
                    data={row}
                />
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Box>
  );
};

export default ListInstitution;