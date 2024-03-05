import {
    Button,
    Chip,
    Grid,
    IconButton,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import BoutonAction from 'composants/thony/component/BoutonAction';
import { getUser } from 'utils/user';
import { useEffect, useState } from 'react';
import { siteUrlApi } from 'utils/base_url_api';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TrashButton from 'composants/thony/component/ButtonActionTrash';
const idUser = getUser();
console.log(idUser);
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
};
const Corbeille = () => {
    const [datas, setMyData] = useState([]);

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: siteUrlApi(`contents-back/trash`),
            headers: {
                'id-user-back': idUser
            }
        };
        axios
            .request(config)
            .then((response) => {
                setMyData(response.data.items);
                setLoad(false);
                console.log('okey azo');
                console.log(response.data.items);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
            });
    }, []);
    return (
        <>
            <Grid
                container
                justifyContent={'space-between'}
                alignItems={"center"}
                mb={3}
                boxShadow={10}
                paddingX={5}
                sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '8px'
                }}
            >
                <Typography variant="h1" my={3}>
                    Corbeille
                </Typography>
                <Button variant="outlined" color="secondary" sx={{ minWidth: '5vh', maxHeight: '3vw' }} startIcon={<DeleteForeverIcon />}>
                    Vide la corbeille
                </Button>
            </Grid>

            <Paper sx={{ width: '100%', overflow: 'hidden', margin: 'auto' }}>
                <TableContainer sx={{ maxHeight: 800 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Titre</TableCell>
                                <TableCell>Region</TableCell>
                                <TableCell>Thematique</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Auteur</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datas &&
                                datas.map((item) => (
                                    <>
                                        <TableRow key={item.idCon}>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.regionName}</TableCell>
                                            <TableCell>{item.themeName}</TableCell>
                                            <TableCell>{item.contentTypeName}</TableCell>
                                            <TableCell>{formatDate(item.createdAt)}</TableCell>
                                            <TableCell>{item.author}</TableCell>
                                            <TableCell>
                                                <TrashButton data={item} />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination count={11} color="secondary" />
            </Paper>
        </>
    );
};

export default Corbeille;
