import { Box, Input, Typography, styled, Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import SearchUserStore, {
  UpdateUserInformationRequest,
} from '@web-workspace/saforus-bo/components/user-management/search-user/data';
import { Control, UseFormRegister, Controller } from 'react-hook-form';
import { useState } from 'react';

const CustomInput = styled(Input)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(5),
  },
  position: 'relative',
  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--gray-600)',
  boxShadow: `var(--shadow-xsm)`,
  fontSize: '15px',
  border:
    theme.palette.mode === 'light' ? '1px solid #DAE0E6' : '1px solid #2E3545',
  padding: '9px 16px',
  textAlign: 'left',
  transition: theme.transitions.create(['border-color']),
  height: '40px',
  '&.Mui-disabled': {
    borderColor: 'var(--neutral-700)',
  },
  '&.Mui-focused': {
    borderColor: 'var(--purple-600)',
  },
}));

export interface EmailSubscriptionProps {
  register: UseFormRegister<Partial<UpdateUserInformationRequest>>;
  control: Control<Partial<UpdateUserInformationRequest>>;
  onSubmit: () => void;
}

export function EmailSubscription(props: EmailSubscriptionProps) {
  const { t } = useTranslation();
  const { userInformation } = useSnapshot(SearchUserStore);

  const [isChecked, setIsChecked] = useState(
    Boolean(userInformation?.hasSubscribedEmailUpdate ?? false)
  );

  return (
    <Box
      sx={{
        padding: '1.5rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--neutral-700)',
        background: 'var(--base-white)',
      }}
    >
      <Box
        width={'50%'}
        gap={'1.5rem'}
        display={'flex'}
        flexDirection={'column'}
      >
        <Typography variant="h6" sx={{ marginBottom: 0, marginTop: '0.5rem' }}>
          {t('userManagement.search-user.user-detail.email-subscription')}
        </Typography>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                border: '1px solid #DAE0E6',
                backgroundColor: 'var(--neutral-600)',
                borderRight: 'none',
                height: '40px',
                padding: '8px 16px',
                display: 'flex',
                margin: 'auto',
                width: '200px',
              }}
            >
              {t('userManagement.search-user.user-detail.email')}
            </Box>
            <CustomInput
              fullWidth
              disableUnderline
              placeholder="OOOOO@mycompay.com"
              value={userInformation?.email || '--'}
              disabled
            />
          </Box>
          <Box
            style={{
              display: 'flex',
              marginTop: '0.5rem',
              alignItems: 'center',
            }}
          >
            <form>
              <Controller
                name="hasSubscribedEmailUpdate"
                control={props.control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={userInformation?.hasSubscribedEmailUpdate ?? false}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      field.onChange(event.target.checked);
                      props.onSubmit();
                    }}
                  />
                )}
              />
            </form>
            <Typography
              sx={{
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                letterSpacing: '-0.1px',
                color: 'var(--gray-700)',
              }}
            >
              {t(
                'userManagement.search-user.user-detail.email-subscribe-check-box'
              )}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            letterSpacing: '-0.1px',
            color: 'var(--gray-50)',
          }}
        >
          {t(
            'userManagement.search-user.user-detail.emai-subsciption-information'
          )}
        </Typography>
      </Box>
    </Box>
  );
}
