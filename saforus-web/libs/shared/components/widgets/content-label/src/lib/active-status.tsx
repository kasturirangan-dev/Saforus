import { Typography } from '@mui/material';
import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

const enum StatusName {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  INVITED = 'INVITED',
}

export const ActiveStatus = ({
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
  switch (value) {
    case StatusName.ACTIVE:
      color = 'var(--green-700)';
      bgcolor = 'var(--green-50)';
      valueLabel = t('common.active-status.active');
      break;

    case StatusName.INACTIVE:
      color = 'var(--base-white)';
      bgcolor = 'var(--neutral-800)';
      valueLabel = t('common.active-status.inactive');
      break;

    case StatusName.INVITED:
      color = 'var(--gray-50)';
      bgcolor = 'var(--neutral-100)';
      valueLabel = 'Invited';
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
      fontFamily="Pretendard, Inter"
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

export default ActiveStatus;
