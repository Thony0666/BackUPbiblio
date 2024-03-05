import axios from 'axios';
import { siteUrlApi } from 'utils/base_url_api';

/* eslint-disable prettier/prettier */
export async function listThematique() {
    let listThematique = [];

    await axios
        .get(siteUrlApi('themes'))
        .then((response) => {
            listThematique = response.data.items;
            console.log('them axios');
            console.log(response.data.items);
        })
        .catch((error) => {
            console.error('tsy mandeha');
            console.error(error);
        });
    return listThematique;
}
