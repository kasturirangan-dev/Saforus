import Dialog from '@web-workspace/shared/components/widgets/dialog';
import DeleteWarning from '../assets/delete-warning.svg';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@web-workspace/shared/components/widgets/button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';

type DeleteSiteViewProps = {
  onClose: () => void;
  siteName: string;
  checkboxValue: boolean;
  onDelete: () => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
};

const StyledDeleteButton = styled(LoadingButton)`
  background: var(--red-600);
  border: 1px solid var(--red-400);
  box-shadow: var(--shadow-xsm);
  text-transform: none;
  width: 92px;
  color: var(--base-white);
  margin-left: 1rem;

  &:disabled {
    background: var(--red-300);
    border: 1px solid var(--red-200);
    color: var(--base-white);
    opacity: 0.8;
  }
`;

const DeleteSiteView: React.FC<DeleteSiteViewProps> = ({
  onClose,
  checkboxValue,
  siteName,
  onDelete,
  handleCheckboxChange,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
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
        <>
          <Button
            color="secondary"
            onClick={onClose}
            sx={{ marginRight: 'auto', width: 104 }}
          >
            {t('button.cancel')}
          </Button>
          <Button color="secondary" onClick={onClose} sx={{ width: 92 }}>
            {t('button.archive')}
          </Button>
          <StyledDeleteButton
            disabled={!checkboxValue}
            onClick={onDelete}
            loading={isLoading}
          >
            {t('button.delete')}
          </StyledDeleteButton>
        </>
      }
      dialogContent={
        <>
          <Typography
            sx={{ fontSize: 20, marginBottom: '0.5rem', fontWeight: 500 }}
          >
            {t('settings-pages.delete-site.title', { name: siteName })}
          </Typography>

          <Typography sx={{ fontSize: 16, marginBottom: '1rem' }}>
            {t('settings-pages.delete-site.content')}
          </Typography>

          <FormControlLabel
            label={t('settings-pages.delete-site.agree-term')}
            control={
              <Checkbox
                checked={checkboxValue}
                onChange={handleCheckboxChange}
                sx={{
                  color: 'var(--red-600)',
                  '&.Mui-checked': {
                    color: 'var(--red-600)',
                  },
                }}
              />
            }
          />
        </>
      }
      dialogCss={{ width: 400, margin: 'auto' }}
    ></Dialog>
  );
};

export default React.memo(DeleteSiteView);
