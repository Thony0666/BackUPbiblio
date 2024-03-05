import { IconUserShield, IconUser, IconUsersGroup, IconHierarchy3 } from '@tabler/icons-react';
const icons = {
    IconUser,
    IconUsersGroup,
    IconHierarchy3,
    IconUserShield
};

const gestionUtilisateur = {
    id: 'gestion-utilisateur',
    type: 'group',
    title: 'gestion utilisateur',
    children: [
        {
            id: 'user-public',
            title: 'Utilisateur public',
            url: '/backinterface/gestion-utilisateur/user-public',
            type: 'item',
            icon: icons.IconUser
        },
        {
            id: 'c-tafomihaavo',
            title: 'Commumauté Tafo Mihaavo',
            url: '/backinterface/gestion-utilisateur/c-tafomihaavo',
            type: 'item',
            icon: icons.IconUsersGroup
        },
        {
            id: 'instition-base',
            title: 'Institution de base',
            url: '/backinterface/gestion-utilisateur/institution-base',
            type: 'item',
            icon: icons.IconHierarchy3
        },
        {
            id: 'user-back',
            title: 'Utilisateur back-office',
            url: '/backinterface/gestion-utilisateur/user-backoffice',
            type: 'item',
            icon: icons.IconUserShield
        }
    ]
};

export default gestionUtilisateur;
