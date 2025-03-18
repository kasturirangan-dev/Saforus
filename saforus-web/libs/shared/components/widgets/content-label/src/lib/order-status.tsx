import { Typography, TypographyProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface ContentLabelProps extends TypographyProps {
  label: string;
  style?: React.CSSProperties;
}

const enum StatusName {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_QUEUE = 'IN_QUEUE',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
  ERROR = 'ERROR',
  DETECTED = 'DETECTED',
  UNDETECTED = 'UNDETECTED',
  AWAITING_PROCESS = 'AWAITING_PROCESS',
}

export const OrderStatus = ({
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
    case StatusName.IN_QUEUE:
      color = 'var(--gray-700)';
      bgcolor = 'var(--neutral-300)';
      valueLabel = t('common.order-status.in-queue');
      break;
    case StatusName.FAILED:
      color = 'var(--red-600)';
      bgcolor = 'var(--red-100)';
      valueLabel = t('common.order-status.failed');
      break;
    case StatusName.EXPIRED:
      color = 'var(--gray-700)';
      bgcolor = 'var(--neutral-700)';
      valueLabel = t('common.order-status.expired');
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
    case StatusName.AWAITING_PROCESS:
      color = 'var(--purple-600)';
      bgcolor = 'var(--purple-50)';
      valueLabel = t('common.order-status.in-progress');
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

export default OrderStatus;
