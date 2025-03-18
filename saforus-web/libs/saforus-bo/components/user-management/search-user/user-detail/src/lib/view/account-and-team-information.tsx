// Note and explanation
/////////////////////////////////////////////////////////////////////

// Import area
import { Avatar, Box, Typography, styled } from '@mui/material';
import Button from '@web-workspace/shared/components/widgets/button';
import InputToggle from '@web-workspace/shared/components/widgets/input-toggle';
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import AutocompleteToggle from '@web-workspace/shared/components/widgets/autocomplete-toggle';
import AvatarPhoto from '../assets/photo.svg';
import BinIcon from '../assets/bin.svg';
import SearchUserStore, {
  COUNTRIES,
  UpdateUserInformationRequest,
} from '@web-workspace/saforus-bo/components/user-management/search-user/data';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useState } from 'react';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import DeleteWarning from '../assets/delete-warning.svg';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { TOption } from '@web-workspace/saforus-bo/common/model';
import { useNavigate } from 'react-router-dom';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import useAccountUserData from '../data';
/////////////////////////////////////////////////////////////////////

// Styled components declaration area
const StyledDeleteAccountButton = styled(Button)`
  background: var(--base-white);
  border: 1px solid var(--red-400);
  box-shadow: var(--shadow-xsm);
  border-radius: 6px;
  color: var(--red-600);
  padding: 0.5rem 0.75rem;
  text-transform: none;
  font-weight: 700;
  font-size: '0.875rem';
  &:disabled {
    background: var(--neutral-700);
    color: var(--base-white);
    border: 1px solid var(--neutral-700);
  }
`;

const StyledDeleteButton = styled(LoadingButton)`
  background: var(--red-600);
  text-transform: none;
  color: var(--base-white);
  padding: 12px 18px;

  &:disabled {
    background: var(--neutral-700);
    color: var(--base-white);
    padding: 12px 18px;
  }
  &:hover {
    background: var(--red-400);
    color: var(--base-white);
  }
`;

/////////////////////////////////////////////////////////////////////

// Interface and default Function declaration area
// /* eslint-disable-next-line */ if need
export interface AccountAndTeamInformationProps {
  register: UseFormRegister<Partial<UpdateUserInformationRequest>>;
  control: Control<Partial<UpdateUserInformationRequest>>;
  getValues: UseFormGetValues<Partial<UpdateUserInformationRequest>>;
  setValue: UseFormSetValue<Partial<UpdateUserInformationRequest>>;
  watch: UseFormWatch<Partial<UpdateUserInformationRequest>>;
  onSubmit: () => void;
}

