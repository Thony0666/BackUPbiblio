import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { siteUrlApi } from 'utils/base_url_api';
import { useNavigate } from 'react-router-dom';

import {
    TextField,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Box,
    Container,
    Typography,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    Stepper,
    Step,
    StepLabel,
    Select,
    Hidden
} from '@mui/material';
import Waiter from 'composants/common/Waiter';
import StateMessage from './StateMessage';
import { getUser } from 'utils/user';
import { useAuthTemp } from 'utils/auth';

const acces = [
    { titre: 'Public', accesValue: 10 },
    { titre: 'Communauté', accesValue: 20 },
    { titre: 'Payant', accesValue: 30 },
    { titre: 'Archive', accesValue: -10 }
];

const validationSchema = Yup.object({
    title: Yup.string().required('Veuiller remplir ce champ'),
    author: Yup.string().required('Veuiller remplir ce champ'),
    theme: Yup.string().required('Veuiller remplir ce champ'),
    acces: Yup.string().required('Veuiller remplir ce champ'),
    description: Yup.string().required('Veuiller remplir ce champ')
});

const NewPdfForm = () => {
    const [isLoading, setLoading] = useState(true);
    const auth = useAuthTemp();
    const userBack = auth.getUserBack();
    const idUser = userBack.id;
    console.log('this is the userBack user', idUser);

    const [pdfContent, setPdfContent] = useState(null);
    const [regions, setRegion] = useState([]);
    const [themes, setThemes] = useState([]);
    const navigate = useNavigate();
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const zoneOptions = {
        zones: [
            {
                idZone: 1,
                typeZone: 'Nationale'
            },
            {
                idZone: 2,
                typeZone: 'Régionale'
            },
            {
                idZone: 3,
                typeZone: 'InterNationale'
            }
        ]
    };

    useEffect(() => {
        axios
            .get(siteUrlApi(`regions`))
            .then((response) => {
                setRegion(response.data.items);
            })
            .catch((error) => {
                console.error('Tsy Azo ny regions');
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(siteUrlApi(`themes`))
            .then((response) => {
                setThemes(response.data.items);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Tsy azo ny themes');
            });
    }, []);

    const [activeStep, setActiveStep] = useState(0);

    const submitFormData = async (values) => {
        console.log('Submitting form data model');
        setLoading(true);
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('author', values.author);
        formData.append('idTheme', values.theme);
        formData.append('idUserBack', 3);
        formData.append('description', values.description);
        formData.append('articleContent', '');
        formData.append('access', values.acces);
        formData.append('status', 100);
        formData.append('file', values.file);

        if (values.region != '') {
            formData.append('idRegion', values.region);
            formData.append('isNational', 0);
            formData.append('isInternational', 0);
            console.log('misy region');
        } else if (values.zone === 'Nationale') {
            formData.append('isNational', 1);
            formData.append('isInternational', 0);
            console.log('misy National');
        } else if (values.zone === 'InterNationale') {
            formData.append('isInternational', 1);
            formData.append('isNational', 0);
            console.log('misy international');
        } else {
            console.log('tsy azo ny zones');
        }

        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        console.log(JSON.stringify(object));

        // const customConfig = {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: siteUrlApi('contents-back/pdf'),
            headers: {
                'id-user-back': idUser,
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
        navigate('/backinterface/gestion-contenu/mes-contenus');
    };

    const handleCloseErrorDialog = () => {
        setShowErrorDialog(false);
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            region: '',
            acces: null,
            regionid: [],
            zone: '',
            theme: '',
            description: '',
            file: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // if (activeStep !== 1) {
            console.log('Starting to submit');
            console.log(values);
            submitFormData(values);
            // }
        }
    });

    const handleNext = () => {
        formik.validateForm().then((errors) => {
            if (activeStep === 0 && !errors.title && !errors.author && !errors.theme && !errors.acces && !errors.description) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } else if (activeStep === 1 && Object.keys(errors).length === 0) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        });
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleZoneChange = (event) => {
        const zoneValue = event.target.value;
        formik.setFieldValue('zone', zoneValue);

        // Reset region when changing zone
        formik.setFieldValue('region', '');
        formik.setFieldValue('regionid', null);
    };

    const handleRegionChange = (event) => {
        const regionValue = event.target.value;
        formik.setFieldValue('region', regionValue);

        // Set regionid when changing region in Regionale zone
        if (formik.values.zone === 'Regionale') {
            formik.setFieldValue('regionid', regions.id);
        }
    };

    return (
        <Container maxWidth="md">
            <Waiter loadingState={isLoading} />

            <Typography variant="h4" align="center" gutterBottom>
                Insertion d{"'"}un nouveau PDF
            </Typography>

            <form onSubmit={formik.handleSubmit}>
                {activeStep === 0 && (
                    <Box>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Titre"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('title')}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />

                        <TextField
                            fullWidth
                            id="author"
                            name="author"
                            label="Auteur"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('author')}
                            error={formik.touched.author && Boolean(formik.errors.author)}
                            helperText={formik.touched.author && formik.errors.author}
                        />

                        <FormControl component="fieldset" fullWidth margin="normal">
                            <FormLabel component="legend">Zone</FormLabel>
                            <RadioGroup row aria-label="zone" name="zone" value={formik.values.zone} onChange={handleZoneChange}>
                                {zoneOptions.zones.map((zone) => (
                                    <FormControlLabel key={zone.idZone} value={zone.typeZone} control={<Radio />} label={zone.typeZone} />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        {formik.values.zone === 'Régionale' && (
                            <FormControl fullWidth variant="outlined" margin="normal">
                                <InputLabel id="region-label">Région</InputLabel>
                                <Select
                                    label="Region"
                                    labelId="region-label"
                                    id="region"
                                    name="region"
                                    onChange={handleRegionChange}
                                    value={formik.values.region}
                                >
                                    {regions.map((region) => (
                                        <MenuItem key={region.id} value={region.id}>
                                            {region.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel id="theme-label">Thématique</InputLabel>
                            <Select
                                label="Thematique"
                                labelId="theme-label"
                                id="theme"
                                name="theme"
                                {...formik.getFieldProps('theme')}
                                error={formik.touched.theme && Boolean(formik.errors.theme)}
                                helperText={formik.touched.theme && formik.errors.theme}
                            >
                                {themes.map((theme) => (
                                    <MenuItem key={theme.id} value={theme.id}>
                                        {theme.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel id="theme-label">Accès</InputLabel>
                            <Select
                                label="Accès"
                                id="acces"
                                name="acces"
                                {...formik.getFieldProps('acces')}
                                error={formik.touched.acces && Boolean(formik.errors.acces)}
                                helperText={formik.touched.acces && formik.errors.acces}
                            >
                                {acces.map((acces) => (
                                    <MenuItem key={acces} value={acces.accesValue}>
                                        {acces.titre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            id="description"
                            multiline
                            minRows={3}
                            maxRows={10}
                            name="description"
                            label="Description"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('description')}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Box>
                )}

                {activeStep === 1 && (
                    <Box margin="normal" display="flex" flexDirection="column" alignItems="center">
                        <input
                            accept=".pdf"
                            id="pdf-file"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(event) => {
                                const file = event.target.files[0];
                                formik.setFieldValue('file', file);

                                if (file) {
                                    const reader = new FileReader();

                                    reader.onloadend = () => {
                                        // Set the PDF file content to a state variable
                                        setPdfContent(reader.result);
                                    };

                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        <label htmlFor="pdf-file">
                            <Button component="span" variant="outlined" color="primary">
                                Parcourir Un PDF
                            </Button>
                        </label>

                        {pdfContent && (
                            <Box marginTop={2}>
                                <iframe title="PDF Preview" src={pdfContent} width="100%" height="500"></iframe>
                            </Box>
                        )}
                    </Box>
                )}

                <Box display="flex" justifyContent="space-between" marginTop={2}>
                    <Button disabled={activeStep === 0} onClick={handleBack} color="primary">
                        Retour
                    </Button>

                    {activeStep === 1 ? (
                        <input type="hidden" />
                    ) : (
                        <Button onClick={handleNext} variant="contained" color="primary">
                            Suivant
                        </Button>
                    )}

                    {activeStep === 1 && (
                        <Button type="submit" variant="contained" color="primary">
                            {isLoading === false ? 'Valider' : 'Validation...'}
                        </Button>
                    )}
                </Box>
            </form>
            <Stepper activeStep={activeStep} alternativeLabel>
                <Step key="AjoutInfo">
                    <StepLabel>Ajout Information Du Contenu</StepLabel>
                </Step>
                <Step key="TexteContenu">
                    <StepLabel>Texte du contenu</StepLabel>
                </Step>
            </Stepper>
            <StateMessage
                showSuccessDialog={showSuccessDialog}
                showErrorDialog={showErrorDialog}
                handleCloseErrorDialog={handleCloseErrorDialog}
                handleCloseSuccessDialog={handleCloseSuccessDialog}
            />
        </Container>
    );
};

export default NewPdfForm;
