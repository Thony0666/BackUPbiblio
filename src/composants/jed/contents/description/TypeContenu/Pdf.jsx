import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import { styled } from '@mui/material/styles';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         marginTop: theme.spacing(2)
//     }
// }));

const Pdf = (props) => {
    // const classes = useStyles();
    //   const { pdfUrl } = props.fileUrl;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handleNextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handlePrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };
    const pdfUrl = 'https://api.tafomihaavo.mg/tahiry/v3/file-public/stream/?hashFile=383a7ff9a70cae5c32aaf2b11a140e9c';
    return (
        <div className="pdf-div">
            <Document file={props.pdfUrl} width="50%" onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
            </Document>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    display: 'fixed',
                    // flexDirection: 'row', // Change to 'row' to align horizontally
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    marginTop: 2 // Optional margin for spacing
                }}
            >
                <Button
                    variant="outlined"
                    onClick={handlePrevPage}
                    disabled={pageNumber === 1}
                    sx={{ marginRight: 2 }} // Adjust margin for spacing between buttons
                >
                    Précédent
                </Button>
                <p>{`Page ${pageNumber} sur ${numPages}`}</p>
                <Button
                    variant="outlined"
                    onClick={handleNextPage}
                    disabled={pageNumber === numPages}
                    sx={{ marginLeft: 2 }} // Adjust margin for spacing between buttons
                >
                    Suivant
                </Button>
            </Grid>
        </div>
    );
};

export default Pdf;
