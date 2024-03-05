import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, Pagination, Typography } from '@mui/material';

// project imports
import UserDetailsCard from 'ui-component/cards/UserDetailsCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getDetailCards, filterDetailCards } from 'store/slices/user';

// assets
import { IconSearch } from '@tabler/icons-react';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const Paginations = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [users, setUsers] = React.useState([]);
    const { detailCards } = useSelector((state) => state.user);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Grid item xs={12}>
            <Grid container spacing={12} justifyContent="center">
                <Grid item>
                    <Pagination count={10} color="secondary" />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Paginations;
