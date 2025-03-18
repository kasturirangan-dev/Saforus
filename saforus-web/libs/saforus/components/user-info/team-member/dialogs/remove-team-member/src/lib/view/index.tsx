import React from 'react';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import Warning from '../assets/warning.svg';
import { useTranslation } from 'react-i18next';
import Button from '@web-workspace/shared/components/widgets/button';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, Typography, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Member,
  UserTeamStore,
} from '@web-workspace/saforus/components/user-info/team-member/data';
import { useSnapshot } from 'valtio';
import { UserRole } from '@web-workspace/saforus/common/model';

type InviteMemberDialogViewProps = {
  onClose: () => void;
  onSubmit: (data: Partial<Member>) => void;
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

const RemoveTeamMemberDialogView: React.FC<InviteMemberDialogViewProps> = ({
  onSubmit,
  onClose,
}) => {
  const { selectedMembers } = useSnapshot(UserTeamStore);
  const { t } = useTranslation();

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '1.5rem',
        },
      }}
      icon={
        <img
          src={Warning}
          alt="SaForus Logo"
          title="Create Team"
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
      title={`${t('team-member.dialog.remove-team-member-title')}`}
      subtitle={t('team-member.dialog.remove-team-member-description', {
        size: selectedMembers?.length,
      })}
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('button.cancel')}
          </Button>
          <StyledDeleteButton
            onClick={onSubmit}
            fullWidth
            sx={{ height: 46 }}
            type="submit"
          >
            {t('button.remove')}
          </StyledDeleteButton>
        </>
      }
      dialogCss={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
      dialogContent={
        <Box
          sx={{
            borderRadius: '5px',
            border: '1px solid var(--neutral-600)',
            backgroundColor: 'var(--base-white)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '8px',
            }}
          >
            {selectedMembers &&
              selectedMembers.map((el: Member) => {
                const px = '1rem';
                const py = '0.5rem';
                const borderRadius = '8px';
                const fontWeight = '500';
                let valueStr = el.role;
                switch (el.role) {
                  case UserRole.TEAM_OWNER:
                    valueStr = `${t('team-member.role.owner')}`;
                    break;
                  case UserRole.TEAM_EDITOR:
                    valueStr = `${t('team-member.role.member')}`;
                    break;
                  case UserRole.TEAM_VIEWER:
                    valueStr = `${t('team-member.role.viewer')}`;
                    break;
                  default:
                    break;
                }

                return (
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    key={el.id}
                  >
                    {el.emailAddress}
                    <Typography
                      sx={{
                        color: 'var(--gray-900)',
                        fontSize: '15px',
                        fontWeight,
                        textAlign: 'center',
                        borderRadius,
                        background: 'var(--neutral-300)',
                        px,
                        py,
                      }}
                    >
                      {valueStr}
                    </Typography>
                  </Box>
                );
              })}
          </Box>
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    ></Dialog>
  );
};

export default RemoveTeamMemberDialogView;
