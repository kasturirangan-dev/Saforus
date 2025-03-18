import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  styled,
  Typography,
} from '@mui/material';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import DeleteWarning from '../assets/delete-warning.svg';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { LoadingButton } from '@mui/lab';
import Button from '@web-workspace/shared/components/widgets/button';
import { useTranslation } from 'react-i18next';

type DialogChangeOwnerViewProps = {
  onClose: () => void;
  onCancel: () => void;
  onChange: () => Promise<boolean>;
  value: any;
  label: string;
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

const DialogChangeOwnerView: React.FC<DialogChangeOwnerViewProps> = ({
  onClose,
  onChange,
  onCancel,
  value,
  label,
}) => {
  const { t } = useTranslation();
  const [checkboxValue, setCheckboxValue] = React.useState(false);

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
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={() => {
              onCancel();
              onClose();
            }}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46, flexGrow: 1 }}
          >
            {t('button.cancel')}
          </Button>
          <StyledDeleteButton
            fullWidth
            sx={{ height: 46, flexGrow: 2 }}
            loading={false}
            type="submit"
            disabled={!checkboxValue}
            onClick={() => {
              onChange();
              onClose();
            }}
          >
            {t('team-detail.dialog.change-owner-button')}
          </StyledDeleteButton>
        </>
      }
      dialogContent={
        <Box sx={{ width: 400, margin: 'auto' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '20px',
              marginBottom: '0.5rem',
              fontWeight: 500,
              lineHeight: '28px',
            }}
          >
            {t('team-detail.dialog.change-owner-title')}
          </Typography>

          <Typography variant="subtitle2" color={'var(--gray-50)'}>
            {t('team-detail.dialog.change-owner-description-1')}
          </Typography>

          <Typography
            sx={{ mt: '1rem' }}
            variant="subtitle2"
            color={'var(--gray-50)'}
          >
            {t('team-detail.dialog.change-owner-description-2')}
          </Typography>

          <FormControlLabel
            label={`${t('team-detail.dialog.checkbox-title', {
              new_owner: label,
            })}`}
            sx={{
              fontFamily: 'Nunito Sans KR',
              marginTop: '1rem',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 500,
              color: 'var(--gray-700)',
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

export default React.memo(DialogChangeOwnerView);
