import React from 'react';
import { Box, Typography } from '@mui/material';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import Button from '@web-workspace/shared/components/widgets/button';
import InfoIcon from '../assets/info-red.svg';

type DialogCancelViewProps = {
  title?: string;
  description?: string;
  checkboxTitle?: string;
  leaveTitle?: string;
  stayTitle?: string;
  onClose: () => void;
  onLeave: () => void;
  onStay: () => void;
};

const DialogCancelView: React.FC<DialogCancelViewProps> = ({
  title,
  description,
  leaveTitle,
  stayTitle,
  onClose,
  onLeave,
  onStay,
}) => {
  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '5px',
        },
      }}
      onClose={onClose}
      icon={<img src={InfoIcon} alt="information" height={32} width={32} />}
      contentCss={{ margin: 'auto' }}
      footer={
        <>
          <Button
            color="secondary"
            fullWidth
            sx={{ mr: 2, height: 46, padding: '6px 12px' }}
            onClick={() => {
              onStay();
              onClose();
            }}
          >
            {stayTitle}
          </Button>

          <Button
            color="error"
            fullWidth
            sx={{ height: 46, padding: '6px 12px' }}
            onClick={() => {
              onLeave();
              onClose();
            }}
          >
            {leaveTitle}
          </Button>
        </>
      }
      dialogContent={
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '28px',
              letterSpacing: '-0.4px',
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            fontFamily="Inter, Pretendard"
            color={'var(--gray-50)'}
            textAlign="center"
            whiteSpace="pre-line"
          >
            {description}
          </Typography>
        </Box>
      }
    />
  );
};

export default React.memo(DialogCancelView);
