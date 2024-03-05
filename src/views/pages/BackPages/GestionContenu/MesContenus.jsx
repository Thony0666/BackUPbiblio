import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { gridSpacing } from 'store/constant';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
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
    TextField
} from '@mui/material';

import { EditOutlined as EditOutlinedIcon, MoreVert, VisibilityOutlined as VisibilityOutlinedIcon } from '@mui/icons-material';

import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
// import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Waiter from 'composants/common/Waiter';
import { siteUrlApi } from 'utils/base_url_api';
import { getUser } from 'utils/user';

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

const MesContenus = () => {
    const [isLoading, setLoading] = useState(true);

    const [tableData, setTableData] = useState([]);
    console.log(siteUrlApi(`contents-back/invalid`));
    const idUser = getUser();
    console.log(idUser);

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: siteUrlApi(`contents-back/invalid`),
            headers: {
                'id-user-back': idUser
            }
        };
        axios
            .request(config)
            .then((response) => {
                setTableData(response.data.items.result);
                setLoading(false);
                console.log('okey azo');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

            <h1>Gestion Des Contenus</h1>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Stack direction="row" marginBottom={'1.5%'} spacing={2}>
                    <Link to="/backinterface/gestion-contenu/newArticleForm">
                        <Button variant="contained" endIcon={<PostAddOutlinedIcon />}>
                            NOUVEL ARTICLE
                        </Button>
                    </Link>

                    <Link to="/backinterface/gestion-contenu/newVideoForm">
                        <Button variant="contained" endIcon={<OndemandVideoOutlinedIcon />}>
                            NOUVELLE VIDEO
                        </Button>
                    </Link>
                    <Link to="/backinterface/gestion-contenu/newAudioForm">
                        <Button variant="contained" endIcon={<GraphicEqOutlinedIcon />}>
                            NOUVELLE AUDIO
                        </Button>
                    </Link>
                    <Link to="/backinterface/gestion-contenu/newPdfForm">
                        <Button variant="contained" endIcon={<PictureAsPdfOutlinedIcon />}>
                            NOUVEAU PDF
                        </Button>
                    </Link>
                    <Button variant="contained" endIcon={<NoteAddOutlinedIcon />}>
                        AJOUTER AUTRE FICHIER
                    </Button>
                </Stack>
            </Box>
            <Paper sx={{ width: '100%', marginTop: '5', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Titre</TableCell>
                                <TableCell>Région</TableCell>
                                <TableCell>Thématique</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Auteur</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>
                                        {row.regionName !== null
                                            ? row.regionName
                                            : row.isInternational === 1
                                            ? 'International'
                                            : row.isNational === 1
                                            ? 'National'
                                            : ''}
                                    </TableCell>
                                    <TableCell>{row.themeName}</TableCell>
                                    <TableCell>{row.contentTypeName}</TableCell>
                                    <TableCell>{formatDate(row.createdAt)}</TableCell>
                                    <TableCell>{row.author}</TableCell>
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

            <Dialog open={isModalOpen} onClose={handleModalClose}>
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
            </Dialog>
        </Box>
    );
};

export default MesContenus;
