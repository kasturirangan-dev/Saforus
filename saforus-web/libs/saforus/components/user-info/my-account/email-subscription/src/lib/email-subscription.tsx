import { Box, Checkbox, Input, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import MyAccountStore from '@web-workspace/saforus/components/user-info/my-account/data';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import {
  getMinuteOffset,
  getTimezone,
} from '@web-workspace/saforus/common/utils';
import { pxToVw } from '@web-workspace/saforus/common/utils';

const CustomInput = styled(Input)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(5),
  },
  position: 'relative',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--gray-600)',
  boxShadow: `var(--shadow-xsm)`,
  fontSize: pxToVw('15px'),
  border:
    theme.palette.mode === 'light' ? `${pxToVw('1px')} solid #DAE0E6` : `${pxToVw('1px')} solid #2E3545`,
  padding: pxToVw(['9px', '16px']),
  textAlign: 'left',
  transition: theme.transitions.create(['border-color']),
  height: pxToVw('40px'),
  '&.Mui-disabled': {
    borderColor: 'var(--neutral-700)',
  },
  '&.Mui-focused': {
    borderColor: 'var(--purple-600)',
  },
}));

export function EmailSubscription({ onInfoChange }: any) {
  const { t } = useTranslation();
  const timezone = getTimezone();
  const tzOffset = getMinuteOffset();
  const { loginInformation } = useSnapshot(MyAccountStore);
  const subscribedOn = loginInformation?.emailSubscriptionOnOffAt
    ? formatDateWithLanguage({
        date: new Date(loginInformation?.emailSubscriptionOnOffAt),
        isDetail: true,
        withSlash: true,
        tzOffset,
      })
    : undefined;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: pxToVw('1.5rem'),
        flexDirection: 'column',
        width: { xs: '100%', lg: '70%', xl: '50%' },
      }}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: 0, marginTop: pxToVw('0.5rem') }}
      >
        {t('myaccount.email-subscription.title')}
      </Typography>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              border: `${pxToVw('1px')}  solid #DAE0E6`,
              backgroundColor: 'var(--neutral-600)',
              borderRight: 'none',
              height: pxToVw('40px'),
              padding: pxToVw(['8px', '16px']),
              display: 'flex',
              margin: 'auto',
              width: pxToVw('200px'),
            }}
          >
            <Typography
              variant="body2"
              sx={{
                alignContent: 'center',
                fontWeight: 500,
                color: 'var(--gray-700)',
              }}
            >
              {t('myaccount.email-subscription.email')}
            </Typography>
          </Box>
          <CustomInput
            fullWidth
            disableUnderline
            placeholder="OOOOO@mycompay.com"
            value={loginInformation?.userName}
            disabled
          />
        </Box>
        <Box
          style={{ display: 'flex', marginTop: pxToVw('0.5rem'), alignItems: 'center' }}
        >
          <Checkbox
            checked={Boolean(loginInformation.hasSubscribedEmailUpdate)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onInfoChange(
                'hasSubscribedEmailUpdate',
                !loginInformation.hasSubscribedEmailUpdate
              );
            }}
          />
          <Typography
            sx={{
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: pxToVw('0.875rem'),
              lineHeight: pxToVw('1.25rem'),
              letterSpacing: pxToVw('-0.1px'),
              color: 'var(--gray-700)',
            }}
          >
            {t('myaccount.email-subscription.confirm')}
          </Typography>
        </Box>
      </Box>
      {subscribedOn && (
        <Typography
          sx={{
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: pxToVw('0.875rem'),
            lineHeight: pxToVw('1.25rem'),
            letterSpacing: pxToVw('-0.1px'),
            color: 'var(--gray-50)',
          }}
        >
          <div
            dangerouslySetInnerHTML={
              loginInformation?.hasSubscribedEmailUpdate
                ? {
                    __html: t('myaccount.email-subscription.subscribe', {
                      date: `${subscribedOn} ${timezone}`,
                    }),
                  }
                : {
                    __html: t('myaccount.email-subscription.unsubscribe', {
                      date: `${subscribedOn} ${timezone}`,
                    }),
                  }
            }
          />
        </Typography>
      )}
    </Box>
  );
}

export default EmailSubscription;
