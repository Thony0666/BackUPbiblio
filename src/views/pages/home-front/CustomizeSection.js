// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardMedia, Container, Grid, Link, Stack, Typography } from '@mui/material';

// project import
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { IconCircleCheck } from '@tabler/icons-react';
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';

import LayerLeft from 'assets/images/landing/customization-left.png';
import LayerRight from 'assets/images/landing/customization-right.png';

// ==============================|| LANDING - CUSTOMIZE ||============================== //

const CustomizeSection = () => {
    const theme = useTheme();
    const listSX = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        padding: '10px 0',
        fontSize: '1rem',
        color: theme.palette.grey[900],
        svg: { color: theme.palette.secondary.main }
    };

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid container justifyContent="space-between" alignItems="center" spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }}>
                <Grid item xs={12} md={6} sx={{ img: { width: '100%' } }}>
                    <Stack sx={{ width: '75%', mb: 5, mx: 'auto' }}>
                        <CardMedia component="img" image={LayerLeft} alt="Layer" />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12}>
                            <Typography
                                color={theme.palette.primary.main}
                                variant="h2"
                                sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}
                            >
                                Lova tsy mifindra
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="text.primary"
                                sx={{
                                    fontSize: '1rem',
                                    zIndex: '99',
                                    width: { xs: '100%', sm: '100%', md: 'calc(100% - 20%)' }
                                }}
                            >
                                Ny fahalalana no lova tsara indrindra
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={listSX}>
                                <IconCircleCheck size={20} />
                                Fitehirizan-kevitra
                            </Typography>
                            <Typography sx={listSX}>
                                <IconCircleCheck size={20} />
                                {"Fahalalana avy amin'ireo Fokonolona"}
                            </Typography>
                            <Typography sx={listSX}>
                                <IconCircleCheck size={20} />
                                {" Misy ireo lovan-tsofina avy amin'ny faritra 23"}
                            </Typography>
                            <Typography sx={listSX}>
                                <IconCircleCheck size={20} />
                                Harena volahana ny Malagasy ny tantarany
                            </Typography>
                            <Typography sx={listSX}>
                                <IconCircleCheck size={20} /> Fahalala ho ny zanaka aman-para
                            </Typography>
                            {/* <Stack direction="row">
                                <AnimateButton>
                                    <Button
                                        startIcon={<LayersTwoToneIcon />}
                                        sx={{ boxShadow: 'none', my: 4 }}
                                        variant="contained"
                                        component={RouterLink}
                                        to="/components/autocomplete"
                                        target="_blank"
                                    >
                                        View All Components
                                    </Button>
                                </AnimateButton>
                            </Stack> */}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2.5} direction={{ xs: 'column-reverse', md: 'row' }}>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h2"
                                        color={theme.palette.primary.main}
                                        sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}
                                    >
                                        {"Ho an'iza ny Lova tsy mifindra"}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.primary"
                                        sx={{
                                            fontSize: '1rem',
                                            zIndex: '99',
                                            width: { xs: '100%', md: 'calc(100% - 20%)' }
                                        }}
                                    >
                                        {"Tsy manavaka ny ito tranokala ito fa ho an'ny rehetra"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={listSX}>
                                        <IconCircleCheck size={20} />
                                        {"Ho an'ny Malagasy tsy vakivolo"}
                                    </Typography>
                                    <Typography sx={listSX}>
                                        <IconCircleCheck size={20} />
                                        {"Ho an' ireo mpianatra "}
                                    </Typography>
                                    <Typography sx={listSX}>
                                        <IconCircleCheck size={20} />
                                        {" Sahaza ho an' ireo mpikaroka"}
                                    </Typography>
                                    <Typography sx={listSX}>
                                        <IconCircleCheck size={20} />
                                        {"Azo tsidihan' ireo vahiny"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ img: { width: '100%' } }}>
                            <Stack sx={{ width: '70%', mx: 'auto' }}>
                                <CardMedia component="img" image={LayerRight} alt="Layer" />
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CustomizeSection;
