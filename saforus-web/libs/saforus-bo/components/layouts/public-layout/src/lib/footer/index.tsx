import { styled } from '@mui/material';
import dinosaursFooter from '../assets/dinosaursFooter.svg';

const Footer = () => {
  const StyledFooter = styled('footer')(({ theme }) => ({
    background: `url(${dinosaursFooter}) no-repeat`,
    backgroundSize: 'contain',
    height: 0,
    width: '100%',
    paddingTop: '28.7%;',
  }));

  return <StyledFooter />;
};

export default Footer;
