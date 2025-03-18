import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { Box, Checkbox, IconButton, Typography, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useState } from 'react';
import { unsubscribePlan } from '@web-workspace/saforus/components/user-info/service-plan-billing/data';
import { getTeamId } from '@web-workspace/saforus/common/utils';

const StyleContent = styled(Box)`
  color: var(--gray-50);
  /* Headline XXS/Text L/Regular */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.1px;
`;

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export function UserFeedbackDialog({ onClose }: any) {
  const { t } = useTranslation();
  const [isDisableBtn, setIsDisableBtn] = useState(false);
  const [countCheckBox, setCountCheckBox] = useState(0);
  const handelCheckBoxSelected = (value: boolean) => {
    setCountCheckBox((prevCountCheckBox) => {
      if (value) {
        return prevCountCheckBox + 1;
      } else {
        return prevCountCheckBox - 1;
      }
    });
  };

  const onSubmit = async () => {
    const teamId = getTeamId();
    const response = await unsubscribePlan({ teamId: teamId! });
    if (response?.data?.link) {
      window.location.href = response.data.link;
    }
    onClose();
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '560px',
        },
      }}
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      title={t('servicePlan.user-feedback.header') as string}
      onClose={onClose}
      footer={
        <LoadingButton
          type="button"
          onClick={onSubmit}
          disabled={countCheckBox < 1}
          fullWidth
          sx={{ height: 46 }}
        >
          Submit
        </LoadingButton>
      }
      dialogContent={
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <StyleContent>{t('servicePlan.user-feedback.title')}</StyleContent>
          <FormControlLabel
            sx={{ mt: '1rem' }}
            control={
              <Checkbox
                onChange={(event) =>
                  handelCheckBoxSelected(event.target.checked)
                }
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
                {t('servicePlan.user-feedback.reason-one')}
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) =>
                  handelCheckBoxSelected(event.target.checked)
                }
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
                {t('servicePlan.user-feedback.reason-two')}
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) =>
                  handelCheckBoxSelected(event.target.checked)
                }
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
                {t('servicePlan.user-feedback.reason-three')}
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) =>
                  handelCheckBoxSelected(event.target.checked)
                }
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
                {t('servicePlan.user-feedback.reason-four')}
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) =>
                  handelCheckBoxSelected(event.target.checked)
                }
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
                {t('servicePlan.user-feedback.reason-five')}
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) =>
                  handelCheckBoxSelected(event.target.checked)
                }
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
                {t('servicePlan.user-feedback.reason-six')}
              </Typography>
            }
          />

          <Box>{t('servicePlan.user-feedback.comment')}</Box>
          <StyledTextarea
            sx={{
              width: '100%',
              mt: '0.5rem',
              maxHeight: '110px',
              overflowX: 'auto',
            }}
            style={{ resize: 'vertical', overflow: 'auto' }}
            minRows={4}
            placeholder={
              t('servicePlan.user-feedback.textare-placeholder') as string
            }
          />
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
      notion={<Box>{t('servicePlan.user-feedback.note')}</Box>}
    ></Dialog>
  );
}

export default UserFeedbackDialog;
