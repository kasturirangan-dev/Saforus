import { Box, Typography } from '@mui/material';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import Warning from './assets/ico_alert_red.svg';
import { useTranslation } from 'react-i18next';
import {pxToVw} from '@web-workspace/saforus/common/utils';
/* eslint-disable-next-line */
export interface CancelChangeAvatarProps {
  open: boolean;
  onCancel: () => void;
  onLeave: () => void;
}

export function CancelChangeAvatar({
  open,
  onCancel,
  onLeave,
}: CancelChangeAvatarProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
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
              padding: pxToVw(['12px','18px']),
            }}
            onClick={onCancel}
          >
            {t('myaccount.login-information.button.no')}
          </LoadingButton>
          <LoadingButton
            fullWidth
            color='error'
            sx={{
              padding: pxToVw(['12px', '18px']),
            }}
            onClick={onLeave}
          >
            {t('button.leave')}
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
            {t('myaccount.login-information.dialog.cancel-title')}
          </Typography>
          <Typography
            sx={{ textAlign: 'center' }}
            variant="subtitle2"
            color={'var(--gray-50)'}
            whiteSpace='pre-line'
          >
            {t('myaccount.login-information.dialog.cancel-description')}
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

export default CancelChangeAvatar;
