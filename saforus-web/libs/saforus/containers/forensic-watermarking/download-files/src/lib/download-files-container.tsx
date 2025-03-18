import { Box, Container, styled, Typography } from '@mui/material';
import DownloadFile, {
  DownloadFileStore,
} from '@web-workspace/saforus/components/forensic-watermarking/download-files';
import Icon from '@web-workspace/shared/components/widgets/icon';
import MuiButton from '@mui/material/Button';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import BreadcrumbComponent from '@web-workspace/saforus/components/forensic-watermarking/breadcrumb';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line @nx/enforce-module-boundaries

import { useSearchParams } from 'react-router-dom';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  fontSize: 30,
  fontWeight: '600',
  lineHeight: '30px',
  textTransform: 'none',
  color: '#EFEFF1',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export function DownloadFilesContainer() {
  const { orderNo } = useSnapshot(DownloadFileStore);
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  const BreadcrumbDownloadFiles = [
    {
      title: 'download-files.breadcrumb.forensic-watermarking',
      path: `${ROUTES.FORENSIC_WATERMARKING.NEW_FORENSIC_WATERMARKING.path}`,
    },
    {
      title: 'download-files.breadcrumb.view-orders',
      path: `${ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.path}`,
    },
    {
      title: 'download-files.breadcrumb.details',
      path: `${ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.children.WATERMARKING_HISTORY_DETAIL.path}/${orderNo}`,
    },
    {
      title: 'download-files.breadcrumb.download-files',
      path: '',
    },
  ];
  const { t } = useTranslation();
  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledButton
            onClick={() => {
              window.history.back();
            }}
            variant={'text'}
          >
            <Icon
              iconStyle={{ marginRight: '6px' }}
              name="arrow_left"
              size={45}
              color="#5F6D7E"
            />
          </StyledButton>
          <Typography variant="h4">{t('download-files.breadcrumb.download-files')}</Typography>
        </Box>
        <BreadcrumbComponent
          BreadcrumbData={BreadcrumbDownloadFiles}
        ></BreadcrumbComponent>
      </Box>
      <DownloadFile />
    </Container>
  );
}

export default DownloadFilesContainer;
