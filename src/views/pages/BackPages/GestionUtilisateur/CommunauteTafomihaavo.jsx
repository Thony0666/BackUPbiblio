import {
    Chip,
    Divider,
    Grid,
    MenuItem,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { siteUrlApi } from 'utils/base_url_api';
import Waiter from 'composants/common/Waiter';
import ButtonActionUsersCom from 'composants/thony/component/ButtonActionUsersCom';
const statu = [
    {
        id: 1,
        statusName: 'Actif'
    },
    {
        id: 2,
        statusName: 'Inactif'
    }
];
let setValueStatus = '';

function UserPublic() {
    const [usersFront, setUsersFront] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(siteUrlApi('users-front/tafomihaavo/'))
            .then((response) => {
                setUsersFront(response.data.items);
                setLoading(false);
            })
            .catch((error) => {
                console.log('tsy mande ny url users satria' + error);
                setLoading(false);
            });
    });
    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: 'white'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14
        }
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        '&:last-child td, &:last-child th': {
            border: 0
        }
    }));
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

        const date = new Date(dateString);

        return date.toLocaleDateString('fr-FR', options);
    };
    return (
        <>
            <Waiter loadingState={isLoading} />
            <Grid
                container
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={3}
                boxShadow={10}
                paddingX={5}
                sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '8px'
                }}
            >
                <Grid>
                    <Typography variant="h1" my={3}>
                        Liste Membres TAFOMIAAVO
                    </Typography>
                </Grid>
                <Grid container items xs={2}>
                    <TextField sx={{ mb: 2 }} fullWidth id="statu" name="statu" label="Statu" select value={setValueStatus}>
                        {statu &&
                            statu.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.statusName}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
            </Grid>

            <Paper
                sx={{
                    overflow: 'hidden',
                    borderRadius: '10px'
                }}
            >
                <TableContainer sx={{ maxHeight: '70vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Noms</StyledTableCell>
                                <StyledTableCell>Premons</StyledTableCell>
                                <StyledTableCell>Sex</StyledTableCell>
                                <StyledTableCell>Region</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Profession</StyledTableCell>
                                <StyledTableCell>Membre depuit</StyledTableCell>
                                <StyledTableCell>status</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                            <Divider />
                        </TableHead>
                        <TableBody>
                            {usersFront &&
                                usersFront.map((item) => (
                                    <>
                                        <TableRow key={item.id}>
                                            <TableCell>{item.firstName}</TableCell>
                                            <TableCell>{item.lastName}</TableCell>
                                            <TableCell>{item.gender}</TableCell>
                                            <TableCell>{item.regionName}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.professionName}</TableCell>
                                            <TableCell>{formatDate(item.createdAt)}</TableCell>
                                            <TableCell>
                                                {item.status == 0 && <Chip variant="outlined" label="inactif" size="small" color="error" />}
                                                {item.status === 100 && (
                                                    <Chip variant="outlined" label="Actif" size="small" color="success" />
                                                )}
                                            </TableCell>
                                            {/* <TableCell>{<Avatar src="/broken-image.jpg" />}</TableCell> */}
                                            <TableCell>
                                                <ButtonActionUsersCom data={item} />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container justifyContent={'center'} py={1}>
                    <Pagination count={11} color="secondary" sx={{ margin: 'auto' }} />
                </Grid>
            </Paper>
        </>
    );
}

export default UserPublic;
