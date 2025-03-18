import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Checkbox,
  FormControlLabel,
  styled,
  Typography,
} from '@mui/material';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import DeleteWarning from '../assets/delete-warning.svg';
import Button from '@web-workspace/shared/components/widgets/button';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { LoadingButton } from '@mui/lab';

type CancelOrderViewProps = {
  onClose: () => void;
  onPrev: () => void;
  checkboxValue: boolean;
  onCancelOrder: () => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StyledDeleteButton = styled(LoadingButton)`
  background: var(--red-600);
  border: 1px solid var(--red-400);
  box-shadow: var(--shadow-xsm);
  text-transform: none;
  color: var(--base-white);
  margin-left: 1rem;
  padding: 12px 18px;

  &:disabled {
    background: var(--red-300);
    border: 1px solid var(--red-200);
    color: var(--base-white);
    opacity: 0.8;
    padding: 12px 18px;
  }
`;

const CancelOrderView: React.FC<CancelOrderViewProps> = ({
  onPrev,
  onClose,
  checkboxValue,
  onCancelOrder,
  handleCheckboxChange,
}) => {
  const { t } = useTranslation();
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
            color="secondary"
            onClick={onPrev}
            sx={{ marginRight: 'auto', padding: '12px 18px' }}
          >
            {t('multiDrm.button.back-prev')}
          </Button>

          <StyledDeleteButton
            loading={false}
            disabled={!checkboxValue}
            onClick={onCancelOrder}
          >
            {t('multiDrm.button.cancel-order')}
          </StyledDeleteButton>
        </>
      }
      dialogContent={
        <Box sx={{ width: 350, margin: 'auto' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: 20,
              marginBottom: '0.5rem',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            {t('multiDrm.dialog.cancel-order-title')}
          </Typography>

          <Typography
            sx={{ textAlign: 'center' }}
            variant="subtitle2"
            color={'var(--gray-50)'}
          >
            {t('multiDrm.dialog.cancel-order-description')}
          </Typography>

          <FormControlLabel
            label={t('multiDrm.dialog.agreement-cancel')}
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
    ></Dialog>
  );
};

export default React.memo(CancelOrderView);
