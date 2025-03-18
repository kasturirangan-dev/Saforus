import { Alert, AlertProps, styled } from '@mui/material';
import Icon from '@web-workspace/shared/components/widgets/icon';

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
  },
  '&.MuiAlert-standardWarning': {
    background: 'var(--orange-50)',
  },
}));
