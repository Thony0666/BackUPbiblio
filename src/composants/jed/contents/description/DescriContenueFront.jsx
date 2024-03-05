// DetailsComponent.js
import { Box, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Document } from 'react-pdf';
import { useParams } from 'react-router-dom';
import pdfUrl from './testfiles/pdf/3.pdf';
import Annexe from './Annexe';
import Commentaires from './Comentaires';
import Contenu from './Contenu';
import Descriptions from './Descriptions';
import Informations from './Informations';
import Review from './Review';
import { siteUrlApi } from 'utils/base_url_api';
import Waiter from 'composants/common/Waiter';
import { getUserFront } from 'utils/user';

const DescriContenueFront = () => {
    const { id } = useParams();
    const [numPages, setNumPages] = useState(null);
    const [isLoading, setLoading] = useState(true);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    console.log(siteUrlApi(`contents-back/id/${id}`));

    const [itemDetail, setItemDetail] = useState([]);
    console.log('ceci est le id du contenu');
    console.log(id);

    const idUser = getUserFront();
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: siteUrlApi(`contents-front/id/${id}`),
            headers: {
                'id-user-front': idUser
            }
        };
        axios
            .request(config)
            .then((response) => {
                console.log('anaty try');
                setItemDetail(response.data.items[0]);
                console.log(response);
                setLoading(false);
            })
            .catch((error) => {
                console.log('anaty catch');
                setLoading(false);
                console.error(error);
            });
    }, []);

    console.log(itemDetail);

    const hiddenStyle = {
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
    };

    return (
        <Grid container spacing={2} marginBottom={2}>
            <Waiter loadingState={isLoading} />

            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        height: '100%',
                        padding: '16px'
                        // marginTop: '20px'
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    height: '100%',
                                    padding: '16px'
                                }}
                            >
                                <Informations item={itemDetail} numPages={numPages} />
                                {itemDetail.contentType === 'PDF' && (
                                    <div style={hiddenStyle}>
                                        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}></Document>
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <Grid container xs={12} md={12} lg={12}>
                            <Grid item xs={12} sm={12} md={12} lg={8} order={{ xs: 2, sm: 2, md: 2, lg: 1 }}>
                                <Box>
                                    <div
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '8px',
                                            width: '99%',
                                            padding: '30px',
                                            margin: '10px',
                                            boxShadow: '1px 1px 8px 7px rgba(0,0,0,0.08)',
                                            marginBottom: '30px'
                                        }}
                                    >
                                        <Contenu item={itemDetail} />
                                    </div>
                                    <Review />
                                </Box>
                                <div
                                    style={{
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '8px',
                                        margin: '20px',
                                        width: '95%'
                                        // marginTop: '20px'
                                    }}
                                >
                                    <Commentaires />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={4} order={{ xs: 1, sm: 1, md: 1, lg: 2 }} sx={{ marginBottom: 2 }}>
                                <div
                                    style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        height: '100%',
                                        width: '99%',
                                        // marginTop: '20px',
                                        padding: '16px',
                                        margin: '10px',
                                        marginBottom: '20px',
                                        boxShadow: '1px 1px 8px 7px rgba(0,0,0,0.08)'
                                    }}
                                >
                                    <Descriptions item={itemDetail} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Annexe id={id} />
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
};

export default DescriContenueFront;
