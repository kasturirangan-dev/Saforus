import { Box, Typography } from '@mui/material';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import Warning from './assets/ico_alert_red.svg';
import { useTranslation } from 'react-i18next';
import { pxToVw } from '@web-workspace/saforus/common/utils';
/* eslint-disable-next-line */
export interface ConfirmDeleteProps {
  dialogOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export function ConfirmDelete({
  dialogOpen,
  onCancel,
  onDelete,
}: ConfirmDeleteProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={dialogOpen}
      PaperProps={{
        style: { boxShadow: 'var(--shadow-2xl)', borderRadius: pxToVw('5px') },
      }}
      contentCss={{ margin: 'auto' }}
      icon={
        <img
          src={Warning}
          alt="Warning"
          title="Warning"
          width={pxToVw(30)}
          height={pxToVw(30)}
          loading="lazy"
        />
      }
      iconCss={{
        display: 'flex',
        justifyContent: 'center',
      }}
      footer={
        <>
          <LoadingButton
            fullWidth
            color="secondary"
            sx={{
              padding: pxToVw(['12px', '18px']),
            }}
            onClick={onCancel}
          >
            {t('myaccount.login-information.button.cancel')}
          </LoadingButton>
          <LoadingButton
            fullWidth
            color="error"
            sx={{
              padding: pxToVw(['12px', '18px']),
            }}
            onClick={onDelete}
          >
            {t('button.delete')}
          </LoadingButton>
        </>
      }
      dialogContent={
        <Box
          sx={{
            width: pxToVw(350),
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: pxToVw('20px'),
              fontWeight: 500,
              lineHeight: pxToVw('28px'),
              letterSpacing: pxToVw('-0.4px'),
            }}
          >
            {t('myaccount.login-information.dialog.delete-title')}
          </Typography>
          <Typography
            sx={{ textAlign: 'center' }}
            variant="subtitle2"
            color={'var(--gray-50)'}
            whiteSpace="pre-line"
          >
            {t('myaccount.login-information.dialog.delete-description')}
          </Typography>
        </Box>
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

export default ConfirmDelete;
