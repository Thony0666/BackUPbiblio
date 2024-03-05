/* eslint-disable prettier/prettier */
// http://localhost:3000/gestionsite/validation

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Box, Button, Pagination, Stack, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import BoutonAction from './BoutonAction';
import Chip from 'ui-component/extended/Chip';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
};

const rows = {
    status: 200,
    nbResult: 10,
    items: [
        {
            idCon: 1,
            title: "Sample Title 1",
            author: "Jean Pierre",
            region: "Alaotra-Mangoro",
            theme: "Environnement",
            contentType: "Vidéo",
            statu: 3,
            description: "Description 1",
            dateHour: "2023-12-10T09:25:43.957Z"
        },
        {
            idCon: 2,
            title: "Sample Title 2",
            author: "Pierrot Rakoto",
            region: "Amoron’i Mania",
            theme: "Social & économique",
            contentType: "Audio",
            statu: 1,
            description: "Description 2",
            dateHour: "2023-12-05T09:25:43.957Z"
        },
        {
            idCon: 3,
            title: "Sample Title 3",
            author: "Rakoto Rabe",
            region: "Analamanga",
            theme: "Dina et Loi",
            contentType: "Article",
            statu: 2,
            description: "Description 3",
            dateHour: "2023-12-20T09:25:43.957Z"
        },
        {
            idCon: 4,
            title: "Sample Title 4",
            author: "Jean Pierre",
            region: "Analanjirofo",
            theme: "Gouvernance et Gestion",
            contentType: "PDF",
            statu: 3,
            description: "Description 4",
            dateHour: "2023-12-20T09:25:43.957Z"
        },
        {
            idCon: 5,
            title: "Sample Title 5",
            author: "Paul Africa",
            region: "Androy",
            theme: "Culture, Réseau et Communication",
            contentType: "eBook",
            statu: 1,
            description: "Description 5",
            dateHour: "2023-12-20T09:25:43.957Z"
        },
        {
            idCon: 6,
            title: "Sample Title 6",
            author: "George Bush",
            region: "Anosy",
            theme: "Genre et Inclusivité",
            contentType: "Autres",
            statu: 3,
            description: "Description 6",
            dateHour: "2023-12-20T09:25:43.957Z"
        },
        {
            idCon: 7,
            title: "Sample Title 7",
            author: "Perline Rakoto",
            region: "Atsinanana",
            theme: "Environnement",
            contentType: "Vidéo",
            statu: 3,
            description: "Description 7",
            dateHour: "2023-12-20T09:25:43.957Z"
        },
        {
            idCon: 8,
            title: "Sample Title 8",
            author: "Freddy Mercury",
            region: "Atsimo-Andrefana",
            theme: "Social & économique",
            contentType: "Audio",
            statu: 2,
            description: "Description 8",
            dateHour: "2023-12-20T09:25:43.957Z"
        },
        {
            idCon: 9,
            title: "Sample Title 9",
            author: "Koto Kely",
            region: "Atsimo-Atsinanana",
            theme: "Dina et Loi",
            contentType: "Article",
            statu: 2,
            description: "Description 9",
            dateHour: "2023-12-20T09:25:43.957Z"
        },
        {
            idCon: 10,
            title: "Sample Title 10",
            author: "Koto be",
            region: "Betsiboka",
            theme: "Gouvernance et Gestion",
            contentType: "PDF",
            statu: 1,
            description: "Description 10",
            dateHour: "2023-12-20T09:25:43.957Z"
        }
    ]
};

const regions = [
    {
        idRegion: 1,
        label: 'Tous'
    },
    {
        idRegion: 2,
        label: 'Analamanga'
    },
    {
        idRegion: 3,
        label: 'Itasy'
    },
    {
        idRegion: 4,
        label: 'Sava'
    },
    {
        idRegion: 5,
        label: 'Diana'
    }
];

const themes = [
    {
        idThemes: 1,
        label: 'Tous'
    },
    {
        idThemes: 2,
        label: 'Thème 1'
    },
    {
        idThemes: 3,
        label: 'Thème 2'
    },
    {
        idThemes: 4,
        label: 'Thème 3'
    },
    {
        idThemes: 5,
        label: 'Thème 4'
    }
];


const types = [
    {
        idType: 1,
        label: 'Tous'
    },
    {
        idType: 2,
        label: 'Audio'
    },
    {
        idType: 3,
        label: 'PDF'
    },
    {
        idType: 4,
        label: 'Vidéo'
    },
    {
        idType: 5,
        label: 'Article'
    },
];

