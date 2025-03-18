import { styled } from '@mui/material';
import Navbar from './navbar';
import Footer from './footer';

/* eslint-disable-next-line */
export interface SaforusBoComponentsPublicLayoutProps {
  children: React.ReactNode;
}

export function SaforusBoComponentsPublicLayout({
  children,
}: SaforusBoComponentsPublicLayoutProps) {
  const StyledContainer = styled('div')({});
  return (
    <StyledContainer>
      <Navbar />
      {children}
      <Footer />
    </StyledContainer>
  );
}

export default SaforusBoComponentsPublicLayout;
