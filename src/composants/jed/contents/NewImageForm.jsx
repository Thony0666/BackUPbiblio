import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

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
    Select
} from '@mui/material';

const acces = [
    { titre: 'Visiteur', accesValue: 10 },
    { titre: 'Membre', accesValue: 20 },
    { titre: 'Payant', accesValue: 30 },
    { titre: 'Archive', accesValue: 40 }
];
const validationSchema = Yup.object({
    title: Yup.string().required('Veuiller remplir ce champ'),
    author: Yup.string().required('Veuiller remplir ce champ'),
    theme: Yup.string().required('Veuiller remplir ce champ'),
    acces: Yup.string().required('Veuiller remplir ce champ'),
    description: Yup.string().required('Veuiller remplir ce champ')
});

const NewImageForm = () => {
    const API_URL = 'https://api.tafomihaavo.mg/tahiry/v1/';

    const [regions, setRegion] = useState([]);
    const [themes, setThemes] = useState([]);
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
            .get(API_URL + `regions`)
            .then((response) => {
                setRegion(response.data.items);
                console.log('okey azo');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(API_URL + `themes`)
            .then((response) => {
                setThemes(response.data.items);
                console.log('okey azo');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, []);

    const [activeStep, setActiveStep] = useState(0);

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            region: '',
            acces: null,
            regionid: [],
            zone: '',
            theme: '',
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission logic here
            console.log(values);
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
            <Typography variant="h4" align="center" gutterBottom>
                Insertion d{"'"}une nouvelle image
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
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="image-upload"
                            type="file"
                            onChange={(e) => {
                                formik.setFieldValue('image', e.currentTarget.files[0]);
                            }}
                        />
                        <label htmlFor="image-upload">
                            <Button variant="outlined" component="span" sx={{ margin: '20px' }}>
                                Parcourir L{"'"}Image
                            </Button>
                        </label>
                        {formik.values.image && (
                            <div>
                                {/* <Typography variant="subtitle1" gutterBottom>
                  Aperçu de l{'\''}image:
                </Typography> */}
                                <img
                                    src={URL.createObjectURL(formik.values.image)}
                                    alt="Preview"
                                    style={{ maxWidth: '100%', maxHeight: '55vh' }}
                                />
                            </div>
                        )}
                    </Box>
                )}

                <Box display="flex" justifyContent="space-between" marginTop={2}>
                    <Button disabled={activeStep === 0} onClick={handleBack} color="primary">
                        Retour
                    </Button>
                    <Button type="submit" variant="contained" color="primary" onClick={handleNext}>
                        {activeStep === 1 ? 'Valider' : 'Suivant'}
                    </Button>
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
        </Container>
    );
};

export default NewImageForm;
