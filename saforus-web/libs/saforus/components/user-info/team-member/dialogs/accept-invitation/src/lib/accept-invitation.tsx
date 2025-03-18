import React, { useState } from 'react';
import { Dialog, Box, Button, IconButton, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation } from 'react-i18next';
import { UserTeamStore } from '@web-workspace/saforus/components/user-info/team-member/data';
import { useSnapshot } from 'valtio';

type CreateTeamDialogProps = {
  onClose: () => void;
};
const AcceptInvitationDialogContainer: React.FC<CreateTeamDialogProps> = ({
  onClose,
}) => {
  const { team } = useSnapshot(UserTeamStore);
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        sx: {
          minWidth: '400px',
          minHeight: '352px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: 'var(--neutral-750)',
        },
      }}
    >
      <IconButton>
        <InfoOutlinedIcon sx={{ width: '32px', height: '32px' }} />
      </IconButton>

      <Box
        sx={{
          width: '352px',
          height: '180px',
          padding: '0px 10px 10px 10px',
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            textAlign: 'center',
            width: '500',
          }}
          variant="h4"
        >
          {`${t('team-member.dialog.accept-invitation-title', {
            team: team?.company,
          })}`}
        </Typography>
        <Typography
          sx={{
            fontSize: '13px',
            color: 'var(--gray-50)',
            textAlign: 'center',
            width: '400',
            font: 'inter',
          }}
          align="center"
        >
          {`${t('team-member.dialog.accept-invitation-description', {
            team: team?.company,
          })}`}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '352px',
          height: '46px',
          display: 'flex',
          gap: '16px',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={() => onClose()}
          sx={{
            color: 'var(--gray-700)',
            width: '168px',
            height: '46px',
            borderColor: 'var(--neutral-750)',
            borderStyle: 'solid',
            borderWidth: '1px',
          }}
        >
          {`${t(
            'team-member.accept-invitation.accept-invitation-cancel-button'
          )}`}
        </Button>
        <Button
          onClick={handleClose}
          sx={{
            width: '168px',
            height: '46px',
            borderRadius: '6px',
            color: 'var(--base-white)',
            '&.MuiButtonBase-root:hover': {
              background: 'var(--main-brand-color3)',
            },
            background: 'var(--main-brand-color3)',
          }}
        >
          {`${t(
            'team-member.accept-invitation.accept-invitation-accept-button'
          )}`}
        </Button>
      </Box>
    </Dialog>
  );
};

export default AcceptInvitationDialogContainer;
