/* eslint-disable prettier/prettier */
// http://localhost:3000/gestionsite/validation

import { Close, Delete, Done, Edit, MoreVert, Publish, Visibility } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Pagination,
    Select,
    Stack,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import axios from 'axios';
import Waiter from 'composants/common/Waiter';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthTemp } from 'utils/auth';
import { siteUrlApi } from 'utils/base_url_api';
import { getUser } from 'utils/user';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
};
const filter = [
    { id: 1, label: 'Plus recent', value: 'desc' },
    {
        id: 2,
        label: 'Plus ancienne',
        value: 'asc'
    }
];

const style = {
    bgcolor: 'background.paper'
};
const Publication = () => {
    /*get user*/

    const auth = useAuthTemp();
    const user = auth.getUserBack();
    // const user = {
    //     id: 31,
    //     idRegion: 5,
    //     username: 'region 5 tech',
    //     email: 'tech5@gmail.com',
    //     roleLevel: 15,
    //     roleName: 'Régional Technique'
    // };

    // const user = {
    //     id: 4,
    //     idRegion: 5,
    //     username: 'region',
    //     email: 'region5@gmail.com',
    //     roleLevel: 20,
    //     roleName: 'Régional'
    // };

    const myTheme = useTheme();
    const [load, setLoad] = useState(true);
    const [regions, setRegions] = useState([]);
    const [theme, setTheme] = useState([]);
    const [types, setTypes] = useState([]);
    const [datas, setMyData] = useState([]);
    const [loading, setLoadloading] = useState(false);
    const [initialPage, setInitialePage] = useState(1);
    const [pages, setPages] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    /**Handle modale */

    const [temp, setTemp] = useState({});
    const [openModalConfirmation, setModalConfirmation] = useState(false);
    const [openModalValidation, setModalValidation] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({
        field: 'created_at',
        orderDirection: filter[0].value,
        keyword: null,
        idTheme: null,
        idContentType: null,
        idRegion: null,
        dateMin: null,
        dateMax: null
    });
    const [params, setParams] = useState({
        field: searchCriteria.field,
        orderDirection: searchCriteria.orderDirection,
        keyword: searchCriteria.keyword,
        idTheme: searchCriteria.idTheme,
        idContentType: searchCriteria.idContentType,
        idRegion: searchCriteria.idRegion,
        dateMin: searchCriteria.dateMin,
        dateMax: searchCriteria.dateMax
    });

    const handleSearch = () => {
        setParams({
            field: searchCriteria.field,
            orderDirection: searchCriteria.orderDirection,
            keyword: searchCriteria.keyword,
            idTheme: searchCriteria.idTheme,
            idContentType: searchCriteria.idContentType,
            idRegion: searchCriteria.idRegion,
            dateMin: searchCriteria.dateMin,
            dateMax: searchCriteria.dateMax
        });
        setLoadloading(true);
        setInitialePage(1);
    };
    const handleSearchCriteriaChange = (field, value) => {
        setSearchCriteria((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleCloseConfirmation = () => {
        setModalConfirmation(false);
    };

    const handleCloseValidation = () => {
        setModalValidation(false);
    };

    const handleOpenDelete = (data) => {
        setTemp(data);
        setModalConfirmation(true);
    };

    const handleOpenValidation = (data) => {
        setTemp(data);
        setModalValidation(true);
    };

    /*handle validation*/
    const customConfig = {
        headers: {
            'id-user-back': user.id
        }
    };
    const onClickValidation = () => {
        console.log('idContent', temp.id);
        setLoad(true);

        axios
            .put(siteUrlApi('contents-back/post/' + temp.id), null, customConfig)
            .then((response) => {
                setRefresh(true);
                handleCloseValidation();
            })
            .catch((error) => {
                console.error(error);
                setLoad(false);
                handleCloseValidation();
            });
        console.log('validation');
    };

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
    /*get data invalid*/
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: siteUrlApi(`contents-back/valid-but-not-posted`),
            headers: {
                'id-user-back': user.id
            },
            params: {
                nbItem: 10,
                page: initialPage,
                ...params
            }
        };
        axios
            .request(config)
            .then((response) => {
                setMyData(response.data.items.result);
                setLoad(false);
                setPages(response.data.items.pagination);
                // setLoad(false);
                setLoadloading(false);
                setRefresh(false);
                console.log('okey azo');
                console.log(response.data.items.result);
            })
            .catch((error) => {
                setLoadloading(false);
                console.error('tsy mandeha');
                console.error(error);
            });
    }, [refresh, initialPage, params]);
    /*get data pour recherche*/
    useEffect(() => {
        axios
            .get(siteUrlApi('regions'))
            .then((response) => {
                setRegions(response.data.items);
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
    useEffect(() => {
        axios
            .get(siteUrlApi('content-types'))
            .then((response) => {
                setTypes(response.data.items);
                // setSelectedRegionID(response.data.items[0].id);

                console.log('okey azo region');
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, []);
    /*handle recherche*/
    const changePage = (event, value) => {
        setInitialePage(value);
        setLoadloading(true);
        // setLoading(true);
        // console.log('value page: ', value);
    };
    const handleVoir = () => {
        navigate('/backinterface/gestion-site/publication/publier');
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
                {/* modal debut delete*/}
                <Waiter loadingState={loading} />
                <Dialog
                    open={openModalConfirmation}
                    onClose={handleCloseConfirmation}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <Typography variant="h2" color={myTheme.palette.error.main}>
                            Confirmation suppression
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Êtes-vous sur de supprimer {temp.title} ?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirmation} color="error">
                            SUPPRIMER
                        </Button>
                        <Button onClick={handleCloseConfirmation} autoFocus>
                            ANNULER
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* modal fin delete */}

                {/* modal debut validation*/}
                <Dialog
                    open={openModalValidation}
                    onClose={handleCloseValidation}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {' '}
                        {
                            <Typography variant="h2" color={myTheme.palette.secondary.main}>
                                Confirmation de la publication
                            </Typography>
                        }
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Voulez-vous publier ce contenu: {temp.title} ?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseValidation} color="inherit">
                            ANNULER
                        </Button>
                        <Button onClick={onClickValidation} autoFocus color="primary">
                            VALIDER
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* modal fin validation*/}

                <Box sx={{ width: '100%' }}>
                    <Grid
                        container
                        justifyContent={'space-between'}
                        mb={3}
                        boxShadow={10}
                        padding={2}
                        sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            borderRadius: '8px'
                        }}
                    >
                        <Typography variant="h2">{`Les contenus non publier`}</Typography>
                        <Button onClick={handleVoir} variant="outlined" color="primary">
                            Voir les contenus déjà publiés
                        </Button>
                    </Grid>
                    {/* <Button color="secondary">Contenus Publiés</Button> */}
                    {/* recherche avancee debut*/}
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { width: '40ch' }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack direction="row" spacing={2} mb={3}>
                            <FormControl fullWidth variant="outlined" margin="normal">
                                <InputLabel id="theme-label">Filtre</InputLabel>
                                <Select
                                    label="Filtre"
                                    // labelId="theme-label"
                                    // id="theme"
                                    // name="theme"
                                    defaultValue={filter[0].value}
                                    onChange={(e) => handleSearchCriteriaChange('orderDirection', e.target.value)}
                                >
                                    {filter.map((filtre) => (
                                        <MenuItem key={filtre.id} value={filtre.value}>
                                            {filtre.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth variant="outlined" margin="dense">
                                <InputLabel id="region-label">Région</InputLabel>
                                <Select
                                    label="Region"
                                    labelId="region-label"
                                    id="region"
                                    // name="region"
                                    onChange={(e) => handleSearchCriteriaChange('idRegion', e.target.value)}
                                    // value={formik.values.region}
                                >
                                    {regions.map((region) => (
                                        <MenuItem key={region.id} value={region.id}>
                                            {region.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* <TextField
                                id="outlined-select-currency"
                                select
                                label="Région"
                                SelectProps={{
                                    native: true
                                }}
                                color="secondary"
                                onChange={(e) => handleSearchCriteriaChange('region', e.target.value)}
                            >
                                {regions.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField> */}
                            <FormControl fullWidth variant="outlined" margin="normal">
                                <InputLabel id="theme-label">Thématique</InputLabel>
                                <Select
                                    label="Thematique"
                                    labelId="theme-label"
                                    id="theme"
                                    // name="theme"
                                    onChange={(e) => handleSearchCriteriaChange('idTheme', e.target.value)}
                                >
                                    {theme.map((theme) => (
                                        <MenuItem key={theme.id} value={theme.id}>
                                            {theme.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth variant="outlined" margin="normal">
                                <InputLabel id="theme-label">Type</InputLabel>
                                <Select
                                    label="Type"
                                    // labelId="theme-label"
                                    // id="theme"
                                    // name="theme"
                                    onChange={(e) => handleSearchCriteriaChange('idContentType', e.target.value)}
                                >
                                    {types.map((type) => (
                                        <MenuItem key={type.id} value={type.id}>
                                            {type.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" spacing={2} mb={3}>
                            <TextField
                                fullWidth
                                id="outlined-multiline-flexible"
                                label="Titre"
                                color="secondary"
                                onChange={(e) => handleSearchCriteriaChange('keyword', e.target.value)}
                            />
                            {/* <TextField
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

                            </TextField> */}
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
                                endIcon={<SearchIcon />}
                                color="secondary"
                                sx={{ width: '39ch', minWidth: 0, maxHeight: '6.3ch' }}
                            >
                                Recherche
                            </Button>
                        </Stack>
                    </Box>

                    {/* recherche avance fin */}

                    {/* Table debut */}

                    <Paper sx={{ width: '100%', overflow: 'hidden', margin: 'auto' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow sx={{ ...style }}>
                                        <TableCell>Titre</TableCell>
                                        <TableCell>Région</TableCell>
                                        <TableCell>Thématique</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="center">Date</TableCell>
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

                                                    <TableCell>{item.author}</TableCell>
                                                    <TableCell>
                                                        <MenuProfile
                                                            data={item}
                                                            openDelete={() => handleOpenDelete(item)}
                                                            openValidation={() => handleOpenValidation(item)}
                                                            userRole={user.roleLevel}
                                                        />
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
                </Box>
            </>
        );
    }
};
export default Publication;

const MenuProfile = (props) => {
    const reference = useRef(null);
    const [isOpenPop, setIsOpenPop] = useState(false);
    const alignStart = { display: 'flex', justifyContent: 'flex-start' };
    const [validationState, setValidationState] = useState(null);

    return (
        <>
            <IconButton ref={reference} onClick={() => setIsOpenPop(true)}>
                <MoreVert />
            </IconButton>

            <Menu
                open={isOpenPop}
                anchorEl={reference.current}
                onClose={() => setIsOpenPop(false)}
                PaperProps={{
                    sx: { width: 200, maxWidth: '100%', overflow: 'visible' }
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {/* // Wrap children in an array */}
                <MenuItem key="detail" component={Button} fullWidth sx={{ color: 'text.secondary' }}>
                    <ListItemIcon>
                        <Visibility />
                    </ListItemIcon>
                    <ListItemText primary="Détail" style={alignStart} />
                </MenuItem>

                <MenuItem key="valider" onClick={props.openValidation} component={Button} fullWidth sx={{ color: 'text.secondary' }}>
                    <ListItemIcon>
                        <Publish />
                    </ListItemIcon>
                    <ListItemText primary="Publier" style={alignStart} />
                </MenuItem>

                <MenuItem key="edit" component={Button} sx={{ color: 'text.secondary' }} fullWidth>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    <ListItemText primary="Modifier" style={alignStart} />
                </MenuItem>
                <MenuItem key="delete" component={Button} onClick={props.openDelete} sx={{ color: 'text.secondary' }} fullWidth>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    <ListItemText primary="Supprimer" style={alignStart} />
                </MenuItem>
            </Menu>
        </>
    );
};
