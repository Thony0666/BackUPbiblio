import {
    Box,
    Button,
    Grid,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import axios from 'axios';
import Waiter from 'composants/common/Waiter';
import VoirContact from 'composants/thony/component/notif-pop-up/VoirContact';
import React, { useEffect, useState } from 'react';
import { useAuthTemp } from 'utils/auth';
import { siteUrlApi } from 'utils/base_url_api';

const types = [
    { id: 1, label: 'Plus recent', name: 'desc' },
    {
        id: 2,
        label: 'Plus ancienne',
        name: 'asc'
    }
];
function Contact() {
    const auth = useAuthTemp();
    const userBack = auth.getUserBack();
    const idUser = userBack.id;
    const [datas, setMyData] = useState([]);
    const [initialPage, setInitialePage] = useState(1);
    const [pages, setPages] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [searchCriteria, setSearchCriteria] = useState({
        field: 'created_at',
        name: null,
        orderDirection: types[0].name,
        dateMin: null,
        dateMax: null
    });

    const handleSearchCriteriaChange = (field, value) => {
        setSearchCriteria((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };
    const [params, setParams] = useState({
        field: searchCriteria.field,
        name: searchCriteria.name,
        orderDirection: searchCriteria.orderDirection,
        dateMin: searchCriteria.dateMin,
        dateMax: searchCriteria.dateMax
    });
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: siteUrlApi(`contact-us`),
            headers: {
                'id-user-back': idUser
            },
            params: {
                page: initialPage,
                nbItem: 10,
                ...params
            }
        };
        axios
            .request(config)
            .then((response) => {
                setMyData(response.data.items.result);
                setPages(response.data.items.pagination);
                setLoading(false);
                console.log('okey azo');
                console.log(response.data.items.result);
            })
            .catch((error) => {
                setLoading(false);
                console.error('tsy mandeha');
                console.error(error);
            });
    }, [initialPage, idUser, params]);
    const changePage = (event, value) => {
        setInitialePage(value);
        setLoading(true);
        // console.log('value page: ', value);
    };
    const formatDate = (inputDate) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            // month: 'long',
            day: '2-digit'
        };

        const formattedDate = new Date(inputDate).toLocaleDateString('fr-FR', options);
        return formattedDate;
    };
    const handleSearch = () => {
        setParams({
            field: searchCriteria.field,
            name: searchCriteria.name,
            orderDirection: searchCriteria.orderDirection,
            dateMin: searchCriteria.dateMin,
            dateMax: searchCriteria.dateMax
        });
        setLoading(true);
        setInitialePage(1);
    };

    return (
        <>
            <Waiter loadingState={isLoading} />
            <Grid container>
                <Grid
                    container
                    direction={'column'}
                    // border={'red solid 3px'}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { width: '100%' }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Stack direction="row" spacing={2} mb={3}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Field"
                            multiline
                            // maxRows={4}
                            color="secondary"
                            // defaultValue={'created_at'}
                            onChange={(e) => handleSearchCriteriaChange('field', e.target.value)}
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Nom ou Prénom"
                            multiline
                            // maxRows={4}
                            color="secondary"
                            // defaultValue={'created_at'}
                            onChange={(e) => handleSearchCriteriaChange('name', e.target.value)}
                        />
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Filtre"
                            SelectProps={{
                                native: true
                            }}
                            color="secondary"
                            onChange={(e) => handleSearchCriteriaChange('orderDirection', e.target.value)}
                        >
                            {types.map((option) => (
                                <option key={option.idType} value={option.name}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </Stack>
                    <Stack direction="row" spacing={2} mb={3}>
                        <TextField
                            id="dateMin"
                            label="Date Min"
                            type="date"
                            // color={showErrorAlert ? 'error' : 'secondary'}
                            // helperText={showErrorAlert ? 'Date min est sup date max' : ''}
                            // error={showErrorAlert}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={(e) => handleSearchCriteriaChange('dateMin', e.target.value)}
                        />
                        <TextField
                            id="dateMax"
                            label="Date Max"
                            type="date"
                            // color={showErrorAlert ? 'error' : 'secondary'}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={(e) => handleSearchCriteriaChange('dateMax', e.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSearch}
                            // endIcon={<SearchIcon />}
                            color="secondary"
                            sx={{ width: '39ch', minWidth: 0, maxHeight: '6.3ch' }}
                        >
                            Recherche
                        </Button>
                    </Stack>
                </Grid>
                <Grid container>
                    <Typography variant="h3" color={'black'}>
                        Résultats de recherche {pages.totalResults}
                    </Typography>
                    <Paper sx={{ width: '100%', overflow: 'hidden', margin: 'auto' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Noms et prénoms</TableCell>
                                        <TableCell>Mail</TableCell>
                                        <TableCell>Object</TableCell>
                                        <TableCell>Message</TableCell>
                                        <TableCell align="center">Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {datas &&
                                        datas.map((item) => (
                                            <>
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        {item.lastName}{' '}
                                                        {item.firstName.length > 10
                                                            ? `${item.firstName.substring(0, 20)}...`
                                                            : item.firstName}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.email.length > 10 ? `${item.email.substring(0, 20)}...` : item.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.object.length > 10 ? `${item.object.substring(0, 20)}...` : item.object}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.message.length > 10 ? `${item.message.substring(0, 20)}...` : item.message}
                                                    </TableCell>
                                                    <TableCell align="center">{formatDate(item.createdAt)}</TableCell>
                                                    <TableCell>
                                                        <VoirContact data={item} />
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container justifyContent={'center'}>
                            <Pagination count={pages.numberOfPages} page={initialPage} onChange={changePage} color="secondary" />
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default Contact;
