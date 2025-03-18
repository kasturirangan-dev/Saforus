import React, { useMemo, useState } from 'react';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import {
  Avatar,
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  createFilterOptions,
  styled,
} from '@mui/material';
import Icon from '@web-workspace/shared/components/widgets/icon';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import { Controller } from 'react-hook-form';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TimeZones } from '@web-workspace/api-bo/components/admin-dashboard/data';
import { getLocalTimeZone, formatedTimezone } from '@web-workspace/shared/helpers/dates';
import { TOption } from '@web-workspace/api-bo/common/model';
import useCreateUserData from './data';
import EditIcon from './assets/edit.svg';

const BoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}));


const DialogFooter = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

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

  const roleOptions = [
    { value: 'FREE', label: 'Free' },
    { value: 'BASIC', label: 'Basic' },
    { value: 'PROFESSIONAL', label: 'Professional' },
    { value: 'ENTERPRISE', label: 'Enterprise' }
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

  const handleTierChange = (event, field) => {
    const value = event.target.value;
    setDefaultValue(value);
    field.onChange(value);
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          minWidth: '900px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '5px',
        },
      }}
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
        <DialogFooter>
          <Button
            onClick={onClose}
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {'Cancel'}
          </Button>
          <LoadingButton
            color="primary"
            onClick={handleSubmit(onSubmit)}
            sx={{ height: 46 }}
            type="submit"
            loading={loading}
          >
            {'Invite'}
          </LoadingButton>
        </DialogFooter>
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
              px: '20px',
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Create Account
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="flex-end"
            gap={1}
            paddingX={20}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                cursor: 'pointer',
              }}
              imgProps={{ loading: 'lazy' }}
            >
              <Icon name={'avatar'} size={75} color="var(--base-white)" />
            </Avatar>
            <img
              style={{ cursor: 'pointer' }}
              src={EditIcon}
              alt="edit"
            />
          </Box>
          <FormContainer sx={{ px: 20 }} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ width: "90%", border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: 40 }}>
                <Box sx={{ width: '20%', backgroundColor: '#f5f5f5', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                  <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Name*</Typography>
                </Box>
                <Box sx={{ flexGrow: 1, paddingX: 2 }}>
                  <Controller
                    name="accountName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        variant="standard"
                        style={{ color: 'var(--gray-700)', width: '100%' }}
                        {...field}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        value={field.value ? String(field.value) : undefined}
                        sx={{ width: '200%' }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: "90%", border: '1px solid #e0e0e0', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: 40 }}>
                <Box sx={{ width: '20%', backgroundColor: '#f5f5f5', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                  <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Login Account*</Typography>
                </Box>
                <Box sx={{ paddingX: 2 }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        variant="standard"
                        {...field}
                        value={field.value ? String(field.value) : undefined}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        sx={{ width: '200%' }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: "90%", border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: 40 }}>
                <Box sx={{ width: '20%', backgroundColor: '#f5f5f5', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                  <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Company Name</Typography>
                </Box>
                <Box sx={{ paddingX: 2 }}>
                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        variant="standard"
                        {...field}
                        value={field.value ? String(field.value) : undefined}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        sx={{ width: '200%' }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: '1em', width: '300px' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: '18px',
                  color: 'var(--gray-700)',
                }}
              >
                Time Zone*
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
            </Box>{(errors.zoneId) && (
              <Typography variant="body2" color="error">
                {errors.zoneId.message}
              </Typography>
            )}
            <Box sx={{ width: '300px' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: '18px',
                  color: 'var(--gray-700)',
                }}
              >
                Service Plan*
              </Typography>
              <Controller
                name="subscriptionTier"
                control={control}
                render={({ field }) => (
                  <Select
                    sx={{ height: '40px' }}
                    fullWidth
                    value={defaultValue}
                    onChange={(event) => handleTierChange(event, field)}
                  >
                    {roleOptions.map((role) => (
                      <MenuItem key={role.value} value={role.value}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

            </Box>
          </FormContainer>
        </BoxContainer >
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default CsApiBoAddUserDialog;
