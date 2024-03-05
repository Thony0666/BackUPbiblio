import { Grid } from '@mui/material';
import React from 'react';
import { siteUrlApi } from 'utils/base_url_api';

const VersoCIN = (props) => {
    const urlimage = siteUrlApi(`users-back/stream-doc?fileName=` + 'file-1706612455539.png');
    // const urlimage = siteUrlApi(`users-back/stream-doc?fileName=` + props.data);
    return (
        <>
            <Grid container justifyContent={'center'} height={'40vh'} p={2} borderRadius={5} boxShadow={8}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5d/New_lithuanian_ID_card_(2021)_(front).png"
                    alt=""
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
            </Grid>
        </>
    );
};

export default VersoCIN;
