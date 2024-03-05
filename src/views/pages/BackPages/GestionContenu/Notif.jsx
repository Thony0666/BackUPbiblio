import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import Waiter from 'composants/common/Waiter';
import TrashButton from 'composants/thony/component/ButtonActionTrash';
import React, { useEffect, useState } from 'react';
import { useAuthTemp } from 'utils/auth';
import { siteUrlApi } from 'utils/base_url_api';

function Notif() {
    const auth = useAuthTemp();
    const makeUser = auth.getUserBack();
    const idUser = makeUser.id;
    const [datas, setMyData] = useState([]);
    const [loading, setLoadloading] = useState(true);

    useEffect(() => {
        // console.log('inty ny ' + idUser);
        axios
            .get(siteUrlApi(`users-back/pokes/${idUser}`))
            .then((response) => {
                setMyData(response.data.items);
                // setLoad(false);
                console.log('okey azo');
                console.log(response.data.items);
                setLoadloading(false);
            })
            .catch((error) => {
                console.error('tsy mandeha');
                console.error(error);
                setLoadloading(false);
            });
    }, []);
    return (
        <>
            <Waiter loadingState={loading} />
            <Box
                mb={3}
                boxShadow={10}
                padding={1}
                sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '8px'
                }}
            >
                <Typography variant="h2">Notification</Typography>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden', margin: 'auto' }}>
                <TableContainer sx={{ maxHeight: 800 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Titre</TableCell>
                                {/* <TableCell>Region</TableCell> */}
                                <TableCell>Expéditeur</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datas &&
                                datas.map((item) => (
                                    <>
                                        <TableRow key={item.id}>
                                            <TableCell>{item.title}</TableCell>
                                            {/* <TableCell>{item.regionName}</TableCell> */}
                                            <TableCell>{item.userBackReporterUsername}</TableCell>
                                            <TableCell>{item.remark}</TableCell>
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
}

export default Notif;
