import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { siteUrlApi } from 'utils/base_url_api';
import axios from 'axios';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import Audio from './TypeContenu/Audio';
import ArticleContent from './TypeContenu/ArticleContent';
import Pdf from './TypeContenu/Pdf';
import Video from './TypeContenu/Video';
import { getUserFront } from 'utils/user';

const Contenu = (props) => {
    const item = props.item;
    const fileUrl = siteUrlApi(`file-public/stream/?hashFile=${item.filePublicHashFile}`);
    console.log(siteUrlApi(`file-public/stream/?hashFile=${item.filePublicHashFile}`));

    const contentType = item.contentTypeName;
    console.log(item.contentTypeName);
    let contentComponent;
    const [numPages, setNumPages] = useState(null);
    const idUser = getUserFront();

    if (idUser == null) {
        contentComponent = (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: '100%', // Set maximum width
                    margin: 'auto',
                    height: '10em' // Adjust this based on your design requirements
                }}
            >
                <Typography variant="h3"> Ny mpikambana amin{"'"}ny tranomboky no afaka mitsidika ity antontan-kevitra ity</Typography>
                <Typography variant="h3" alignContent="center">
                    Sarany:.....Ariary
                </Typography>
            </Box>
        );
    } else {
        if (contentType === 'Vidéo' && fileUrl) {
            console.log('anaty loop video');
            contentComponent = <Video videoUrl={fileUrl} />;
        } else if (contentType === 'Audio' && fileUrl) {
            contentComponent = (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: '100%', // Set maximum width
                        margin: 'auto',
                        height: '100%' // Adjust this based on your design requirements
                    }}
                >
                    <Audio audioUrl={fileUrl} />
                </Box>
            );
        } else if (contentType === 'PDF' && fileUrl) {
            contentComponent = (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: '100%', // Set maximum width
                        margin: 'auto',
                        height: '100%' // Adjust this based on your design requirements
                    }}
                >
                    <Pdf pdfUrl={fileUrl} />
                </Box>
            );
        } else if (contentType === 'Article') {
            contentComponent = <ArticleContent articleContent={item.articleContent} />;
        } else {
            // Default case or handle invalid contentType
            contentComponent = <div>Invalid contentType</div>;
        }
    }

    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <Box
            sx={{
                // display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                maxWidth: '100%', // Set maximum width
                margin: 'auto' // Center horizontally
            }}
        >
            {contentComponent}
        </Box>
    );
};

export default Contenu;
