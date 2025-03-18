import { Box, Typography } from '@mui/material';
import ImageLight from '../assets/logo_image_light.png';
import { CSSProperties } from 'react';

const Logo = ({
  logo = ImageLight,
  sx,
}: {
  logo?: string;
  sx?: CSSProperties;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'end',
        gap: '8px',
        height: '38px',
        ...sx,
      }}
    >
      <img
        src={logo}
        alt="logo"
        title="logo"
        style={{
          height: '100%',
        }}
        loading="lazy"
      />
      <Typography
        variant="caption"
        sx={{
          color: 'var(--purple-600)',
          backgroundColor: 'var(--purple-25)',
          padding: '0.125rem 0.5rem',
          borderRadius: '5px',
          fontWeight: 500,
          fontSize: '13px',
          lineHeight: '18px',
        }}
      >
        CS API Admin
      </Typography>
    </Box>
  );
};

export default Logo;
