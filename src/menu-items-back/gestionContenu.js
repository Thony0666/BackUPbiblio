import { IconListCheck, IconFolder, IconArchive, IconTrash,IconBellRinging } from '@tabler/icons-react';
const icons = {
    IconFolder,
    IconListCheck,
    IconArchive,
    IconTrash,
    IconBellRinging
};

const gestionContenu = {
    id: 'gestion-contenu',
    type: 'group',
    title: 'gestion contenus',
    children: [
        {
            id: 'mes-contenu',
            title: 'Mes contenus',
            url: '/backinterface/gestion-contenu/mes-contenus',
            type: 'item',
            icon: icons.IconFolder
        },
        {
            id: 'validation',
            title: 'Validation',
            url: '/backinterface/gestion-contenu/validation',
            type: 'item',
            icon: icons.IconListCheck
        },
        {
            id: 'archive',
            title: 'Archive',
            url: '/backinterface/gestion-contenu/archive',
            type: 'item',
            icon: icons.IconArchive
        },
        {
            id: 'corbeille',
            title: 'Corbeille',
            url: '/backinterface/gestion-contenu/corbeille',
            type: 'item',
            icon: icons.IconTrash
        },
        {
            id: 'notification',
            title: 'Notification',
            url: '/backinterface/gestion-contenu/notification',
            type: 'item',
            icon: icons.IconBellRinging
        }
    ]
};
export default gestionContenu;
