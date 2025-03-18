import { Box, Typography, Link, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { useTranslation } from 'react-i18next';
import LogoDark from '../assets/logo_image_dark.png';
import Logo from '../assets/logo.svg';

// Styled components
const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  paddingTop: '40px',
  minWidth: '100%',
}));

const LinkContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 400,
  fontSize: '16px',
  marginTop: '8px',
}));

const ContactDetail = ({
  label,
  value,
  color,
}: {
  label: string;
  value: React.ReactNode;
  color?: string;
}) => (
  <Box display="flex" alignItems="center">
    <Typography
      color={color ? color : 'var(--gray-700)'}
    >{`${label}:`}</Typography>
    &nbsp;
    <Typography color="var(--gray-50)">{value}</Typography>
  </Box>
);

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
    <Typography>
      <Link
        href={getEnvVar(i18n.language === 'en' ? enLink : koLink)}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'var(--gray-700)',
          textDecoration: 'none',
        }}
      >
        {t(`apiServicePlan.contact.${helpKey}`)}
      </Link>
    </Typography>
  );
};

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <Box>
      <FooterContainer component="footer">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <img
              src={Logo}
              alt="logo"
              title="logo"
              style={{
                width: '160px',
                height: '60px',
                alignSelf: 'start',
              }}
              loading="lazy"
            />
          </Grid>
          <Grid item xs={7}>
            <Typography color="var(--gray-50)">
              {t('api-footer.productBy')}
            </Typography>
            <Typography color="var(--gray-50)" sx={{ mb: 6 }}>
              {t('apiServicePlan.contact.businessAddressValue')}
            </Typography>
            <ContactDetail
              color="var(--gray-50)"
              label={t('apiServicePlan.contact.representative')}
              value={t('apiServicePlan.contact.representativeValue')}
            />
            <ContactDetail
              color="var(--gray-50)"
              label={t('apiServicePlan.contact.businessRegistrationNumber')}
              value={t(
                'apiServicePlan.contact.businessRegistrationNumberValue'
              )}
            />
            <ContactDetail
              color="var(--gray-50)"
              label={t('apiServicePlan.contact.eCommerceRegistrationNumber')}
              value={t(
                'apiServicePlan.contact.eCommerceRegistrationNumberValue'
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <ContactDetail
              label={t('apiServicePlan.contact.our-contact')}
              value={
                <Link
                  href="mailto:support@saforus.com"
                  style={{
                    color: 'var(--gray-50)',
                    textDecoration: 'none',
                  }}
                >
                  support@saforus.com
                </Link>
              }
            />
            <Box sx={{ mt: 10 }}>
              <HelpLink
                helpKey="termsOfService"
                enLink="VITE_TERMS_URL"
                koLink="VITE_TERMS_KO_URL"
              />
              <HelpLink
                helpKey="privacyPolicy"
                enLink="VITE_PRIVACY_URL"
                koLink="VITE_PRIVACY_KO_URL"
              />
            </Box>
          </Grid>
        </Grid>
      </FooterContainer>
      <LinkContainer>
        <Typography color="var(--gray-25)" style={{ wordSpacing: '0.1em' }}>
          <span>Copyright ©{new Date().getFullYear()}.</span>
          <Link
            href={
              'https://www.markany.com/?_gl=1*1f7rv9w*_gcl_au*MTEzMDI2MjIxMC4xNzM4NjIyMTg2*_ga*MTUxMTA3NjUxNC4xNzEzMjgzNzUx*_ga_J580LFVKS8*MTczODg4OTI5Ni44OS4xLjE3Mzg4OTE3OTcuNTYuMS4zODgyNTU5OTk.'
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--gray-25)',
              textDecorationColor: 'var(--gray-25)',
              wordSpacing: '0.1em',
              paddingLeft: '5px',
            }}
          >
            {t('apidoc.api-footer.company')}.
          </Link>
          &nbsp;
          <span>{t('apidoc.api-footer.allrightsreserved')}</span>
        </Typography>
      </LinkContainer>
    </Box>
  );
};

export default Footer;
