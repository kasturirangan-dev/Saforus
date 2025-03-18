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
          {t('apiOrderList.table.no-results')}
        </Typography>
        <Typography variant="body2" color="var(--gray-200)">
          {t('apiOrderList.table.no-results-des-1')}
        </Typography>
        <Typography variant="body2" color="var(--gray-200)">
          <Trans
            i18nKey="apiOrderList.table.no-results-des-2"
            components={[
              <Link target="_blank" href={API_ROUTES.INSERT_WATERMARK.path} />,
              <Link target="_blank" href={API_ROUTES.DETECT_WATERMARK.path} />,
            ]}
          ></Trans>
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomNoRowsOverlay;
