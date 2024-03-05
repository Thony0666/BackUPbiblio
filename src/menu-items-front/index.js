import { IconHome, IconInfoCircle, IconListDetails, IconMap, IconMovie, IconPhoneCall } from '@tabler/icons-react';
import { thematique } from './pamaraterFunction';

const icons = {
    IconHome,
    IconMap,
    IconListDetails,
    IconMovie,
    IconInfoCircle,
    IconPhoneCall
};

let listThematiqueData;
let valiny = [];

async function onload() {
    listThematiqueData = await thematique();

    listThematiqueData.map((thematique) => {
        let temp = { id: 'theme' + thematique.id, title: thematique.name, type: 'item', url: '/thematique/' + thematique.id };
        valiny.push(temp);
    });
}
window.onload = onload;
const thematiques = valiny;

const listMedia = [
    { id: 1, name: 'Lahatsoratra', url: 'article' },
    { id: 2, name: 'Horonantsary', url: 'video' },
    { id: 3, name: 'Horonam-peo', url: 'audio' },
    { id: 4, name: 'PDF', url: 'pdf' },
    { id: 5, name: 'Hafa', url: 'autre' }
];

const makeMediaMenu = () => {
    let valiny = [];
    listMedia.map((media) => {
        let temp = { id: 'media' + media.id, title: media.name, type: 'item', url: '/media/' + media.url };
        valiny.push(temp);
    });
    return valiny;
};

const medias = makeMediaMenu();

const menuItemsFront = {
    items: [
        { id: 'accueil', title: 'Fandraisana', type: 'group', url: '/', icon: icons.IconHome },
        {
            id: 'zone',
            title: 'Toerana',
            type: 'group',
            icon: icons.IconMap,
            children: [
                { id: 'zonetous', title: 'Izy rehetra', type: 'item', url: '/zone' },
                { id: 'zoneregional', title: 'Faritra', type: 'item', url: '/zone/regionale' },
                { id: 'zonenational', title: 'Nasionaly', type: 'item', url: '/zone/nationale' },
                { id: 'zoneinternational', title: 'Iraisam-pirenena', type: 'item', url: '/zone/internationale' }
            ]
        },
        { id: 'thematique', title: 'Lohahevitra', type: 'group', icon: icons.IconListDetails, children: thematiques },
        { id: 'media', title: 'Sokajin-tsesika', type: 'group', icon: icons.IconMovie, children: medias },
        { id: 'apropos', title: 'Mombamomba', type: 'group', url: '/apropos', icon: icons.IconInfoCircle },
        { id: 'contactus', title: 'Hifandaray aminay', type: 'group', url: '/contactus', icon: icons.IconPhoneCall }
    ]
};

export default menuItemsFront;
