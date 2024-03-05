/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

import { siteUrlApi } from 'utils/base_url_api';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Box, Container, Typography, FormControl, InputLabel, Select, MenuItem, Stack, Grid } from '@mui/material';

import Waiter from 'composants/common/Waiter';
import StateMessage from 'composants/jed/contents/StateMessage';
// import StateMessage from './StateMessage';
// import { getUser } from 'utils/user';

const validationSchema = Yup.object({
    roleChildName: Yup.string().required('Veuiller remplir ce champ'),
    roleChildAcronym: Yup.string().required('Veuiller remplir ce champ'),
    idRegion: Yup.string().required('Veuiller remplir ce champ'),
    workAddress: Yup.string().required('Veuiller remplir ce champ'),
    parrainName: Yup.string().required('Veuiller remplir ce champ'),
    parrainFonction: Yup.string().required('Veuiller remplir ce champ'),
    parrainContactNumber: Yup.string().required('Veuiller remplir ce champ'),
    username: Yup.string().required('Veuiller remplir ce champ'),
    email: Yup.string().email('email invalide').required('Veuiller remplir ce champ'),
    password: Yup.string().required('Veuiller remplir ce champ'),
    confirmPassword: Yup.string()
        .test('passwords-match', 'Les mots de passe ne correspondent pas', function (value) {
            return !value || value === this.parent.password;
        })
        .required('Veuillez confirmer votre mot de passe')
});

