import { Typography, TypographyProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface ContentLabelProps extends TypographyProps {
  label: string;
  style?: React.CSSProperties;
}

const enum StatusName {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  FAILED = 'FAILED',
  DETECTED = 'DETECTED',
  UNDETECTED = 'UNDETECTED',
  ACTIVE = 'ACTIVE',
  PENDING_ACTIVATION = 'PENDING_ACTIVATION',
  LOCKED = 'LOCKED',
  SUSPENDED = 'SUSPENDED',
  PUBLISHED = 'PUBLISHED',
  HIDDEN = 'HIDDEN',
}

const enum UserRole {
  TEAM_EDITOR = 'TEAM_EDITOR',
  TEAM_VIEWER = 'TEAM_VIEWER',
  TEAM_OWNER = 'TEAM_OWNER',
  PRIVATE_USER = 'PRIVATE_USER',
}
export const CustomLabel = ({
  value,
  style,
}: {
  value: string;
  style?: React.CSSProperties;
}) => {
  const { t } = useTranslation();
  let color;
  let bgcolor;
  let valueLabel;
  switch (value) {
    case StatusName.COMPLETED:
      color = 'var(--green-700)';
      bgcolor = 'var(--green-50)';
      valueLabel = t('common.order-status.completed');
      break;
    case StatusName.IN_PROGRESS:
      color = 'var(--purple-600)';
      bgcolor = 'var(--purple-50)';
      valueLabel = t('common.order-status.in-progress');
      break;
    case StatusName.FAILED:
      color = 'var(--red-600)';
      bgcolor = 'var(--red-100)';
      valueLabel = t('common.order-status.failed');
      break;
    case StatusName.DETECTED:
      color = 'var(--green-700)';
      bgcolor = 'var(--green-50)';
      valueLabel = t('common.order-status.detected');
      break;
    case StatusName.UNDETECTED:
      color = 'var(--gray-100)';
      bgcolor = 'var(--neutral-500)';
      valueLabel = t('common.order-status.undetected');
      break;
    case StatusName.PENDING_ACTIVATION:
      color = 'var(--purple-600)';
      bgcolor = 'var(--purple-50)';
      valueLabel = t('adminDashboard.status.invited');
      break;
    case StatusName.ACTIVE:
      color = 'var(--green-700)';
      bgcolor = 'var(--green-50)';
      valueLabel = t('adminDashboard.status.active');
      break;
    case StatusName.SUSPENDED:
      color = 'var(--red-600)';
      bgcolor = 'var(--red-100)';
      valueLabel = t('adminDashboard.status.suspended');
      break;
    case StatusName.LOCKED:
      color = 'var(--gray-100)';
      bgcolor = 'var(--neutral-500)';
      valueLabel = t('adminDashboard.status.locked');
      break;
    case StatusName.PUBLISHED:
      color = 'var(--green-700)';
      bgcolor = 'var(--green-50)';
      valueLabel = t('adminDashboard.status.published');
      break;
    case StatusName.HIDDEN:
      color = 'var(--gray-100)';
      bgcolor = 'var(--neutral-500)';
      valueLabel = t('adminDashboard.status.hidden');
      break;
    case UserRole.TEAM_EDITOR:
      color = 'var(--gray-700)';
      bgcolor = 'var(--neutral-300)';
      valueLabel = t('adminDashboard.user-role.member');
      break;
    case UserRole.TEAM_VIEWER:
      color = 'var(--gray-700)';
      bgcolor = 'var(--neutral-300)';
      valueLabel = t('adminDashboard.user-role.viewer');
      break;
    case UserRole.TEAM_OWNER:
      color = 'var(--purple-600)';
      bgcolor = 'var(--purple-50)';
      valueLabel = t('adminDashboard.user-role.owner');
      break;
    case UserRole.PRIVATE_USER:
      color = 'var(--gray-700)';
      bgcolor = 'var(--neutral-300)';
      valueLabel = t('adminDashboard.user-role.user');
      break;

    default:
      color = 'var(--gray-700)';
      bgcolor = 'var(--neutral-300)';
      valueLabel = '--';
      break;
  }

  return (
    <Typography
      variant="caption"
      fontWeight={500}
      sx={{
        textTransform: 'capitalize',
        display: 'inline-block',
        padding: '2px 8px',
        color,
        bgcolor,
        borderRadius: '5px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...style,
      }}
    >
      {valueLabel}
    </Typography>
  );
};

export default CustomLabel;
