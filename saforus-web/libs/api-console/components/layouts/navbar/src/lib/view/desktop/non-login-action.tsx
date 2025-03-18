import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '10px 16px',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  boxShadow: 'none',
}));

const NonLoginActions = (props: BoxProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const appName = getEnvVar('VITE_APP_NAME');
  const linkConsole = getEnvVar('VITE_API_CONSOLE_URL');
  const buttonClick = (path: string) => {
    if (appName === 'Saforus-cs-api') {
      navigate(path);
    } else {
      window.open(new URL(path, linkConsole), '_blank');
    }
  };

  return (
    <Box
      {...props}
      sx={{
        display: { xs: 'none', tab: 'flex' },
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <StyledButton
        variant={'text'}
        sx={{ color: 'var--purple-600)' }}
        onClick={() => {
          buttonClick(API_ROUTES.REGISTER.path);
        }}
      >
        {t('button.sign-up')}
      </StyledButton>
      <StyledButton
        variant={'contained'}
        onClick={() => {
          buttonClick(API_ROUTES.LOGIN.path);
        }}
      >
        {t('button.log-in')}
      </StyledButton>
    </Box>
  );
};

export default React.memo(NonLoginActions);
