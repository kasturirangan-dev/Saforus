import { Box, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CSSProperties } from 'react';
import CopyIcon from '../assets/copy.svg';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { toast } from 'react-toastify';
interface TableContentProps {
  value: string;
  styleContent?: CSSProperties;
  canCopy?: boolean;
  link?: string;
}

export const TableContent = ({
  value,
  styleContent,
  canCopy = false,
  link
}: TableContentProps) => {
  const { t } = useTranslation();

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      showToast.success(t('common.copy-success'), {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 0,
        bodyStyle: { width: '100%' },
        style: {
          width: '300px',
          marginLeft: '0px',
          marginRight: '0px',
        },
      });
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
          {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Typography>{value}</Typography>
        </a>
      ) : (
        <Typography
        variant="body2"
        sx={{
          color: 'var(--gray-700)',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          ...styleContent,
        }}
      >
        {value}
      </Typography>
      )}
    </Box>
  );
};
