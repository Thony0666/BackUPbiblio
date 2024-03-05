import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Chart from 'react-apexcharts';
import MainCard from 'ui-component/cards/MainCard';
import useConfig from 'hooks/useConfig';

export const ProfileChart = () => {
    const allData = [
        { type: 'Handicapé', nombre: 100 },
        { type: 'Marginalisé', nombre: 150 },
        { type: 'Aucun', nombre: 400 }
    ];

    const options = {
        chart: {
            id: 'basic-pie'
        },
        labels: allData.map((data) => data.type),
        legend: {
            show: true,
            position: 'bottom',
            fontFamily: 'inherit',
            labels: {
                colors: 'inherit'
            }
        },
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: false
            }
        },
        theme: {
            mode: 'light',
            palette: 'palette1',
            monochrome: {
                enabled: true,
                color: '#1B998B',
                shadeTo: 'light',
                shadeIntensity: 0.65
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    }
                }
            }
        ]
    };

    const series = allData.map((data) => data.nombre);

    const { rtlLayout } = useConfig();
    return (
        <MainCard>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Typography variant="subtitle1">Profil Des Utilisateurs</Typography>
                </Grid>
                <Grid item sx={{ '& .apexcharts-legend-text': { marginLeft: rtlLayout ? '8px' : 'initial' } }}>
                    <Chart options={options} series={series} type="pie" width={380} />
                    </Grid>
            </Grid>
        </MainCard>
    );
};
