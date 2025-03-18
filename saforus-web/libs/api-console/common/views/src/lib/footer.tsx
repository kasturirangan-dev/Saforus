import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { useTranslation } from 'react-i18next';
import Divider from '@mui/material/Divider';

// Styled components
const FooterContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'var(--base-white)',
  padding: '16px 0',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    borderTop: '1px solid var(--gray-25-opacity)',
  },
}));

const LinkContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
}));

const HelpLink = ({
  helpKey,
  enLink,
  koLink,
}: {
  helpKey: string;
  enLink: string;
  koLink: string;
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Typography variant="body2" color="var(--gray-50)" fontWeight={600}>
      <Link
        href={getEnvVar(i18n.language === 'en' ? enLink : koLink)}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        {t(`apidoc.api-footer.${helpKey}`)}
      </Link>
    </Typography>
  );
};

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <FooterContainer component="footer">
      <LinkContainer>
        <HelpLink
          helpKey="privacypolicy"
          enLink="VITE_PRIVACY_URL"
          koLink="VITE_PRIVACY_KO_URL"
        />

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: 'var(--neutral-750)' }}
        />

        <HelpLink
          helpKey="termsofservice"
          enLink="VITE_TERMS_URL"
          koLink="VITE_TERMS_KO_URL"
        />

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: 'var(--neutral-750)' }}
        />

        <HelpLink
          helpKey="contactus"
          enLink="VITE_SUPPORT_URL"
          koLink="VITE_SUPPORT_KO_URL"
        />
      </LinkContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          fontFamily="Inter"
          color="var(--gray-25)"
          fontWeight={500}
        >
          <span>
            ©{new Date().getFullYear()} {t('apidoc.api-footer.company')}
          </span>
          <span style={{ marginLeft: '4px' }}>
            {t('apidoc.api-footer.allrightsreserved')}
          </span>
        </Typography>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
