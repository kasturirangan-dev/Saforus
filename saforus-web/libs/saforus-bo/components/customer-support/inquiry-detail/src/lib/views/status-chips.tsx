import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function StatusChips({ status }: { status: string }) {
  const { t } = useTranslation();

  const getStyle = () => {
    switch (status?.toLowerCase()) {
      case 'answered':
        return {
          color: 'var(--green-700)',
          background: 'var(--green-50)',
        };
      case 'in_progress':
        return {
          color: 'var(--purple-600)',
          background: 'var(--purple-50)',
        };
      case 'in_queue':
        return {
          color: 'var(--gray-700)',
          background: 'var(--neutral-300)',
        };
      case 'canceled':
        return {
          color: 'var(--red-700)',
          background: 'var(--red-50)',
        };
      default:
        return {
          color: 'var(--gray-700)',
          background: 'var(--gray-50)',
        };
    }
  };

  return (
    <Typography
      sx={{
        padding: '2px 8px',
        borderRadius: '5px',
        ...getStyle(),
      }}
    >
      {t(`boInquiry.detail.status.${status?.toLocaleLowerCase()}`)}
    </Typography>
  );
}
