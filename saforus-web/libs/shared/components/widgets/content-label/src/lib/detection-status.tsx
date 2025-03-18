import { Typography, TypographyProps } from '@mui/material';
import { Done, Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@web-workspace/shared/components/widgets/circular-progress';
import Icon from '@web-workspace/shared/components/widgets/icon';

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
  PROCESSED = 'PROCESSED',
  SUCCEEDED = 'SUCCEEDED',
}

export const DetectionStatus = ({
  value,
  style,
  reqDate,
  esCompletedTime,
}: {
  value: string;
  style?: React.CSSProperties;
  reqDate?: string | number | Date; // For progress status
  esCompletedTime?: string | number | Date; // For progress status
}) => {
  const { t } = useTranslation();
  let color;
  let bgcolor;
  let valueLabel;
  let icon = null; // Initialize icon as null

  switch (value) {
    case StatusName.COMPLETED:
    case StatusName.SUCCEEDED:
      color = 'var(--green-700)';
      bgcolor = 'var(--green-50)';
      valueLabel = t('common.order-status.completed');
      icon = (
        <Done
          sx={{
            color: 'inherit',
            fontSize: '14px',
          }}
        />
      );
      break;
    case StatusName.PROCESSED:
      color = 'var(--green-700)';
      bgcolor = 'var(--green-50)';
      valueLabel = t('common.order-status.processed');
      icon = <Icon name="check_loading" size={14} color={'var(--green-700)'} />;
      break;
    case StatusName.IN_PROGRESS:
    case StatusName.AWAITING_PROCESS:
      color = 'var(--purple-600)';
      bgcolor = 'var(--purple-50)';
      valueLabel = t('common.order-status.in-progress');
      icon = (
        <CircularProgress
          size={14}
          reqDate={reqDate}
          esCompletedTime={esCompletedTime}
        />
      );
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
      icon = (
        <Close
          sx={{
            color: 'inherit',
            fontSize: '14px',
          }}
        />
      );
      break;

    case StatusName.EXPIRED:
      color = 'var(--gray-700)';
      bgcolor = 'var(--neutral-600)';
      valueLabel = t('common.order-status.expired');
      icon = <Icon name="expired" size={14} color={'var(--gray-700)'} />;
      break;
    case StatusName.DETECTED:
      color = 'var(--green-50)';
      bgcolor = 'var(--green-500)';
      valueLabel = t('common.order-status.detected');
      icon = (
        <Done
          sx={{
            color: 'inherit',
            fontSize: '14px',
          }}
        />
      );
      break;
    case StatusName.UNDETECTED:
      color = 'var(--neutral-200)';
      bgcolor = 'var(--gray-100)';
      valueLabel = t('common.order-status.undetected');
      icon = (
        <Close
          sx={{
            color: 'inherit',
            fontSize: '14px',
          }}
        />
      );
      break;
    default:
      color = 'var(--gray-700)';
      bgcolor = 'var(--neutral-300)';
      valueLabel = value;
      break;
  }

  return (
    <Typography
      variant="caption"
      fontWeight={500}
      sx={{
        textTransform: 'capitalize',
        display: 'inline-flex',
        gap: '4px',
        alignItems: 'center',
        padding: '2px 8px',
        color,
        bgcolor,
        borderRadius: '5px',
        whiteSpace: 'nowrap',
        // overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...style,
      }}
    >
      {icon}
      {valueLabel}
    </Typography>
  );
};

export default DetectionStatus;
