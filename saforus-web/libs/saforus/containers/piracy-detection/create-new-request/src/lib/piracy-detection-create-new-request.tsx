/* eslint-disable-next-line */
import PiracyDetectionCreateNewRequest from '@web-workspace/saforus/components/piracy-detection/create-new-request';
import { Alert, Box, Link, Typography, useTheme } from '@mui/material';
import { useSnapshot } from 'valtio';
import { Trans, useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { PageTitle } from '@web-workspace/saforus/common/views';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import Icon from '@web-workspace/shared/components/widgets/icon';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export const StyledAlert = styled(Alert)`
  background: var(--orange-50);
  border: 1.5px solid var(--orange-600);
  border-radius: 8px;
  padding: 8px 24px;
  align-items: center;

  & .MuiAlert-message {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: var(--gray-800);
  }

  & .MuiAlert-icon {
    padding: 0;
    margin-right: 1rem;
  }
`;

export function PiracyDetectionCreateNewRequestContainer() {
  const { setResponsiveLayout, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { t, i18n } = useTranslation();
  const linkSupport = getEnvVar(
    i18n.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );
  const theme = useTheme();
  useEffect(() => {
    setResponsiveLayout(theme);
    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <BoxContainer>
      <PageTitle
        title={t('create-new-request.header-title')}
        sx={{
          paddingBottom: 0,
          borderBottom: 'none',
        }}
      >
        <Typography variant="body2" color="var(--gray-50)">
          {t('create-new-request.header-description')}
        </Typography>
        <StyledAlert
          severity="warning"
          icon={<Icon size={24} name="information" color="var(--orange-500)" />}
          sx={{ marginTop: '14px' }}
        >
          <Trans
            i18nKey="create-new-request.description-2"
            components={[
              <Link target="_blank" href={linkSupport} color="inherit" />,
            ]}
          />
        </StyledAlert>
      </PageTitle>
      <PiracyDetectionCreateNewRequest />
    </BoxContainer>
  );
}

export default PiracyDetectionCreateNewRequestContainer;
