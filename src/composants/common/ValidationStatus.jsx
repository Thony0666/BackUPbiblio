import Chip from 'ui-component/extended/Chip';

const ChipValidation = ({ title, variant }) => {
    return <Chip variant="outlined" label={title} size="small" chipcolor={variant} />;
};

const ValidationStatus = ({ institution, technique }) => {
    if (technique === '0' && institution === '0') {
        return <ChipValidation title={'Invalide'} variant={'error'} />;
    }
    if ((technique === '1' && institution === '0') || (technique === '0' && institution === '1')) {
        return <ChipValidation title={'Prévalide'} variant={'warning'} />;
    }
    if (technique === '1' && institution === '1') {
        return <ChipValidation title={'Valide'} variant={'success'} />;
    }
};

export default ValidationStatus;
