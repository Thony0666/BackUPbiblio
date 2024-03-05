import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
// import { convertFromHTML } from 'draftjs-convert';
import { Editor } from 'react-draft-wysiwyg';
import React, { useState } from 'react';
import { siteUrlApi } from 'utils/base_url_api';
import { useFormik } from 'formik';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import Waiter from 'composants/common/Waiter';
import StateMessage from 'composants/jed/contents/StateMessage';
import StateNotification from './StateNotification';
import Apropos from 'views/pages/front-pages/Apropos';
import { useAuthTemp } from 'utils/auth';
import { useNavigate } from 'react-router-dom';
function UpDateApropos(props) {
    const auth = useAuthTemp();
    const userBack = auth.getUserBack();
    const idUser = userBack.id;
    console.log('this is the userBack user', idUser);
    const navigate = useNavigate();
    const title = props.dataTitle;
    const initialeTitleId = title[0].id;
    const initialeTitle = title[0].textValue;
    const texte = props.dataTexte;
    const initialeTexteId = texte[0].id;
    const initialeTexte = texte[0].textValue;
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [preview, setPreview] = useState(false);
    const [modifie, setModifie] = useState(false);
    const [newTitle, setNewTitle] = useState(initialeTitle);
    const submitFormData = (values) => {
        console.log('Submitting form data model');
        setLoading(true);
        // const plainTextTitle = draftToHtml(convertToRaw(values.title.getCurrentContent()));
        const plainTextBody = draftToHtml(convertToRaw(values.textValue.getCurrentContent()));
        console.log('texte dans plaintextTitle');
        console.log('texte dans plaintextBody');
        const myData = {
            id: initialeTexteId,
            textValue: plainTextBody
        };
        console.log(myData);
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: siteUrlApi('about'),
            headers: {
                'id-user-back': idUser,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: myData
        };

        axios
            .request(config)
            .then((response) => {
                console.log('anaty try');
                console.log(response);
                setLoading(false);
                setShowSuccessDialog(true);
                setRefresh(true);
                // navigate('/backinterface/gestion-site/config-apropos');
            })
            .catch((error) => {
                console.log('anaty catch');
                setLoading(false);
                setShowErrorDialog(true);
                console.error(error);
            });
    };
    const handleSendNewTitle = () => {
        const postData = {
            id: initialeTitleId,
            textValue: newTitle
        };
        const config = {
            headers: {
                'id-user-back': idUser,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        console.log(JSON.stringify({ postData }));

        axios
            .put(siteUrlApi(`about`), postData, config)
            .then((response) => {
                // relode(true);
                console.log('Réponse du serveur:', response.data);
                <alert> Votre maj a bien été succes</alert>;
            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi des données:", error);
                <alert> Veuillez ressayer </alert>;
                // relode(true);
            });
    };

    const handleCloseSuccessDialog = () => {
        handleSendNewTitle();
        setLoading(true);
    };

    // const initialTitleState = EditorState.createWithContent(ContentState.createFromText(initialeTitle));
    const initialContent = { __html: initialeTexte };
    const blocksFromHTML = convertFromHTML(initialContent.__html);
    const initialTextState = EditorState.createWithContent(
        ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
    );

    const formik = useFormik({
        initialValues: {
            id: initialeTexteId,
            textValue: initialTextState
        },
        onSubmit: (values) => {
            console.log('Start submitting...');
            console.log(values);

            submitFormData(values);
        }
    });
    const handleChangeTitle = (event) => {
        setNewTitle(event.target.value);
    };
    const handleCloseSuccessDialoge = () => {
        setShowSuccessDialog(false);
        setModifie(false);
        setPreview(false);
    };

    const handleCloseErrorDialog = () => {
        setShowErrorDialog(false);
    };
    const handleModifie = () => {
        setModifie(true);
        setPreview(true);
    };
    const handleBack = () => {
        setModifie(false);
        setPreview(false);
    };

    return (
        <>
            <Waiter loadingState={isLoading} />
            <Grid container>
                {!preview && (
                    <>
                        <Grid
                            container
                            justifyContent={'space-between'}
                            mb={3}
                            boxShadow={10}
                            padding={1}
                            sx={{
                                width: '100%',
                                backgroundColor: 'white',
                                borderRadius: '8px'
                            }}
                        >
                            <Typography variant="h2">Preview page à propos</Typography>
                            <Button onClick={handleModifie} variant="contained" color="primary">
                                Modifier
                            </Button>
                        </Grid>
                        <Grid container position={'relative'}>
                            <Apropos load={setRefresh} />
                        </Grid>
                    </>
                )}
                {modifie && (
                    <Container maxWidth="md" sx={{ bgcolor: 'white', borderRadius: 4, p: 3 }}>
                        {/* <Waiter loadingState={isLoading} /> */}

                        <Typography variant="h2" align="center" gutterBottom>
                            Modifier la page à propos
                        </Typography>

                        <form onSubmit={formik.handleSubmit}>
                            <Box margin="normal">
                                <TextField
                                    sx={{ my: 2 }}
                                    fullWidth
                                    id="title"
                                    name="title"
                                    label="Titre"
                                    value={newTitle}
                                    onChange={handleChangeTitle}
                                    defaultValue={initialeTitle}
                                />
                                <Editor
                                    editorState={formik.values.textValue}
                                    onEditorStateChange={(editorState) => {
                                        formik.setFieldValue('textValue', editorState);
                                    }}
                                    editorStyle={{
                                        border: '1px solid #ccc',
                                        borderRadius: '10px',
                                        padding: '8px',
                                        minHeight: '200px',
                                        maxHeight: '350px'
                                    }}
                                    toolbar={{
                                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
                                        inline: { inDropdown: false },
                                        blockType: {
                                            inDropdown: true,
                                            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote']
                                        },
                                        list: { inDropdown: false },
                                        textAlign: { inDropdown: false },
                                        link: { inDropdown: true },
                                        history: { inDropdown: false }
                                    }}
                                />
                            </Box>

                            <Box display="flex" justifyContent="flex-end" marginTop={2}>
                                <Button onClick={handleBack} variant="contained" sx={{ mx: 3, bgcolor: 'grey', color: 'white' }}>
                                    Retour
                                </Button>
                                <Button onClick={handleCloseSuccessDialog} type="submit" variant="contained" color="primary">
                                    valider
                                </Button>
                            </Box>
                        </form>
                        <StateNotification
                            showSuccessDialog={showSuccessDialog}
                            showErrorDialog={showErrorDialog}
                            handleCloseSuccessDialog={handleCloseSuccessDialoge}
                            successMessage="Votre modification réussie!"
                            handleCloseErrorDialog={handleCloseErrorDialog}
                            errorMessage="Erreur : Veuillez vérifier le format"
                        />
                    </Container>
                )}
            </Grid>
        </>
    );
}

export default UpDateApropos;
