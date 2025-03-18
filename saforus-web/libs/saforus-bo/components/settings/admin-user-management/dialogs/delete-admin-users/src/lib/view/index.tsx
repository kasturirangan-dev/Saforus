import React from 'react';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import Warning from '../assets/warning.svg';
import { useTranslation } from 'react-i18next';
import Button from '@web-workspace/shared/components/widgets/button';
import { LoadingButton } from '@mui/lab';
import { Box, Checkbox, IconButton, Typography, styled } from '@mui/material';
import Icon from '@web-workspace/shared/components/widgets/icon';
import CloseIcon from '@mui/icons-material/Close';
import { useSnapshot } from 'valtio';
import { UserRole } from '@web-workspace/saforus/common/model';
import {
  AdminUserManagementStore,
  AdminUserModel,
} from '@web-workspace/saforus-bo/components/settings/admin-user-management/data';

type DeleteAdminUsersDialogViewProps = {
  onClose: () => void;
  onSubmit: () => void;
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

const DeleteAdminUsersDialogView: React.FC<DeleteAdminUsersDialogViewProps> = ({
  onSubmit,
  onClose,
}) => {
  const { selectedAdminUsers } = useSnapshot(AdminUserManagementStore);
  const { t } = useTranslation();

  const [checkboxValue, setCheckboxValue] = React.useState(false);

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
      title={`${t(
        'boSettings.admin-user-management.dialogs.delete-admin-users'
      )}`}
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
            disabled={!checkboxValue || selectedAdminUsers?.length < 1}
            onClick={onSubmit}
            fullWidth
            sx={{ height: 46 }}
            type="submit"
          >
            {t('button.delete')}
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
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Checkbox
              sx={{ ml: 0, paddingLeft: 0 }}
              onClick={() => {
                setCheckboxValue((value) => !value);
              }}
              checked={checkboxValue}
              icon={<Icon name="square_uncheck" size={20} />}
              checkedIcon={<Icon name="square_checked" size={20} />}
            />
            <Typography
              variant="subtitle2"
              color={'var(--gray-700)'}
              fontWeight={500}
            >
              {t(
                'boSettings.admin-user-management.dialogs.confirm-delete-admin-users'
              )}
            </Typography>
          </Box>

          <Box
            sx={{
              borderRadius: '5px',
              border: '1px solid var(--neutral-600)',
              backgroundColor: 'var(--base-white)',
              mt: '1.5rem',
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
              {selectedAdminUsers &&
                selectedAdminUsers.map((el: AdminUserModel) => {
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
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        justifyContent: 'space-between',
                      }}
                      key={el.id}
                    >
                      <Typography variant="caption">{el.email}</Typography>
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
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default DeleteAdminUsersDialogView;
