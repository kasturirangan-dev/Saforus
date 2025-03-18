import React from 'react';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import Warning from './assets/warning.svg';
import { useTranslation } from 'react-i18next';
import Button from '@web-workspace/shared/components/widgets/button';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  FormHelperText,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileItem from '@web-workspace/shared/components/widgets/file-item';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { DeleteTeamDialogViewProps } from '../data/interface';

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

const RemoveTeamDialogView: React.FC<DeleteTeamDialogViewProps> = ({
  onSubmit,
  onClose,
  handleSubmit,
  register,
  errors,
}) => {
  const { t } = useTranslation();
  const file = {
    fileName: 'SaForus order history backup file. xlsx',
    size: '3.5MB',
    url: ',',
  };
  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
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
      title={`${t('delete-team.dialog.remove-team-title')}`}
      subtitle={t('delete-team.dialog.remove-team-description')}
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
            onClick={handleSubmit(onSubmit)}
            fullWidth
            sx={{ height: 46 }}
            type="submit"
          >
            {t('delete-team.dialog.btn-delete')}
          </StyledDeleteButton>
        </>
      }
      dialogContent={
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          component={'form'}
        >
          <FileItem {...file}></FileItem>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <Checkbox
              icon={<Icon color="red" name="square_uncheck" size={20} />}
              checkedIcon={<Icon name="square_checked" size={20} />}
              sx={{
                color: errors.isConfirmDownload?.message
                  ? 'var(--red-600)'
                  : 'var(--gray-300)',
                '&.Mui-checked': {
                  color: 'var(--blue-500)',
                },
              }}
              {...register('isConfirmDownload')}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '0.5rem',
              }}
            >
              <Typography>{t('delete-team.dialog.confirm-msg-one')}</Typography>
              {errors.isConfirmDownload?.message && (
                <FormHelperText
                  sx={{
                    width: '100%',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '20px',
                    letterSpacing: '-0.1px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: 'var(--red-600)',
                  }}
                >
                  {t(`${errors.isConfirmDownload?.message}`)}
                </FormHelperText>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <Checkbox
              icon={<Icon color="red" name="square_uncheck" size={20} />}
              checkedIcon={<Icon name="square_checked" size={20} />}
              sx={{
                color: errors.isConfirmUnderstood?.message
                  ? 'var(--red-600)'
                  : 'var(--gray-300)',
                '&.Mui-checked': {
                  color: 'var(--blue-500)',
                },
              }}
              {...register('isConfirmUnderstood')}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '0.5rem',
              }}
            >
              <Typography>{t('delete-team.dialog.confirm-msg-two')}</Typography>
              {errors.isConfirmUnderstood?.message && (
                <FormHelperText
                  sx={{
                    width: '100%',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '20px',
                    letterSpacing: '-0.1px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: 'var(--red-600)',
                  }}
                >
                  {t(`${errors.isConfirmUnderstood?.message}`)}
                </FormHelperText>
              )}
            </Box>
          </Box>
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    ></Dialog>
  );
};

export default RemoveTeamDialogView;
