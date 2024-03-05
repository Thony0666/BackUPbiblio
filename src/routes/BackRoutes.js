import BackLayout from 'layout/BackLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import RequireAuth from 'utils/requireAuth';
import Notif from 'views/pages/BackPages/GestionContenu/Notif';
import AddRegion from 'views/pages/BackPages/GestionSite/AddRegion';
import AlredyPosted from 'views/pages/BackPages/GestionSite/AlredyPosted';
import Contact from 'views/pages/BackPages/GestionSite/Contact';
import NewCollectorUser from 'views/pages/BackPages/GestionUtilisateur/NewCollectorUser';
import ListUserBack from 'views/pages/BackPages/GestionUtilisateur/NewCollectorUser';
import ProfileUSerBack from 'views/pages/BackPages/GestionUtilisateur/ProfileUserBack';

const ConfigApp = Loadable(lazy(() => import('views/pages/BackPages/GestionSite/ConfigApp')));
const ConfigAccueil = Loadable(lazy(() => import('views/pages/BackPages/GestionSite/ConfigAccueil')));
const ConfigApropos = Loadable(lazy(() => import('views/pages/BackPages/GestionSite/ConfigApropos')));
const Publication = Loadable(lazy(() => import('views/pages/BackPages/GestionSite/Publication')));
const TableauDeBord = Loadable(lazy(() => import('views/pages/BackPages/GestionSite/TableauDeBord')));
const Signalement = Loadable(lazy(() => import('views/pages/BackPages/GestionSite/Signalement')));

const Archive = Loadable(lazy(() => import('views/pages/BackPages/GestionContenu/Archive')));
const Corbeille = Loadable(lazy(() => import('views/pages/BackPages/GestionContenu/Corbeille')));
const MesContenus = Loadable(lazy(() => import('views/pages/BackPages/GestionContenu/MesContenus')));
const Validation = Loadable(lazy(() => import('views/pages/BackPages/GestionContenu/Validation2')));

const UserBackOffice = Loadable(lazy(() => import('views/pages/BackPages/GestionUtilisateur/UserBackOffice')));
const UserPublic = Loadable(lazy(() => import('views/pages/BackPages/GestionUtilisateur/UserPublic')));
const InstitutionDeBase = Loadable(lazy(() => import('views/pages/BackPages/GestionUtilisateur/InstitutionDeBase')));
const CommunauteTafomihaavo = Loadable(lazy(() => import('views/pages/BackPages/GestionUtilisateur/CommunauteTafomihaavo')));

const ContentManagement = Loadable(lazy(() => import('composants/jed/contents/ContentManagement')));
const NewArticleForm = Loadable(lazy(() => import('composants/jed/contents/NewArticleForm')));
const NewAudioForm = Loadable(lazy(() => import('composants/jed/contents/NewAudioForm')));
const NewImageForm = Loadable(lazy(() => import('composants/jed/contents/NewImageForm')));
const NewPdfForm = Loadable(lazy(() => import('composants/jed/contents/NewPdfForm')));
const NewVideoForm = Loadable(lazy(() => import('composants/jed/contents/NewVideoForm')));
const DescriContenue = Loadable(lazy(() => import('composants/jed/contents/description/DescriContenue')));

const BackRoutes = {
    path: '/',
    element: (
        <RequireAuth>
            <BackLayout />
        </RequireAuth>
    ),
    children: [
        {
            path: '/backinterface/gestion-site/config-app',
            element: <ConfigApp />
        },
        {
            path: '/backinterface/gestion-site/config-accueil',
            element: <ConfigAccueil />
        },
        {
            path: '/backinterface/gestion-site/config-apropos',
            element: <ConfigApropos />
        },
        {
            path: '/backinterface/gestion-site/config-contact',
            element: <Contact />
        },
        {
            path: '/backinterface/gestion-site/publication',
            element: <Publication />
        },
        {
            path: '/backinterface/gestion-site/publication/publier',
            element: <AlredyPosted />
        },
        {
            path: '/backinterface/gestion-site/tableau-bord',
            element: <TableauDeBord />
        },
        {
            path: '/backinterface/gestion-site/signalement',
            element: <Signalement />
        },
        {
            path: '/backinterface/gestion-contenu/archive',
            element: <Archive />
        },
        {
            path: '/backinterface/gestion-contenu/corbeille',
            element: <Corbeille />
        },
        {
            path: '/backinterface/gestion-contenu/notification',
            element: <Notif />
        },
        {
            path: '/backinterface/gestion-contenu/mes-contenus',
            element: <MesContenus />
        },
        {
            path: '/backinterface/gestion-contenu/validation',
            element: <Validation />
        },
        {
            path: '/backinterface/gestion-utilisateur/user-backoffice',
            element: <UserBackOffice />
        },
        {
            path: '/backinterface/gestion-utilisateur/institution-base',
            element: <InstitutionDeBase />
        },
        {
            path: '/backinterface/gestion-utilisateur/user-public',
            element: <UserPublic />
        },
        {
            path: '/backinterface/gestion-contenu/contents',
            element: <ContentManagement />
        },
        {
            path: '/backinterface/gestion-contenu/newArticleForm',
            element: <NewArticleForm />
        },
        {
            path: '/backinterface/gestion-contenu/newAudioForm',
            element: <NewAudioForm />
        },
        {
            path: '/backinterface/gestion-contenu/newImageForm',
            element: <NewImageForm />
        },
        {
            path: '/backinterface/gestion-contenu/newPdfForm',
            element: <NewPdfForm />
        },
        {
            path: '/backinterface/gestion-contenu/newVideoForm',
            element: <NewVideoForm />
        },
        {
            path: '/backinterface/gestion-contenu/descri/:id',
            element: <DescriContenue />
        },
        {
            path: '/backinterface/gestion-site/addRegion',
            element: <AddRegion />
        },
        {
            path: '/backinterface/gestion-utilisateur/newCollectorUser',
            element: <NewCollectorUser />
        },
        {
            path: '/backinterface/gestion-utilisateur/c-tafomihaavo',
            element: <CommunauteTafomihaavo />
        },
        {
            path: '/backinterface/gestion-utilisateur/c-tafomihaavo/:idUser',
            element: <ProfileUSerBack />
        },
        {
            path: '/backinterface/gestion-utilisateur/user-public/:idUser',
            element: <ProfileUSerBack />
        }
    ]
};
export default BackRoutes;
