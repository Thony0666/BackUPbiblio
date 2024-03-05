import { Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { gridSpacing } from 'store/constant';

export const AgeSexeChart = () => {
    const [state] = useState({
        series: [
            {
                name: 'Homme',
                data: [44, 55, 41]
            },
            {
                name: 'Femme',
                data: [53, 32, 33]
            }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    dataLabels: {
                        total: {
                            enabled: true,
                            offsetX: 0,
                            style: {
                                fontSize: '13px',
                                fontWeight: 900
                            }
                        }
                    }
                }
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            title: {
                text: 'Fiction Books Sales'
            },
            xaxis: {
                categories: ['-18', '18-35', '35+']
            },
            yaxis: {
                title: {
                    text: undefined
                }
            },
            // tooltip: {
            //     y: {
            //         formatter: function (val) {
            //             return val + 'K';
            //         }
            //     }
            // },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
            }
        }
    });

    return (
        <Container maxWidth="sm">
            <Grid container spacing={gridSpacing} alignItems="flex-start">
                <Grid item md={12} lg={12} xs={12}>
                    <ReactApexChart options={state.options} series={state.series} type="bar" height={500} />
                </Grid>
            </Grid>
        </Container>
    );
};
