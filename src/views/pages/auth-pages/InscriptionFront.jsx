/* eslint-disable prettier/prettier */
// http://localhost:3000/login/inscriptiontafo
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Button,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    MenuItem,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { siteUrlApi } from 'utils/base_url_api';
import { useNavigate } from 'react-router-dom';
import StateNotification from 'composants/thony/component/StateNotification';

const validationSchema = yup.object({
    email: yup
        .string('Veuillez entrer votre adresse e-mail')
        .email('Veuillez entrer une adresse e-mail valide')
        .required("L'adresse e-mail est obligatoire"),
    phoneNumber: yup.string('Veuillez entrer votre adresse numero').required('Le numero est obligatoire'),
    password: yup
        .string('Veuillez entrer votre mot de passe')
        .min(4, 'Le mot de passe doit contenir au moins 8 caractères')
        .required('Le mot de passe est obligatoire'),
    confirmPassword: yup
        .string('Veuillez confirmer votre mot de passe')
        .oneOf([yup.ref('password'), null], 'Les mots de passe doivent correspondre')
        .required('Veuillez confirmer votre mot de passe'),
    firstName: yup.string('Veuillez entrer votre prénom').required('Le prénom est obligatoire'),
    lastName: yup.string('Veuillez entrer votre nom de famille').required('Le nom de famille est obligatoire'),
    userName: yup.string('Veuillez entrer votre nom de famille').required('Le nom de famille est obligatoire'),
    dateDeN: yup.date('Veuillez entrer votre date de naissance').required('La date de naissance est obligatoire'),
    sex: yup.string('Veuillez entrer votre sexe').required('Le sexe est obligatoire'),
    cinNumber: yup
        .string('Veuillez entrer votre numéro CIN')
        .min(12, 'Le numéro CIN doit contenir au moins 12 caractères')
        .required('Le numéro CIN est obligatoire'),
    dateCIN: yup.date('Veuillez entrer la date de délivrance de la CIN').required('La date de délivrance de la CIN est obligatoire'),
    lieuCIN: yup.string('Veuillez entrer le lieu de délivrance de la CIN').required('Le lieu de délivrance de la CIN est obligatoire'),
    region: yup.string('Veuillez entrer votre région').required('La région est obligatoire'),
    adresse: yup.string('Veuillez entrer votre adresse').required("L'adresse est obligatoire"),
    affiliation: yup.string('Veuillez entrer votre affiliation').required("L'affiliation est obligatoire"),
    sutiationPro: yup.string('Veuillez entrer votre situation professionnelle').required('La situation professionnelle est obligatoire'),
    profile: yup.string('Veuillez entrer votre profil').required('Le profil est obligatoire')
});

