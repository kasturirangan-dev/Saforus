import {
  Box,
  Card,
  FormControl,
  InputBase,
  styled,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TOption } from '@web-workspace/saforus-bo/common/model';
import DatePicker from '@web-workspace/shared/components/widgets/date-picker';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import { useSnapshot } from 'valtio';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import Button from '@web-workspace/shared/components/widgets/button';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import {
  AdminUserManagementStore,
  RequestAdminUser,
} from '@web-workspace/saforus-bo/components/settings/admin-user-management/data';
import UserIcon from '../assets/user.svg';

const Label = styled('label')({
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  textAlign: 'left',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '20px',
  display: 'block',
});

const FormContainer = styled('form')``;

type ViewOrderSearchProps = {
  register: UseFormRegister<Partial<RequestAdminUser>>;
  handleSubmit: UseFormHandleSubmit<Partial<RequestAdminUser>>;
  setValue: UseFormSetValue<Partial<RequestAdminUser>>;
  values: Partial<RequestAdminUser>;
  errors: FieldErrors<Partial<RequestAdminUser>>;
  onSubmit: () => void;
  loading: boolean;
  control: Control<Partial<RequestAdminUser>>;
};

function AdminUserSearchView({
  handleSubmit,
  onSubmit,
  loading,
  register,
  setValue,
  values,
  control,
}: ViewOrderSearchProps) {
  const { t } = useTranslation();
  const { searchQuery, status, types } = useSnapshot(AdminUserManagementStore);

  const handleAddAdminUser = () => {
    dialogStore.openDialog({ name: DialogType.BoAddAdminUser });
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">
          {t('boSettings.admin-user-management.title')}
        </Typography>
        <FormControl>
          <Controller
            name={'nameOrEmail'}
            control={control}
            render={({ field }) => (
              <Box
                sx={{
                  display: 'flex',
                  width: '500px',
                  height: '56px',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '100px',
                  border: '1px solid var(--neutral-700, #DAE0E6)',
                  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.04)',
                  padding: '0.5rem 0.5rem 0.5rem 1rem',
                }}
              >
                <SearchIcon sx={{ width: '35px', color: 'var(--gray-25)' }} />
                <InputBase
                  sx={{
                    ml: 1, flex: 1, fontSize: '14px', '& input:-webkit-autofill': {
                      '-webkit-box-shadow': '0 0 0 1000px white inset', // Fix for Chrome autofill background blue color
                    }, }}
                  placeholder={`${t(
                    'boSettings.admin-user-management.input-search-placeholder'
                  )}`}
                  inputProps={{ 'aria-label': 'Order No' }}
                  {...field}
                />
                <LoadingButton
                  loading={loading}
                  type="button"
                  onClick={() => onSubmit()}
                  sx={{
                    my: '2.3rem',
                    py: '0.5rem',
                    ml: '-1rem',
                    borderRadius: '100px',
                  }}
                >
                  {t('button.search')}
                </LoadingButton>
              </Box>
            )}
          />
        </FormControl>
      </Box>
      <Card
        sx={{
          padding: 6,
          borderRadius: '8px',
          marginTop: '2rem',
        }}
      >
        <Box
          sx={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" color={'var(--gray-900)'}>
            {t('boSettings.admin-user-management.search-title')}
          </Typography>

          <Button
            onClick={handleAddAdminUser}
            color="secondary"
            startIcon={<img src={UserIcon} alt="" />}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '14px',
            }}
          >
            {t('boSettings.admin-user-management.add-admin-user')}
          </Button>
        </Box>

        <FormContainer>
          <Box
            sx={{
              display: 'flex',
              columnGap: '2rem',
              marginTop: '1rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '2rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  columnGap: '2rem',
                  pt: '1rem',
                }}
              >
                {types.length > 0 && (
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        title={`${t(
                          'boSettings.admin-user-management.user-type'
                        )}`}
                        options={types as TOption[]}
                        defaultValue={
                          types.find(
                            (el) => `${el.value}` === `${searchQuery?.role}`
                          ) || types[0]
                        }
                        inputStyle={{
                          width: '11rem',
                        }}
                        onChange={(event, newValue) =>
                          field.onChange(newValue?.value || 'ALL')
                        }
                      />
                    )}
                  />
                )}
                {status.length > 0 && (
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        title={`${t(
                          'boSettings.admin-user-management.status'
                        )}`}
                        options={status as TOption[]}
                        defaultValue={
                          status.find(
                            (el) => `${el.value}` === `${searchQuery?.status}`
                          ) || status[0]
                        }
                        inputStyle={{
                          width: '11rem',
                        }}
                        onChange={(event, newValue) =>
                          field.onChange(newValue?.value || 'ALL')
                        }
                      />
                    )}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  pt: '1rem',
                  justifyContent: 'space-between',
                  columnGap: '2rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    flex: 1,
                  }}
                >
                  <Label sx={{ fontWeight: 500 }}>
                    {t('boSettings.admin-user-management.joined-date')}
                  </Label>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Controller
                      name="startDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          onChange={(date) => {
                            if (date instanceof Date && !isNaN(date as any)) {
                              field.onChange(date);
                            } else {
                              field.onChange(null);
                            }
                          }}
                          value={field.value || null}
                          sx={{
                            width: '100%',
                          }}
                        />
                      )}
                    />

                    <Typography
                      sx={{
                        pt: '0.5rem',
                        px: '0.8rem',
                      }}
                    >
                      ~
                    </Typography>
                    <Controller
                      name="endDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          onChange={(date) => {
                            if (date instanceof Date && !isNaN(date as any)) {
                              field.onChange(date);
                            } else {
                              field.onChange(null);
                            }
                          }}
                          value={field.value || null}
                          sx={{
                            width: '100%',
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>
                <LoadingButton
                  loading={loading}
                  type="button"
                  onClick={() => onSubmit()}
                  sx={{
                    my: '2.3rem',
                    py: '0.5rem',
                    ml: '-1rem',
                  }}
                >
                  {t('button.search')}
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </FormContainer>
      </Card>
    </Box>
  );
}

export default memo(AdminUserSearchView);
