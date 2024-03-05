import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const StateMessage = (props) => {
    return (
        <>
            <Dialog open={props.showSuccessDialog} onClose={props.handleCloseSuccessDialog}>
                <Alert severity="success">
                    Le contenu a été inséré avec succès
                    <Button onClick={props.handleCloseSuccessDialog} color="primary">
                        OK
                    </Button>
                </Alert>
            </Dialog>

            <Dialog open={props.showErrorDialog} onClose={props.handleCloseErrorDialog}>
                {/* <DialogTitle>Erreur</DialogTitle>
                <DialogContent> */}
                <Alert severity="error">
                    Erreur : Veuiller verifier le format ou taille du contenu
                    <Button onClick={props.handleCloseErrorDialog} color="primary">
                        OK
                    </Button>
                </Alert>
                {/* </DialogContent> */}
            </Dialog>
        </>
    );
};

export default StateMessage;
