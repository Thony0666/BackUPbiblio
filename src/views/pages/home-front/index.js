// material-ui
import { styled, useTheme } from '@mui/material/styles';

// project imports
import Customization from 'layout/Customization';
import CardSection from './CardSection';
import CustomizeSection from './CustomizeSection';
import FeatureSection from './FeatureSection';
import FrameworkSection from './FrameworkSection';
import PeopleSection from './PeopleSection';
import PreBuildDashBoard from './PreBuildDashBoard';
import StartupProjectSection from './StartupProjectSection';
import HeaderSection from './HeaderSection';
import Waiter from 'composants/common/Waiter';
import { useState } from 'react';
// import IncludeSection from './IncludeSection';
// import RtlInfoSection from './RtlInfoSection';


// custom stlye
const HeaderWrapper = styled('div')(({ theme }) => ({
    overflowX: 'hidden',
    overflowY: 'clip',
    background:
        theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : `linear-gradient(360deg, ${theme.palette.grey[100]} 1.09%, ${theme.palette.background.paper} 100%)`,
    [theme.breakpoints.down('md')]: {}
}));

const SectionWrapper = styled('div')({
    paddingTop: 100,
    paddingBottom: 100
});



// =============================|| LANDING MAIN ||============================= //

const FrontLanding = () => {
    const theme = useTheme();
    

    return (
        <>

            {/* 1. header and hero section */}
            {/* <HeaderWrapper id="home">
                <AppBar />
                <HeaderSection />
            </HeaderWrapper> */}
            {/* banner */}
            <HeaderWrapper id="home">
                <HeaderSection />
            </HeaderWrapper>
            {/* box stat */}
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
                <CardSection />
            </SectionWrapper>

            {/* descr1 et descr2 */}
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.100' }}>
                <CustomizeSection />
            </SectionWrapper>

            {/* 6 thematiques */}
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
                <FeatureSection/>
                {/* <Grid container spacing={4} justifyContent="center">
                    {datas.map((item) => (
                        <Grid item key={item.id}  xs={12} md={6} lg={4} sx={{ textAlign: 'center' }}>
                            <Grid container spacing={1.5}>
                                <ContentCardFront items={item} />
                            </Grid>
                        </Grid>
                    ))}
                </Grid> */}
                
            </SectionWrapper>

            {/* news letter */}
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.100' }}>
                <PreBuildDashBoard />
            </SectionWrapper>

            {/* <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
                <PeopleSection />
            </SectionWrapper> */}

            {/* desc 3 */}
            <SectionWrapper sx={{ py: 0 }}>
                <StartupProjectSection />
            </SectionWrapper>

            {/* 7. inculde section */}
            {/* <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
                <IncludeSection />
            </SectionWrapper> */}

            {/* 8. multi-language section */}
            {/* <SectionWrapper sx={{ py: 0 }}>
                <RtlInfoSection />
            </SectionWrapper> */}

            {/* partenaire */}
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
                <FrameworkSection />
            </SectionWrapper>

            {/* <Customization /> */}
        </>
    );
};

export default FrontLanding;
