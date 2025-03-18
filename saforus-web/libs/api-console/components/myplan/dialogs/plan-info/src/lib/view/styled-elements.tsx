import { Alert, AlertProps, Box, Typography, styled } from '@mui/material';
import Icon from '@web-workspace/shared/components/widgets/icon';

export const PlanTitle = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  lineHeight: '28px',
  fontWeight: 700,
  letterSpacing: '-0.02em',
}));

export const DetailContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  borderRadius: '8px',
  gap: '12px',
  backgroundColor: 'var(--neutral-100)',
}));

export const StyledAlert = styled((props: AlertProps) => {
  const { severity } = props;
  const severityIconMap = {
    info: <Icon size={24} name="information" color="var(--purple-600)" />,
    warning: <Icon size={24} name="question" color="var(--orange-500)" />,
  };
  const icon = severityIconMap[severity as 'info' | 'warning'];

  return <Alert icon={icon} {...props} />;
})(({ theme }) => ({
  borderRadius: '8px',
  padding: '0px 16px',
  alignItems: 'center',

  '& .MuiAlert-icon': {
    marginRight: '1rem',
  },
  '& .MuiAlert-message': {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '20px',
    color: 'var(--gray-800)',
  },

  '&.MuiAlert-standardInfo': {
    background: 'var(--purple-50)',
    border: '1.5px solid var(--purple-400)',
  },
  '&.MuiAlert-standardWarning': {
    background: 'var(--orange-50)',
    border: '1.5px solid var(--orange-600)',
  },
}));
