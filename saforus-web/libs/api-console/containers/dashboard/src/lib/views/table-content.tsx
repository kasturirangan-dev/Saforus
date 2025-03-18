import { Box, IconButton, Typography } from '@mui/material';
import { CSSProperties } from 'react';
import CopyIcon from '../assets/copy.svg';

interface TableContentProps {
  value: string;
  token?: string;
  styleContent?: CSSProperties;
  canCopy?: boolean;
  align?: 'center';
}

export const TableContent = ({
  value,
  token,
  styleContent,
  canCopy = false,
  align,
}: TableContentProps) => {
  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: align ? 'center' : 'space-between',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'var(--gray-700)',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textAlign: align,
          ...styleContent,
        }}
      >
        {value}
        {canCopy && (
          <IconButton onClick={handleCopy}>
            <img src={CopyIcon} alt="copy-icon" />
          </IconButton>
        )}
      </Typography>
    </Box>
  );
};

export const TableUsageContent = ({
  title,
  value,
}: {
  title?: string;
  value: string;
}) => {
  return (
    <Typography
      variant="body2"
      sx={{
        color: 'var(--gray-700)',
        padding: '2px 8px',
        borderRadius: '5px',
        backgroundColor: 'var(--neutral-300)',
      }}
    >
      {title && (
        <span style={{ fontWeight: 600 }}>
          {title} {' · '}
        </span>
      )}
      {value}
    </Typography>
  );
};
