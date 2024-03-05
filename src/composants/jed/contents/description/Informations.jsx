import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Informations = (props) => {
    const theme = useTheme();

    const item = props.item;

    console.log('ceci est le log des numeros de page:');
    // console.log(props.item.author);
    // console.log(props.numPages);
    console.log(props.item);
    console.log(props.item.title);

    return (
        <div>
            <Typography variant="h1" style={{ color: theme.palette.text.primary }}>
                {item.title}
            </Typography>
        </div>
    );
};

export default Informations;
