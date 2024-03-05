/* eslint-disable prettier/prettier */
// http://localhost:3000/mdpoublier
import { Button, Divider, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { siteUrlApi } from 'utils/base_url_api';
import axios from 'axios';
import { is } from 'immutable';
import Waiter from 'composants/common/Waiter';
import { useAuth, useAuthTemp } from 'utils/auth';

const validationSchema = yup.object({
    email: yup
        .string('Veuillez entrer votre adresse e-mail')
        .email('Veuillez entrer une adresse e-mail valide')
        .required(`'L'adresse e-mail est obligatoire'`),
    password: yup
        .string('Veuillez entrer votre mot de passe')
        .min(4, 'Le mot de passe doit contenir au moins 8 caractères')
        .required('Le mot de passe est obligatoire')
});
// const submitFormData = async (values) => {

//     console.log('Submitting form data model');
//     const formData = new FormData();

//     formData.append('email', values.email);
//     formData.append('password', values.password);

//     const object = {};
//     formData.forEach((value, key) => {
//         object[key] = value;
//     });
//     console.log(JSON.stringify(object));

//     let config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: siteUrlApi('users-back/login'),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         data: formData
//     };

//     axios
//         .request(config)
//         .then((response) => {

//             console.log('anaty try');
//             console.log(response);
//         })
//         .catch((error) => {
//             console.log('anaty catch');
//             console.error(error);
//         });
// };
function LoginBack() {
    const [isLoad, setLoad] = useState(false);
    const auth = useAuthTemp();
    useEffect(() => {
        console.log('auth', auth);
    }, []);

    const navigate = useNavigate();

    const submitFormData = async (values) => {
        setLoad(true);
        console.log('Submitting form data model');
        const formData = new FormData();

        formData.append('email', values.email);
        formData.append('password', values.password);

        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        console.log(JSON.stringify(object));

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: siteUrlApi('users-back/login'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: formData
        };

        await axios
            .request(config)
            .then((response) => {
                console.log('anaty try');
                console.log(response);
                auth.loginUserBack(response.data.items.loginData);
                setLoad(false);
                navigate('/backinterface/gestion-contenu/mes-contenus');
            })
            .catch((error) => {
                console.log('anaty catch');
                console.error(error);
                setLoad(false);
            });
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            showPassword: false
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
            submitFormData(values);
        }
    });
    const handlePrev = () => {
        navigate('/inscription');
    };
    if (isLoad) {
        return <Waiter loadingState={isLoad} />;
    } else {
        return (
            <Grid sx={{ height: '100vh' }} container justifyContent="center" alignItems="center">
                <form onSubmit={formik.handleSubmit}>
                    <Grid sx={{ boxShadow: '5px 7px 10px 10px rgba(0, 0, 0, 0.1)', padding: 3, borderRadius: 4, textAlign: 'center' }}>
                        <Typography variant="h1" color={'secondary'}>
                            Tafo Mihaavo
                        </Typography>
                        <TextField
                            sx={{ mt: 4 }}
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
                            label="Mot de passe"
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
                        <Link href="/mdp-oublie/email" sx={{ color: 'black', display: 'flex', justifyContent: 'flex-end', mr: 2 }}>
                            Mot de passe oublier?
                        </Link>
                        <Button color="secondary" variant="contained" type="submit" fullWidth sx={{ my: 4, px: 4 }}>
                            Connexion
                        </Button>
                        <Divider>OU</Divider>
                        <Button color="primary" onClick={handlePrev} variant="contained" sx={{ my: 4, px: 4 }}>
                            Créer un compte
                        </Button>
                    </Grid>
                </form>
            </Grid>
        );
    }
}

export default LoginBack;