import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Backthumb from 'assets/images/typeMedia/backthumb.jpg';
import Video from 'assets/images/typeMedia//video2.jpg';
import Sound from 'assets/images/typeMedia/audio.jpg';
import Article from 'assets/images/typeMedia/article.jpg';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Box, CardActionArea } from '@mui/material';
import { IconFileTypePdf, IconNews, IconHeadphones, IconMovie } from '@tabler/icons-react';

const ContentCardFront = (props) => {
    const data = props.items;
    console.log('ito ny data Content Card Front');
    console.log(data);
    let imageSrc;
    let IconImage;

    switch (data.contentTypeName) {
        case 'Article':
            imageSrc = Article;
            IconImage = IconNews;
            break;
        case 'Audio':
            imageSrc = Sound;
            IconImage = IconHeadphones;
            break;
        case 'Vidéo':
            imageSrc = Video;
            IconImage = IconMovie;
            break;
        case 'PDF':
            imageSrc = Backthumb;
            IconImage = IconFileTypePdf;
            break;
        default:
            imageSrc = Video;
    }

    function formatDate(dateString) {
        const months = [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ];
        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${day} ${months[monthIndex]} ${year}`;
    }

    return (
        <Card
            sx={{
                maxWidth: 345,
                maxHeight: 325,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
            }}
        >
            <CardActionArea component={Link} to={`descriFront/${data.id}`}>
                <CardMedia component="img" height="180" image={imageSrc} alt="Image" />
                <CardContent>
                    <Box
                        style={{
                            width: 'auto',
                            height: 'auto',
                            padding: '5px',
                            position: 'absolute',
                            top: 8,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            right: 8,
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            zIndex: 1
                        }}
                    >
                        {/* <IconImage size={25} style={{ color: '#000', zIndex: 1 }} /> */}
                    </Box>

                    <Typography gutterBottom variant="h4" component="div" sx={{ textDecoration: 'none' }}>
                        {data.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary.dark"
                        sx={{ textDecoration: 'none', fontSize: '0.7rem', fontWeight: 'bold' }}
                    >
                        {data.themeName}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: 'none', maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                        {data.description}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold' }}
                    >
                        {formatDate(data.createdAt)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ContentCardFront;
