import { Box, Typography, styled } from '@mui/material';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  padding: '9px 15px',
  minWidth: '120px',
}));

export interface DeacivateAccontProps {
  open: boolean;
  onCancel: () => void;
  onComfirm: () => void;
}

function DeacivateAccountDialog({
  open,
  onCancel,
  onComfirm,
}: DeacivateAccontProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '480px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '8px',
        },
      }}
      open={open}
      title={`${t('apiAccount.deactivate-account.title')}`}
      titleCss={{
        fontSize: '22px',
        fontWeight: 600,
        lineHeight: '30px',
        letterSpacing: '-0.02em',
        color: 'var(--gray-700)',
        padding: '24px 24px 12px 24px',
      }}
      onClose={onCancel}
      rightIcon={
        <IconButton onClick={onCancel}>
          <CloseIcon />
        </IconButton>
      }
      rightIconCss={{
        marginRight: '1rem',
        marginTop: '1rem',
      }}
      footer={
        <>
          <StyledLoadingButton
            color="error"
            onClick={onComfirm}
            variant="outlined"
            type="submit"
          >
            {t('apiAccount.deactivate-account.yes')}
          </StyledLoadingButton>
          <StyledLoadingButton onClick={onCancel}>
            {t('apiAccount.deactivate-account.close')}
          </StyledLoadingButton>
        </>
      }
      contentCss={{ padding: '0px 24px 12px 24px' }}
      dialogContent={
        <Typography>
          {t('apiAccount.deactivate-account.description')}
        </Typography>
      }
      dialogCss={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        justifyContent: 'center',
      }}
    />
  );
}

export default DeacivateAccountDialog;
