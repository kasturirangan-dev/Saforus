import { Avatar, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import MyAccountStore, {
  Country,
  LoginInformationType,
} from '@web-workspace/saforus/components/user-info/my-account/data';
import { useForm } from 'react-hook-form';
import InputToggle from '@web-workspace/shared/components/widgets/input-toggle';
import Button from '@web-workspace/shared/components/widgets/button';
import AutocompleteToggle from '@web-workspace/shared/components/widgets/autocomplete-toggle';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import AvatarPhoto from './assets/photo.svg';
import HoverCamera from './assets/camera.svg';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useNavigate } from 'react-router-dom';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { pxToVw } from '@web-workspace/saforus/common/utils';

function LoginInformation({ onInfoChange }: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openDialog } = useSnapshot(DialogStore);
  const { clearAuthState } = useSnapshot(AuthStore);

  const { loginInformation, countries, setName, setIncorrectPasswordCount } =
    useSnapshot(MyAccountStore);
  const { register, getValues, watch, handleSubmit, setValue } =
    useForm<LoginInformationType>({
      values: loginInformation,
    });
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  const handleNumericInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    // Allow only numbers and '+'
    value = value.replace(/[^0-9+]/g, '');
    // Ensure the length does not exceed 13 digits
    if (value.length > 15) {
      value = value.slice(0, 15);
    }
    setValue('mobileNumber', value);
  };

  // Logout when deactivating account or changing password
  const handleLogout = () => {
    clearAuthState();
    setIncorrectPasswordCount(0);
    navigate(ROUTES.LOGIN.path, { replace: true });
  };

  const openChangePasswordDialog = (currentPassword: string) => {
    openDialog({
      name: DialogType.ChangePassword,
      props: {
        currentPassword,
        onResult: (result: boolean) => {
          if (result) {
            openDialog({
              name: DialogType.ChangePasswordSuccess,
              props: {
                onLogin: handleLogout,
              },
            });
          }
        },
      },
    });
  };

  const handleChangePassword = () => {
    openDialog({
      name: DialogType.VerifyPassword,
      props: {
        onResetPassword: () => {
          clearAuthState();
          setIncorrectPasswordCount(0);
          navigate(ROUTES.RESET.path, { replace: true });
        },
        onContinue: (result: boolean, currentPassword?: string) => {
          if (result && currentPassword) {
            openChangePasswordDialog(currentPassword);
          } else {
            openDialog({
              name: DialogType.IncorrectPassword,
              props: {
                onLogout: handleLogout,
              },
            });
          }
        },
      },
    });
  };

  const openAvatarEditor = () => {
    openDialog({
      name: DialogType.AvatarEditor,
      props: { avatarUrl: loginInformation.avatar },
    });
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: pxToVw(146),
          height: pxToVw(146),
        }}
      >
        <Avatar
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--neutral-500)',
            color: 'var(--gray-25)',
            cursor: 'pointer',
          }}
          src={loginInformation.avatar && loginInformation.avatar}
          imgProps={{ loading: 'lazy' }}
        >
          <img src={AvatarPhoto} alt="avatar" />
        </Avatar>

        {/* Hover overlay only for the avatar */}
        <Box
          onClick={openAvatarEditor}
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            opacity: 0,
            transition: 'opacity 0.3s',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <img src={HoverCamera} alt="camera icon" />
        </Box>
      </Box>
      <Box width={{ xs: '100%', lg: '70%', xl: '50%' }}>
        <InputToggle
          {...register('fullName')}
          key={'fullName'}
          value={watch('fullName') ?? '--'}
          label={`${t('myaccount.login-information.name')}`}
          labelStyle={{ minWidth: pxToVw(230) }}
          submitValue={async () => {
            onInfoChange('fullName', getValues('fullName'));
            return true;
          }}
          onCancel={() => {
            setValue('fullName', loginInformation.fullName);
          }}
          limitedChars={20}
          canCopy={false}
          autoFocus={true}
          autoComplete="nope" // Set autoComplete to a random string (e.g Nope) to prevent autofill because 'off' is not supported in all browsers
          canSubmit={getValues('fullName') !== ''}
        />

        <InputToggle
          {...register('userName')}
          value={watch('userName') ?? '--'}
          label={`${t('myaccount.login-information.login-account')}`}
          placeholder="OOOOO@mycompay.com"
          labelStyle={{ minWidth: pxToVw(230) }}
          disableActions={true}
          valueCss={{ color: 'var(--gray-25)' }}
          endAdornment={
            <Button color="secondary" onClick={handleChangePassword}>
              {t('myaccount.login-information.change-password')}
            </Button>
          }
        />
        <InputToggle
          {...register('mobileNumber')}
          value={watch('mobileNumber') ?? '--'}
          labelStyle={{ minWidth: pxToVw(230) }}
          label={`${t('myaccount.login-information.mobile-number')}`}
          canCopy={false}
          disableActions={false}
          onChange={handleNumericInput}
          submitValue={async () => {
            onInfoChange('mobileNumber', getValues('mobileNumber'));
            return true;
          }}
          onCancel={() => {
            setValue('mobileNumber', loginInformation.mobileNumber);
          }}
          canSubmit={getValues('mobileNumber') !== ''}
          autoFocus={true}
        />
        <InputToggle
          {...register('companyName')}
          value={watch('companyName') ?? '--'}
          labelStyle={{ minWidth: pxToVw(230) }}
          label={`${t('myaccount.login-information.company-name')}`}
          canCopy={false}
          disableActions={false}
          submitValue={async () => {
            onInfoChange('companyName', getValues('companyName'));
            return true;
          }}
          onCancel={() => {
            setValue('companyName', loginInformation.companyName);
          }}
          canSubmit={getValues('companyName') !== ''}
          autoFocus={true}
        />
        <InputToggle
          {...register('companyUrl')}
          value={watch('companyUrl') ?? '--'}
          labelStyle={{ minWidth: pxToVw(230) }}
          label={`${t('myaccount.login-information.company-url')}`}
          canCopy={false}
          disableActions={false}
          submitValue={async () => {
            onInfoChange('companyUrl', getValues('companyUrl'));
            return true;
          }}
          onCancel={() => {
            setValue('companyUrl', loginInformation.companyUrl);
          }}
          autoFocus={true}
        />
        <AutocompleteToggle
          {...register('countryCode')}
          value={(watch('countryCode') as string) ?? '--'}
          labelStyle={{ minWidth: pxToVw(230) }}
          options={countries}
          label={`${t('myaccount.login-information.country-incorporation')}`}
          canCopy={false}
          disableActions={false}
          onChange={(value: any, newValue: Country) => {
            onInfoChange('country', newValue);
          }}
          renderOption={(props: any, option: Country) => (
            <Box
              component="li"
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                '& > img': { mr: 2, flexShrink: 0 },
              }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${option.shortName.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.shortName.toLowerCase()}.png`}
                alt=""
              />
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {option.label} ({option.shortName}) +{option.countryCode}
              </Typography>
            </Box>
          )}
        />
      </Box>
    </>
  );
}

export default LoginInformation;
