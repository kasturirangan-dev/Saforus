import React from 'react';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import InformationIcon from '../assets/information.svg';
import { useTranslation } from 'react-i18next';
import Button from '@web-workspace/shared/components/widgets/button';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CancelInquiryDialogProps } from '../cancel-inquiry';

const CancelInquiryDialogView: React.FC<CancelInquiryDialogProps> = ({
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
          textAlign: 'center',
        },
      }}
      iconCss={{
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
      icon={
        <img
          src={InformationIcon}
          alt="information"
          width="32"
          height="32"
          loading="lazy"
        />
      }
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      title={`${t('help.dialogs.cancel-inquiry-title')}`}
      subtitle={t('help.dialogs.cancel-inquiry-description')}
      onClose={onClose}
      footerCss={{ marginTop: '1.5rem' }}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('button.undo')}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            fullWidth
            sx={{ height: 46 }}
            type="submit"
          >
            {t('help.dialogs.cancel-inquiry')}
          </Button>
        </>
      }
    />
  );
};

export default CancelInquiryDialogView;
