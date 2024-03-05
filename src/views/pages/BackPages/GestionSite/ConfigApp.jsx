import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import ConfigHandicap from 'composants/thony/component/config-action/ConfigHandicap';
import ConfigProf from 'composants/thony/component/config-action/ConfigProf';
import ConfigRegion from 'composants/thony/component/config-action/ConfigRegio';
import ConfigTheme from 'composants/thony/component/config-action/ConfigTheme';
import { useEffect, useState } from 'react';
import { siteUrlApi } from 'utils/base_url_api';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import NewHandicap from 'composants/thony/component/add-new-conf/NewHandicap';
import NewTheme from 'composants/thony/component/add-new-conf/NewTheme';
import NewProf from 'composants/thony/component/add-new-conf/NewProf';
import NewRegion from 'composants/thony/component/add-new-conf/NewRegion';
import ConfigSize from 'composants/thony/component/config-action/ConfigSize';
import NewSize from 'composants/thony/component/add-new-conf/NewSIze';
import Waiter from 'composants/common/Waiter';
import WaiterInGrid from 'composants/common/WaiterInGrid';
const ConfigApp = () => {
    const [region, setRegion] = useState([]);
    const [themes, setThemes] = useState([]);
    const [handicap, setHanndicap] = useState([]);
    const [prof, setProf] = useState([]);
    const [taillleFile, setTailleFile] = useState([]);
    const [inputRegion, setInpR] = useState(false);
    const [inputFileSize, setInpSize] = useState(false);
    const [InputTheme, setInpT] = useState(false);
    const [InputProf, setInpP] = useState(false);
    const [InputHand, setInpH] = useState(false);
    const [isLoadingH, setLoadingH] = useState(true);
    const [isLoadingR, setLoadingR] = useState(true);
    const [isLoadingP, setLoadingP] = useState(true);
    const [isLoadingS, setLoadingS] = useState(true);
    const [isLoadingT, setLoadingT] = useState(true);
    useEffect(() => {
        axios
            .get(siteUrlApi(`regions`))
            .then((response) => {
                setRegion(response.data.items);
                // setLoad(false);
                // setRefresh(false);
                console.log('okey azo ny region');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, [region]);
    useEffect(() => {
        axios
            .get(siteUrlApi(`themes`))
            .then((response) => {
                setThemes(response.data.items);
                // setLoad(false);
                // setRefresh(false);
                console.log('okey azo ny region');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, [themes]);
    useEffect(() => {
        axios
            .get(siteUrlApi(`handicaps`))
            .then((response) => {
                setHanndicap(response.data.items);
                // setLoad(false);
                console.log('okey azo ny region');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, [handicap]);
    useEffect(() => {
        axios
            .get(siteUrlApi(`professions`))
            .then((response) => {
                setProf(response.data.items);
                // setLoad(false);
                // setRefresh(false);
                console.log('okey azo ny region');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, [prof]);
    useEffect(() => {
        axios
            .get(siteUrlApi(`content-type-allowed-extensions/`))
            .then((response) => {
                setTailleFile(response.data.items.fileUploadSizeLimit);
                // setLoad(false);
                // setRefresh(false);
                console.log('okey azo ny taille de fichier');
                console.log(response.data.items.fileUploadSizeLimit);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, [taillleFile]);
    const showInpR = () => {
        setInpR(true);
        setInpT(false);
        setInpP(false);
        setInpH(false);
        setInpSize(false);
    };
    const showInpT = () => {
        setInpT(true);
        setInpR(false);
        setInpP(false);
        setInpH(false);
        setInpSize(false);
    };
    const showInpP = () => {
        setInpP(true);
        setInpT(false);
        setInpR(false);
        setInpH(false);
        setInpSize(false);
    };
    const showInph = () => {
        setInpH(true);
        setInpT(false);
        setInpP(false);
        setInpR(false);
        setInpSize(false);
    };
    const showInpSiwe = () => {
        setInpH(false);
        setInpT(false);
        setInpP(false);
        setInpR(false);
        setInpSize(true);
    };
    const hideInput = () => {
        setInpR(false);
        setInpT(false);
        setInpP(false);
        setInpH(false);
        setInpSize(false);
    };
    return (
        <>
            <Box
                mb={3}
                boxShadow={10}
                padding={1}
                sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '8px'
                }}
            >
                <Typography variant="h2">Configuration</Typography>
            </Box>
            <Grid>
                <Grid>
                    <Grid container direction={'row'}>
                        <Grid container position={'relative'} justifyContent={'center'} p={2} item xs={12} md={6}>
                            <Grid container position={'relative'} border={'white solid 5px'} borderRadius={3}>
                                {!isLoadingT && <WaiterInGrid />}
                                <Paper sx={{ width: '100%' }}>
                                    <TableContainer sx={{ position: 'relative' }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Thématique</TableCell>
                                                    <TableCell style={{ textAlign: 'right' }}>
                                                        <Button onClick={showInpT} color="secondary" variant="contained">
                                                            Ajouter
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {InputTheme && <NewTheme fonction={hideInput} loading={setLoadingT} />}
                                            <TableBody>
                                                {themes &&
                                                    themes.map((item) => (
                                                        <>
                                                            <TableRow>
                                                                <TableCell>{item.name}</TableCell>
                                                                <TableCell sx={{ textAlign: 'right' }}>
                                                                    <ConfigTheme name={item.name} id={item.id} function={setLoadingT} />
                                                                </TableCell>
                                                            </TableRow>
                                                        </>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent={'center'} position={'relative'} p={2} item xs={12} md={6}>
                            <Grid container position={'relative'} border={'white solid 5px'} borderRadius={3}>
                                {!isLoadingR && <WaiterInGrid />}
                                <Paper sx={{ width: '100%' }}>
                                    <TableContainer sx={{ maxHeight: '70vh', minHeight: '70vh', position: 'relative' }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Region</TableCell>
                                                    <TableCell style={{ textAlign: 'right' }}>
                                                        <Button onClick={showInpR} color="secondary" variant="contained">
                                                            Ajouter
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {inputRegion && <NewRegion fonction={hideInput} loading={setLoadingR} />}
                                            <TableBody>
                                                {region &&
                                                    region.map((item) => (
                                                        <>
                                                            <TableRow key={item.id}>
                                                                <TableCell>{item.name}</TableCell>
                                                                <TableCell sx={{ textAlign: 'right' }}>
                                                                    <ConfigRegion name={item.name} id={item.id} function={setLoadingR} />
                                                                </TableCell>
                                                            </TableRow>
                                                        </>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>{' '}
                    </Grid>
                    <Grid container justifyContent={'space-between'} alignItems={'flex-start'}>
                        <Grid container item xs={12} p={2} md={4}>
                            <Grid container position={'relative'} border={'white solid 5px'} borderRadius={3}>
                                {!isLoadingP && <WaiterInGrid />}
                                <Paper sx={{ width: '100%', overflow: 'hidden', margin: 'auto' }}>
                                    <TableContainer sx={{ maxHeight: '47vh', minHeight: '47vh', position: 'relative' }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead sx={{ border: 'red solid 2px' }}>
                                                <TableRow>
                                                    <TableCell>Profession</TableCell>
                                                    <TableCell style={{ textAlign: 'right' }}>
                                                        <Button onClick={showInpP} color="secondary" variant="contained">
                                                            Ajouter
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {InputProf && <NewProf fonction={hideInput} loading={setLoadingP} />}
                                            <TableBody>
                                                {prof &&
                                                    prof.map((item) => (
                                                        <>
                                                            <TableRow key={item.id}>
                                                                <TableCell>{item.name}</TableCell>
                                                                <TableCell sx={{ textAlign: 'right' }}>
                                                                    <ConfigProf name={item.name} id={item.id} function={setLoadingP} />
                                                                </TableCell>
                                                            </TableRow>
                                                        </>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid justifyContent={'center'} container item xs={12} p={2} md={4}>
                            <Grid container position={'relative'} border={'white solid 5px'} borderRadius={3}>
                                {!isLoadingH && <WaiterInGrid />}
                                <Paper sx={{ width: '100%', overflow: 'hidden', margin: 'auto' }}>
                                    <TableContainer sx={{ maxHeight: '47vh', minHeight: '47vh', position: 'relative' }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Handicap</TableCell>
                                                    <TableCell style={{ textAlign: 'right' }}>
                                                        <Button onClick={showInph} color="secondary" variant="contained">
                                                            Ajouter
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {InputHand && <NewHandicap fonction={hideInput} loading={setLoadingH} />}
                                            <TableBody>
                                                {handicap &&
                                                    handicap.map((item) => (
                                                        <>
                                                            <TableRow key={item.id}>
                                                                <TableCell sx={{ height: 5 }}>{item.name}</TableCell>
                                                                <TableCell sx={{ textAlign: 'right' }}>
                                                                    <ConfigHandicap name={item.name} id={item.id} function={setLoadingH} />
                                                                </TableCell>
                                                            </TableRow>
                                                        </>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} p={2} md={4}>
                            <Grid container position={'relative'} border={'white solid 5px'} borderRadius={3}>
                                {!isLoadingS && <WaiterInGrid />}
                                <Paper sx={{ width: '100%', overflow: 'hidden', margin: 'auto' }}>
                                    <TableContainer sx={{ maxHeight: '47vh', minHeight: '47vh', position: 'relative' }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Taille de Ficher</TableCell>
                                                    <TableCell style={{ textAlign: 'right' }}>
                                                        <Button onClick={showInpSiwe} color="secondary" variant="contained">
                                                            Ajouter
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>

                                            {inputFileSize && <NewSize fonction={hideInput} loading={setLoadingS} />}
                                            <TableBody>
                                                {taillleFile &&
                                                    taillleFile.map((item) => (
                                                        <>
                                                            <TableRow key={item.id}>
                                                                <TableCell>
                                                                    {item.fileTypeName}:{item.sizeLimit}
                                                                </TableCell>
                                                                <TableCell sx={{ textAlign: 'right' }}>
                                                                    <ConfigSize name={item.sizeLimit} id={item.id} function={setLoadingS} />
                                                                </TableCell>
                                                            </TableRow>
                                                        </>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ConfigApp;
