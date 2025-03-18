import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import InforIcon from '../assets/infor.svg';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type DialogCancelViewProps = {
  title: string;
  description: string;
  cancelTitle: string;
  contactTitle: string;
  onClose: () => void;
  onContact: () => void;
};

const DialogCancelView: React.FC<DialogCancelViewProps> = ({
  title,
  description,
  cancelTitle,
  contactTitle,
  onClose,
  onContact,
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
      contentCss={{ paddingBottom: '1.5rem' }}
      icon={<img src={InforIcon} alt="Infor Icon" />}
      onClose={onClose}
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      rightIconCss={{
        marginRight: '1rem',
        marginTop: '1rem',
      }}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {cancelTitle}
          </Button>
          <Button
            color="primary"
            onClick={onContact}
            fullWidth
            sx={{ height: 46 }}
          >
            {contactTitle}
          </Button>
        </>
      }
      dialogCss={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        justifyContent: 'center',
      }}
      dialogContent={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            gap: '8px',
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>{description} </Typography>
        </Box>
      }
    />
  );
};

export default React.memo(DialogCancelView);
