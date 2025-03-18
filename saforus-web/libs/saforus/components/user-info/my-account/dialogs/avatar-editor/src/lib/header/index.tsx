import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

export const AvatarHeader = () => {
  const { t } = useTranslation();

  const title = t('myaccount.login-information.dialog.avatar-title');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: 500,
          lineHeight: '28px',
          letterSpacing: '-0.4px',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
