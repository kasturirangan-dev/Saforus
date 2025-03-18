import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FolderIcon from '../assets/folder.svg';

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
          {t('apiDashboard.usageStatistics.table.no-list-title')}
        </Typography>
        <Typography
          variant="body2"
          color="var(--gray-200)"
          sx={{ whiteSpace: 'pre-line' }}
        >
          {t('apiDashboard.usageStatistics.table.no-list-desc')}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomNoRowsOverlay;
