import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '@web-workspace/shared/components/widgets/button';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { pxToVw } from '@web-workspace/saforus/common/utils';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: pxToVw(['10px', '16px']),
  fontSize: pxToVw('14px'),
  fontWeight: '700',
  lineHeight: pxToVw('20px'),
}));

//Adding the functionality to accept custom styles for the buttons
interface NavbarActionsProps extends BoxProps {
  buttonStyles?: {
    signUpButton?: any;
    loginButton?: any;
  };
}

// const StyledButtonSupport = styled(Button)(({ theme }) => ({
//   padding: pxToVw(['12px', '18px']),
//   fontSize: pxToVw('15px'),
//   fontWeight: '600',
//   lineHeight: pxToVw('22px'),
//   color:
//     theme.palette.mode === 'light' ? 'var(--gray-50)' : 'var(--neutral-50)',
// }));

const NavbarActions = ({ buttonStyles, ...props }: NavbarActionsProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const linkSupport = getEnvVar(
  //   i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  // );

  const location = useLocation();
  const isMainStyleButtonLogin =
    location.pathname === ROUTES.LOGIN.path ||
    location.pathname === ROUTES.RESET.path ||
    location.pathname === ROUTES.REGISTER_DONE.path;

  //Adding the below variables to accept custom styles for the buttons
  const signUpButtonStyle = buttonStyles?.signUpButton ?? {};
  const loginButtonStyle = buttonStyles?.loginButton ?? {};
  
  return (
    <Box
      {...props}
      sx={{
        display: { xs: 'none', tab: 'flex' },
        alignItems: 'center',
        marginLeft: pxToVw('16px'),
      }}
    >
      {/* <StyledButtonSupport
        variant={'text'}
        color="secondary"
        onClick={() => {
          window.open(linkSupport, '_blank');
        }}
      >
        {t('button.support')}
      </StyledButtonSupport> */}
      <StyledButton
        sx={signUpButtonStyle}
        variant={
          location.pathname === ROUTES.REGISTER.path ? 'contained' : 'text'
        }
        onClick={() => {
          if (location.pathname === ROUTES.REGISTER.path) return;
          navigate(ROUTES.REGISTER.path);
        }}
      >
        {t('button.sign-up')}
      </StyledButton>
      <StyledButton
        sx={loginButtonStyle}
        variant={isMainStyleButtonLogin ? 'contained' : 'text'}
        onClick={() => {
          if (location.pathname === ROUTES.LOGIN.path) return;
          navigate(ROUTES.LOGIN.path);
        }}
      >
        {t('button.log-in')}
      </StyledButton>
    </Box>
  );
};

export default React.memo(NavbarActions);
