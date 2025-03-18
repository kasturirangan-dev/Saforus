import { Box } from '@mui/material';
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
        alignItems: 'baseline',
        gap: '4px',
        height: '43px',
        minWidth: '156px',
        ...sx,
      }}
    >
      <img
        src={logo}
        alt="logo"
        title="logo"
        style={{
          height: 38,
        }}
        loading="lazy"
      />
    </Box>
  );
};

export default Logo;
