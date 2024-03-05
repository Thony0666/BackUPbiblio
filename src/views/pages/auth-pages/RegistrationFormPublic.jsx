/* eslint-disable prettier/prettier */
// http://localhost:3000/login/inscriptiontafo
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import BackupIcon from '@mui/icons-material/Backup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as yup from 'yup';
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { siteUrlApi } from 'utils/base_url_api';
import styled from '@emotion/styled';
import StateNotification from 'composants/thony/component/StateNotification';
import { useNavigate } from 'react-router-dom';
import Waiter from 'composants/common/Waiter';
const validationSchema = yup.object({
    email: yup
        .string('Veuillez entrer votre adresse e-mail')
        .email('Veuillez entrer une adresse e-mail valide')
        .required("L'adresse e-mail est obligatoire"),
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
    adresse: yup.string('Veuillez entrer votre adresse').required("L'adresse est obligatoire"),
    sutiationPro: yup.string('Veuillez entrer votre situation professionnelle').required('La situation professionnelle est obligatoire'),
    profile: yup.string('Veuillez entrer votre profil').required('Le profil est obligatoire')
});

const RegistrationFormTafo = () => {
    const [profile, setProfile] = useState([]);
    const [sutiationPro, setSutiationPro] = useState([]);
    const [selectedImageRecto, setSelectedImageRecto] = useState(null);
    const [selectedImageVerso, setSelectedImageVerso] = useState(null);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate;
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
            cinNumber: '',
            recto: null,
            verso: null,
            adresse: '',
            sutiationPro: '',
            profile: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submitFormData(values);
            console.log(JSON.stringify(values, null, 2));
        }
    });
    const handleCloseSuccessDialog = () => {
        setShowSuccessDialog(false);
        navigate('/');
    };

    const handleCloseErrorDialog = () => {
        setShowErrorDialog(false);
    };
    const submitFormData = async (values) => {
        console.log('Submitting form data model');
        setLoading(true);
        const formData = new FormData();

        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('birthday', values.dateDeN);
        formData.append('gender', values.sex); 
        formData.append('homeAddress', values.adresse);
        formData.append('cin', values.cinNumber);
        formData.append('files', values.recto);
        formData.append('files', values.verso);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('username', values.userName);
        formData.append('idProfession', values.sutiationPro);
        formData.append('idHandicap', values.profile);

        // console.log(JSON.stringify(object));
        console.log(formData);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.tafomihaavo.mg/tahiry/v3/users-front/public',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
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


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1
    });

    return (
        <>
            <Waiter loadingState={isLoading} />
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress color="secondary" loadingState={isLoading}/>
            </Box> */}
            <Typography sx={{ my: 3 }} color={'secondary'} textAlign={'center'} variant="h1">
                Inscription
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
                            maxWidth: '36vw',
                            mb: 3
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
                            label="Pseudo"
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
                            <FormControlLabel value="homme" control={<Radio />} label="Lahy" />
                            <FormControlLabel value="femme" control={<Radio />} label="Vavy" />
                        </RadioGroup>
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            id="cinNumber"
                            name="cinNumber"
                            label="Numreau de CIN"
                            value={formik.values.cinNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.cinNumber && Boolean(formik.errors.cinNumber)}
                            helperText={formik.touched.cinNumber && formik.errors.cinNumber}
                        />

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
                        <Stack
                            direction={'column'}
                            sx={{
                                mb: 3,
                                pb: 2,
                                border: '2px dotted grey',
                                borderRadius: 4,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Typography textAlign={'center'} variant="h3" color={'black'} mt={2}>
                                Mettez ici votre photo du recto de la CIN
                            </Typography>
                            {selectedImageRecto && (
                                <Box mt={2} sx={{ mb: 2, width: '50%', height: '50%', textAlign: 'center' }}>
                                    <img src={selectedImageRecto} alt="Uploaded" style={{ maxWidth: '25vw', maxHeight: '20vh' }} />
                                </Box>
                            )}
                            {selectedImageRecto ? null : <BackupIcon style={{ fontSize: '7vw', opacity: 0.5 }} />}
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="recto-upload"
                                name="recto"
                                type="file"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setSelectedImageRecto(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                        formik.setFieldValue('recto', file);
                                    }
                                }}
                            />

                            <label htmlFor="recto-upload">
                                <Button component="span" color="secondary" variant="outlined" startIcon={<CloudUploadIcon />}>
                                    Upload photo
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </label>
                        </Stack>
                        <Stack
                            direction={'column'}
                            sx={{ pb: 2, border: '2px dotted grey', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Typography textAlign={'center'} variant="h3" color={'black'} mt={2}>
                                Mettez ici votre photo du Verso de la CIN
                            </Typography>
                            {selectedImageVerso && (
                                <Box mt={2} sx={{ mb: 2, width: '50%', height: '50%', textAlign: 'center' }}>
                                    <img src={selectedImageVerso} alt="Uploaded" style={{ maxWidth: '25vw', maxHeight: '20vh' }} />
                                </Box>
                            )}
                            {selectedImageVerso ? null : <BackupIcon style={{ fontSize: '7vw', opacity: 0.5 }} />}
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="verso-upload"
                                name="verso"
                                type="file"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setSelectedImageVerso(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                        formik.setFieldValue('verso', file);
                                    }
                                }}
                            />

                            <label htmlFor="verso-upload">
                                <Button component="span" color="secondary" variant="outlined" startIcon={<CloudUploadIcon />}>
                                    Upload photo
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </label>
                        </Stack>

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
                        <Divider sx={{ mt: 2 }}>OU</Divider>
                        <Typography sx={{ color: 'black', display: 'flex', justifyContent: 'center', my: 2 }}>
                            J{`'`}ai déjà un compte,
                            <Link href="/login">se connecter</Link>
                        </Typography>
                        <StateNotification
                            showSuccessDialog={showSuccessDialog}
                            showErrorDialog={showErrorDialog}
                            handleCloseSuccessDialog={handleCloseSuccessDialog}
                            successMessage="Votre inscription a été créée avec succès! Bienvenue à TAFO MIHAAVO!"
                            handleCloseErrorDialog={handleCloseErrorDialog}
                            errorMessage="Erreur : Veuillez vérifier le format ou la taille du contenu"
                        />
                    </Grid>
                </form>
            </Grid>
        </>
    );
};
export default RegistrationFormTafo;
