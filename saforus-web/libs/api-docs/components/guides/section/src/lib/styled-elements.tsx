import {
  Alert,
  AlertProps,
  Box,
  Card,
  CardProps,
  Link,
  LinkProps,
  Typography,
  styled,
} from '@mui/material';
import Icon from '@web-workspace/shared/components/widgets/icon';
import WarningIcon from '../assets/warning.svg';
export const SectionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  scrollMarginTop: '32px',

  '&.section-title--h2': {
    fontSize: '28px',
    fontWeight: 600,
    lineHeight: '34px',
    letterSpacing: '-0.01em',
    color: 'var(--gray-700)',
  },

  '&.section-title--h3': {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-700)',
  },

  '&.section-title--h4': {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-700)',
  },

  '& a': {
    color: 'inherit',
    textDecoration: 'inherit',
  },
}));

export const TextContent = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '22px',
  letterSpacing: '-0.1px',
  color: 'var(--gray-200)',
  whiteSpace: 'pre-line',
}));

export const StyledLink = styled((props: LinkProps) => (
  <Link
    underline="hover"
    target="_blank"
    rel="noopener noreferrer"
    color={'var(--link)'}
    {...props}
  />
))(({ theme }) => ({}));

export const StyledAlert = styled((props: AlertProps) => {
  const { severity } = props;
  const severityIconMap = {
    info: <Icon size={24} name="information" color="var(--purple-600)" />,
    warning: (
      <img
        src={WarningIcon}
        alt="warning-icon"
        loading="lazy"
        width={24}
        height={24}
      />
    ),
  };
  const icon = severityIconMap[severity as 'info' | 'warning'];

  return <Alert icon={icon} {...props} />;
})(({ theme }) => ({
  borderRadius: '8px',
  padding: '8px 24px',
  alignItems: 'center',
  '& .MuiAlert-icon': {
    marginRight: '16px',
    padding: '4px 0px',
  },
  '& .MuiAlert-message': {
    padding: 0,
    color: 'var(--gray-800)',
    whiteSpace: 'pre-line',
    '& strong': {
      fontWeight: 600,
    },
  },

  '&.MuiAlert-standardInfo': {
    backgroundColor: 'var(--purple-50)',
  },
  '&.MuiAlert-standardWarning': {
    backgroundColor: 'var(--orange-50)',
  },
}));

export const CodeContent = styled(Typography)(({ theme }) => ({
  display: 'inline',
  padding: '1px 4px',
  borderRadius: '2px',
  fontFamily: 'SF Mono',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '18px',
  color: 'var(--gray-200)',
  backgroundColor: 'var(--neutral-400)',
  WebkitBoxDecorationBreak: 'clone',
  boxDecorationBreak: 'clone',
}));
export const GuideCard = styled((props: CardProps) => (
  <Card variant="outlined" {...props} />
))(({ theme }) => ({
  backgroundColor: 'var(--neutral-50)',
  borderRadius: '8px',
  border: '1px solid var(--neutral-600)',
}));
