import { Box, Card, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpitedEmailLogo from '../../assets/expired-email-logo.svg';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 25,
    padding: '0px 4px',
    backgroundColor: '#F2C94C',
    fontSize: 25,
    minHeight: 30,
    minWidth: 30,
    borderRadius: 20,
    fontWeight: 700,
  },
}));
const ExpiredMailView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#FFFFFF',
        borderRadius: '8px',
        flex: 'none',
        order: 0,
        mt: '1.5rem',
        mb: '1.5rem',
        padding: '1.5rem',
      }}
    >
      <Box sx={{ mt: '1rem', mb: '1rem' }}>
        <img
          src={ExpitedEmailLogo}
          width={660}
          height={508}
          alt="no team"
          loading="lazy"
        />
      </Box>
      <Box
        sx={{
          height: '222px',
          maxWidth: '592px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="subtitle2"
          fontSize={'28px'}
          color={'var(--purple-400)'}
          fontWeight={600}
        >
          {t('team-member.expired-email-view.title')}
        </Typography>
        <Typography
          textAlign={'center'}
          fontSize={'36px'}
          fontWeight={600}
          variant="subtitle2"
          color={'var(--gray-700)'}
          lineHeight={'44px'}
        >
          {t('team-member.expired-email-view.heading')}
        </Typography>
        <Typography
          variant="subtitle2"
          fontSize={'16px'}
          color="var(--gray-50)"
          fontWeight={500}
          textAlign={'center'}
          lineHeight={'24px'}
        >
          {t('team-member.expired-email-view.description')}
        </Typography>
        {/* <StyledBadge badgeContent={'1'}> */}
        <Button
          onClick={() =>
            navigate(ROUTES.DASHBOARD.PACKAGES_DELIVERY.path, {
              replace: true,
            })
          }
          sx={{
            background: 'var(--main-brand-color3)',
            minWidth: '79px',
            minHeight: '46px',
            padding: '12px 18px 12px 18px',
            borderRadius: '6px',
            color: 'var(--base-white)',
            textTransform: 'capitalize',
          }}
        >
          {t('team-member.expired-email-view.button')}
        </Button>
        {/* </StyledBadge> */}
      </Box>
    </Card>
  );
};
export default ExpiredMailView;
