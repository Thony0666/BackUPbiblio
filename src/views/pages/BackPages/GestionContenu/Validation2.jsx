/* eslint-disable prettier/prettier */
// http://localhost:3000/gestionsite/validation
import CheckIcon from '@mui/icons-material/Check';
import { Close, Delete, Done, Edit, MoreVert, Visibility } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import {
    Alert,
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
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ValidationStatus from 'composants/common/ValidationStatus';
import { useEffect, useRef, useState } from 'react';
import { useAuthTemp } from 'utils/auth';
import { siteUrlApi } from 'utils/base_url_api';
import { getUser } from 'utils/user';
import Waiter from 'composants/common/Waiter';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
};

// const types = [
//     {
//         idType: 1,
//         label: 'Tous'
//     },
//     {
//         idType: 2,
//         label: 'Audio'
//     },
//     {
//         idType: 3,
//         label: 'PDF'
//     },
//     {
//         idType: 4,
//         label: 'Vidéo'
//     },
//     {
//         idType: 5,
//         label: 'Article'
//     }
// ];

// const statuses = [
//     {
//         idStatu: 1,
//         label: 'Tous'
//     },
//     {
//         idStatu: 2,
//         label: 'Invalide'
//     },
//     {
//         idStatu: 3,
//         label: 'Prévalide'
//     },
//     {
//         idStatu: 4,
//         label: 'Valide'
//     }
// ];
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
const Validation = () => {
    const auth = useAuthTemp();
    /*get user*/
    const user = auth.getUserBack();
    const idEnvoyers = user.id;
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
    const [loading, setLoadloading] = useState(false);
    const [regions, setRegions] = useState([]);
    const [theme, setTheme] = useState([]);
    const [types, setTypes] = useState([]);
    const [datas, setMyData] = useState([]);
    const [tous, setTous] = useState(null);
    const [selectedRegionID, setSelectedRegionID] = useState(null);
    const [refresh, setRefresh] = useState(false);

    /**Handle modale */

    const [temp, setTemp] = useState({});
    const [openModalConfirmation, setModalConfirmation] = useState(false);
    const [openModalSignaler, setModalSignaler] = useState(false);
    const [openModalValidation, setModalValidation] = useState(false);
    const [openModalDevalidation, setModalDevalidation] = useState(false);
    const [initialPage, setInitialePage] = useState(1);
    const [pages, setPages] = useState([]);
    const [remark, setRemark] = useState('');
    const changePage = (event, value) => {
        setInitialePage(value);
        setLoadloading(true);
        // setLoading(true);
        // console.log('value page: ', value);
    };
    const handleChangeRemark = (event) => {
        setRemark(event.target.value);
    };

    const handleCloseConfirmation = () => {
        setModalConfirmation(false);
    };
    const handleCloseSignale = () => {
        setModalSignaler(false);
    };

    const handleCloseValidation = () => {
        setModalValidation(false);
    };

    const handleCloseDevalidation = () => {
        setModalDevalidation(false);
    };

    const handleOpenDelete = (data) => {
        setTemp(data);
        setModalConfirmation(true);
    };
    const handleOpenSignal = (data) => {
        setTemp(data);
        setModalSignaler(true);
    };

    const handleOpenValidation = (data) => {
        setTemp(data);
        setModalValidation(true);
    };
    const handleOpenDevalidition = (data) => {
        setTemp(data);
        setModalDevalidation(true);
    };

    /*handle validation*/
    const customConfig = {
        headers: {
            'Content-Type': 'application/json'
            // 'id-user-back': user.id
        }
    };
    const onClickValidation = () => {
        console.log('idContent', temp.id);
        setLoad(true);

        axios
            .post(siteUrlApi('validation-history/valid'), JSON.stringify({ idContent: temp.id, idUserBack: user.id }), customConfig)
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
    const idCont = temp.id;
    const idRecepteru = temp.idUserBack;
    const handleSendRemark = () => {
        const postData = {
            idContent: idCont,
            idUserBackReporter: idEnvoyers,
            idUserBackReported: idRecepteru,
            remark: remark
        };
        console.log(JSON.stringify({ postData }));

        axios
            .post(siteUrlApi('users-back/pokes'), postData)
            .then((response) => {
                console.log('Réponse du serveur:', response.data);
                setRemark('');
                handleCloseSignale();
                setLoadloading(true);
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Votre signalement a bien été envoyé
                </Alert>;
            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi des données:", error);
                <Alert variant="outlined" severity="error">
                    Veuillez réessayer
                </Alert>;
                setLoadloading(true);
            });
    };
    const handelEnvoyer = () => {
        handleSendRemark();
        setLoadloading(false);
        setModalSignaler(false);
    };
    const onClickDevalidation = () => {
        console.log('idContent', temp.id);
        setLoad(true);

        axios
            .post(siteUrlApi('validation-history/invalid'), JSON.stringify({ idContent: temp.id, idUserBack: user.id }), customConfig)
            .then((response) => {
                setRefresh(true);
                handleCloseDevalidation();
            })
            .catch((error) => {
                console.error(error);
                setLoad(false);
                handleCloseDevalidation();
            });
        console.log('devalidation');
    };

    const idUser = getUser();
    console.log(idUser);
    /*get data invalid*/
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
        // title: searchCriteria.title,
        // region: searchCriteria.name,
        // theme: searchCriteria.theme,
        // type: searchCriteria.type,
        // status: searchCriteria.status,
        // dateMin: searchCriteria.dateMin,
        // dateMax: searchCriteria.dateMax
        field: searchCriteria.field,
        orderDirection: searchCriteria.orderDirection,
        keyword: searchCriteria.keyword,
        idTheme: searchCriteria.idTheme,
        idContentType: searchCriteria.idContentType,
        idRegion: searchCriteria.idRegion,
        dateMin: searchCriteria.dateMin,
        dateMax: searchCriteria.dateMax
    });
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: siteUrlApi(`contents-back/invalid`),
            headers: {
                'id-user-back': idEnvoyers
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
                setPages(response.data.items.pagination);
                // setLoad(false);
                setLoadloading(false);
                // setRefresh(false);
                console.log('okey azo');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                setLoadloading(false);
                console.error(error);
            });
    }, [refresh, initialPage, params]);
    /*get data pour recherche*/
    useEffect(() => {
        axios
            .get(siteUrlApi('regions'))
            .then((response) => {
                setRegions(response.data.items);
                // setSelectedRegionID(response.data.items[0].id);
                setLoad(false);
                console.log('okey azo region');
                console.log(response.data.items);
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

    const handleSearchCriteriaChange = (field, value) => {
        setSearchCriteria((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };
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
        // setLoading(true);
    };
    /*handle error*/

    const [showErrorAlert, setShowErrorAlert] = useState(false);

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
                {/* modal signaler */}
                <Dialog
                    open={openModalSignaler}
                    onClose={handleCloseSignale}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <Typography variant="h2">Message de remarque</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            multiline
                            rows={3}
                            style={{
                                marginTop: 5
                            }}
                            label="Message"
                            variant="outlined"
                            value={remark}
                            onChange={handleChangeRemark}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSignale} autoFocus style={{ color: 'grey' }}>
                            ANNULER
                        </Button>
                        <Button onClick={handelEnvoyer} color="success">
                            ENVOYER
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* final modal Signale  */}
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
                                Confirmation de validation
                            </Typography>
                        }
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Voulez-vous valider ce contenu: {temp.title} ?</DialogContentText>
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

                {/* modal debut validation*/}
                <Dialog
                    open={openModalDevalidation}
                    onClose={handleCloseDevalidation}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <Typography variant="h2" color={myTheme.palette.error.main}>
                            Confirmation de dévalidation
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Voulez-vous dévalider ce contenu: {temp.title} ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClickDevalidation} color="error">
                            DEVALIDER
                        </Button>
                        <Button onClick={handleCloseDevalidation} autoFocus color={'primary'}>
                            ANNULER
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* modal fin validation*/}

                <Box sx={{ width: '100%' }}>
                    <Typography variant="h1" my={3}>
                        Les contenus à valider {`(${user.roleName})`}
                    </Typography>
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
                                    labelId="theme-label"
                                    id="theme"
                                    name="theme"
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
                                    name="region"
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
                                    name="theme"
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
                                    labelId="theme-label"
                                    id="theme"
                                    name="theme"
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
                                multiline
                                maxRows={4}
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
                                                    <TableCell>
                                                        {item.title.length > 10 ? `${item.title.substring(0, 20)}...` : item.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.regionName !== null
                                                            ? item.regionName
                                                            : item.isInternational === 1
                                                            ? 'International'
                                                            : item.isNational === 1
                                                            ? 'National'
                                                            : ''}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.themeName.length > 10
                                                            ? `${item.themeName.substring(0, 20)}...`
                                                            : item.themeName}
                                                    </TableCell>
                                                    <TableCell>{item.contentTypeName}</TableCell>
                                                    <TableCell align="center">{formatDate(item.createdAt)}</TableCell>
                                                    <TableCell align="center">
                                                        {/* {item.lastValidationInstitutionStatus === '0' && (
                                                            <Chip variant="outlined" label="Invalide" size="small" chipcolor="error" />
                                                        )}
                                                        {item.lastValidationInstitutionStatus === '1' && (
                                                            <Chip variant="outlined" label="prévalide" size="small" chipcolor="warning" />
                                                        )}
                                                        {item.lastValidationInstitutionStatus === null && (
                                                            <Chip variant="outlined" label="valide" size="small" chipcolor="success" />
                                                        )} */}
                                                        <ValidationStatus
                                                            institution={item.lastValidationInstitutionStatus}
                                                            technique={item.lastValidationTechniqueStatus}
                                                        />
                                                        {/* <ValidationStatus institution={'1'} technique={'1'} /> */}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.author.length > 10 ? `${item.author.substring(0, 20)}...` : item.author}
                                                    </TableCell>
                                                    <TableCell>
                                                        <MenuProfile
                                                            data={item}
                                                            openDelete={() => handleOpenDelete(item)}
                                                            openSignal={() => handleOpenSignal(item)}
                                                            openValidation={() => handleOpenValidation(item)}
                                                            openDevalidation={() => handleOpenDevalidition(item)}
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
export default Validation;

