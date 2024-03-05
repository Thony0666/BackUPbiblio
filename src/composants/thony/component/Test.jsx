import { Delete, Edit, Equalizer, MoreVert, PictureAsPdf, TableRows, Visibility } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AgentLoader from 'src/components/AgentLoader';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { RHFTextFieldDate } from 'src/components/hook-form/RHFTextField';
import { ModalDeleteCitoyen, ModalDetailCitoyen, ModalModificationCitoyen } from 'src/components/population/ModalForPopulation';
import { getCitoyen } from 'src/service/CitoyenService';
import { getFokontany } from 'src/service/FokontanyService';
import { fNumber } from 'src/utils/formatNumber';
import { fDateSql } from 'src/utils/formatTime';
import Page from '../components/Page';

export default function Population() {
    const [isLoading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);

    const navigate = useNavigate();

    /*modal par ligne*/
    const [openDetail, setOpenDetail] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setDelete] = useState(false);

    const [data, setData] = useState({});

    const handleOpenDetail = (data) => {
        setData(data);
        setOpenDetail(true);
    };
    const handleOpenEdit = (data) => {
        setData(data);
        setOpenEdit(true);
    };

    const handleOpenDelete = (data) => {
        setData(data);
        setDelete(true);
    };

    /*pagination*/
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalResult, setTotalResult] = useState(0);
    const changePage = (event, value) => {
        setPage(value);
        setLoading(true);
        console.log('value page: ', value);
    };

    /*recherche avance*/
    const defaultSearch = {
        nom: null,
        idFokontany: null,
        adresse: null,
        ageMin: null,
        ageMax: null,
        dateMin: null,
        dateMax: null,
        sexe: null
    };

    const [myData, setMyData] = useState(defaultSearch);

    const [fokontany, setFokontany] = useState([]);
    const methods = useForm({ defaultSearch });
    /*on submit*/
    const {
        handleSubmit,
        formState: { isSubmitting }
    } = methods;

    const onSubmit = (data) => {
        console.log('submited');

        if (data.nom == '') {
            data.nom = null;
        }
        if (data.adresse == '') {
            data.adresse = null;
        }
        if (data.idFokontany == 'a') {
            data.idFokontany = null;
        }
        if (data.sexe == 'a') {
            data.sexe = null;
        }
        if (!(typeof data.dateMin === 'undefined')) {
            data.dateMin = fDateSql(data.dateMin);
        }
        if (!(typeof data.dateMax === 'undefined')) {
            data.dateMax = fDateSql(data.dateMax);
        }
        // console.log(data);
        // getCitoyen(0, data).then((response) => {
        //   setRows(response.data.items.content);
        //     setPageNumber(response.data.items.totalPages);
        //     setTotalResult(response.data.items.totalElements);
        //     setLoading(false);

        // });
        setMyData(data);
        setPage(1);
        setLoading(true);
    };

    useEffect(() => {
        getFokontany().then((response) => {
            setFokontany(response.data.items);
        });
    }, []);

    useEffect(() => {
        getCitoyen(page - 1, myData)
            .then((response) => {
                setRows(response.data.items.content);
                setPageNumber(response.data.items.totalPages);
                setTotalResult(response.data.items.totalElements);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
        // setRows(tableData);
        // setLoading(false);
    }, [page, myData]);

    /*handle graph*/
    const handleGraphs = () => {
        const path = '/agent/population/graphs';
        navigate(path, { state: { myData } });
    };

    if (isLoading) {
        return <AgentLoader />;
    } else {
        return (
            <Page title="population">
                <Container>
                    {/*modal display*/}
                    <ModalDetailCitoyen open={openDetail} id={data.id} data={data} handleClose={() => setOpenDetail(false)} />
                    <ModalModificationCitoyen open={openEdit} data={data} handleClose={() => setOpenEdit(false)} />
                    <ModalDeleteCitoyen open={openDelete} data={data} handleClose={() => setDelete(false)} />

                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h3">Population</Typography>
                        <Button onClick={() => console.log('ajout')}> Nouveau citoyen</Button>
                    </Stack>
                    {/*recherche avancee  */}
                    <Box my={1}>
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item lg={4} xs={12}>
                                    <RHFTextField name="nom" size="small" label="Nom" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item lg={4} xs={6}>
                                    <RHFTextField
                                        name="idFokontany"
                                        size="small"
                                        defaultValue={'a'}
                                        select
                                        label="Fokontany"
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <MenuItem key={0} value={'a'}>
                                            Tous
                                        </MenuItem>

                                        {fokontany.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {' '}
                                                {item.nom}
                                            </MenuItem>
                                        ))}
                                    </RHFTextField>
                                </Grid>
                                <Grid item lg={4} xs={6}>
                                    <RHFTextField name="adresse" size="small" label="Adresse" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item lg={2} xs={6}>
                                    <RHFTextField name="ageMin" type="number" size="small" label="Âge min" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item lg={2} xs={6}>
                                    <RHFTextField name="ageMax" type="number" size="small" label="Âge max" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item lg={2} xs={6}>
                                    <RHFTextFieldDate name="dateMin" size="small" label="Date min" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item lg={2} xs={6}>
                                    <RHFTextFieldDate name="dateMax" size="small" label="Date max" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item lg={2} xs={6}>
                                    <RHFTextField
                                        name="sexe"
                                        size="small"
                                        defaultValue={'a'}
                                        select
                                        label="Sexe"
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <MenuItem key={'a'} value={'a'}>
                                            Tous
                                        </MenuItem>
                                        <MenuItem key={'m'} value={'m'}>
                                            Homme
                                        </MenuItem>
                                        <MenuItem key={'f'} value={'f'}>
                                            Femme
                                        </MenuItem>
                                    </RHFTextField>
                                </Grid>
                                <Grid item lg={2} xs={6}>
                                    <Button variant="contained" type="submit" size="medium">
                                        RECHERCHER
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormProvider>
                    </Box>
                    <Card>
                        {/*table */}
                        <TableContainer component={Paper}>
                            <Stack paddingX={3} direction={'row'} m={1} spacing={2} justifyContent={'space-between'}>
                                {/* resultat */}
                                <Box>
                                    <Typography variant="subtitle2">({fNumber(totalResult)} résultats)</Typography>{' '}
                                </Box>
                                {/*export et stat*/}
                                <Box>
                                    <Stack direction={'row'} m={1} spacing={2} justifyContent={'center'}>
                                        <Button variant="outlined" startIcon={<PictureAsPdf />}>
                                            PDF
                                        </Button>
                                        <Button variant="outlined" startIcon={<TableRows />}>
                                            Excel
                                        </Button>
                                        <Button onClick={handleGraphs} variant="outlined" startIcon={<Equalizer />}>
                                            Graphs
                                        </Button>
                                    </Stack>
                                </Box>
                            </Stack>

                            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">ID</TableCell>
                                        <TableCell align="left">Nom</TableCell>
                                        <TableCell align="left">Fokontany</TableCell>
                                        <TableCell align="left">Sexe</TableCell>
                                        <TableCell align="right">Âge</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="right">{row.id}</TableCell>
                                            <TableCell align="left">{row.nom + ' ' + row.prenom}</TableCell>
                                            <TableCell align="left">{row.fokontany}</TableCell>
                                            <TableCell align="left">{row.sexe === 'm' ? 'homme' : 'femme'}</TableCell>
                                            <TableCell align="right">{row.age}</TableCell>
                                            <TableCell>
                                                {/* <MoreHorizonMenu options={optionMenu} data={row} /> */}
                                                <MenuProfile
                                                    data={row}
                                                    handleOpenDetail={() => handleOpenDetail(row)}
                                                    handleOpenEdit={() => handleOpenEdit(row)}
                                                    handleOpenDelete={() => handleOpenDelete(row)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/*Pagination */}
                            <Stack spacing={2} m={2}>
                                <Pagination color="primary" count={pageNumber} page={page} onChange={changePage} />
                            </Stack>
                        </TableContainer>
                    </Card>
                </Container>
            </Page>
        );
    }
}
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
                    sx: { width: 200, maxWidth: '100%', overflow: 'visible' }
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem component={Button} onClick={clickDetail} fullWidth sx={{ color: 'text.secondary' }}>
                    <ListItemIcon>
                        <Visibility />
                    </ListItemIcon>
                    <ListItemText primary="Détail" style={alignStart} />
                </MenuItem>
                <MenuItem component={Button} onClick={clickEdit} sx={{ color: 'text.secondary' }} fullWidth>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    <ListItemText primary="Modifier" style={alignStart} />
                </MenuItem>

                <MenuItem component={Button} onClick={clickDelete} sx={{ color: 'text.secondary' }} fullWidth>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    <ListItemText primary="Supprimer" style={alignStart} />
                </MenuItem>
            </Menu>
        </>
    );
};
