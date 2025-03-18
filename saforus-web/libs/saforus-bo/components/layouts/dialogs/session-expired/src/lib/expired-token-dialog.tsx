/* eslint-disable-next-line */
import {Box, Typography} from "@mui/material";
import Dialog from "@web-workspace/shared/components/widgets/dialog";
import React from "react";
import { useSnapshot } from "valtio";
import BoAuthStore from "@web-workspace/shared/hooks/use-bo-auth";
import {useTranslation} from "react-i18next";
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import DeleteWarning from './assets/delete-warning.svg';
import CloseButton from './assets/close.svg';
export function ExpiredTokenDialog({ onClose }: { onClose: () => void }) {
  const { setUserInfo, setIsLogIn, setIsExpired } = useSnapshot(BoAuthStore);
  const {t} = useTranslation();
  const onLogin = () => {
    setIsExpired(false);
    setIsLogIn(false);
    setUserInfo();
    onClose();
  }

  return (
    <Dialog
      PaperProps={{
        style: { boxShadow: 'var(--shadow-2xl)', borderRadius: '5px' },
      }}
      contentCss={{ margin: 'auto' }}
      footer={
        <LoadingButton
            fullWidth
            onClick={onLogin}
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
          >
            {t('expired-dialog.button')}
          </LoadingButton>
      }
      dialogContent={
        <Box sx={{ width: 400, margin: 'auto' }}>
          <Box sx={{ textAlign: 'center', marginBottom: '1rem', position: 'relative'}}>
            <Box sx={{position: 'absolute', right: '0', cursor: 'pointer'}}>
              <img
                onClick={onLogin}
                src={CloseButton}
                alt="Warning"
                title="Warning"
                width="20"
                height="20"
                loading="lazy"
              />
            </Box>
            <img
              src={DeleteWarning}
              alt="Warning"
              title="Warning"
              width="32"
              height="32"
              loading="lazy"
            />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '1.5rem',
              marginBottom: '0.4rem',
              fontWeight: 500,
              textAlign: 'center',
              color: 'var(--gray-700)'
            }}
          >
            {t('expired-dialog.title')}
          </Typography>

          <Typography
            variant="subtitle2"
            color={'var(--gray-50)'}
            sx={{
              fontSize: '1rem',
              marginBottom: '0.5rem',
              fontWeight: 400,
              textAlign: 'center',
              color: 'var(--gray-50)'
            }}
          >
            {t('expired-dialog.body')}
          </Typography>
        </Box>
      }
      dialogCss={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        justifyContent: 'center',
      }}
    ></Dialog>
  );
}

export default ExpiredTokenDialog;
