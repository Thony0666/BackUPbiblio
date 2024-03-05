import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const formatDate = (inputDate) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        // month: 'long',
        day: '2-digit'
    };

    const formattedDate = new Date(inputDate).toLocaleDateString('fr-FR', options);
    return formattedDate;
};

const Descriptions = (props) => {
    const theme = useTheme();
    const item = props.item;
    const inputDate = item.createdAt;
    const formattedDate = formatDate(inputDate);
    return (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h2" style={{ color: theme.palette.text.primary }}>
                        Ny votoantiny:
                    </Typography>
                    <p>{item.description}</p>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant="h6">
                        <b>Lohahevitra : </b> {item.themeName}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant="h6">
                        <b>Faritra : </b>
                        {item.regionName !== null
                            ? item.regionName
                            : item.isInternational === 1
                            ? 'International'
                            : item.isNational === 1
                            ? 'National'
                            : ''}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant="h6">
                        <b>Tompony : </b> {item.author}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant="h6">
                        <b>Daty namohana azy : </b>
                        {formattedDate}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                    {props.numPages ? (
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} md={9} lg={6}>
                                <Typography variant="h6">
                                    <b>{`Isan'ny pejy`} : </b> {props.numPages}
                                </Typography>
                            </Grid>
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>
        </>
    );
};

export default Descriptions;
