import { IconAlertTriangle, IconChartPie, IconHomeEdit, IconInfoOctagon, IconNews, IconSettings2, IconPhone } from '@tabler/icons-react';
const icons = {
    IconHomeEdit,
    IconSettings2,
    IconInfoOctagon,
    IconNews,
    IconChartPie,
    IconAlertTriangle,
    IconPhone
};

const gestionSite = {
    id: 'gestion-site',
    type: 'group',
    title: 'gestion site',
    children: [
        {
            id: 'config-accueil',
            title: 'Accueil',
            url: '/backinterface/gestion-site/config-accueil',
            type: 'item',
            icon: icons.IconHomeEdit
        },
        {
            id: 'config-app',
            title: 'Configuration',
            url: '/backinterface/gestion-site/config-app',
            type: 'item',
            icon: icons.IconSettings2
        },
        {
            id: 'apropos',
            title: 'À propos',
            url: '/backinterface/gestion-site/config-apropos',
            type: 'item',
            icon: icons.IconInfoOctagon
        },
        {
            id: 'contact',
            title: 'Contacte',
            url: '/backinterface/gestion-site/config-contact',
            type: 'item',
            icon: icons.IconPhone
        },
        {
            id: 'news',
            title: 'Publication',
            url: '/backinterface/gestion-site/publication',
            type: 'item',
            icon: icons.IconNews
        },
        {
            id: 'tableaubord',
            title: 'Tableau de bord',
            url: '/backinterface/gestion-site/tableau-bord',
            type: 'item',
            icon: icons.IconChartPie
        },
        {
            id: 'signalement',
            title: 'Signalement',
            url: '/backinterface/gestion-site/signalement',
            type: 'item',
            icon: icons.IconAlertTriangle
        }
    ]
};
export default gestionSite;
