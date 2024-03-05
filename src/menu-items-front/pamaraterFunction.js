import axios from 'axios';
import { siteUrlApi } from 'utils/base_url_api';

/* eslint-disable prettier/prettier */
// Define an asynchronous function to fetch the data
export async function thematique() {
    try {
        let listThematique = [];
        const response = await axios.get(siteUrlApi('themes'));
        listThematique = response.data.items;
        console.log('aserty');
        console.log(response.data.items);
        return listThematique;
    } catch (error) {
        console.error('tsy mandeha');
        console.error(error);
        // Handle the error as needed
        throw error;
    }
}

// Function to handle onload event
function onload() {
    // Call the asynchronous function and handle the promise
    fetchData()
        .then((listThematique) => {
            // Now you can work with the fetched data
            console.log('Fetched data:', listThematique);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

// Attach the onload function to the window.onload event
window.onload = onload;
