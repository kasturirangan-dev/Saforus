import { useTranslation } from 'react-i18next';
import { AvatarState } from '../config/enum';
import { Box, styled, Typography } from '@mui/material';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import ConfirmDelete from '@web-workspace/api-console/components/my-account/dialogs/delete-confirmation';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/bin.svg';
import { useState } from 'react';

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  padding: '9px 15px',
  minWidth: '120px',
}));

export interface AvatarFooterProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<AvatarState>>;
  setRotation: () => void;
  setError: () => void;
  cropImage: () => Promise<void>;
  deleteAvatar: () => void;
  defaultAvatar: boolean;
  onClose: () => void;
  loading: boolean;
}

export const AvatarFooter = ({
  step,
  cropImage,
  loading,
  defaultAvatar,
  setStep,
  setRotation,
  onClose,
  setError,
  deleteAvatar,
}: AvatarFooterProps) => {
  const { t } = useTranslation();

  if (step === AvatarState.Uploading && loading) {
    step = AvatarState.Editing;
  }

  const handleChangeImage = () => {
    setRotation();
    setStep(AvatarState.Uploading);
    setError();
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDeleteDialog = () => {
    setDialogOpen((prevOpen) => !prevOpen);
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
          <StyledLoadingButton
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
            disabled={defaultAvatar}
          >
            <img src={DeleteIcon} alt="Delete" style={{ marginRight: '8px' }} />
            <Typography color="error">{t('button.delete')}</Typography>
          </StyledLoadingButton>
          <LoadingButton
            fullWidth
            onClick={() => setStep(AvatarState.Editing)}
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
          >
            <img src={EditIcon} alt="Edit" style={{ marginRight: '8px' }} />
            {t('myaccount.login-information.button.edit')}
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
          <StyledLoadingButton
            fullWidth
            onClick={cropImage}
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
            disabled
            loading={loading}
          >
            {t('button.save')}
          </StyledLoadingButton>
        </Box>
      )}
      {step === AvatarState.Editing && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            mt: '1.5rem',
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
          <StyledLoadingButton
            fullWidth
            onClick={cropImage}
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
            loading={loading}
          >
            {t('button.save')}
          </StyledLoadingButton>
        </Box>
      )}
    </>
  );
};