export function AccountAndTeamInformation(
  props: AccountAndTeamInformationProps
) {
  // hooks declaration area
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { userInformation, countries } = useSnapshot(SearchUserStore);

  const dateValue = formatDateWithLanguage(
    new Date(userInformation?.currentSessionStartedAt),
    undefined,
    true
  );

  const { openDialog, closeDialog } = useSnapshot(DialogStore);

  const [openConfirm, setOpenConfirm] = useState(false);
  /////////////////////////////////////////////////////////////////

  // variable declaration area
  /////////////////////////////////////////////////////////////////

  // react function or function component declaration area
  /*
  This function takes a name as a string and returns the initials of the name. 
  It does this by splitting the name by spaces, mapping each word to its 
  first character, and joining them together. For example:

  getInitials("John Doe") // returns "JD"
  getInitials("Alice Cooper") // returns "AC"
  getInitials("Mary Jane Watson") // returns "MJW"
  */
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  const OpenDeleteConfirm = () => {
    setOpenConfirm(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
    navigate(BO_ROUTES.USER_MANAGEMENT.SEARCH_USERS.path);
  };

  const handleDeleteAccount = () => {
    openDialog({
      name: DialogType.DeleteAccount,
      props: {
        onArchive: () => {
          closeDialog();
        },
        onDelete: () => {
          OpenDeleteConfirm();
        },
      },
    });
  };

  const handleResetPassword = () => {
    openDialog({
      name: DialogType.ResetPassword,
      props: {
        onClose: () => {
          closeDialog();
        },
        fullName: userInformation.fullName,
        email: userInformation.email,
      },
    });
  };

  const { onDeleteAccount } = useAccountUserData({ onClose: handleClose });
  // apply for nested dialog:
  // this dialog is define here and do not open by dialog storage bc if you
  // use dialog store then you have to declare in dialog component at this point
  // this will raise error 'circular definition'
  const ConfirmDeleteDialog = ({ open, onClose }: any) => {
    const { t } = useTranslation();

    return (
      <Dialog
        open={open}
        PaperProps={{
          style: {
            borderRadius: '5px',
            border: '2px solid var(--red-300, #FEB8AE)',
          },
        }}
        contentCss={{
          margin: 'auto',
          textAlign: 'center',
          justifyContent: 'center',
        }}
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
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <LoadingButton
              color="secondary"
              fullWidth
              onClick={() => {
                onClose();
              }}
              sx={{ height: 46 }}
            >
              {t('userManagement.search-user.user-detail.dialogs.cancel')}
            </LoadingButton>
            <StyledDeleteButton
              onClick={() => {
                onDeleteAccount(userInformation?.id);
              }}
              fullWidth
              color="error"
            >
              {t('userManagement.search-user.user-detail.dialogs.delete')}
            </StyledDeleteButton>
          </Box>
        }
        dialogContent={
          <Box sx={{ width: 350, margin: 'auto' }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '20px',
                marginBottom: '0.5rem',
                fontWeight: 500,
                lineHeight: '28px',
              }}
            >
              {t(
                'userManagement.search-user.user-detail.dialogs.delete-account.confirm-title'
              )}
            </Typography>
            <Typography variant="subtitle2" color={'var(--gray-50)'}>
              {t(
                'userManagement.search-user.user-detail.dialogs.delete-account.confirm-description'
              )}
            </Typography>
          </Box>
        }
        dialogCss={{
          width: '100%',
          height: 'auto',
          margin: 'auto',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      />
    );
  };
  /////////////////////////////////////////////////////////////////

  // useEffect declaration area
  /////////////////////////////////////////////////////////////////
  return (
    <Box
      sx={{
        display: 'flex',
        padding: '1.5rem',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '1.5rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--neutral-700)',
        background: 'var(--base-white)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1rem',
          width: '50%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'stretch',
          }}
        >
          <Typography variant="h6">
            {t('userManagement.search-user.user-detail.account-information')}
          </Typography>
          <StyledDeleteAccountButton
            disabled={!userInformation?.id}
            color="secondary"
            variant="outlined"
            sx={{
              gap: '0.375rem',
            }}
            onClick={() => handleDeleteAccount()}
          >
            {' '}
            <img src={BinIcon} alt="" />
            {t('userManagement.search-user.user-detail.button.delete-account')}
          </StyledDeleteAccountButton>
          <ConfirmDeleteDialog open={openConfirm} onClose={handleClose} />
        </Box>
        <Avatar
          sx={{
            width: 146,
            height: 146,
            backgroundColor: 'var(--neutral-500)',
            color: 'var(--gray-25)',
          }}
          srcSet={userInformation?.avatar && userInformation?.avatar}
          imgProps={{ loading: 'lazy' }}
        >
          {userInformation?.userName ? (
            <Typography variant="h1" fontWeight={400}>
              {getInitials(userInformation?.userName)}
            </Typography>
          ) : (
            <img src={AvatarPhoto} alt="avatar"></img>
          )}
        </Avatar>
        <Box style={{ width: '100%' }}>
          <InputToggle
            {...props.register('fullName')}
            key={'fullName'}
            value={userInformation?.fullName || '--'}
            label={`${t('userManagement.search-user.user-detail.name')}*`}
            labelStyle={{ minWidth: 230 }}
            submitValue={() => {
              props.onSubmit();
              return true;
            }}
            limitedChars={20}
          />

          <InputToggle
            value={userInformation?.email || '--'}
            key={'email'}
            label={`${t(
              'userManagement.search-user.user-detail.login-account'
            )}*`}
            placeholder="OOOOO@mycompay.com"
            labelStyle={{ minWidth: 230 }}
            disableActions={true}
            valueCss={{ color: 'var(--gray-25)' }}
            endAdornment={
              <Button color="secondary" onClick={handleResetPassword}>
                {t(
                  'userManagement.search-user.user-detail.button.reset-password'
                )}
              </Button>
            }
          />
          <InputToggle
            {...props.register('mobileNumber')}
            value={userInformation?.mobileNumber || '--'}
            labelStyle={{ minWidth: 230 }}
            label={`${t(
              'userManagement.search-user.user-detail.mobile-number'
            )}`}
            canCopy={false}
            disableActions={false}
            submitValue={() => {
              props.onSubmit();
              return true;
            }}
          />
          <InputToggle
            {...props.register('companyName')}
            value={userInformation?.companyName || '--'}
            labelStyle={{ minWidth: 230 }}
            label={`${t(
              'userManagement.search-user.user-detail.company-name'
            )}`}
            canCopy={false}
            disableActions={false}
            submitValue={() => {
              props.onSubmit();
              return true;
            }}
          />
          <InputToggle
            {...props.register('companyUrl')}
            value={userInformation?.companyUrl || '--'}
            labelStyle={{ minWidth: 230 }}
            label={`${t('userManagement.search-user.user-detail.company-url')}`}
            canCopy={false}
            disableActions={false}
            submitValue={() => {
              props.onSubmit();
              return true;
            }}
          />
          <Controller
            name="countryCode"
            control={props.control}
            render={({ field }) => (
              <AutocompleteToggle
                {...field}
                defaultValue={countries.find(
                  (el) => el.value === String(userInformation?.countryCode)
                )}
                labelStyle={{ minWidth: 230 }}
                options={countries}
                label={`${t(
                  'userManagement.search-user.user-detail.country-of-incorporation'
                )}`}
                canCopy={false}
                disableActions={false}
                onChange={(
                  event: React.SyntheticEvent<Element, Event>,
                  value: TOption | null
                ) => {
                  field.onChange(value?.value || 0);
                  // look up countryName and countryShortName in constant
                  const country = COUNTRIES.find(
                    (el) => el.countryCode === value?.value
                  );
                  props.setValue('countryName', country?.country);
                  props.setValue('countryShortName', country?.shortName);
                  ///////////////////////////////////////////////////////
                  props.onSubmit();
                }}
              />
            )}
          />
        </Box>
        <Typography sx={{ color: 'var(--gray-25)' }}>
          {t('userManagement.search-user.user-detail.recent-session', {
            date: dateValue,
          })}
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">
              {t('userManagement.search-user.user-detail.team-information')}
            </Typography>
          </Box>
          <Box>
            <InputToggle
              value={userInformation?.teamName || '--'}
              labelStyle={{ minWidth: 230 }}
              label={`${t('userManagement.search-user.user-detail.team-name')}`}
              canCopy={false}
              disableActions={false}
              canEdit={false}
            />
            <InputToggle
              value={userInformation?.teamOwnerName || '--'}
              labelStyle={{ minWidth: 230 }}
              label={`${t(
                'userManagement.search-user.user-detail.team-owner'
              )}`}
              canCopy={false}
              disableActions={false}
              canEdit={false}
              limitedChars={20}
            />
            <InputToggle
              value={userInformation?.subscriptionPlanName || '--'}
              labelStyle={{ minWidth: 230 }}
              label={`${t(
                'userManagement.search-user.user-detail.team-service-plan'
              )}`}
              canCopy={false}
              disableActions={false}
              canEdit={false}
            />
            <InputToggle
              value={userInformation?.teamDescription || '--'}
              labelStyle={{ minWidth: 230 }}
              label={`${t(
                'userManagement.search-user.user-detail.team-description'
              )}`}
              canCopy={false}
              disableActions={false}
              canEdit={false}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
/////////////////////////////////////////////////////////////////////
