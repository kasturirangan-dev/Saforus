import { Typography } from '@mui/material';
import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Done, Close } from '@mui/icons-material';

const enum StatusName {
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export const PaymentStatus = ({
  value,
  style,
}: {
  value: string;
  style?: CSSProperties;
}) => {
  const { t } = useTranslation();
  let color;
  let bgcolor;
  let valueLabel;
  let icon = null; // Initialize icon as null

  switch (value) {
    case StatusName.SUCCEEDED:
      color = 'var(--green-700)';
      bgcolor = 'var(--green-50)';
      valueLabel = t('apiPaymentManagement.status.success');
      icon = <Done sx={{ color: 'inherit', fontSize: '14px' }} />;
      break;

    case StatusName.FAILED:
      color = 'var(--red-600)';
      bgcolor = 'var(--red-100)';
      valueLabel = 'Admin';
      valueLabel = t('apiPaymentManagement.status.failed');
      icon = <Close sx={{ color: 'inherit', fontSize: '14px' }} />;
      break;

    default:
      color = 'var(--gray-700)';
      bgcolor = 'var(--neutral-300)';
      valueLabel = value.toLowerCase();
      break;
  }

  return (
    <Typography
      variant="caption"
      fontWeight={500}
      sx={{
        textTransform: 'capitalize',
        display: 'inline-flex ',
        gap: '4px',
        alignItems: 'center',
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
      {icon}
      {valueLabel}
    </Typography>
  );
};

export default PaymentStatus;
