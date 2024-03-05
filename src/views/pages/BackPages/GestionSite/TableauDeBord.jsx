import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React from 'react';

import { gridSpacing } from 'store/constant';
import VisitorChart from 'composants/jed/charts/VisitorChart';
import { AgeSexeChart } from 'composants/jed/charts/AgeSexeChart';
import { ProfileChart } from 'composants/jed/charts/ProfileChart';
import { ProfessionChart } from 'composants/jed/charts/ProfessionChart';

const TableauDeBord = () => {
    const theme = useTheme();
    const blockSX = {
        p: 1,
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Grid container spacing={gridSpacing} alignItems="center">
            <Grid item md={8} lg={8} xs={12}>
                <VisitorChart />
            </Grid>
            <Grid item md={8} lg={4} xs={12}>
                <AgeSexeChart />
            </Grid>
            <Grid item md={6} lg={6} xs={6}>
                <ProfileChart />
            </Grid>
            <Grid item md={6} lg={6} xs={6}>
                <ProfessionChart />
            </Grid>
        </Grid>
    );
};

export default TableauDeBord;
