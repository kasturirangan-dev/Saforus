import { Box, Link, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import FolderIcon from '../assets/folder.svg';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';

const CustomNoRowsOverlay = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        width: '100%',
        gap: '8px',
      }}
    >
      <img src={FolderIcon} alt="search-icon" />

      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color={'var(--gray-700)'}
        >
          {t('find-order-number.no-results')}
        </Typography>
        <Typography variant="body2" color="var(--gray-200)">
          {t('find-order-number.no-results-des')}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomNoRowsOverlay;
