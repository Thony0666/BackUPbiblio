/* eslint-disable prettier/prettier */
// http://localhost:3000/gestionsite/validation

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Box, Button, CircularProgress, Pagination, Stack, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Chip from 'ui-component/extended/Chip';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { siteUrlApi } from 'utils/base_url_api';
import BoutonAction from 'composants/thony/component/BoutonAction';
import { getUser } from 'utils/user';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
};

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
    }
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
    bgcolor: 'background.paper'
};
const Validation = () => {
    const [load, setLoad] = useState(true);
    const [regions, setRegions] = useState([]);
    const [theme, setTheme] = useState([]);
    const [datas, setMyData] = useState([]);
    const [selectedRegionID, setSelectedRegionID] = useState(null);

    // useEffect(() => {
    //     axios
    //         .get(siteUrlApi('contents-back/invalid'))
    //         .then((response) => {
    //             setMyData(response.data.items);

    //             console.log('okey azo region');
    //         })
    //         .catch((error) => {
    //             console.error('tsy mandeha');
    //             console.error(error);
    //         });
    // }, []);
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
                setMyData(response.data.items);
                setLoad(false);
                console.log('okey azo');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get(siteUrlApi('regions'))
            .then((response) => {
                setRegions(response.data.items);
                setSelectedRegionID(response.data.items[0].id);
                setLoad(false);
                console.log('okey azo region');
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get(siteUrlApi('themes'))
            .then((response) => {
                setTheme(response.data.items);
                // setSelectedRegionID(response.data.items[0].id);

                console.log('okey azo region');
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, []);
    const [searchCriteria, setSearchCriteria] = useState({
        title: '',
        region: selectedRegionID,
        theme: '',
        type: types[0].idType,
        status: statuses[0].idStatu,
        dateMin: '',
        dateMax: ''
    });

    const handleSearchCriteriaChange = (field, value) => {
        setSearchCriteria((prevState) => ({
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
    if (load) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    } else {
        return (
            <>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h1" my={3}>
                        Les contenus à valider
                    </Typography>
                    
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { width: '40ch' }
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
                                label="Région"
                                SelectProps={{
                                    native: true
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                color="secondary"
                                onChange={(e) => handleSearchCriteriaChange('region', e.target.value)}
                            >
                                {regions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Thématique"
                                SelectProps={{
                                    native: true
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                color="secondary"
                                onChange={(e) => handleSearchCriteriaChange('theme', e.target.value)}
                            >
                                {theme.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Type"
                                SelectProps={{
                                    native: true
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
                                    native: true
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
                                color={showErrorAlert ? 'error' : 'secondary'}
                                helperText={showErrorAlert ? 'Date min est sup date max' : ''}
                                error={showErrorAlert}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={(e) => handleSearchCriteriaChange('dateMin', e.target.value)}
                            />
                            <TextField
                                id="dateMax"
                                label="Date Max"
                                type="date"
                                color={showErrorAlert ? 'error' : 'secondary'}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={(e) => handleSearchCriteriaChange('dateMax', e.target.value)}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSearch}
                                endIcon={<SearchIcon />}
                                color="secondary"
                                sx={{ width: '39ch', minWidth: 0, maxHeight: '6.3ch' }}
                            >
                                Recherche
                            </Button>
                        </Stack>
                    </Box>

                    <Paper sx={{ width: '100%', overflow: 'hidden', margin: 'auto' }}>
                        <TableContainer sx={{ maxHeight: '58vh' }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow sx={{ ...style }}>
                                        <TableCell>Titre</TableCell>
                                        <TableCell>Région</TableCell>
                                        <TableCell>Thématique</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="center">Date</TableCell>
                                        <TableCell align="center">Statut</TableCell>
                                        <TableCell>Auteur</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {datas &&
                                        datas.map((item) => (
                                            <>
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.title}</TableCell>
                                                    <TableCell>
                                                        {item.regionName !== null
                                                            ? item.regionName
                                                            : item.isInternational === 1
                                                            ? 'International'
                                                            : item.isNational === 1
                                                            ? 'National'
                                                            : ''}
                                                    </TableCell>
                                                    <TableCell>{item.themeName}</TableCell>
                                                    <TableCell>{item.contentTypeName}</TableCell>
                                                    <TableCell align="center">{formatDate(item.createdAt)}</TableCell>
                                                    <TableCell align="center">
                                                        {item.lastValidationInstitutionStatus === '0' && (
                                                            <Chip variant="outlined" label="Invalide" size="small" chipcolor="error" />
                                                        )}
                                                        {item.lastValidationInstitutionStatus === '1' && (
                                                            <Chip variant="outlined" label="prévalide" size="small" chipcolor="warning" />
                                                        )}
                                                        {item.lastValidationInstitutionStatus === null && (
                                                            <Chip variant="outlined" label="valide" size="small" chipcolor="success" />
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{item.author}</TableCell>
                                                    <TableCell>
                                                        <BoutonAction data={item} />
                                                    </TableCell>
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
    }
};
export default Validation;
