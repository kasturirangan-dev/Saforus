import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import DeleteWarning from './assets/delete-warning.svg';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { useSnapshot } from 'valtio';
import BoAuthStore from '@web-workspace/shared/hooks/use-bo-auth';
import { BoUserRole } from '@web-workspace/saforus-bo/common/model';
import { useState } from 'react';
import React from 'react';

// Styled components declaration area
const StyledDeleteButton = styled(LoadingButton)`
  background: var(--red-600);
  text-transform: none;
  color: var(--base-white);
  padding: 12px 18px;

  &:disabled {
    background: var(--neutral-700);
    color: var(--base-white);
    padding: 12px 18px;
  }
  &:hover {
    background: var(--red-400);
    color: var(--base-white);
  }
`;

const StyledArchiveButton = styled(LoadingButton)`
  text-transform: none;
  color: var(--base-white);
  padding: 12px 18px;
  border-radius: 6px;
  border: 1px solid var(--neutral-700, #dae0e6);
  background: var(--base-white, #fff);

  &:disabled {
    background: var(--neutral-700);
    color: var(--base-white);
    padding: 12px 18px;
  }
  &:hover {
  }
`;

const StyledCancelButton = styled(LoadingButton)`
  text-transform: none;
  color: var(--base-white);
  padding: 12px 18px;
  border-radius: 6px;
  border: 1px solid var(--neutral-700, #dae0e6);
  background: var(--base-white, #fff);

  &:disabled {
    background: var(--neutral-700);
    color: var(--base-white);
    padding: 12px 18px;
  }
  &:hover {
  }
`;
/////////////////////////////////////////////////////////////////////

type DeleteAccountDialogProps = {
  onClose: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({
  onClose,
  onArchive,
  onDelete,
}) => {
  // hooks declaration area
  const { t } = useTranslation();

  const [checkboxValue, setCheckboxValue] = useState(false);

  const { userInfo } = useSnapshot(BoAuthStore);
  /////////////////////////////////////////////////////////

  const role = userInfo?.role;
  // role is compare:
  // Archive button available when role is Admin and Admin CS
  // Delete button available when role is Super Admin

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(event.target.checked);
  };

  return (
    <Dialog
      PaperProps={{
        style: { boxShadow: 'var(--shadow-2xl)', borderRadius: '5px' },
      }}
      contentCss={{ margin: 'auto' }}
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
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      onClose={onClose}
      footer={
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <StyledCancelButton
            sx={{
              color: 'var(--gray-700)',
            }}
            onClick={onClose}
          >
            {t('userManagement.search-user.user-detail.dialogs.cancel')}
          </StyledCancelButton>
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            {/* <StyledArchiveButton
              color="secondary"
              disabled={!checkboxValue}
              sx={{
                padding: '12px 18px',
                color: '#574EFA',
                textTransform: 'none',
                borderRadius: '6px',
                border: '1px solid var(--neutral-700)',
                background: 'var(--base-white)',
              }}
              onClick={() => {
                onArchive();
                onClose();
              }}
            >
              {t('userManagement.search-user.user-detail.dialogs.archive')}
            </StyledArchiveButton> */}
            <StyledDeleteButton
              loading={false}
              disabled={!checkboxValue}
              onClick={onDelete}
            >
              {t('userManagement.search-user.user-detail.dialogs.delete')}
            </StyledDeleteButton>
          </Box>
        </Box>
      }
      dialogContent={
        <Box
          sx={{
            width: '25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '28px',
              }}
            >
              {t(
                'userManagement.search-user.user-detail.dialogs.delete-account.title'
              )}
            </Typography>
            <Typography variant="subtitle2" color={'var(--gray-50)'}>
              {t(
                'userManagement.search-user.user-detail.dialogs.delete-account.description'
              )}
            </Typography>
          </Box>
          <FormControlLabel
            label={
              <Typography
                sx={{
                  fontSize: '16px',
                  lineHeight: '24px',
                  fontWeight: 500,
                  color: 'var(--gray-700)',
                }}
              >
                {t(
                  'userManagement.search-user.user-detail.dialogs.delete-account.confirm'
                )}
              </Typography>
            }
            labelPlacement="end"
            sx={{
              alignItems: 'flex-start',
            }}
            control={
              <Checkbox
                checked={checkboxValue}
                onChange={handleCheckboxChange}
                icon={<Icon name="square_uncheck" size={20} />}
                checkedIcon={<Icon name="square_checked" size={20} />}
              />
            }
          />
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
};

export default React.memo(DeleteAccountDialog);
