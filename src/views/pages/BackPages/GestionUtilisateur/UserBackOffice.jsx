import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { gridSpacing } from 'store/constant';

import {
    Box,
    Button,
    Chip,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Popper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    useTheme
} from '@mui/material';

import { EditOutlined as EditOutlinedIcon, MoreVert, VisibilityOutlined as VisibilityOutlinedIcon } from '@mui/icons-material';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Waiter from 'composants/common/Waiter';
import { siteUrlApi } from 'utils/base_url_api';
import { IconUserPlus } from '@tabler/icons-react';
// import { getUser } from 'utils/user';

const MenuProfile = (props) => {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [deletePopperOpen, setDeletePopperOpen] = useState(false);
    const anchorRef = useRef(null);

    const alignStart = { display: 'flex', justifyContent: 'flex-start' };

    const handleDeleteClick = () => {
        setDeletePopperOpen(!deletePopperOpen);
    };

    const handleDeleteConfirm = () => {
        // Perform delete operation here
        console.log('Delete confirmed');
        setDeletePopperOpen(false);
    };

    const handleDeleteCancel = () => {
        setDeletePopperOpen(false);
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
                <MenuItem
                    component={Link}
                    sx={{ color: 'text.secondary' }}
                    fullWidth
                    to={`/backinterface/gestion-contenu/descri/${props.rowId}`}
                >
                    <ListItemIcon>
                        <VisibilityOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Voir" style={alignStart} />
                </MenuItem>
                <MenuItem component={Button} sx={{ color: 'text.secondary' }} fullWidth onClick={props.onModifierClick}>
                    <ListItemIcon>
                        <EditOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Modifier" style={alignStart} />
                </MenuItem>
                <MenuItem component={Button} sx={{ color: 'text.secondary' }} fullWidth onClick={handleDeleteClick}>
                    <ListItemIcon>
                        <DeleteOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Supprimer" style={alignStart} />
                </MenuItem>
            </Menu>
            <Popper open={deletePopperOpen} anchorEl={anchorRef.current} placement="bottom" transition>
                {({ TransitionProps }) => (
                    <Paper>
                        <MenuItem onClick={handleDeleteConfirm}>Confirmer la suppression</MenuItem>
                        <MenuItem onClick={handleDeleteCancel}>Annuler</MenuItem>
                    </Paper>
                )}
            </Popper>
        </>
    );
};
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    const date = new Date(dateString);

    return date.toLocaleDateString('fr-FR', options);
};

const UserBackOffice = () => {
    const [isLoading, setLoading] = useState(true);

    const [tableData, setTableData] = useState([]);
    const theme = useTheme();
    // console.log(siteUrlApi(`contents-back/invalid`));
    // const idUser = getUser();
    // console.log(idUser);

    useEffect(() => {
        console.log('Recherche des utilisateurs...');
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: siteUrlApi(`users-back`),
            headers: {
                // 'id-user-back': idUser
            }
        };
        axios
            .request(config)
            .then((response) => {
                setTableData(response.data.items);
                setLoading(false);
                console.log('okey azo');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                setLoading(false);

                console.error(error);
            });
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // State to manage the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State to store the data of the selected row
    const [selectedRowData, setSelectedRowData] = useState(null);

    const formik = useFormik({
        initialValues: {
            title: selectedRowData?.title || '',
            region: selectedRowData?.region || '',
            theme: selectedRowData?.theme || '',
            contentType: selectedRowData?.contentType || '',
            dateHour: selectedRowData?.dateHour || '',
            author: selectedRowData?.author || ''
        },
        onSubmit: (values) => {
            handleModalSave(values);
        }
    });

    const handleModifierClick = (rowData) => {
        setSelectedRowData(rowData);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        // You can perform any additional cleanup here if needed
    };

    const handleModalSave = () => {
        // Add logic to save the edited data
        console.log('Saving data:', selectedRowData);
        handleModalClose();
    };

    return (
        <Box>
            <Waiter loadingState={isLoading} />

            <h1>Liste des utilisateurs </h1>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}
            >
                <Stack direction="row" marginBottom={'1.5%'} spacing={2} justifyContent="flex-start">
                    <Link to="/backinterface/gestion-utilisateur/newCollectorUser">
                        <Button variant="contained" endIcon={<IconUserPlus />}>
                            NOUVEL UTILISATEUR
                        </Button>
                    </Link>
                </Stack>
            </Box>
            <Paper sx={{ width: '100%', marginTop: '5', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Etat</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.roleName}</TableCell>
                                    <TableCell>{row.email}</TableCell>
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
                                                label="Inactif"
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
                                        <MenuProfile rowId={row.id} onModifierClick={() => handleModifierClick(row)} />
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

            {/* <Dialog open={isModalOpen} onClose={handleModalClose}>
                <DialogTitle>Modifier ce contenu</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={gridSpacing} sx={{ marginTop: 0.5 }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    name="title"
                                    value={selectedRowData?.title}
                                    onChange={(e) => setSelectedRowData((prevData) => ({ ...prevData, title: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Région"
                                    name="region"
                                    value={
                                        selectedRowData?.regionName !== null
                                            ? selectedRowData?.regionName
                                            : selectedRowData?.isInternational === 1
                                            ? 'International'
                                            : selectedRowData?.isNational === 1
                                            ? 'National'
                                            : ''
                                    }
                                    onChange={(e) => setSelectedRowData((prevData) => ({ ...prevData, regionName: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Thématique"
                                    name="theme"
                                    value={selectedRowData?.themeName}
                                    onChange={(e) => setSelectedRowData((prevData) => ({ ...prevData, themeName: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Type"
                                    name="contentType"
                                    value={selectedRowData?.contentTypeName}
                                    onChange={(e) => setSelectedRowData((prevData) => ({ ...prevData, contentTypeName: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Date"
                                    name="dateHour"
                                    value={formatDate(selectedRowData?.createdAt)}
                                    onChange={(e) => setSelectedRowData((prevData) => ({ ...prevData, createdAt: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Auteur"
                                    name="author"
                                    value={selectedRowData?.author}
                                    onChange={(e) => setSelectedRowData((prevData) => ({ ...prevData, author: e.target.value }))}
                                />
                            </Grid>
                        </Grid>

                        <DialogActions>
                            <Button onClick={handleModalClose}>Fermer</Button>
                            <Button type="submit" variant="contained" color="primary">
                                Sauvegarder
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog> */}
        </Box>
    );
};

export default UserBackOffice;
