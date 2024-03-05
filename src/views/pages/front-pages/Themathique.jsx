/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { Box, Button, CircularProgress, Grid, IconButton, Stack, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useParams } from 'react-router-dom';
import { siteUrlApi } from 'utils/base_url_api';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import { getUser } from 'utils/user';
import { Carousel } from 'react-responsive-carousel';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import PropTypes, { number } from 'prop-types';
import ContentCard from 'composants/jed/contentFront/ContentCard';
import ContentCardFront from 'composants/jed/contentFront/ContentCardFront';

function formatDate(rawDate) {
    const date = new Date(rawDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;

    return formattedDate;
}
function SampleNextArrow({ onClickHandler }) {
    return (
        <IconButton
            onClick={onClickHandler}
            sx={{
                position: 'absolute',
                zIndex: 2,
                top: 'calc(50% - 70px)',
                cursor: 'pointer',
                width: { xs: '40px !important', xl: '65px !important' },
                height: { xs: '40px !important', xl: '65px !important' },
                boxShadow: '0px 24px 38px rgba(9, 15, 37, 0.07)',
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    transform: 'scale(9)'
                },
                svg: {
                    height: { md: 20, lg: 40, xl: '40px' },
                    width: { md: 20, lg: 40, xl: '40px' }
                },
                right: { xs: '50px', md: '80px', lg: '120px', xl: '220px' }
            }}
        >
            <IconChevronRight fontSize={25} aria-label="click to slide change left side" />
        </IconButton>
    );
}

SampleNextArrow.propTypes = {
    onClickHandler: PropTypes.func
};

function SamplePrevArrow({ onClickHandler }) {
    return (
        <IconButton
            onClick={onClickHandler}
            sx={{
                position: 'absolute',
                zIndex: 2,
                top: 'calc(50% - 70px)',
                cursor: 'pointer',
                width: { xs: '40px !important', xl: '65px !important' },
                height: { xs: '40px !important', xl: '65px !important' },
                boxShadow: '0px 24px 38px rgba(9, 15, 37, 0.07)',
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    transform: 'scale(9)'
                },
                svg: {
                    height: { md: 20, lg: 40, xl: '40px' },
                    width: { md: 20, lg: 40, xl: '40px' }
                },
                left: { xs: '50px', md: '80px', lg: '120px', xl: '220px' }
            }}
        >
            <IconChevronLeft fontSize={25} aria-label="click to slide change right side" />
        </IconButton>
    );
}

SamplePrevArrow.propTypes = {
    onClickHandler: PropTypes.func
};
function Thematique() {
    let { theme } = useParams();
    const [load, setLoad] = useState(true);
    const [pageTitle, setPageTitle] = useState('');
    const [datas, setMyData] = useState([]);
    const idUser = getUser();

    useEffect(() => {
        setLoad(true);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: siteUrlApi(`contents-front/group-content-types/theme/`),
            headers: {
                'id-user-front': idUser
            }
        };
        axios
            .request(config.url + theme)
            .then((response) => {
                setMyData(response.data.items);
                setPageTitle(response.data.items[0].items[0].themeName);
                console.log('okey azo' + pageTitle);
                setLoad(false);
            })
            .catch((error) => {
                console.error('tsy mandeha theme');
                console.error(error);
            });
    }, [theme]);

    if (load) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    } else {
        return (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Stack direction={'row'}>
                        {datas.items && datas.items.length <= 0 ? (
                            <Typography variant="h1" fontSize={47}>
                                Message personnalisé pour moins de 5 éléments
                            </Typography>
                        ) : (
                            <Typography variant="h2" align="center" padding={2} gutterBottom>
                                {pageTitle}
                            </Typography>
                        )}
                    </Stack>
                </Box>

                <Grid my={1}>
                    <Box>
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
                                                    borderRadius: '8px',
                                                    backgroundColor: 'white'
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

                                                <Button
                                                    color="secondary"
                                                    sx={{ mt: 2, minwidth: '20%', marginLeft: 'auto' }}
                                                    variant="contained"
                                                >
                                                    HIJERY AZY REHETRA
                                                </Button>
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

export default Thematique;
const getTitleMg2 = (type) => {
    if (type === 'Article') return 'Lahatsoratra';
    if (type === 'Vidéo') return 'Horonantsary';
    if (type === 'Audio') return 'Horonam-peo';
    if (type === 'PDF') return 'PDF';
    if (type === 'Autre') return 'Hafa';
    if (type === 'Image') return 'Sary';
};
