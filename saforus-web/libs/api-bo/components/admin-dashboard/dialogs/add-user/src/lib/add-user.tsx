import React, { useMemo, useState } from 'react';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import CreateIcon from './assets/account.svg';
import { useTranslation } from 'react-i18next';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import {
  Box,
  MenuItem,
  Select,
  Typography,
  createFilterOptions,
  styled,
} from '@mui/material';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import { Controller } from 'react-hook-form';
import Input from '@web-workspace/shared/components/widgets/input';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TimeZones } from '@web-workspace/api-bo/components/admin-dashboard/data';
import { getLocalTimeZone, formatedTimezone } from '@web-workspace/shared/helpers/dates';
import { TOption } from '@web-workspace/api-bo/common/model';
import useCreateUserData from './data';

const BoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}));

const FormContainer = styled('form')``;
type CsApiBoAddUserDialogProps = {
  onClose: () => void;
};

const timeZoneOptions = TimeZones.map((tz) => ({
  label: tz.label,
  value: tz.value
}));

const CsApiBoAddUserDialog: React.FC<CsApiBoAddUserDialogProps> = ({ onClose }) => {
  const { onSubmit, handleSubmit, errors, control, loading } =
    useCreateUserData({
      onClose,
    });

  const { t } = useTranslation();
  const roleOptions = [
    { value: 'VIEWER', label: 'Viewer' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'SYS_ADMIN', label: 'Super Admin' }
  ];
  const [defaultValue, setDefaultValue] = useState(roleOptions[0].value)

  const currentTimezone = useMemo(() => {
    const { localTz } = getLocalTimeZone();
    const { timeZone } = formatedTimezone(localTz);
    const timeZoneObject = TimeZones.find((el) => el.value === timeZone);

    return {
      label: timeZoneObject?.label,
      value: timeZoneObject?.value,
    } as TOption;
  }, []);

  const filterOptions = createFilterOptions<TOption>({
    matchFrom: 'any',
    ignoreCase: true,
    stringify: (option: TOption) => option.label,
  });

  const handleRoleChange = (event, field) => {
    const value = event.target.value;
    setDefaultValue(value);
    field.onChange(value);
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '5px',
        },
      }}
      icon={<img src={CreateIcon} alt="Create Icon" />}
      onClose={onClose}
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      rightIconCss={{
        marginRight: '1rem',
        marginTop: '1rem',
        alignSelf: 'flex-start',
      }}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {'Cancel'}
          </Button>
          <LoadingButton
            color="primary"
            onClick={handleSubmit(onSubmit)}
            fullWidth
            sx={{ height: 46 }}
            type="submit"
            loading={loading}
          >
            {'Invite'}
          </LoadingButton>
        </>
      }
      dialogCss={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
      dialogContent={
        <BoxContainer>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Invite Member
            </Typography>
            <Typography variant="body1">
              Enter <strong>Name</strong> and <strong>MarkAny Email</strong> to invite your team member.
            </Typography>
          </Box>

          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: '1em' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: 'var(--gray-700)',
                }}
              >
                Name*
              </Typography>
              <Controller
                name="accountName"
                control={control}
                render={({ field }) => (
                  <Input
                    fullWidth
                    style={{ color: 'var(--gray-700)' }}
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    errorMessage={
                      errors.accountName?.message
                    }
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: '1em' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: 'var(--gray-700)',
                }}
              >
                Email*
              </Typography>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    fullWidth
                    style={{
                      color: 'var(--gray-700)',
                    }}
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    errorMessage={
                      errors.email?.message
                    }
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: '2em' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: 'var(--gray-700)',
                }}
              >
                Role*
              </Typography>
              <Controller
                name="roles"
                control={control}
                render={({ field }) => (
                  <Select
                    sx={{ height: '40px' }}
                    fullWidth
                    value={defaultValue}
                    onChange={(event) => handleRoleChange(event, field)}
                  >
                    {roleOptions.map((role) => (
                      <MenuItem key={role.value} value={role.value}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.roles && (
                <Typography variant="body2" color="error">
                  {errors.roles.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ mb: '1em' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: 'var(--gray-700)',
                }}
              >
                Timezone*
              </Typography>
              <Controller
                name="zoneId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={timeZoneOptions}
                    defaultValue={currentTimezone}
                    onChange={(event, newValue) => {
                      return field.onChange(newValue?.value);
                    }}
                    showErrorMsg={true}
                    filterOptions={filterOptions}
                    ListboxProps={{
                      style: {
                        maxHeight: '240px',
                      },
                    }}
                    placeholder="Search City"
                  />
                )}
              />
            </Box>
          </FormContainer>
        </BoxContainer>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default CsApiBoAddUserDialog;
