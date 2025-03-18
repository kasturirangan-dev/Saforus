import { Box, FormControl, InputBase, styled, Typography } from '@mui/material';
import DatePicker from '@web-workspace/shared/components/widgets/date-picker';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import { useSnapshot } from 'valtio';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { Controller } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import CommonStore from '@web-workspace/saforus-bo/common/data';
import { useWatermarkingSearchData } from './data';
import { WatermarkingOrdersStore } from '@web-workspace/saforus-bo/components/order-management/watermarking-orders/data';
import Input from '@web-workspace/shared/components/widgets/input';

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

function WatermarkingOrdersSearchView() {
  const { t } = useTranslation();
  const { handleSubmit, onSubmit, control } = useWatermarkingSearchData();
  const { searchQuery } = useSnapshot(WatermarkingOrdersStore);

  const {
    orderStatusTypeList: status,
    formatTypeList: formats,
    contentTypeList: contentTypes,
    serviceTypeList: serviceTypes,
  } = useSnapshot(CommonStore);

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}
      >
        <Typography variant="h5">
          {t('orderManagement.watermarking-orders.title')}
        </Typography>
        <FormControl>
          <Controller
            name={'orderNo'}
            control={control}
            render={({ field }) => (
              <Box
                sx={{
                  display: 'flex',
                  width: '25vw',
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
                    'orderManagement.watermarking-orders.order-no'
                  )}`}
                  inputProps={{ 'aria-label': 'Order No' }}
                  {...field}
                />
                <LoadingButton
                  // loading={loading}
                  type="button"
                  onClick={() => onSubmit()}
                  sx={{
                    my: '2.3rem',
                    py: '0.5rem',
                    ml: '-1rem',
                    borderRadius: '100px',
                  }}
                >
                  {t('orderManagement.button.search')}
                </LoadingButton>
              </Box>
            )}
          />
        </FormControl>
      </Box>
      <Box
        sx={{
          marginTop: '2rem',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          background: 'var(--base-white)',
        }}
      >
        <Typography variant="h6" color={'var(--gray-900)'}>
          {t('orderManagement.watermarking-orders.search-orders')}
        </Typography>

        <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
                flexDirection: 'column',
              }}
            >
              <Controller
                name="serviceType"
                control={control}
                // defaultValue={searchQuery.serviceType}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    disabled
                    readOnly
                    title={t('orderManagement.service-type')}
                    options={serviceTypes}
                    defaultValue={
                      serviceTypes.find(
                        (el) => `${el.value}` === `${searchQuery?.serviceType}`
                      ) || serviceTypes[1]
                    }
                    value={field.value}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    inputStyle={{
                      width: '20rem',
                    }}
                    onChange={(event, newValue) =>
                      field.onChange(newValue?.value || 1)
                    }
                  />
                )}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  columnGap: '2rem',
                }}
              >
                <Controller
                  name="orderRequestStatus"
                  control={control}
                  // defaultValue={searchQuery.orderRequestStatus}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      title={t('orderManagement.status')}
                      options={status}
                      defaultValue={
                        status.find(
                          (el) =>
                            `${el.value}` ===
                            `${searchQuery?.orderRequestStatus}`
                        ) || status[0]
                      }
                      value={field.value}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      inputStyle={{
                        width: '100%',
                      }}
                      onChange={(event, newValue) =>
                        field.onChange(newValue?.value)
                      }
                    />
                  )}
                />
                <Controller
                  name="contentType"
                  control={control}
                  // defaultValue={searchQuery.contentType}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      title={t('orderManagement.content-type')}
                      options={contentTypes}
                      defaultValue={
                        contentTypes.find(
                          (el) =>
                            `${el.value}` === `${searchQuery?.contentType}`
                        ) || contentTypes[0]
                      }
                      value={field.value}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      inputStyle={{
                        width: '100%',
                      }}
                      onChange={(event, newValue) =>
                        field.onChange(newValue?.value)
                      }
                    />
                  )}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Controller
                name="emailIdOrName"
                control={control}
                render={({ field }) => (
                  //
                  <Input
                    fullWidth
                    style={{ width: '56%', marginTop: '0.5rem' }}
                    label={`${t('orderManagement.requestor')}`}
                    placeholder={`Enter email or name`}
                    {...field}
                  />
                )}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  columnGap: '2rem',
                }}
              >
                <Controller
                  name="format"
                  control={control}
                  // defaultValue={searchQuery.format}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      title={t('orderManagement.format')}
                      options={formats}
                      defaultValue={
                        formats.find(
                          (el) => `${el.value}` === `${searchQuery?.format}`
                        ) || formats[0]
                      }
                      value={field.value}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      inputStyle={{
                        flex: 0.5,
                        width: '100%',
                      }}
                      onChange={(event, newValue) => {
                        field.onChange(newValue?.value);
                      }}
                    />
                  )}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    flex: 1,
                  }}
                >
                  <Label sx={{ fontWeight: 500 }}>
                    {t('orderManagement.requested-date')}
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
                      defaultValue={searchQuery.startDate}
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
                        px: '1rem',
                      }}
                    >
                      ~
                    </Typography>
                    <Controller
                      name="endDate"
                      control={control}
                      defaultValue={searchQuery.endDate}
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
                  onClick={() => onSubmit()}
                  type="submit"
                  sx={{
                    my: '2.3rem',
                    py: '0.5rem',
                    ml: '-1rem',
                  }}
                >
                  {t('orderManagement.button.search')}
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </FormContainer>
      </Box>
    </Box>
  );
}

export default WatermarkingOrdersSearchView;
