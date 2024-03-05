// Import React and the JSON file
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { siteUrlApi } from 'utils/base_url_api';
import Paginations from 'composants/jed/contentFront/Paginations';
import { useParams } from 'react-router';
import Waiter from 'composants/common/Waiter';
import ContentCardFront from 'composants/jed/contentFront/ContentCardFront';
import { getUserFront } from 'utils/user';

// Define the main component that uses the List component
const getTitleMg = (type) => {
    if (type === 'article') return 'Lahatsoratra';
    if (type === 'video') return 'Horonantsary';
    if (type === 'audio') return 'Horonam-peo';
    if (type === 'pdf') return 'PDF';
    if (type === 'autre') return 'Hafa';
};

const Media = () => {
    const [isLoading, setLoading] = useState(true);
    const { type } = useParams();
    console.log('le type de media recu est ', type);
    const [datas, setData] = useState([]);
    const [dataLength, setLength] = useState();
    console.log(siteUrlApi(`contents-front/content-types/name?contentTypeName=${type}`));

    const idUser = getUserFront();
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: siteUrlApi(`contents-front/content-types/name?contentTypeName=${type}`),
            headers: {
                'id-user-front': idUser
            }
        };
        axios
            .request(config)
            .then((response) => {
                console.log('anaty try');
                setLoading(false);
                // setData(response.data.items[0]);
                setData(response.data.items);
                setLength(response.data.items.length());
                console.log(response);
            })
            .catch((error) => {
                console.log('anaty catch');
                setLoading(false);
                console.error(error);
            });
    }, [type]);

    // useEffect(() => {
    //     axios
    //         .get(siteUrlApi(`contents-front/content-types/name?contentTypeName=${type}`))
    //         .then((response) => {
    //             setLoading(false);
    //             setData(response.data.items);
    //             setLength(response.data.items.length());
    //             console.log('Success');
    //             console.log(response.data.items);
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             console.error('Error');
    //             console.error(error);
    //         });
    // }, [type]);

    return (
        <div className="Container" width="100%">
            <Waiter loadingState={isLoading} />
            <div className="ItemsContainer" width="100%">
                <Typography variant="h2" align="center" padding="20px" gutterBottom>
                    {getTitleMg(type)}
                </Typography>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }} width="100%">
                    {datas.map((item) => (
                        <Grid key={item.id} item xs={12} md={4} lg={3} display="flex" justifyContent="center" alignItems="center">
                            <ContentCardFront items={item} />
                        </Grid>
                    ))}
                </Grid>
            </div>

            <div className="paginations">
                <Grid container display="flex" width="100%" padding={4} justifyContent="center" alignItems="center">
                    <Paginations />
                </Grid>
            </div>
        </div>
    );
};

export default Media;
