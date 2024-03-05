import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, IconButton, Menu, MenuItem, Stack, Table } from '@mui/material';

import Button from '@mui/material/Button';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
// import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

import axios from 'axios';
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    const date = new Date(dateString);

    return date.toLocaleDateString('fr-FR', options);
};

const ContentManagement = () => {
    const API_URL = 'https://api.tafomihaavo.mg/tahiry/v1/';

    const tableData = {
        status: 200,
        nbResult: 5,
        items: [
            {
                id: 1,
                title: 'Video 1',
                contentType: 'Video',
                description: 'Description 1',
                author: 'john X',
                dateHour: '2023-12-20T09:25:43.957Z',
                region: 'Analamanga',
                theme: 'Environement'
            },
            {
                id: 2,
                title: 'Video 2',
                contentType: 'Vidéo',
                description: 'Description 2',
                author: 'john X',
                dateHour: '2023-12-20T09:25:43.957Z',
                region: 'Analamanga',
                theme: 'Environement'
            },
            {
                id: 3,
                title: 'article 1',
                contentType: 'article',
                description: 'Description 3',
                author: 'john X',
                dateHour: '2023-12-20T09:25:43.957Z',
                region: 'Analamanga',
                theme: 'Environement'
            },
            {
                id: 4,
                title: 'Article Pdf',
                contentType: 'PDF',
                description: 'Description 4',
                author: 'john X',
                dateHour: '2023-12-20T09:25:43.957Z',
                region: 'Analamanga',
                theme: 'Environement'
            },
            {
                id: 5,
                title: 'Video 4',
                contentType: 'PDF',
                description: 'Description 5',
                author: 'john X',
                dateHour: '2023-12-20T09:25:43.957Z',
                region: 'Analamanga',
                theme: 'Environement'
            }
        ]
    };

    // const [tableData, setTableData] = useState([]);

    // useEffect(() => {
    //   axios.get(API_URL+`contents/national`).then(response => {
    //     setTableData(response.data.items.contents); console.log("okey azo");
    //     console.log(response.data.items.contents);
    //   }).catch(error => {console.error("tsy mandeha"); console.error(error)});
    // },[]);

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
                            NOUVEAU ARTICLE
                        </Button>
                    </Link>
                    <Link to="/backinterface/gestion-contenu/newImageForm">
                        <Button variant="contained" endIcon={<AddPhotoAlternateOutlinedIcon />}>
                            NOUVELLE IMAGE
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
                                <TableCell>Title</TableCell>
                                <TableCell>Région</TableCell>
                                <TableCell>Thématique</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Auteur</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.items.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.region}</TableCell>
                                    <TableCell>{row.theme}</TableCell>
                                    <TableCell>{row.contentType}</TableCell>
                                    <TableCell>{formatDate(row.dateHour)}</TableCell>
                                    <TableCell>{row.author}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="more" aria-controls="menu" aria-haspopup="true" onClick={handleMenuClick}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu id="menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                            <MenuItem onClick={() => handleActionClick('delete')}>
                                                <DeleteIcon />
                                                Delete
                                            </MenuItem>
                                            <MenuItem onClick={() => handleActionClick('edit')}>
                                                <EditIcon />
                                                Edit
                                            </MenuItem>
                                            <MenuItem onClick={() => handleActionClick('info')}>
                                                <InfoIcon />
                                                Info
                                            </MenuItem>
                                        </Menu>
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

export default ContentManagement;
