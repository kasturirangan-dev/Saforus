import { useTranslation } from 'react-i18next';
import { AvatarState } from '../config/enum';
import { Box, Typography } from '@mui/material';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import ConfirmDelete from '@web-workspace/api-console/components/my-account/dialogs/delete-confirmation';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/bin.svg';
import { useState } from 'react';

export interface AvatarFooterProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<AvatarState>>;
  getInputProps: () => {
    ref: (node: HTMLInputElement | null) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  open: () => void;
  setRotation: () => void;
  cropImage: () => Promise<void>;
  deleteAvatar: () => void;
  isDefaultAvatar: boolean;
  onClose: () => void;
  uploading: boolean;
}

export const AvatarFooter = ({
  step,
  setStep,
  getInputProps,
  open,
  cropImage,
  deleteAvatar,
  isDefaultAvatar,
  onClose,
  uploading,
  setRotation,
}: AvatarFooterProps) => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDeleteDialog = () => {
    setDialogOpen((prevOpen) => !prevOpen);
  };

  const handleChangeImage = () => {
    setRotation();
    setStep(AvatarState.Uploading);
  };

  return (
    <>
      <ConfirmDelete
        dialogOpen={dialogOpen}
        onCancel={handleDeleteDialog}
        onDelete={deleteAvatar}
      />
      {step === AvatarState.Preview && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
          }}
        >
          <LoadingButton
            color="secondary"
            fullWidth
            onClick={handleDeleteDialog}
            sx={{
              marginRight: 'auto',
              padding: '12px 18px',
              '& .MuiButton-label': {
                color: 'error',
              },
            }}
            disabled={isDefaultAvatar}
          >
            <img src={DeleteIcon} alt="Delete" style={{ marginRight: '8px' }} />
            <Typography color="error">{t('button.delete')}</Typography>
          </LoadingButton>
          <LoadingButton
            fullWidth
            onClick={() => setStep(AvatarState.Editing)}
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
          >
            <img src={EditIcon} alt="Edit" style={{ marginRight: '8px' }} />
            {t('myaccount.login-information.button.edit-image')}
          </LoadingButton>
        </Box>
      )}
      {step === AvatarState.Uploading && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
          }}
        >
          <Button
            color="secondary"
            fullWidth
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
            onClick={onClose}
          >
            {t('myaccount.login-information.button.cancel')}
          </Button>
          <LoadingButton
            fullWidth
            onClick={cropImage}
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
            disabled
            loading={uploading}
          >
            {t('button.save')}
          </LoadingButton>
        </Box>
      )}
      {step === AvatarState.Editing && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
          }}
        >
          <Button
            color="secondary"
            fullWidth
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
            onClick={handleChangeImage}
          >
            {t('myaccount.login-information.button.change-image')}
          </Button>
          <LoadingButton
            fullWidth
            onClick={cropImage}
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
            loading={uploading}
          >
            {t('button.save')}
          </LoadingButton>
        </Box>
      )}
    </>
  );
};