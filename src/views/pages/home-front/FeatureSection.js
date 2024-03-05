import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography, Stack, CardMedia } from '@mui/material';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';

// assets
import Offer1 from 'assets/images/landing/offer/offer-1.png';
import Offer2 from 'assets/images/landing/offer/offer-2.png';
import Offer3 from 'assets/images/landing/offer/offer-3.png';
import Offer4 from 'assets/images/landing/offer/offer-4.png';
import Offer5 from 'assets/images/landing/offer/offer-5.png';
import Offer6 from 'assets/images/landing/offer/offer-6.png';

import ContentCardFront from 'composants/jed/contentFront/ContentCardFront';


import { useEffect, useState } from 'react';
import axios from 'axios';
import { siteUrlApi } from 'utils/base_url_api';
import Waiter from 'composants/common/Waiter';

const CardData = () => {
    const [datas, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: siteUrlApi(`contents-front/home`),
            headers: {
            }
        };
        axios
            .request(config)
            .then((response) => {
                console.log('anaty try');
                setLoading(false);
                setData(response.data.items);
                console.log(response);
            })
            .catch((error) => {
                console.log('anaty catch');
                setLoading(false);
                console.error(error);
            });
    }, []);

    return(
        <>
        <Waiter loadingState={isLoading} />

        {datas.map((item) => (
            <Grid key={item.id} item md={4} sm={6}>
                <ContentCardFront items={item} />
            </Grid>
        ))}
        </>
    );
};

const OfferCard = ({ title, caption, image }) => {
    const theme = useTheme();
    const AvaterSx = { background: 'transparent', color: theme.palette.secondary.main, width: 56, height: 56 };
    return (
        <FadeInWhenVisible>
            <SubCard
                sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.100',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.divider,
                    '&:hover': { boxShadow: 'none' },
                    height: '100%'
                }}
            >
                <Stack spacing={4}>
                    <Avatar variant="rounded" sx={AvaterSx}>
                        <CardMedia component="img" src={image} alt="Beautiful User Interface" />
                    </Avatar>
                    <Stack spacing={2}>
                        <Typography variant="h3" sx={{ fontWeight: 500 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                            {caption}
                        </Typography>
                    </Stack>
                </Stack>
            </SubCard>
        </FadeInWhenVisible>
    );
};

OfferCard.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
    image: PropTypes.string
};


    
// =============================|| LANDING - FEATURE PAGE ||============================= //

const FeatureSection = (props) => (
    
    <Container>
        <Grid container spacing={7.5} justifyContent="center">
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                            Ireo loha-hevitra androany:
                        </Typography>
                    </Grid>
                    
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                    <CardData/>
                    {/* <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Time and Cost Savings"
                            caption="Berry can save developers time and effort by providing a pre-built user interface, allowing them to focus on other aspects of the project."
                            image={Offer2}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Reduce Development Complexity"
                            caption="Berry simplifies admin panel development with easy theme setup and clear code with flexible layouts options."
                            image={Offer3}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Improved Scalability"
                            caption="Berry uses scalable technologies and resources to ensure that your admin panel remains efficient and effective as your needs evolve."
                            image={Offer4}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title=" Well-Documented and Supported"
                            caption="With a range of resources including user guides, tutorials, and FAQs to help users understand and effectively use the Berry."
                            image={Offer5}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Performance Centric"
                            caption="Berry is a performance-centric dashboard template that is designed to deliver optimal performance for your admin panel."
                            image={Offer6}
                        />
                    </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    </Container>
);

export default FeatureSection;
