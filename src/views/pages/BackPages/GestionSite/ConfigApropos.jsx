import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import { convertToRaw, EditorState, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import draftToHtml from 'draftjs-to-html';
import axios from 'axios';

import { siteUrlApi } from 'utils/base_url_api';

// import { Button, Box, Container, Typography } from '@mui/material';
// import { useAuthTemp } from 'utils/auth';
// import StateMessage from 'composants/jed/contents/StateMessage'
import UpDateApropos from 'composants/thony/component/UpDateApropos';
import { Box, CircularProgress } from '@mui/material';
// import { log } from 'util';

const ConfigApropos = () => {
    // const [isLoading, setLoading] = useState(true);

    // const auth = useAuthTemp();
    // const userBack = auth.getUserBack();
    // const idUser = userBack.id;
    // console.log('this is the userBack user', idUser);
    const [load, setLoad] = useState(true);
    const [title, setTitle] = useState([]);
    const [texte, setTexte] = useState([]);
    // const filteredDataTitle = texte;
    // const title = filteredDataTitle.textValue;
    useEffect(() => {
        axios
            .get(siteUrlApi(`about`))
            .then((response) => {
                // const titles = response.data.items.filter((item) => item.componentName === 'title');
                setTitle(response.data.items.filter((item) => item.componentName === 'title'));
                setTexte(response.data.items.filter((item) => item.componentName === 'list'));
                // console.log(response.data.items.filter((item) => item.componentName === 'title'));

                setLoad(false);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données');
                console.error(error);
            });
    }, []);

    if (load) {
        <Box bgcolor={'red'} zIndex={446}>
            <CircularProgress color="secondary" />
            {/* <Typography color={'secondary'}>Miandry</Typography> */}
        </Box>;
    } else {
        return <UpDateApropos dataTitle={title} dataTexte={texte} />;
    }
};

export default ConfigApropos;
