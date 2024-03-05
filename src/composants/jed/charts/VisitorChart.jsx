import { Button, Container, Grid, InputLabel, Paper, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

import { LocalizationProvider } from '@mui/x-date-pickers';

import { gridSpacing } from 'store/constant';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { styled } from '@mui/material/styles';

function VisitorChart() {
    const allData = [
        { x: '2022-01-01', y: 100 },
        { x: '2022-02-01', y: 150 },
        { x: '2022-03-01', y: 155 },
        { x: '2022-04-01', y: 200 },
        { x: '2022-05-01', y: 250 },
        { x: '2022-06-01', y: 128 },
        { x: '2022-07-01', y: 130 },
        { x: '2022-08-01', y: 150 },
        { x: '2022-09-01', y: 200 },
        { x: '2022-10-01', y: 300 },
        { x: '2022-11-01', y: 350 },
        { x: '2022-12-01', y: 450 }
        // { x: '2023-01-01', y: 120 },
        // { x: '2023-02-01', y: 180 },
        // { x: '2023-03-01', y: 155 },
        // { x: '2023-04-01', y: 200 },
        // { x: '2023-05-01', y: 250 },
        // { x: '2023-06-01', y: 128 },
        // { x: '2023-07-01', y: 130 },
        // { x: '2023-08-01', y: 150 },
        // { x: '2023-09-01', y: 200 },
        // { x: '2023-10-01', y: 300 },
        // { x: '2023-11-01', y: 350 },
        // { x: '2023-12-01', y: 450 },
        // { x: '2024-01-01', y: 200 },
        // { x: '2024-02-01', y: 250 },
        // { x: '2024-03-01', y: 155 },
        // { x: '2024-04-01', y: 200 },
        // { x: '2024-05-01', y: 250 },
        // { x: '2024-06-01', y: 300 },
        // { x: '2024-07-01', y: 358 },
        // { x: '2024-08-01', y: 400 },
        // { x: '2024-09-01', y: 500 },
        // { x: '2024-10-01', y: 560 },
        // { x: '2024-11-01', y: 600 },
        // { x: '2024-12-01', y: 800 }
    ];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filterData = () => {
        if (startDate === '' || endDate === '') {
            return allData;
        }
        return allData.filter((entry) => entry.x >= startDate && entry.x <= endDate);
    };

    const options = {
        chart: {
            id: 'basic-line',
            toolbar: {
                show: false
            }
        },

        xaxis: {
            categories: allData.map((entry) => entry.x)
        }
    };

    const series = [
        {
            name: 'Nombre de vues',
            data: allData.map((entry) => entry.y)
        }
    ];
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB'); // Adjust the locale as needed
        return formattedDate;
    };

    const handleEndDateChange = (e) => {
        const selectedDate = e.target.value;
        setEndDate(selectedDate);

        // Log the date using the desired format
        const formattedDate = formatDate(selectedDate);
        console.log(formattedDate);
    };

    const handleStartDateChange = (e) => {
        const selectedDate = e.target.value;
        setStartDate(selectedDate);

        // Log the date using the desired format
        const formattedDate = formatDate(selectedDate);
        console.log(formattedDate);
    };

    const dateFilter = () => {
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }));

    return (
        <Container maxWidth="md">
            <Grid container>
                <Grid item md={12} lg={12} xs={12}>
                    <Grid container spacing={gridSpacing} alignItems="flex-start">
                        <Grid item md={5} lg={5} xs={12}>
                            <InputLabel htmlFor="startDate" shrink={true}>
                                Début
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TextField
                                    fullWidth
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item md={5} lg={5} xs={12}>
                            <InputLabel htmlFor="endDate" shrink={true}>
                                Fin
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TextField
                                    fullWidth
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item md={1} lg={1} xs={12}>
                            <Button variant="contained" sx={{ padding: 1, margin: 3 }} onClick={dateFilter}>
                                Valider
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                    <Chart options={options} series={series} type="line" height={350} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default VisitorChart;
