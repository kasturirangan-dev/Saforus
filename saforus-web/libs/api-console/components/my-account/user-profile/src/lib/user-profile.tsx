import {
  Avatar,
  Box,
  ButtonBase,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { useSnapshot } from 'valtio';
import MyAccountStore from '@web-workspace/api-console/components/my-account/data';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { useTranslation } from 'react-i18next';
import { TimeZones } from '@web-workspace/api-console/components/my-account/data';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { useMemo } from 'react';
import {
  formatDateWithLanguage,
  formatedTimezone,
} from '@web-workspace/shared/helpers/dates';
import {
  BoxContent,
  ContentTile,
  UserProfileContainer,
} from './views/styled-elements';
import { TOption } from '@web-workspace/api-console/common/model';
import HoverCamera from './assets/camera.svg';
import DefaultAvatar from './assets/photo.svg';

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  padding: '9px 15px',

  boxShadow: `var(--shadow-xsm)`,
  '&.MuiButtonBase-root:hover': {
    boxShadow: `var(--shadow-md)`,
  },
}));

const UserPofile = ({
  openAvatarEditor,
  openProfileEditor,
  openTimezoneEditor,
  openChangePasswordDialog,
  handleLogout,
}: {
  openAvatarEditor: () => void;
  openProfileEditor: () => void;
  openTimezoneEditor: () => void;
  openChangePasswordDialog: () => void;
  handleLogout: () => void;
}) => {
  const { t, i18n } = useTranslation();

  const { profile } = useSnapshot(MyAccountStore);
  const {
    userInfo,
    tzDisplayOffset: tzOffset,
    timeZone,
  } = useSnapshot(CsApiAuthStore);
  const createDate = useMemo(
    () =>
      formatDateWithLanguage({
        date: new Date(profile?.createdAt),
        isDetail: true,
        withSlash: true,
        tzOffset,
      }),
    [profile?.createdAt, tzOffset, i18n.language]
  );

  const currentTimezone = useMemo(() => {
    let timeZoneObject = TimeZones.find((el) => el.name === profile.zoneId);
    if (!timeZoneObject && profile.zoneId) {
      const { timeZone } = formatedTimezone(profile.zoneId);
      timeZoneObject = TimeZones.find((el) => el.value === timeZone);
    }
    return {
      label: timeZoneObject?.label,
      value: timeZoneObject?.name,
    } as TOption;
  }, [profile.zoneId]);

  const RowInfo = ({
    label = '',
    value = '--',
  }: {
    label?: string | null;
    value?: string | null;
  }) => {
    return (
      <Stack direction="row" spacing={'6px'}>
        <Typography fontWeight={500} color="var(--gray-700)" width="140px">
          {label}
        </Typography>
        <Typography color="var(--gray-700)">{value}</Typography>
      </Stack>
    );
  };

  return (
    <UserProfileContainer>
      <Box display="flex" flexDirection="column" gap="16px">
        {/* Avatar */}
        <Box sx={{ position: 'relative', width: 120, height: 120 }}>
          {/* Avatar */}
          <Avatar
            sx={{
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
            src={profile.avatarPreview || DefaultAvatar}
            imgProps={{ loading: 'lazy' }}
          >
            <Icon name={'avatar'} size={75} color="var(--base-white)" />
          </Avatar>

          {/* Hover overlay */}
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
        <ButtonBase onClick={openProfileEditor}>
          <Typography
            variant="body2"
            fontWeight={600}
            color="var(--purple-500)"
          >
            {t('apiAccount.button.edit-profile')}
          </Typography>
        </ButtonBase>
      </Box>
      {/* User profile */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <BoxContent>
          <ContentTile>
            {t('apiAccount.personal-information.title')}
          </ContentTile>
          <RowInfo
            label={t('apiAccount.personal-information.name')}
            value={profile.accountName}
          />
          <RowInfo
            label={t('apiAccount.personal-information.email')}
            value={profile.email}
          />
          <RowInfo
            label={t('apiAccount.personal-information.company')}
            value={profile.companyName}
          />
          <RowInfo
            label={t('apiAccount.personal-information.phone')}
            value={profile.phone}
          />
          <RowInfo
            label={t('apiAccount.personal-information.service-plan')}
            value={profile.subscription?.plan.planType}
          />
        </BoxContent>

        <BoxContent>
          <ContentTile>{t('apiAccount.account-information.title')}</ContentTile>
          <RowInfo
            label={t('apiAccount.account-information.login-account')}
            value={profile.email}
          />
          <RowInfo
            label={t('apiAccount.account-information.account-id')}
            value={profile.id}
          />
          <RowInfo
            label={t('apiAccount.account-information.created-date')}
            value={`${createDate} (GMT${timeZone})`}
          />
        </BoxContent>

        <BoxContent>
          <ContentTile>{t('apiAccount.timezone-settings')}</ContentTile>
          <Stack direction="row" spacing={'5em'}>
            <Typography color="var(--gray-700)">
              {currentTimezone.label}
            </Typography>
            <ButtonBase onClick={openTimezoneEditor}>
              <Typography
                variant="body2"
                fontWeight={600}
                color="var(--purple-500)"
              >
                {t('apiAccount.button.change')}
              </Typography>
            </ButtonBase>
          </Stack>
        </BoxContent>

        <Box display="flex" gap="12px">
          <StyledButton color="secondary" onClick={openChangePasswordDialog}>
            {t('apiAccount.button.change-password')}
          </StyledButton>
          <StyledButton variant="outlined" color="error" onClick={handleLogout}>
            {t('apiAccount.button.logout')}
          </StyledButton>
        </Box>
      </Box>
    </UserProfileContainer>
  );
};

export default UserPofile;
