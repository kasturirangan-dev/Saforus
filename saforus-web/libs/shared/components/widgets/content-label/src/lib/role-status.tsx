import { Typography } from '@mui/material';
import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

const enum StatusName {
    SYS_ADMIN = 'SYS_ADMIN',
    ADMIN = 'ADMIN',
    VIEWER = 'VIEWER',
}

export const RoleStatus = ({
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
    case StatusName.SYS_ADMIN:
      color = 'var(--red-700)';
      bgcolor = 'var(--red-50)';
      valueLabel = 'Super Admin';
      break;

    case StatusName.ADMIN:
      color = 'var(--blue-700)';
      bgcolor = 'var(--blue-50)';
      valueLabel = 'Admin';
      break;

    case StatusName.VIEWER:
      color = 'var(--gray-700)';
      bgcolor = 'var(--neutral-300)';
      valueLabel = 'User';
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

export default RoleStatus;
