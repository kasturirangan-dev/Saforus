import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#574EFA',
      contrastText: '#fff',
    },
    secondary: {
      main: '#574EFA',
      contrastText: '#fff',
    },
    error: {
      main: '#E2341D',
      contrastText: '#fff',
    },
    background: {
      default: '#f2f2f2',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
    mode: 'light',
  },
  typography: {
    fontFamily: [
      'Noto Sans KR',
      'SF Pro Display',
      '-apple-system',
      'BlinkMacSystemFont',
      'Basier Square',
      'Apple SD Gothic Neo',
      'Inter',
      'Roboto',
      'Noto Sans',
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
    ].join(','),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '4rem', // 64px
      fontWeight: 700,
      lineHeight: '4.25rem', // 68px
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '3.25rem', // 52px
      fontWeight: 700,
      lineHeight: '3.75rem', // 60px
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2.5rem', // 40px
      fontWeight: 700,
      lineHeight: '3rem', // 48px
      letterSpacing: '-0.02em',
    },
    h4: {
      fontSize: '2rem', // 32px
      fontWeight: 700,
      lineHeight: '2.5rem', // 40px
      letterSpacing: '-0.02em',
    },
    h5: {
      fontSize: '1.75rem', // 28px
      fontWeight: 700,
      lineHeight: '38px',
      letterSpacing: '-0.01em',
    },
    h6: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: '30px',
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '28px',
      letterSpacing: '-0.1px',
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.5rem', // 24px
      letterSpacing: '-0.1px',
    },
    body1: {
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '22px',
      letterSpacing: '-0.1px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '-0.1px',
    },
    caption: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '18px',
      letterSpacing: '-0.1px',
    },
    button: {
      fontSize: '15px',
      fontWeight: 600,
      lineHeight: '22px',
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2560,
    },
  },
});

export default theme;