const MenuProfile = (props) => {
    const reference = useRef(null);
    const [isOpenPop, setIsOpenPop] = useState(false);
    const alignStart = { display: 'flex', justifyContent: 'flex-start' };
    const [validationState, setValidationState] = useState(null);
    /**get validation ou devaliation bouton
     * retour 0 -> bouton valider
     * retour 1 -> bouton devalider
     */
    function getBoutouEtat(roleCompte, institutionEtat, techniqueEtat) {
        if (roleCompte === 15 || roleCompte === 25) {
            console.log('tech');
            if (techniqueEtat === '1') {
                console.log('1 valiny');

                return 1;
            }
            if (techniqueEtat === '0') {
                console.log('0 valiny');

                return 0;
            }
        }
        if (roleCompte === 20 || roleCompte === 30) {
            console.log('institition');

            if (institutionEtat === '1') {
                console.log('1 valiny');
                return 1;
            }
            if (institutionEtat === '0') {
                console.log('0 valiny');

                return 0;
            }
        }
    }

    useEffect(() => {
        console.log('props', props);
        let tempVa = getBoutouEtat(props.userRole, props.data.lastValidationInstitutionStatus, props.data.lastValidationTechniqueStatus);
        // const tempVa = getBoutouEtat(30, '1', '1');
        // console.log('tempVa', tempVa);
        setValidationState(tempVa);
    }, []);

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
                {validationState === 0 ? (
                    <MenuItem key="valider" onClick={props.openValidation} component={Button} fullWidth sx={{ color: 'text.secondary' }}>
                        <ListItemIcon>
                            <Done />
                        </ListItemIcon>
                        <ListItemText primary="Valider" style={alignStart} />
                    </MenuItem>
                ) : (
                    <MenuItem
                        key="devalider"
                        onClick={props.openDevalidation}
                        component={Button}
                        fullWidth
                        sx={{ color: 'text.secondary' }}
                    >
                        <ListItemIcon>
                            <Close />
                        </ListItemIcon>
                        <ListItemText primary="Dévalider" style={alignStart} />
                    </MenuItem>
                )}
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
                <MenuItem key="notif" component={Button} onClick={props.openSignal} sx={{ color: 'text.secondary' }} fullWidth>
                    <ListItemIcon>
                        <AssignmentLateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Signaler" style={alignStart} />
                </MenuItem>
            </Menu>
        </>
    );
};
