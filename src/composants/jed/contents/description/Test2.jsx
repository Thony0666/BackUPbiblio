// import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';
// import { Box, Button } from '@mui/material';

// const Pdf = (props) => {
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);

//     function onDocumentLoadSuccess({ numPages }) {
//         setNumPages(numPages);
//     }

//     const handleNextPage = () => {
//         if (pageNumber < numPages) {
//             setPageNumber(pageNumber + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (pageNumber > 1) {
//             setPageNumber(pageNumber - 1);
//         }
//     };

//     return (
//         <div className="pdf-div">
//             <Document file={props.pdfUrl} width="50%" onLoadSuccess={onDocumentLoadSuccess}>
//                 <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
//             </Document>
//             <Box
//                 sx={{
//                     display: 'fixed',
//                     flexDirection: 'row', // Change to 'row' to align horizontally
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     marginTop: 2 // Optional margin for spacing
//                 }}
//             >
//                 <Button
//                     variant="outlined"
//                     onClick={handlePrevPage}
//                     disabled={pageNumber === 1}
//                     sx={{ marginRight: 2 }} // Adjust margin for spacing between buttons
//                 >
//                     Précédent
//                 </Button>
//                 <p>{`Page ${pageNumber} sur ${numPages}`}</p>
//                 <Button
//                     variant="outlined"
//                     onClick={handleNextPage}
//                     disabled={pageNumber === numPages}
//                     sx={{ marginLeft: 2 }} // Adjust margin for spacing between buttons
//                 >
//                     Suivant
//                 </Button>
//             </Box>
//         </div>
//     );
// };

// export default Pdf;
