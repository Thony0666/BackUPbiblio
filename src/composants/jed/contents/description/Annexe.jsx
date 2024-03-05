import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconFileTypePdf, IconHeadphones, IconMovie } from '@tabler/icons-react';
import ContentCardFront from 'composants/jed/contentFront/ContentCardFront';
import { Grid } from '@mui/material';
import { siteUrlApi } from 'utils/base_url_api';

function Annexe(props) {
    const theme = useTheme();

    const [annexes, setAnnexes] = useState([]);
    console.log(siteUrlApi(`contents-front/annexes/${props.id}`));

    useEffect(() => {
        axios
            .get(siteUrlApi(`contents-front/annexes/${props.id}`))
            .then((response) => {
                setAnnexes(response.data.items);
                console.log('Les Annexes');
                console.log('data = ', response.data.items);
            })
            .catch((error) => {
                console.error('Error');
                console.error(error);
            });
    }, []);
    return (
        <Box>
            <div className="ItemsContainer">
                <Typography variant="h2" align="center" padding="20px" gutterBottom>
                    Tovana
                </Typography>
                <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {annexes.map((item) => (
                        <Grid key={item.id} item xs={12} md={4} lg={3}>
                            <ContentCardFront items={item} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Box>
    );
}

export default Annexe;
