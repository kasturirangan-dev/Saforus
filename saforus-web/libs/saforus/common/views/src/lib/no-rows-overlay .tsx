import { Box, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface NoRowsOverlayProps {
  linkText?: string;
  title: string;
  desc: string;
  redirectUrl?: string;
}

const CustomNoRowsOverlay: React.FC<NoRowsOverlayProps> = ({
  linkText,
  title,
  desc,
  redirectUrl,
}) => {
  const { i18n } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography variant="h6" fontWeight={600} sx={{ fontSize: '16px' }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={500}
        sx={{ fontSize: '14px', marginBottom: '8px' }}
      >
        {i18n.language === 'en' ? (
          <>
            {desc}{' '}
            {linkText && (
              <Link
                href={redirectUrl}
                variant="body2"
                sx={{ fontSize: '14px' }}
              >
                {linkText}
              </Link>
            )}
          </>
        ) : (
          <>
            {linkText && (
              <Link
                href={redirectUrl}
                variant="body2"
                sx={{ fontSize: '14px' }}
              >
                {linkText}
              </Link>
            )}{desc}
          </>
        )}
      </Typography>
    </Box>
  );
};

export default CustomNoRowsOverlay;
