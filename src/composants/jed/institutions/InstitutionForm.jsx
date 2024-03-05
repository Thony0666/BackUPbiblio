import { useDispatch } from 'store';

// material-ui
import { Button, Grid, Stack, TextField } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    nom: yup.string().required('Ce champ est requis'),
    sigle: yup.string().required('Ce champ est requis'),
    type: yup.string().required('Ce champ est requis')
});

const InstitutionForm = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            nom: '',
            sigle: '',
            type: ''
        },
        validationSchema,
        onSubmit: () => {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Institution Ajoutée avec succès',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        }
    });

    return (
        <MainCard title="Insérer une nouvelle institution">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="nom"
                            name="nom"
                            label="Nom"
                            value={formik.values.nom}
                            onChange={formik.handleChange}
                            error={formik.touched.nom && Boolean(formik.errors.nom)}
                            helperText={formik.touched.nom && formik.errors.nom}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="sigle"
                            name="sigle"
                            label="Sigle"
                            value={formik.values.sigle}
                            onChange={formik.handleChange}
                            error={formik.touched.sigle && Boolean(formik.errors.sigle)}
                            helperText={formik.touched.sigle && formik.errors.sigle}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="type"
                            name="type"
                            label="Type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            helperText={formik.touched.type && formik.errors.type}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" type="submit">
                                    Valider
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default InstitutionForm;
