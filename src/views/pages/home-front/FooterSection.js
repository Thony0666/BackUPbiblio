// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Container, Grid, IconButton, Link, Stack, Typography } from '@mui/material'; // Divider

// project import
import Chip from 'ui-component/extended/Chip';
import { frameworks } from './FrameworkSection';

// assets
// import Dribble from 'assets/images/landing/footer-dribble.png';
// import Freepik from 'assets/images/landing/footer-freepik.png';
// import Awards from 'assets/images/landing/footer-awards.png';

import PublicIcon from '@mui/icons-material/Public';
import TwitterIcon from '@mui/icons-material/Twitter';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

// Link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.hint,
    '&:hover': {
        color: theme.palette.primary.main
    },
    '&:active': {
        color: theme.palette.primary.main
    }
}));

// =============================|| LANDING - FOOTER SECTION ||============================= //

const FooterSection = () => {
    const theme = useTheme();
    const textColor = theme.palette.mode === 'dark' ? 'text.secondary' : 'text.hint';

    // const dividerSX = {
    //     borderImageSlice: 1,
    //     borderImageSource: `linear-gradient(90deg, rgba(255, 255, 255, 0) -0.01%, rgba(255, 255, 255, 0.56) 51.97%, rgba(255, 255, 255, 0.03) 99.99%)`,
    //     opacity: 0.5
    // };

    return (
        <>
            <Container sx={{ mb: 15 }}>
                <Grid container spacing={6}>
                    {/* <Grid item xs={12}>
                        <Stack spacing={4.25}>
                            <Divider sx={dividerSX} />
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={{ xs: 1.5, sm: 6, md: 10, lg: 12 }}
                                sx={{ overflow: 'hidden' }}
                            >
                                <img src={Dribble} alt="dribble" />
                                <img src={Freepik} alt="freepik" />
                                <img src={Awards} alt="awards" />
                            </Stack>
                            <Divider sx={dividerSX} />
                        </Stack>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={{ xs: 2, md: 5 }}>
                                    <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                        Tranomboky nomerika
                                    </Typography>
                                    <Typography variant="body2" color={textColor}>
                                        {`Tsidiho ny haren-kolontsainan'i Madagasikara amin'ny alalan'ny Tranomboky nomerika Tafo Mihaavo,
                                        izay mitahiry ireo votoaty nomerika isan-karazany avy amin'ny faritra 23 manerana ny Nosy, izay
                                        manome ny fampidirana nomerika amin'ny karazany sy ny halalin'ny vakoka malagasy.`}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={{ xs: 5, md: 2 }}>
                                    <Grid item xs={6} sm={3}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                                Mombamomba anay
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <FooterLink href="https://links.codedthemes.com/HTIBc" target="_blank" underline="none">
                                                    Iza izahay?
                                                </FooterLink>
                                                <FooterLink href="https://codedthemes.gitbook.io/berry/" target="_blank" underline="none">
                                                    Hifandray aminay
                                                </FooterLink>
                                                {/* <FooterLink
                                                    href="https://codedthemes.gitbook.io/berry/changelog"
                                                    target="_blank"
                                                    underline="none"
                                                >
                                                    Change Log
                                                </FooterLink>
                                                <FooterLink href="https://codedthemes.support-hub.io/" target="_blank" underline="none">
                                                    Support
                                                </FooterLink> */}
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                                Fitsipaka
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <FooterLink href="https://mui.com/store/license/" target="_blank" underline="none">
                                                    Fomba fampiasana ny Tranomboky
                                                </FooterLink>
                                                <FooterLink
                                                    href="https://mui.com/store/customer-refund-policy/"
                                                    target="_blank"
                                                    underline="none"
                                                >
                                                    Fitsipaka
                                                </FooterLink>
                                                {/* <FooterLink
                                                    href="https://support.mui.com/hc/en-us/sections/360002564979-For-customers"
                                                    target="_blank"
                                                    underline="none"
                                                >
                                                    
                                                </FooterLink> */}
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                                {` Mpiara-miombon'antoka`}
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                {frameworks.map((item, index) => (
                                                    <FooterLink href={item.link} target="_blank" underline="none" key={index}>
                                                        {item.title}
                                                        {item.isUpcoming && (
                                                            <Chip variant="outlined" size="small" label="Upcoming" sx={{ ml: 0.5 }} />
                                                        )}
                                                    </FooterLink>
                                                ))}
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    {/* <Grid item xs={6} sm={3}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                                Free Versions
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <FooterLink href="https://links.codedthemes.com/Yfkxg" target="_blank" underline="none">
                                                    Free React MUI
                                                </FooterLink>
                                                <FooterLink href="https://links.codedthemes.com/epTmN" target="_blank" underline="none">
                                                    Free Bootstrap 5
                                                </FooterLink>
                                                <FooterLink href="https://links.codedthemes.com/seQKN" target="_blank" underline="none">
                                                    Free Angular
                                                </FooterLink>
                                                <FooterLink href="https://links.codedthemes.com/Wfbiy" target="_blank" underline="none">
                                                    Free Django
                                                </FooterLink>
                                            </Stack>
                                        </Stack>
                                    </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ bgcolor: 'dark.dark', py: { xs: 3, sm: 1.5 } }}>
                <Container>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={{ xs: 1.5, sm: 1, md: 3 }}
                    >
                        <Typography color="text.secondary">
                            © Copyright 2024{' '}
                            <Link href="#" target="_blank" underline="hover">
                                Tafo Mihaavo
                            </Link>
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={{ xs: 3, sm: 1.5, md: 2 }}>
                            <IconButton
                                size="small"
                                component={Link}
                                href="https://links.codedthemes.com/HTIBc"
                                target="_blank"
                                aria-label="blog"
                            >
                                <PublicIcon sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} />
                            </IconButton>
                            <IconButton
                                size="small"
                                component={Link}
                                href="https://twitter.com/codedthemes"
                                target="_blank"
                                aria-label="twitter"
                            >
                                <TwitterIcon sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} />
                            </IconButton>
                            <IconButton
                                size="small"
                                component={Link}
                                href="https://dribbble.com/codedthemes"
                                target="_blank"
                                aria-label="dribble"
                            >
                                <SportsBasketballIcon sx={{ color: 'text.secondary', '&:hover': { color: 'warning.main' } }} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default FooterSection;
