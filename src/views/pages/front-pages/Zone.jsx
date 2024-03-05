/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { Box, Button, CircularProgress, Grid, Stack, Tabs, TextField, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useLocation, useParams } from 'react-router-dom';
import { siteUrlApi, siteUrlApiSansSlash } from 'utils/base_url_api';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import { getUser } from 'utils/user';
import ContentCard from 'composants/jed/contentFront/ContentCard';
import ContentCardFront from 'composants/jed/contentFront/ContentCardFront';
// const regions = [
//     {
//         idRegion: 1,
//         label: 'Analamanga'
//     },
//     {
//         idRegion: 2,
//         label: 'Itasy'
//     },
//     {
//         idRegion: 3,
//         label: 'Sava'
//     },
//     {
//         idRegion: 4,
//         label: 'Diana'
//     }
// ];
function formatDate(rawDate) {
    const date = new Date(rawDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    return formattedDate;
}
function Zone() {
    let { zonetype } = useParams();
    const urlZone = 'contents-front/group-content-types';
    const location = useLocation();
    const [datas, setMyData] = useState([]);
    const idUser = getUser();
    const [load, setLoad] = useState(true);
    const [pageTitle, setPageTitle] = useState('');
    const showButton = location.pathname === '/zone/regionale';
    const [datasRegion, setDatasRegion] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedRegionID, setSelectedRegionID] = useState(null);
    const isXsScreen = useMediaQuery('(max-width:700px)');
    const [temporaryRegion, setTemporaryRegion] = useState('');
    const [temporaryRegionId, setTemporaryRegionId] = useState(null);
    const contentTypeName = '';

    const handleSearchCriteriaChange = (e) => {
        if (datasRegion.length > 0) {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const valueId = selectedOption.getAttribute('data-valueid');
            const value = selectedOption.getAttribute('data-value');

            setTemporaryRegion(value);
            setTemporaryRegionId(valueId);
        }
    };
    const handleValidation = () => {
        setSelectedRegion(temporaryRegion);
        setSelectedRegionID(temporaryRegionId);
        // setLoad(true);

        console.log('Selected Region after validation: ', temporaryRegion);
    };
    // useEffect(() => {
    //     console.log('miova url: ' + selectedRegionID);
    // }, [location.pathname]);
    const path = location.pathname;
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: siteUrlApi(`contents-front/group-content-types`),
            headers: {
                'id-user-front': idUser
            }
        };

        setLoad(true);
        if (path === '/zone') {
            axios
                .request(config)
                .then((response) => {
                    setMyData(response.data.items);
                    console.log('okey azo tous');
                    console.log('miova url: ' + (config.url + '/' + selectedRegionID));
                    setLoad(false);
                })
                .catch((error) => {
                    console.error('tsy mandeha tous');
                    console.error(error);
                });

            setPageTitle('Izy rehetra:');
        } else if (path === '/zone/regionale') {
            axios
                .request(config.url + '/region/' + selectedRegionID)
                .then((response) => {
                    setMyData(response.data.items);
                    console.log('okey azo :' + siteUrlApi(urlZone) + zonetype + '/' + selectedRegionID);

                    setLoad(false);
                })
                .catch((error) => {
                    console.error('tsy mandeha');
                    console.error(error);
                });

            setPageTitle('Faritra :');
        } else if (path === '/zone/nationale') {
            axios
                .request(config.url + '/national')
                .then((response) => {
                    setMyData(response.data.items);
                    console.log('okey azo');
                    console.log('okey azo :' + siteUrlApi(urlZone) + zonetype + '/' + selectedRegionID);
                    setLoad(false);
                })
                .catch((error) => {
                    console.error('tsy mandeha');
                    console.error(error);
                });

            setPageTitle('Nasionaly');
        } else if (path === '/zone/internationale') {
            axios
                .request(config.url + '/international')
                .then((response) => {
                    setMyData(response.data.items);
                    console.log('okey azo');
                    setLoad(false);
                })
                .catch((error) => {
                    console.error('tsy mandeha');
                    console.error(error);
                });

            setPageTitle('Iraisam-pirenena');
        } else {
            setPageTitle('');
        }
    }, [location.pathname, datasRegion, selectedRegionID]);
    useEffect(() => {
        axios
            .get(siteUrlApi('regions'))
            .then((response) => {
                setDatasRegion(response.data.items);
                setSelectedRegionID(response.data.items[0].id);
                setSelectedRegion(response.data.items[0].name);
                console.log('okey azo region');
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, []);
    if (load) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    } else {
        return (
            <>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '8px',
                        justifyContent: 'space-between',
                        width: '100%',
                        backgroundColor: 'white',
                        p: 2
                    }}
                >
                    <Stack direction={isXsScreen ? 'column' : 'row'}>
                        <Typography variant={isXsScreen ? 'h2' : 'h1'} mr={2}>
                            {pageTitle}
                        </Typography>
                        {showButton && <Typography variant={isXsScreen ? 'h2' : 'h1'}>{selectedRegion}</Typography>}
                    </Stack>
                    {showButton && (
                        <Stack direction={'row'} spacing={2}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Region"
                                SelectProps={{
                                    native: true
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={temporaryRegion || ''}
                                color="secondary"
                                onChange={handleSearchCriteriaChange}
                            >
                                {datasRegion &&
                                    datasRegion.map((option) => (
                                        <option key={option.id} data-valueid={option.id} data-value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                            </TextField>
                            <Button color="secondary" sx={{ maxHeight: '7vh' }} variant="contained" onClick={handleValidation}>
                                JERENA
                            </Button>
                        </Stack>
                    )}
                </Box>
                <Grid container my={1}>
                    <Box width="100%">
                        <Stack sx={{ width: '100%' }} direction={'column'}>
                            {datas &&
                                datas.map((item) => (
                                    <>
                                        <Box sx={{ p: { xs: 1, sm: 3 }, width: '100%' }} display={'flex'} key={'type' + item.idContentType}>
                                            <Box
                                                display={'flex'}
                                                flexDirection={'column'}
                                                boxShadow={10}
                                                padding={2}
                                                sx={{
                                                    width: '100%',
                                                    backgroundColor: 'white',
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="h2" textAlign={'left'} ml={5} color="secondary">
                                                        {getTitleMg2(item.contentTypeName)}
                                                    </Typography>
                                                </Box>
                                                <Stack direction="row" alignItems="center">
                                                    <Box
                                                        display={'flex'}
                                                        margin="auto"
                                                        flexDirection={'row'}
                                                        sx={{
                                                            backgroundColor: 'white',
                                                            overflowX: 'hidden',
                                                            '&::-webkit-scrollbar': {
                                                                width: 0
                                                            }
                                                        }}
                                                    >
                                                        <Tabs variant="scrollable">
                                                            {item.items &&
                                                                item.items.map((e) => (
                                                                    <Box key={e.id}>
                                                                        <Box
                                                                            sx={{
                                                                                minWidth: { xs: 250, sm: 350 },
                                                                                p: { xs: 1, sm: 2 },
                                                                                width: '20vw',
                                                                                borderRadius: 2
                                                                            }}
                                                                        >
                                                                            {/* <Typography
                                                                                variant="h4"
                                                                                style={{
                                                                                    overflow: 'hidden',
                                                                                    whiteSpace: 'nowrap',
                                                                                    textOverflow: 'ellipsis'
                                                                                }}
                                                                            >
                                                                                <span style={{ fontWeight: 'bold', fontSize: '23px' }}>
                                                                                    Titre :
                                                                                </span>{' '}
                                                                                {e.title}
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="h4"
                                                                                style={{
                                                                                    overflow: 'hidden',
                                                                                    whiteSpace: 'nowrap',
                                                                                    textOverflow: 'ellipsis'
                                                                                }}
                                                                            >
                                                                                <span style={{ fontWeight: 'bold', fontSize: '23px' }}>
                                                                                    Region :
                                                                                </span>{' '}
                                                                                {e.regionName}
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="h4"
                                                                                style={{
                                                                                    overflow: 'hidden',
                                                                                    whiteSpace: 'nowrap',
                                                                                    textOverflow: 'ellipsis'
                                                                                }}
                                                                            >
                                                                                <span style={{ fontWeight: 'bold', fontSize: '23px' }}>
                                                                                    Thematique :
                                                                                </span>{' '}
                                                                                {e.themeName}
                                                                            </Typography>
                                                                            {e.id && (
                                                                                <Box display="flex" justifyContent="center">
                                                                                    {iT.contentTypeName === 'Vidéo' && (
                                                                                        <OndemandVideoIcon style={{ fontSize: '7vw' }} />
                                                                                    )}
                                                                                    {iT.contentTypeName === 'Audio' && (
                                                                                        <AudioFileIcon style={{ fontSize: '7vw' }} />
                                                                                    )}
                                                                                    {iT.contentTypeName === 'Image' && (
                                                                                        <ArticleIcon style={{ fontSize: '7vw' }} />
                                                                                    )}
                                                                                    {iT.contentTypeName === 'PDF' && (
                                                                                        <PictureAsPdfIcon style={{ fontSize: '7vw' }} />
                                                                                    )}
                                                                                </Box>
                                                                            )}

                                                                            <Typography
                                                                                variant="h4"
                                                                                style={{
                                                                                    overflow: 'hidden',
                                                                                    whiteSpace: 'nowrap',
                                                                                    textOverflow: 'ellipsis'
                                                                                }}
                                                                            >
                                                                                <span style={{ fontWeight: 'bold', fontSize: '23px' }}>
                                                                                    Auteur :
                                                                                </span>{' '}
                                                                                {e.author}
                                                                            </Typography>
                                                                            <Typography variant="h4">{formatDate(e.createdAt)}</Typography> */}
                                                                            <ContentCardFront items={e} />
                                                                        </Box>
                                                                    </Box>
                                                                ))}
                                                        </Tabs>
                                                    </Box>
                                                </Stack>
                                                <Box sx={{ mt: 2, minwidth: '20%', marginLeft: 'auto' }}>
                                                    <Button color="secondary" sx={{ mr: 4 }} variant="contained">
                                                        HIJERY AZY REHETRA
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </>
                                ))}
                        </Stack>
                    </Box>
                </Grid>
            </>
        );
    }
}

export default Zone;

const getTitleMg2 = (type) => {
    if (type === 'Article') return 'Lahatsoratra';
    if (type === 'Vidéo') return 'Horonantsary';
    if (type === 'Audio') return 'Horonam-peo';
    if (type === 'PDF') return 'PDF';
    if (type === 'Autre') return 'Hafa';
    if (type === 'Image') return 'Sary';
};
