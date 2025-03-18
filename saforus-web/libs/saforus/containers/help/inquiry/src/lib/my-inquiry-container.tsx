import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import MyInquiry from '@web-workspace/saforus/components/help/inquiry';
import {
  Backdrop,
  Box,
  CircularProgress,
  styled,
  useTheme,
} from '@mui/material';
import CommonStore from '@web-workspace/saforus/common/data';
import { PageTitle } from '@web-workspace/saforus/common/views';
import { useTranslation } from 'react-i18next';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
}));

export function MyInquiryContainer() {
  const { isLoading } = useSnapshot(CommonStore);
  const { setResponsiveLayout, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { t } = useTranslation();

  const theme = useTheme();
  useEffect(() => {
    setResponsiveLayout(theme);
    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <BoxContainer>
      <LoadingOverLayer loading={isLoading} isTransparent />
      <PageTitle
        title={t('sidemenu.help-center')}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      />
      <MyInquiry isLoading={isLoading} />
    </BoxContainer>
  );
}

export default MyInquiryContainer;
