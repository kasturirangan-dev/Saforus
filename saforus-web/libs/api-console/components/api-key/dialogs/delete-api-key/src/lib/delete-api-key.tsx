import React from 'react';
import useEditApiKeyData from './data';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import DeleteIcon from './assets/delete.svg';
import { useTranslation } from 'react-i18next';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import { Box, Typography, styled } from '@mui/material';
import { ApiKeyDetails } from '@web-workspace/api-console/components/api-key/data';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}));

type EditApiKeyDialogProps = {
  selectedApiKey: ApiKeyDetails;
  onClose: () => void;
};

const DeleteApiKeyDialog: React.FC<EditApiKeyDialogProps> = ({
  selectedApiKey,
  onClose,
}) => {
  const { onSubmit, loading } = useEditApiKeyData({
    selectedApiKey,
    onClose,
  });

  const { t } = useTranslation();

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '5px',
        },
      }}
      icon={<img src={DeleteIcon} alt="Delete Icon" />}
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
            {t('apiKeyManagement.button.close')}
          </Button>
          <LoadingButton
            color="error"
            onClick={onSubmit}
            fullWidth
            sx={{ height: 46 }}
            type="submit"
            loading={loading}
          >
            {t('apiKeyManagement.button.delete')}
          </LoadingButton>
        </>
      }
      dialogCss={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
      dialogContent={
        <BoxContainer>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              gap: '8px',
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              {t('apiKeyManagement.delete.title')}
            </Typography>

            <Typography variant="body1" whiteSpace="pre-line">
              {t('apiKeyManagement.delete.description')}
            </Typography>
          </Box>
          {/* Name */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: 'var(--gray-700)',
                marginBottom: '6px',
              }}
            >
              {`${t('apiKeyManagement.form.name')}: ${selectedApiKey.name}`}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'var(--gray-25)',
                padding: '9px 16px',
                borderRadius: '5px',
                border: '1px solid var(--neutral-750)',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {selectedApiKey.token}
            </Typography>
          </Box>
        </BoxContainer>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default DeleteApiKeyDialog;
