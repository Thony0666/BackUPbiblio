import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Waiter = ({ loadingState }) => {
    // const [open, setOpen] = useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    // };
    // const handleOpen = () => {
    //     setOpen(true);
    // };

    return (
        <div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loadingState}>
                <CircularProgress color="secondary" />
            </Backdrop>
        </div>
    );
};
Waiter.propTypes = {
    loadingState: PropTypes.bool
};
export default Waiter;
