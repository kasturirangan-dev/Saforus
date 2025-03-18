import Dialog from '@web-workspace/shared/components/widgets/dialog';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import Warning from './assets/warning.svg';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import Button from '@web-workspace/shared/components/widgets/button';
import { useState } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import useSubscription from '@web-workspace/shared/hooks/use-subscription';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import i18next from 'i18next';
import {
  getMinuteOffset,
  getTimezone,
} from '@web-workspace/saforus/common/utils';

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

const StyleContent = styled(Typography)`
  color: var(--gray-50);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.4px;
`;

export function CancelSubscriptionDialog({ onClose }: any) {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const timezone = getTimezone();
  const handleCancel = async () => {
    onClose();
    dialogStore.openDialog({ name: DialogType.UserFeedBack });
  };
  const { subscriptionPlanDetail } = useSnapshot(useSubscription);

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '560px',
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
      title={t('servicePlan.cancel-subscription.header') as string}
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('servicePlan.cancel-subscription.button-undo')}
          </Button>
          <StyledDeleteButton
            disabled={!isConfirm}
            fullWidth
            sx={{ height: 46 }}
            onClick={handleCancel}
          >
            {t('servicePlan.cancel-subscription.button-cancel')}
          </StyledDeleteButton>
        </>
      }
      dialogContent={
        <Box>
          <Typography
            variant="subtitle2"
            color={'var(--gray-50)'}
            sx={{
              letterSpacing: '-0.4px',
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: i18next.t(
                  'servicePlan.cancel-subscription.content-one',
                  {
                    Date: `${formatDateWithLanguage({
                      date: subscriptionPlanDetail?.subscriptionEndsAt,
                      isDetail: true,
                      withSlash: true,
                      tzOffset,
                    })} ${timezone}`,
                  }
                ),
              }}
            />
          </Typography>
          <Typography
            variant="subtitle2"
            color={'var(--gray-50)'}
            sx={{
              letterSpacing: '-0.4px',
              mt: '1rem',
            }}
          >
            {t('servicePlan.cancel-subscription.content-two')}
          </Typography>
          <FormControlLabel
            sx={{ mt: '1rem' }}
            control={
              <Checkbox
                onChange={(event) => setIsConfirm(event.target.checked)}
              />
            }
            label={
              <Typography
                sx={{
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                  letterSpacing: '-0.1px',
                  color: '#5F6D7E',
                }}
              >
                {t('servicePlan.cancel-subscription.confirm-title')}
              </Typography>
            }
          />
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    ></Dialog>
  );
}

export default CancelSubscriptionDialog;
