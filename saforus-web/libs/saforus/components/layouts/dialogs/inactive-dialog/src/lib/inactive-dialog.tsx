import React, { useEffect, useState } from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import DeleteWarning from './assets/delete-warning.svg';
import { LoadingButton } from '@mui/lab';
import Button from '@web-workspace/shared/components/widgets/button';
import { useTranslation } from 'react-i18next';

type DialogInactiveViewProps = {
  timeout: number;
  onClose: () => void;
  onLogout: () => void;
  onStay: () => void;
};

const StyledDeleteButton = styled(LoadingButton)`
  background: var(--red-600);
  border: 1px solid var(--red-400);
  box-shadow: var(--shadow-xsm);
  text-transform: none;
  color: var(--base-white);
  padding: 12px 18px;

  &:disabled {
    background: var(--neutral-700);
    border: 1px solid var(--neutral-300);
    color: var(--base-white);
    padding: 12px 18px;
  }
  &:hover {
    background: var(--red-400);
    border: 1px solid var(--red-200);
    color: var(--base-white);
  }
`;

const InactiveDialog: React.FC<DialogInactiveViewProps> = ({
  timeout,
  onClose,
  onLogout,
  onStay,
}) => {
  const { t } = useTranslation();
  const [remaining, setRemaining] = useState<number>(timeout);
  const [textRemaining, setTextRemain] = useState<string>('');

  useEffect(() => {
    setTextRemain(`${t('inactive-dialog.description', { remain: remaining })}`);
    const interval = setInterval(() => {
      if (remaining >= 0) {
        setRemaining(remaining - 1);
        setTextRemain(
          `${t('inactive-dialog.description', { remain: remaining })}`
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  if (remaining <= 0) {
    onLogout();
    onClose();
  }

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '5px',
          border: '2px solid var(--red-300, #FEB8AE)',
        },
      }}
      contentCss={{
        margin: 'auto',
        textAlign: 'center',
        justifyContent: 'center',
      }}
      icon={
        <img
          src={DeleteWarning}
          alt="Warning"
          title="Warning"
          width="30"
          height="30"
          loading="lazy"
        />
      }
      rightIcon={
        <IconButton
          onClick={() => {
            onLogout();
            onClose();
          }}
        >
          <CloseIcon />
        </IconButton>
      }
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={() => {
              onStay();
              onClose();
            }}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('inactive-dialog.button-stay')}
          </Button>
          <StyledDeleteButton
            fullWidth
            loading={false}
            onClick={() => {
              onLogout();
              onClose();
            }}
            sx={{ height: 46 }}
          >
            {t('inactive-dialog.button-logout')}
          </StyledDeleteButton>
        </>
      }
      dialogContent={
        <Box sx={{ width: 350, margin: 'auto' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '20px',
              marginBottom: '0.5rem',
              fontWeight: 500,
              lineHeight: '28px',
            }}
          >
            {t('inactive-dialog.title')}
          </Typography>

          <Typography variant="subtitle2" color={'var(--gray-50)'}>
            {textRemaining}
          </Typography>
        </Box>
      }
      dialogCss={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    />
  );
};

export default React.memo(InactiveDialog);
