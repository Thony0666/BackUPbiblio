/* eslint-disable prettier/prettier */
import bannerImage from 'assets/images/profile/fond-profile.jpg';
import Fab from '@mui/material/Fab';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import * as yup from 'yup';
import { Stack, Box, Avatar, Grid, Button, IconButton, Typography, TextField } from '@mui/material';
import * as React from 'react';
import { useFormik } from 'formik';
import { siteUrlApi } from 'utils/base_url_api';
import axios from 'axios';
import StateNotification from 'composants/thony/component/StateNotification';
import { useState } from 'react';
import Waiter from 'composants/common/Waiter';
const validationSchema = yup.object({
    lastName: yup.string('Veuillez entrer votre nom de famille').required('Le nom de famille est obligatoire'),
    firstName: yup.string('Veuillez entrer votre prénom').required('Le prénom est obligatoire'),
    email: yup
        .string('Veuillez entrer votre adresse e-mail')
        .email('Veuillez entrer une adresse e-mail valide')
        .required("L'adresse e-mail est obligatoire"),
    object: yup.string('Veuillez entrer votre nom de famille').required('Le nom de famille est obligatoire'),
    message: yup.string('Veuillez entrer le lieu de délivrance de la CIN').required('Le lieu de délivrance de la CIN est obligatoire')
});
function ContactUs() {
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            object: '',
            message: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            submitFormData(values);
            console.log(JSON.stringify(values, null, 2));
        }
    });
    const submitFormData = async (values) => {
        console.log('Submitting form data model');
        const myData = {
            lastName: values.lastName,
            firstName: values.firstName,
            email: values.email,
            object: values.object,
            message: values.message
        };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: siteUrlApi('contact-us'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: myData
        };

        axios
            .request(config)
            .then((response) => {
                console.log('Tafiditra');
                console.log(response);
                setShowSuccessDialog(true);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Ampio Rora');
                console.error(error);
                setShowErrorDialog(true);
                setLoading(false);
            });
    };
    const handleCloseSuccessDialog = () => {
        setShowSuccessDialog(false);
    };

    const handleCloseErrorDialog = () => {
        setShowErrorDialog(false);
    };
    return (
        <>
            <Waiter loadingState={isLoading} />
            <Grid
                container
                justifyContent={'flex-start'}
                mb={3}
                boxShadow={2}
                padding={1}
                sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '8px'
                }}
            >
                <Typography variant="h2">Handefa hafatra</Typography>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
                <Grid container justifyContent={'center'} py={3} bgcolor={'white'} borderRadius={4}>
                    <Grid container justifyContent={'center'} direction={'row'}>
                        <Grid container justifyContent={'center'} item md={4} px={2}>
                            <TextField
                                sx={{ my: 2 }}
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Anarana"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </Grid>
                        <Grid container justifyContent={'center'} item md={4} px={2}>
                            <TextField
                                sx={{ my: 2 }}
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="Fanampiny"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </Grid>
                        <Grid container justifyContent={'center'} item md={4} px={2}>
                            <TextField
                                sx={{ my: 2 }}
                                fullWidth
                                id="email"
                                name="email"
                                label="Mailaka"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'center'} direction={'row'}>
                        <Grid container justifyContent={'center'} px={2}>
                            <TextField
                                sx={{ my: 2 }}
                                fullWidth
                                id="object"
                                name="object"
                                label="Antony"
                                value={formik.values.object}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.object && Boolean(formik.errors.object)}
                                helperText={formik.touched.object && formik.errors.object}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'center'} direction={'row'}>
                        <Grid container justifyContent={'center'} px={2}>
                            <TextField
                                sx={{ my: 2 }}
                                fullWidth
                                id="message"
                                name="message"
                                label="Hafatra"
                                multiline
                                rows={6}
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.message && Boolean(formik.errors.message)}
                                helperText={formik.touched.message && formik.errors.message}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'flex-end'} px={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Handefa
                        </Button>
                    </Grid>
                    <StateNotification
                        showSuccessDialog={showSuccessDialog}
                        showErrorDialog={showErrorDialog}
                        handleCloseSuccessDialog={handleCloseSuccessDialog}
                        successMessage="Votre message a ete envoyer!"
                        handleCloseErrorDialog={handleCloseErrorDialog}
                        errorMessage="Erreur : Veuillez vérifier le format"
                    />
                </Grid>
            </form>
        </>
    );
}
export default ContactUs;
