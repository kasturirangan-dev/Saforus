import { Box, Button, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';

const StyledContactButton = styled(Button)`
  background: var(--base-white);
  border: 1px solid var(--red-400);
  box-shadow: var(--shadow-xsm);
  border-radius: 6px;
  color: var(--red-600);
  padding: 0.5rem 0.75rem;
  text-transform: none;
  font-weight: 700;
  font-size: '0.875rem';
`;

export function DeleteAccount() {
  const { t } = useTranslation();
  const linkSupport = getEnvVar(
    i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );
  return (
    <Box
      sx={{
        width: '50%',
        display: 'flex',
        gap: '1.5rem',
        flexDirection: 'column',
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ marginBottom: 0, marginTop: '0.5rem' }}>
          {t('myaccount.delete-account.title')}
        </Typography>
        <Typography
          component={'span'}
          sx={{
            color: 'var(--gray-50)',
            fontSize: '0.875rem',
            fontWeight: '400',
          }}
        >
          {t('myaccount.delete-account.sub-title')}
        </Typography>
      </Box>

      <Box>
        <StyledContactButton href={linkSupport} target={'_blank'}>
          {t('myaccount.delete-account.contact')}
        </StyledContactButton>
      </Box>
    </Box>
  );
}

export default DeleteAccount;
