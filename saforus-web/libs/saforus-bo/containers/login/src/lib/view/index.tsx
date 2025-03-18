import { Box, Tab, Tabs, Typography, styled } from '@mui/material';
import { useState } from 'react';
import LoginForm from '@web-workspace/saforus-bo/components/login-form/login';
import Register from './register';
import { InitDataLoginForm } from '../data';
import { useTranslation } from 'react-i18next';

// Styled components declaration area
const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '60px',
  gap: '1.25rem',
}));

const InnerContainer = styled(Box)(({ theme }) => ({
  width: '420px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.25rem',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: '50%',
  width: '198px',
}));
/////////////////////////////////////////////////////////////////////

export default function LoginView() {
  const { handleSubmit, register, errors, onSubmit } = InitDataLoginForm();

  // hooks declaration area
  const [tabValue, setTabValue] = useState(1);
  const { t } = useTranslation();
  /////////////////////////////////////////////////////////////////

  return (
    <Container>
      <Typography variant="h1" color={'var(--gray-600)'}>
        {t('boLogin.title')}
      </Typography>
      <InnerContainer>
        <Typography variant="h4" color={'var(--gray-600)'} fontWeight="normal">
          {t('boLogin.back-office')}
        </Typography>
        <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)}>
          <StyledTab
            value={0}
            defaultChecked
            label={t('boLogin.sign-up.sign-up')}
          />
          <StyledTab value={1} label={t('boLogin.login.login')} />
        </Tabs>
        {tabValue === 1 ? (
          <LoginForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
          />
        ) : (
          <Register />
        )}
      </InnerContainer>
    </Container>
  );
}
