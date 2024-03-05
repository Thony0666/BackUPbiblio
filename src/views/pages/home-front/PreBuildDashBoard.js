import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid, IconButton, Typography, Stack, useMediaQuery } from '@mui/material';

// third-party
import { Carousel } from 'react-responsive-carousel';

// assets
import { IconChevronRight, IconChevronLeft, IconLink } from '@tabler/icons-react';

// import SliderLight1 from 'assets/images/landing/pre-apps/slider-light-1.png';
// import SliderDark1 from 'assets/images/landing/pre-apps/slider-dark-1.png';
// import SliderLight2 from 'assets/images/landing/pre-apps/slider-light-2.png';
// import SliderDark2 from 'assets/images/landing/pre-apps/slider-dark-2.png';
// import SliderLight3 from 'assets/images/landing/pre-apps/slider-light-3.png';
// import SliderDark3 from 'assets/images/landing/pre-apps/slider-dark-3.png';
// import SliderLight4 from 'assets/images/landing/pre-apps/slider-light-4.png';
// import SliderDark4 from 'assets/images/landing/pre-apps/slider-dark-4.png';
// import SliderLight5 from 'assets/images/landing/pre-apps/slider-light-5.png';
// import SliderDark5 from 'assets/images/landing/pre-apps/slider-dark-5.png';
// import SliderLight6 from 'assets/images/landing/pre-apps/slider-light-6.png';
// import SliderDark6 from 'assets/images/landing/pre-apps/slider-dark-6.png';

import pub1 from 'assets/images/pub/pub1.png';
import pub2 from 'assets/images/pub/pub2.png';
import pub3 from 'assets/images/pub/pub3.png';
import pub4 from 'assets/images/pub/pub4.png';
import pub5 from 'assets/images/pub/pub5.png';
import pub6 from 'assets/images/pub/Pub6.png';

// styles
const Images = styled('img')({
    width: '100%',
    height: 'auto',
    marginBottom: 32,
    backgroundSize: 'cover',
    objectFit: 'cover'
});

function SampleNextArrow({ onClickHandler }) {
    const theme = useTheme();

    return (
        <IconButton
            onClick={onClickHandler}
            sx={{
                position: 'absolute',
                zIndex: 2,
                top: 'calc(50% - 70px)',
                cursor: 'pointer',
                background: `${theme.palette.background.paper} !important`,
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
            <IconChevronRight fontSize={25} color={theme.palette.grey[900]} aria-label="click to slide change left side" />
        </IconButton>
    );
}

SampleNextArrow.propTypes = {
    onClickHandler: PropTypes.func
};

function SamplePrevArrow({ onClickHandler }) {
    const theme = useTheme();
    return (
        <IconButton
            onClick={onClickHandler}
            sx={{
                position: 'absolute',
                zIndex: 2,
                top: 'calc(50% - 70px)',
                cursor: 'pointer',
                background: `${theme.palette.background.paper} !important`,
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
            <IconChevronLeft fontSize={25} color={theme.palette.grey[900]} aria-label="click to slide change right side" />
        </IconButton>
    );
}

SamplePrevArrow.propTypes = {
    onClickHandler: PropTypes.func
};

const Items = ({ title, caption, image, link }) => {
    const theme = useTheme();
    return (
        <>
            <Images
                src={image}
                alt="dashboard"
                sx={{
                    width: { xs: '100%', xl: 743 },
                    objectFit: 'contain',
                    direction: 'initial'
                }}
            />
            <Stack spacing={1} sx={{ pt: 1 }}>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                    component={Link}
                    to={link}
                    target="_blank"
                    sx={{ textDecoration: 'none' }}
                >
                    <Typography variant="h3" sx={{ fontWeight: 500 }}>
                        {title}
                    </Typography>
                    <IconButton size="small">
                        <IconLink size={18} color={theme.palette.text.primary} aria-label="page redirect to this theme page" />
                    </IconButton>
                </Stack>
                <Typography variant="subtitle2" color="text.primary" sx={{ fontSize: { xs: '1rem', xl: '1.125rem' } }}>
                    {caption}
                </Typography>
            </Stack>
        </>
    );
};

Items.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string
};

const PreBuildDashBoard = () => {
    const theme = useTheme();
    const matchUpSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Grid container spacing={7.5} justifyContent="center" sx={{ px: 1.25 }}>
                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={12}>
                            <Typography color={theme.palette.primary.main} variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                                Vaovao Tapatapany
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {/* <Typography variant="h4" sx={{ fontWeight: 400 }} align="center">
                                Berry has conceptul working apps like Chat, Inbox, E-commerce, Invoice, Kanban, and Calendar
                            </Typography> */}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        className="preBuildDashBoard-slider"
                        sx={{
                            direction: 'initial',
                            '.slider': { height: { xs: 'auto' }, '& .slide:not(.selected)': { transformOrigin: 'center !important' } }
                        }}
                    >
                        <Carousel
                            showArrows
                            showThumbs={false}
                            showIndicators={false}
                            centerMode={!matchUpSM}
                            centerSlidePercentage={50}
                            infiniteLoop
                            autoFocus
                            emulateTouch
                            swipeable
                            autoPlay
                            interval={2000}
                            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                hasPrev && <SamplePrevArrow onClickHandler={onClickHandler} hasPrev={hasPrev} label={label} />
                            }
                            renderArrowNext={(onClickHandler, hasNext, label) =>
                                hasNext && <SampleNextArrow onClickHandler={onClickHandler} hasNext={hasNext} label={label} />
                            }
                        >
                            <Items title="Fihenambidy -50%" image={pub1} link="/apps/mail" />
                            <Items title="Fihenambidy 200Ar" image={pub2} link="/apps/chat" />
                            <Items title="College" image={pub3} link="/apps/kanban/board" />
                            <Items title="Trano" image={pub4} link="/apps/calendar" />
                            <Items title="Tany amidy" image={pub5} link="/apps/e-commerce/products" />
                            <Items title="Fampianara" image={pub6} link="/apps/user/social-profile/posts" />
                        </Carousel>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default PreBuildDashBoard;
