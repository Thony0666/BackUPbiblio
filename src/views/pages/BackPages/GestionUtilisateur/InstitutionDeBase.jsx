import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Fade from '@mui/material/Fade';

import {
    Box,
    IconButton,
    Dialog,
    ListItemIcon,
    DialogContent,
    DialogTitle,
    ListItemText,
    Menu,
    MenuItem,
    Button,
    Table,
    Chip,
    Grid
} from '@mui/material';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import { useTheme } from '@mui/material/styles';
import { MoreVert, ToggleOn } from '@mui/icons-material';

import axios from 'axios';
import { Link } from 'react-router-dom';
import InstitutionForm from 'composants/jed/institutions/InstitutionForm';
import { siteUrlApi } from 'utils/base_url_api';

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
                    sx: { width: 200, maxWidth: '100%' }
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

const InstitutionDeBase = () => {
    const theme = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const [tableData, setTableData] = useState([]);

    // const idUser = getUser();
    // console.log(idUser);
    const [tableDatas, setTableDatas] = useState([]);
    useEffect(() => {
        console.log('Recherche des institution de bases...');
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: siteUrlApi(`institutions-base`),
            headers: {
                // 'id-user-back': idUser
            }
        };
        axios
            .request(config)
            .then((response) => {
                setTableDatas(response.data.items);
                setLoading(false);
                console.log('log des institutions de bases');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('tsy azo');
                setLoading(false);

                console.error(error);
            });
    }, []);

    console.log(tableDatas);

    const tableData = {
        status: 200,
        nbResult: 5,
        items: [
            {
                id: 1,
                type: 'VOI',
                nom: 'Tamboho Be Madagasikara',
                sigle: 'TBM',
                status: 1,
                expAbonnement: '2024-01-12T09:25:43.957Z'
            },
            {
                id: 2,
                type: 'VOI',
                nom: 'Mpamokatra Atsimo Antsinanana',
                sigle: 'MAA',
                status: 0,
                expAbonnement: '2024-01-20T09:25:43.957Z'
            },
            {
                id: 3,
                type: 'Association',
                nom: "Fikambanan'ny ***",
                sigle: 'FNM',
                status: 0,
                expAbonnement: '2024-01-14T09:25:43.957Z'
            },
            {
                id: 4,
                type: 'Cooperative',
                nom: 'Soatrans',
                sigle: 'STR',
                status: 1,
                expAbonnement: '2024-01-20T09:25:43.957Z'
            },
            {
                id: 5,
                type: 'Fokonolona',
                nom: 'Fokonolona Boeny',
                sigle: 'FB',
                status: 1,
                expAbonnement: '2024-01-20T09:25:43.957Z'
            }
        ]
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
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <h1>Liste des institutions de base</h1>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => setIsModalOpen(true)}>
                        Ajouter
                    </Button>
                </Grid>
            </Grid>
            <Paper sx={{ width: '100%', marginTop: '5', overflow: 'hidden' }}>
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
                            {tableData.items.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>
                                        {row.nom} ({row.sigle})
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>{formatDate(row.expAbonnement)}</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        {row.status === 1 ? (
                                            <Chip
                                                label="Actif"
                                                size="small"
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark.main
                                                            : theme.palette.success.main,
                                                    color: theme.palette.primary.contrastText
                                                }}
                                            />
                                        ) : (
                                            <Chip
                                                label="Suspendu"
                                                size="small"
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.error.main,
                                                    color: theme.palette.primary.contrastText
                                                }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <MenuProfile data={row} />
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

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} TransitionComponent={Fade} transitionDuration={500}>
                {/* <DialogTitle>Inserer une nouvelle institution</DialogTitle> */}
                <DialogContent>
                    <InstitutionForm />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default InstitutionDeBase;