const RegistrationFormTafo = () => {
    const [datasRegion, setDatasRegion] = useState([]);
    const navigate = useNavigate();
    const [affiliations, setAffiliations] = useState([]);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [sutiationPro, setSutiationPro] = useState([]);
    const [profile, setProfile] = useState([]);

    const submitFormData = async (values) => {
        console.log('Submitting form data model');
        const myData = {
            idInstitutionBase: values.affiliation,
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.userName,
            birthday: values.dateDeN,
            gender: values.sex,
            phoneNumber: values.phoneNumber,
            cin: parseInt(values.cinNumber),
            cinDate: values.dateCIN,
            idRegion: values.region,
            officePost: 'dev',
            email: values.email,
            password: values.password,
            idProfession: values.sutiationPro,
            idHandicap: values.profile
        };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: siteUrlApi('users-front/tafomihaavo'),
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
            })
            .catch((error) => {
                console.log('Ampio Rora');
                console.error(error);
                setShowErrorDialog(true);
            });
    };
    const handleCloseSuccessDialog = () => {
        setShowSuccessDialog(false);
        navigate('/');
    };

    const handleCloseErrorDialog = () => {
        setShowErrorDialog(false);
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            userName: '',
            dateDeN: '',
            sex: '',
            phoneNumber: '',
            cinNumber: '',
            dateCIN: '',
            lieuCIN: '',
            region: '',
            adresse: '',
            affiliation: '',
            sutiationPro: '',
            profile: '',
            showPassword: false,
            showPassword1: false
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submitFormData(values);
            console.log(JSON.stringify(values, null, 2));
        }
    });

    useEffect(() => {
        axios
            .get(siteUrlApi('regions'))
            .then((response) => {
                setDatasRegion(response.data.items);
                console.log('okey azo region');
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get(siteUrlApi('institutions-base/'))
            .then((response) => {
                setAffiliations(response.data.items);
                console.log('okey azo institutions');
            })
            .catch((error) => {
                console.error('tsy mandeha institutions');
                console.error(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get(siteUrlApi('users-front/statistics/gender'))
            .then((response) => {
                setGender(response.data.items);
                console.log('okey azo handicaps');
            })
            .catch((error) => {
                console.error('tsy mandeha handicaps');
                console.error(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get(siteUrlApi('professions'))
            .then((response) => {
                setSutiationPro(response.data.items);
                console.log('okey azo professions');
            })
            .catch((error) => {
                console.error('tsy mandeha professions');
                console.error(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get(siteUrlApi('handicaps'))
            .then((response) => {
                setProfile(response.data.items);
                console.log('okey azo handicaps');
            })
            .catch((error) => {
                console.error('tsy mandeha handicaps');
                console.error(error);
            });
    }, []);

    return (
        <>
            <Typography sx={{ my: 3 }} color={'secondary'} textAlign={'center'} variant="h1">
                Formulaire inscription TAFO MIHAAVO
            </Typography>
            <Grid sx={{ width: '100%' }} container justifyContent="center" alignItems="center">
                <form onSubmit={formik.handleSubmit}>
                    <Grid
                        sx={{
                            boxShadow: '5px 7px 10px 10px rgba(0, 0, 0, 0.1)',
                            padding: 3,
                            borderRadius: 4,
                            textAlign: 'center',
                            minWidth: '400px',
                            maxWidth: '36vw'
                            // border: '2px solid red'
                        }}
                    >
                        <Typography color={'secondary'} textAlign={'center'} variant="h2">
                            Identifications
                        </Typography>

                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Numero"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        />
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            id="password"
                            name="password"
                            label="Mot de pass"
                            type={formik.values.showPassword ? 'text' : 'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                formik.setValues({ ...formik.values, showPassword: !formik.values.showPassword })
                                            }
                                            edge="end"
                                        >
                                            {formik.values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirmation mot de passe"
                            type={formik.values.showPassword1 ? 'text' : 'password'}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                formik.setValues({ ...formik.values, showPassword1: !formik.values.showPassword1 })
                                            }
                                            edge="end"
                                        >
                                            {formik.values.showPassword1 ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="Nom"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Prénom"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            id="userName"
                            name="userName"
                            label="Anarapetaka"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                        />
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            id="dateDeN"
                            name="dateDeN"
                            label="Date de Naissance"
                            type="date"
                            value={formik.values.dateDeN}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={formik.touched.dateDeN && Boolean(formik.errors.dateDeN)}
                            helperText={formik.touched.dateDeN && formik.errors.dateDeN}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            sx={{ my: 2 }}
                            fullWidth
                            id="sex"
                            name="sex"
                            value={formik.values.sex}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sex && Boolean(formik.errors.sex)}
                            helperText={formik.touched.sex && formik.errors.sex}
                        >
                            <FormControlLabel value="homme" control={<Radio />} label="Homme" />
                            <FormControlLabel value="femme" control={<Radio />} label="Femme" />
                        </RadioGroup>
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            id="cinNumber"
                            name="cinNumber"
                            label="Numero de CIN"
                            value={formik.values.cinNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.cinNumber && Boolean(formik.errors.cinNumber)}
                            helperText={formik.touched.cinNumber && formik.errors.cinNumber}
                        />
                        <Stack direction={'row'} spacing={3} my={2}>
                            <TextField
                                fullWidth
                                id="dateCIN"
                                name="dateCIN"
                                label="Fait le"
                                type="date"
                                value={formik.values.dateCIN}
                                error={formik.touched.dateCIN && Boolean(formik.errors.dateCIN)}
                                helperText={formik.touched.dateCIN && formik.errors.dateCIN}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                fullWidth
                                id="lieuCIN"
                                name="lieuCIN"
                                label="A"
                                value={formik.values.lieuCIN}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lieuCIN && Boolean(formik.errors.lieuCIN)}
                                helperText={formik.touched.lieuCIN && formik.errors.lieuCIN}
                            />
                        </Stack>

                        <TextField
                            sx={{ mb: 2 }}
                            fullWidth
                            id="region"
                            name="region"
                            label="Region"
                            select
                            value={formik.values.region}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.region && Boolean(formik.errors.region)}
                            helperText={formik.touched.region && formik.errors.region}
                        >
                            {datasRegion &&
                                datasRegion.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            id="adresse"
                            name="adresse"
                            label="Adresse"
                            value={formik.values.adresse}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.adresse && Boolean(formik.errors.adresse)}
                            helperText={formik.touched.adresse && formik.errors.adresse}
                        />
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            id="affiliation"
                            name="affiliation"
                            label="Affiliation"
                            select
                            value={formik.values.affiliation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.affiliation && Boolean(formik.errors.affiliation)}
                            helperText={formik.touched.affiliation && formik.errors.affiliation}
                        >
                            {affiliations &&
                                affiliations.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                        <Typography textAlign={'left'} variant="h3" color={'black'} mt={2}>
                            Situation Professionel
                        </Typography>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            sx={{ mb: 2 }}
                            fullWidth
                            id="sutiationPro"
                            name="sutiationPro"
                            value={formik.values.sutiationPro}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sutiationPro && Boolean(formik.errors.sutiationPro)}
                            helperText={formik.touched.sutiationPro && formik.errors.sutiationPro}
                        >
                            {sutiationPro &&
                                sutiationPro.map((option) => (
                                    <FormControlLabel control={<Radio />} label={option.name} key={option.id} value={option.id} />
                                ))}
                        </RadioGroup>
                        <Typography textAlign={'left'} variant="h3" color={'black'}>
                            Profile
                        </Typography>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            sx={{ mb: 2 }}
                            fullWidth
                            id="profile"
                            name="profile"
                            value={formik.values.profile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.profile && Boolean(formik.errors.profile)}
                            helperText={formik.touched.profile && formik.errors.profile}
                        >
                            {profile &&
                                profile.map((option) => (
                                    <FormControlLabel control={<Radio />} label={option.name} key={option.id} value={option.id} />
                                ))}
                        </RadioGroup>

                        <Button fullWidth color="secondary" variant="contained" type="submit">
                            Inscrit
                        </Button>
                        <StateNotification
                            showSuccessDialog={showSuccessDialog}
                            showErrorDialog={showErrorDialog}
                            handleCloseSuccessDialog={handleCloseSuccessDialog}
                            successMessage="Votre inscription a été créée avec succès! Bienvenue à TAFO MIHAAVO!"
                            handleCloseErrorDialog={handleCloseErrorDialog}
                            errorMessage="Erreur : Veuillez vérifier le format ou la taille du contenu"
                        />
                        <Divider sx={{ mt: 2 }}>OU</Divider>
                        <Link href="/login" sx={{ color: 'black', display: 'flex', justifyContent: 'center', my: 2 }}>
                            Vous avez déjà un compte?
                        </Link>
                    </Grid>
                </form>
            </Grid>
        </>
    );
};
export default RegistrationFormTafo;