const statuses = [
    {
        idStatu: 1,
        label: 'Tous'
    },
    {
        idStatu: 2,
        label: 'Invalide'
    },
    {
        idStatu: 3,
        label: 'Prévalide'
    },
    {
        idStatu: 4,
        label: 'Valide'
    }
];


const style = {
    bgcolor: 'background.paper',
};
const Validation = () => {
    const [searchCriteria, setSearchCriteria] = useState({
        title: '',
        region: regions[0].idRegion,
        theme: themes[0].idThemes,
        type: types[0].idType,
        status: statuses[0].idStatu,
        dateMin: '',
        dateMax: '',
    });

    const handleSearchCriteriaChange = (field, value) => {

        setSearchCriteria(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const handleSearch = () => {
        if (searchCriteria.dateMin && searchCriteria.dateMax && new Date(searchCriteria.dateMin) > new Date(searchCriteria.dateMax)) {
            setShowErrorAlert(true);
            document.getElementById('dateMin').focus();
            return;
        }
        console.log('Critères de recherche:', searchCriteria);
    };
    return (
        < >
            <Box sx={{ width: '90%', margin: 'auto' }}>
                <Typography variant="h1" my={3}>
                    Contenue a valider
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { width: '40ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Stack direction="row" spacing={2} mb={3}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Titre"
                            multiline
                            maxRows={4}
                            color="secondary"
                            onChange={(e) => handleSearchCriteriaChange('title', e.target.value)}
                        />
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Region"
                            SelectProps={{
                                native: true,
                            }}
                            color="secondary"
                            onChange={(e) => handleSearchCriteriaChange('region', e.target.value)}
                        >
                            {regions.map((option) => (
                                <option key={option.idRegion} value={option.idRegion}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Thematique"
                            SelectProps={{
                                native: true,
                            }}
                            color="secondary"
                            onChange={(e) => handleSearchCriteriaChange('theme', e.target.value)}
                        >
                            {themes.map((option) => (
                                <option key={option.idThemes} value={option.idThemes}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Type"
                            SelectProps={{
                                native: true,
                            }}
                            color="secondary"
                            onChange={(e) => handleSearchCriteriaChange('type', e.target.value)}
                        >
                            {types.map((option) => (
                                <option key={option.idType} value={option.idType}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </Stack>
                    <Stack direction="row" spacing={2} mb={3}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Statut"
                            SelectProps={{
                                native: true,
                            }}
                            color="secondary"
                            onChange={(e) => handleSearchCriteriaChange('status', e.target.value)}
                        >
                            {statuses.map((option) => (
                                <option key={option.idStatu} value={option.idStatu}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="dateMin"
                            label="Date Min"
                            type="date"
                            color={showErrorAlert ? "error" : "secondary"}
                            helperText={showErrorAlert ? "Date min est sup date max" : ""}
                            error={showErrorAlert}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => handleSearchCriteriaChange('dateMin', e.target.value)}
                        />
                        <TextField
                            id="dateMax"
                            label="Date Max"
                            type="date"
                            color={showErrorAlert ? "error" : "secondary"}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => handleSearchCriteriaChange('dateMax', e.target.value)}
                        />
                        <Button variant="contained" onClick={handleSearch} endIcon={<SearchIcon />} color='secondary' sx={{ width: '39ch', minWidth: 0 ,maxHeight:'6.3ch'}}>
                            Recherche
                        </Button>
                    </Stack>
                </Box>
                
                <Paper sx={{ width: '100%', overflow: 'hidden', margin: 'auto' }}>
                    <TableContainer sx={{ maxHeight: 800 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow sx={{ ...style }}>
                                    <TableCell>Titre</TableCell>
                                    <TableCell>Region</TableCell>
                                    <TableCell>Thematique</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Statut</TableCell>
                                    <TableCell>Auteur</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.items.map((item) => (
                                    <>
                                        <TableRow key={item.idCon}>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.region}</TableCell>
                                            <TableCell>{item.theme}</TableCell>
                                            <TableCell>{item.contentType}</TableCell>
                                            <TableCell>{formatDate(item.dateHour)}</TableCell>
                                            <TableCell>
                                                {item.statu === 1 && <Chip variant="outlined" label="Invalider" size="small" chipcolor="error" />}
                                                {item.statu === 2 && <Chip variant="outlined" label="Prevalide" size="small" chipcolor="warning" />}
                                                {item.statu === 3 && <Chip variant="outlined" label="Valider" size="small" chipcolor="success" />}
                                            </TableCell>
                                            <TableCell>{item.author}</TableCell>
                                            <TableCell><BoutonAction data={item} /></TableCell>
                                        </TableRow>
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination count={11} color="secondary" />
                </Paper>
            </Box>
        </>
    );
};
export default Validation;
