import { useSnapshot } from 'valtio';
import { Box, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import UserProfile from '@web-workspace/api-console/components/my-account/user-profile';
import MyAccountStore, {
  useMyAccountData,
} from '@web-workspace/api-console/components/my-account/data';
import { PageTitle } from '@web-workspace/api-console/common/views';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import { useNavigate } from 'react-router-dom';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
}));

const BoxContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  position: 'relative',
}));

function MyAccountContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isMyAccountLoading } = useMyAccountData();

  const {
    clearAuthState,
    tzDisplayOffset: tzOffset,
    timeZone,
  } = useSnapshot(CsApiAuthStore);
  const { profile, setIncorrectPasswordCount } = useSnapshot(MyAccountStore);
  const { openDialog } = useSnapshot(DialogStore);

  // Logout when deactivating account or changing password
  const handleLogout = () => {
    clearAuthState();
    setIncorrectPasswordCount(0);
    navigate(API_ROUTES.LOGIN.path, { replace: true });
  };

  const openAvatarEditor = () => {
    openDialog({
      name: DialogType.CsApiAvatarEditor,
    });
  };

  const openProfileEditor = () => {
    openDialog({
      name: DialogType.CsApiEditProfile,
      props: {
        handleLogout,
      },
    });
  };
  const openTimezoneEditor = () => {
    openDialog({
      name: DialogType.CsApiEditTimezone,
    });
  };

  const openChangePasswordDialog = (currentPassword: string) => {
    openDialog({
      name: DialogType.CsApiChangePassword,
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
      name: DialogType.CsApiVerifyPassword,
      props: {
        onResetPassword: () => {
          // clearAuthState();
          setIncorrectPasswordCount(0);
          navigate(`${API_ROUTES.RESET.path}`);
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

  const dateValue = formatDateWithLanguage({
    date: new Date(profile?.lastLoginAt),
    isDetail: true,
    withSlash: true,
    tzOffset,
  });

  return (
    <BoxContainer>
      <PageTitle title={t('apiAccount.title')}>
        <Typography whiteSpace="pre-line">
          {t('apiAccount.description')}
        </Typography>
      </PageTitle>
      <BoxContent>
        <LoadingOverLayer loading={isMyAccountLoading} />

        <UserProfile
          openAvatarEditor={openAvatarEditor}
          openProfileEditor={openProfileEditor}
          openTimezoneEditor={openTimezoneEditor}
          handleLogout={handleLogout}
          openChangePasswordDialog={handleChangePassword}
        />
        <Typography variant="body2" sx={{ color: 'var(--gray-25)' }}>
          {`${t('apiAccount.recent-session')} ${dateValue} (GMT${timeZone})`}
        </Typography>
      </BoxContent>
    </BoxContainer>
  );
}

export default MyAccountContainer;
