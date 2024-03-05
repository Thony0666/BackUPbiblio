/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

import { siteUrlApi } from 'utils/base_url_api';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Box, Container, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import Waiter from 'composants/common/Waiter';
import StateMessage from 'composants/jed/contents/StateMessage';
// import { type } from 'os';
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
    email: Yup.string().required('Veuiller remplir ce champ'),
    password: Yup.string().test('passwords-match', 'Les mots de passe ne correspondent pas', function (value) {
        return !value || value === this.parent.confirmPassword;
    }),
    confirmPassword: Yup.string()
        .test('passwords-match', 'Les mots de passe ne correspondent pas', function (value) {
            return !value || value === this.parent.password;
        })
        .required('Veuillez confirmer votre mot de passe')
});

const Test = () => {
    // {/* <Card sx={{ display: 'flex', margin: 1, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
    //             <CardMedia component="div" sx={{ width: 120, padding: 1 }}>
    //                 <IconMovie size={100} sx={{ color: theme.palette.secondary[200] }} align="center" />
    //             </CardMedia>
    //             <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
    //                 <CardContent sx={{ flex: '1 0 auto', padding: 0 }}>
    //                     <Typography component="div" variant="h5" sx={{ fontSize: 18, margin: '2px' /* Adjust the font size as needed */ }}>
    //                     Titre video annexe
    //                     </Typography>
    //                     <Typography
    //                         variant="subtitle1"
    //                         sx={{ fontSize: 11 /* Adjust the font size as needed */ }}
    //                         color="text.secondary"
    //                         component="div"
    //                     >
    //                         Thematique annexe - Analamanga
    //                     </Typography>
    //                     <Typography
    //                         variant="subtitle1"
    //                         sx={{ fontSize: 11 /* Adjust the font size as needed */ }}
    //                         color="text.secondary"
    //                         component="div"
    //                     >
    //                         03-01-2024
    //                     </Typography>
    //                 </CardContent>
    //             </Box>
    //         </Card>
    //         <Card sx={{ display: 'flex', margin: 1, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
    //             <CardMedia component="div" sx={{ width: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //                 <IconHeadphones size={100} sx={{ color: theme.palette.secondary[200] }} align="center" />
    //             </CardMedia>
    //             <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
    //                 <CardContent sx={{ flex: '1 0 auto', padding: 0 }}>
    //                     <Typography component="div" variant="h5" sx={{ fontSize: 18 /* Adjust the font size as needed */ }}>
    //                         Titre Audio annexe
    //                     </Typography>
    //                     <Typography
    //                         variant="subtitle1"
    //                         sx={{ fontSize: 11 /* Adjust the font size as needed */ }}
    //                         color="text.secondary"
    //                         component="div"
    //                     >
    //                         Thematique annexe - Analamanga
    //                     </Typography>
    //                     <Typography
    //                         variant="subtitle1"
    //                         sx={{ fontSize: 11 /* Adjust the font size as needed */ }}
    //                         color="text.secondary"
    //                         component="div"
    //                     >
    //                         03-01-2024
    //                     </Typography>
    //                 </CardContent>
    //             </Box>
    //         </Card>
    //         <Card sx={{ display: 'flex', margin: 1, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
    //             <CardMedia component="div" sx={{ width: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //                 <IconFileTypePdf size={100} sx={{ color: theme.palette.secondary[200] }} align="center" />
    //             </CardMedia>
    //             <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
    //                 <CardContent sx={{ flex: '1 0 auto', padding: 0 }}>
    //                     <Typography component="div" variant="h5" sx={{ fontSize: 18 /* Adjust the font size as needed */ }}>
    //                         Titre PDF annexe
    //                     </Typography>
    //                     <Typography
    //                         variant="subtitle1"
    //                         sx={{ fontSize: 11 /* Adjust the font size as needed */ }}
    //                         color="text.secondary"
    //                         component="div"
    //                     >
    //                         Thematique annexe - Analamanga
    //                     </Typography>
    //                     <Typography
    //                         variant="subtitle1"
    //                         sx={{ fontSize: 11 /* Adjust the font size as needed */ }}
    //                         color="text.secondary"
    //                         component="div"
    //                     >
    //                         03-01-2024
    //                     </Typography>
    //                 </CardContent>
    //             </Box>
    //         </Card> */}
};

export default Test;