const NewCollectorUser = () => {
    const [isLoading, setLoading] = useState(false);

    const [regions, setRegion] = useState([]);
    const [ListeType, setListeType] = useState([]);
    const navigate = useNavigate();
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    useEffect(() => {
        axios
            .get(siteUrlApi(`regions`))
            .then((response) => {
                setRegion(response.data.items);
                console.log('azo ny regions:');
                console.log(regions);
            })
            .catch((error) => {
                console.error('Tsy Azo ny regions');
                console.error(error);
            });
    }, []);

    const [selectedImage, setSelectedImage] = useState(null);

    const formatDate = (dateString) => {
        // Assuming dateString is in "mm/dd/yyyy" format
        const parts = dateString.split('/');
        // Rearranging the parts to "yyyy-mm-dd" format
        return `${parts[2]}-${parts[0]}-${parts[1]}`;
    };
    useEffect(() => {
        axios
            .get(siteUrlApi(`institutions-base/types`))
            .then((response) => {
                setListeType(response.data.items);
                console.log('Azo ny types:');
                console.log(response.data);
                console.log('ListTypes:');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('Tsy Azo ny regions');
                console.error(error);
            });
    }, []);

    const submitFormData = async (values) => {
        console.log('Submitting form data model');
        setLoading(true);
        const formData = new FormData();

        formData.append('childInstitutionName', values.roleChildName);
        // formData.append('childInstitutionName', 'Bonhomme');
        formData.append('childInstitutionAcronym', values.roleChildAcronym);
        // formData.append('childInstitutionAcronym', 'BN');
        formData.append('childInstitutionCreatedAt', values.institutionCreation);
        // formData.append('childInstitutionCreatedAt', '2024-02-02');
        formData.append('idRegion', values.idRegion);
        formData.append('idInfoUserTafomihaavoParrain', '');
        formData.append('workAddress', values.workAddress);
        formData.append('parrainName', values.parrainName);
        formData.append('parrainFonction', values.parrainFonction);
        formData.append('parrainContactNumber', values.parrainContactNumber);
        formData.append('username', values.username);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('idRoleUserBack', 2);
        formData.append('file', values.file);

        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        console.log('ireto ny formdata');
        console.log(JSON.stringify(object));
        console.log(ListeType);

        // const idUser = getUser();
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: siteUrlApi('users-back'),
            headers: {
                // 'id-user-back': idUser,
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        };

        axios
            .request(config)
            .then((response) => {
                console.log('anaty try');
                console.log(response);
                setLoading(false);
                setShowSuccessDialog(true);
            })
            .catch((error) => {
                console.log('anaty catch');
                setShowErrorDialog(true);
                console.error(error);
                setLoading(false);
                setError(true);
            });
    };

    const handleCloseSuccessDialog = () => {
        setShowSuccessDialog(false);
        navigate('/backinterface/gestion-utilisateur/user-backoffice');
    };

    const handleCloseErrorDialog = () => {
        setShowErrorDialog(false);
    };

    const formik = useFormik({
        initialValues: {
            roleChildName: '',
            roleChildAcronym: '',
            idRegion: '',
            typeCollecteur: '',
            institutionCreation: '',
            idInfoUserTafomihaavoParrain: '',
            workAddress: '',
            parrainName: '',
            parrainFonction: '',
            parrainContactNumber: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            file: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            submitFormData(values);
        }
    });

    const handleRegionChange = (event) => {
        const regionValue = event.target.value;
        formik.setFieldValue('idRegion', regionValue);
    };

    return (
        <Box display="flex" justifyContent="center">
            <Grid container xs={12} sm={12} md={8} lg={6} sx={{ backgroundColor: '#fff', borderRadius: '8px', padding: 1 }}>
                <Waiter loadingState={isLoading} />
                <Box width="100%" display="flex" marginX={12} justifyContent="center" alignItems="center">
                    <h4>Insertion d{"'"}un nouvel utilisateur</h4>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ paddingX: 2 }}>
                        <TextField
                            fullWidth
                            id="roleChildName"
                            name="roleChildName"
                            label="NOM"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('roleChildName')}
                            error={formik.touched.roleChildName && Boolean(formik.errors.roleChildName)}
                            helperText={formik.touched.roleChildName && formik.errors.roleChildName}
                        />

                        <TextField
                            fullWidth
                            id="roleChildAcronym"
                            name="roleChildAcronym"
                            label="SIGLE"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('roleChildAcronym')}
                            error={formik.touched.roleChildAcronym && Boolean(formik.errors.roleChildAcronym)}
                            helperText={formik.touched.roleChildAcronym && formik.errors.roleChildAcronym}
                        />

                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel id="region-label">Région</InputLabel>
                            <Select
                                label="Region"
                                labelId="region-label"
                                id="region"
                                name="region"
                                onChange={handleRegionChange}
                                value={formik.values.idRegion}
                            >
                                {regions.map((region) => (
                                    <MenuItem key={region.id} value={region.id}>
                                        {region.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel id="region-label">Type</InputLabel>
                            <Select label="Type" labelId="type-label" id="type" name="type" {...formik.getFieldProps('typeCollecteur')}>
                                {ListeType.map((typeCollecteur) => (
                                    <MenuItem key={typeCollecteur.id} value={typeCollecteur.id}>
                                        {typeCollecteur.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            id="dateCreaction"
                            name="institutionCreation"
                            label="Date de création de l'institution"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('institutionCreation')}
                            error={formik.touched.institutionCreation && Boolean(formik.errors.institutionCreation)}
                            helperText={formik.touched.institutionCreation && formik.errors.institutionCreation}
                        />
                        <TextField
                            fullWidth
                            id="workAddress"
                            name="workAddress"
                            label="Siège(Adresse)"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('workAddress')}
                            error={formik.touched.workAddress && Boolean(formik.errors.workAddress)}
                            helperText={formik.touched.workAddress && formik.errors.workAddress}
                        />
                        <Box sx={{ borderRadius: '8px' }}>
                            <Stack direction="column" marginBottom={'1.5%'} spacing={2} alignItems="center" justifyContent="space-between">
                                <Box display="flex" alignItems="center">
                                    <h5>
                                        RECEPISSE ou certificat d{"'"}enregistrement{'(scan):'}
                                    </h5>
                                </Box>
                                <Box margin="normal">
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="image-upload"
                                        type="file"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setSelectedImage(reader.result);
                                                };
                                                reader.readAsDataURL(file);
                                                formik.setFieldValue('file', file);
                                            }
                                        }}
                                    />

                                    <label htmlFor="image-upload">
                                        <Button variant="contained" component="span">
                                            Parcourir
                                        </Button>
                                    </label>
                                    {selectedImage && (
                                        <Box mt={2}>
                                            <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                        </Box>
                                    )}
                                </Box>
                            </Stack>
                        </Box>

                        <Typography variant="h4" align="center" gutterBottom>
                            Information compte contact
                        </Typography>

                        <Typography variant="h5" align="center" gutterBottom>
                            Si le contact ne possede pas de compte
                        </Typography>

                        <TextField
                            fullWidth
                            id="parrainName"
                            name="parrainName"
                            label="Nom du Contact"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('parrainName')}
                            error={formik.touched.parrainName && Boolean(formik.errors.parrainName)}
                            helperText={formik.touched.parrainName && formik.errors.parrainName}
                        />

                        <TextField
                            fullWidth
                            id="parrainFonction"
                            name="parrainFonction"
                            label="Fonction du contact"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('parrainFonction')}
                            error={formik.touched.parrainFonction && Boolean(formik.errors.parrainFonction)}
                            helperText={formik.touched.parrainFonction && formik.errors.parrainFonction}
                        />

                        <TextField
                            fullWidth
                            id="parrainContactNumber"
                            name="parrainContactNumber"
                            label="Téléphone du contact"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('parrainContactNumber')}
                            error={formik.touched.parrainContactNumber && Boolean(formik.errors.parrainContactNumber)}
                            helperText={formik.touched.parrainContactNumber && formik.errors.parrainContactNumber}
                        />

                        <Typography variant="h5" align="center" gutterBottom>
                            Compte
                        </Typography>

                        <TextField
                            fullWidth
                            id="username"
                            name="username"
                            label="Nom de l'utilisateur"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('username')}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />

                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="E-mail"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Mot de passe"
                            variant="outlined"
                            margin="normal"
                            type="password" // Set type to "password"
                            {...formik.getFieldProps('password')}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirmer le mot de passe"
                            variant="outlined"
                            margin="normal"
                            type={'password'}
                            {...formik.getFieldProps('confirmPassword')}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                    </Box>

                    <Box display="flex" justifyContent="space-between" marginTop={2}>
                        <Button type="submit" variant="contained" color="primary">
                            {isLoading === false ? 'S`inscrire' : 'Validation en cours...'}
                        </Button>
                    </Box>
                </form>

                <StateMessage
                    showSuccessDialog={showSuccessDialog}
                    showErrorDialog={showErrorDialog}
                    handleCloseErrorDialog={handleCloseErrorDialog}
                    handleCloseSuccessDialog={handleCloseSuccessDialog}
                />
            </Grid>
        </Box>
    );
};

export default NewCollectorUser;
