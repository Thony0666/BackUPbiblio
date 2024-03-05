import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import * as Yup from 'yup';

import { TextField, Button, Box, Container, Typography } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { margin } from '@mui/system';
import { siteUrlApi } from 'utils/base_url_api';
import Waiter from 'composants/common/Waiter';

const validationSchema = Yup.object({
    regionName: Yup.string().required('Veuiller remplir ce champ')
});

const AddRegion = () => {
    const API_URL = 'https://api.tafomihaavo.mg/tahiry/v1/';
    const [isLoading, setLoading] = useState(true);
    const [regions, setRegion] = useState([]);
    const [refresh, setRefresh] = useState(false);
    /*Maka region*/
    useEffect(() => {
        axios
            .get(API_URL + `regions`)
            .then((response) => {
                setRegion(response.data.items);
                setLoading(false);
                console.log('okey azo');
                console.log(response.data.items);
                setRefresh(false);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, [refresh]);

    const submitFormData = async (values) => {
        setLoading(true);
        const myData = { name: values.regionName };
        // const myDataJson = JSON.stringify(myData);
        // const config = {
        //     method: 'post',
        //     maxBodyLength: Infinity,
        //     url: 'https://api.tafomihaavo.mg/tahiry/v1/regions',
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     },
        //     data: myDataJson
        // };
        // console.log('json data', myDataJson);

        // axios
        //     .request(config)
        //     .then((reponse) => {
        //         console.log(reponse);
        //     })
        //     .catch((olana) => {
        //         console.error(olana);
        //     });

        const customConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios
            .post(siteUrlApi('regions'), JSON.stringify(myData), customConfig)
            .then((reponse) => {
                console.log(reponse);
                setRefresh(true);
            })
            .catch((olana) => {
                console.error(olana);
            });
    };

    const formik = useFormik({
        initialValues: {
            regionName: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            submitFormData(values);
        }
    });
    if (isLoading) {
        return <Waiter loadingState={isLoading} />;
    } else {
        return (
            <Container maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom>
                    Insertion d{"'"}une nouvelle région
                </Typography>
                <Waiter />

                <form onSubmit={formik.handleSubmit}>
                    <Box>
                        <TextField
                            fullWidth
                            id="regionName"
                            name="regionName"
                            label="Nom du region"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('regionName')}
                            error={formik.touched.regionName && Boolean(formik.errors.regionName)}
                            helperText={formik.touched.regionName && formik.errors.regionName}
                        />
                    </Box>

                    <Box display="flex" justifyContent="space-between" marginTop={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Valider
                        </Button>
                    </Box>
                </form>
                <div
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        height: '100%',
                        paddingLeft: 'auto',
                        paddingRight: 'auto',
                        marginLeft: '10%',
                        marginRight: '10%',
                        maxHeight: '60%'
                    }}
                >
                    <List>
                        {regions.map((reg) => (
                            <ListItem key={reg.id}>
                                <ListItemText primary={reg.name} />
                            </ListItem>
                        ))}
                    </List>
                </div>

                {/* <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
                <FixedSizeList height={400} width={360} itemSize={46} itemCount={200} overscanCount={5}>
                    {regions.map((reg) => (
                        <ListItem key={reg.id} component="div" disablePadding>
                            <ListItemButton>
                                <ListItemText primary={reg.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </FixedSizeList>
            </Box> */}
            </Container>
        );
    }
};

export default AddRegion;
