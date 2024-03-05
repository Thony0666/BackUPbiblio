import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import { LogoTafomihaavoBack } from 'ui-component/LogoTafoMihaavo';
// import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="berry logo">
        {/* <Logo /> */}
        <LogoTafomihaavoBack />
    </Link>
);

export default LogoSection;
