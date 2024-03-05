import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Backthumb from '../contents/description/testfiles/image/backthumb.jpg';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { CardActionArea } from '@mui/material';

const ContentCard = (props) => {
    const data = props.items;

    return (
        <Card sx={{ maxWidth: 345, maxHeight: 300, display: 'flex', flexDirection: 'column', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <CardActionArea component={Link} to={`/backinterface/gestion-contenu/descri/${data.id}`}>
                <CardMedia component="img" height="140" image={Backthumb} alt="green iguana" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ textDecoration: 'none' }}>
                        {data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'none' }}>
                        {data.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ContentCard;
