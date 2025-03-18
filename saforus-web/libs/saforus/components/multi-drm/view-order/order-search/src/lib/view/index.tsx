import { Box, Card, styled, Typography } from '@mui/material';
import { TOption } from '@web-workspace/saforus/components/forensic-watermarking/view-order/data';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import DatePicker from '@web-workspace/shared/components/widgets/date-picker';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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

// ... (same import statements as before)

function OrderSearchView() {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm();
  // const { serviceTypes, status, requesters, formats, contentTypes } =
  //   useSnapshot(ViewOrderStore);

  const serviceTypes: TOption[] = [
    { label: 'Option 1', value: 'value1' },
    { label: 'Option 2', value: 'value2' },
    { label: 'Option 3', value: 'value3' },
  ];

  const status: TOption[] = [
    { label: 'Status 1', value: 'status1' },
    { label: 'Status 2', value: 'status2' },
    { label: 'Status 3', value: 'status3' },
  ];

  const requesters: TOption[] = [
    { label: 'Requester 1', value: 'requester1' },
    { label: 'Requester 2', value: 'requester2' },
    { label: 'Requester 3', value: 'requester3' },
  ];

  const formats: TOption[] = [
    { label: 'Format 1', value: 'format1' },
    { label: 'Format 2', value: 'format2' },
    { label: 'Format 3', value: 'format3' },
  ];

  const contentTypes: TOption[] = [
    { label: 'Content Type 1', value: 'contentType1' },
    { label: 'Content Type 2', value: 'contentType2' },
    { label: 'Content Type 3', value: 'contentType3' },
  ];
  const packingOptions: TOption[] = [
    { label: 'Packing Options 1', value: 'contentType1' },
    { label: 'Packing Options 2', value: 'contentType2' },
    { label: 'Packing Options 3', value: 'contentType3' },
  ];
  return (
    <Card
      sx={{
        padding: 6,
        borderRadius: '8px',
        marginTop: '2rem',
      }}
    >
      <Typography variant="h6" color={'var(--gray-900)'}>
        {t('view-order.search.title')}
      </Typography>

      <FormContainer>
        <Box
          sx={{
            display: 'flex',
            columnGap: '1rem',
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
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  title={t('view-order.search.service-type')}
                  options={serviceTypes as TOption[]}
                  inputStyle={{
                    width: '25rem',
                  }}
                  onChange={(event, newValue) =>
                    field.onChange(newValue?.value || 0)
                  }
                />
              )}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '1rem',
                pt: '1rem',
              }}
            >
              <Controller
                name="orderStatus"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={t('view-order.search.status')}
                    options={status as TOption[]}
                    inputStyle={{
                      width: '100%',
                    }}
                    onChange={(event, newValue) =>
                      field.onChange(newValue?.value || 0)
                    }
                  />
                )}
              />

              <Controller
                name="contentType"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={t('view-order.search.content-type')}
                    options={contentTypes as TOption[]}
                    inputStyle={{
                      width: '100%',
                    }}
                    onChange={(event, newValue) =>
                      field.onChange(newValue?.value || 'ALL')
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '2rem',
              }}
            >
              <Controller
                name="requesterId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={`${t('view-order.search.requester')}`}
                    options={requesters as TOption[]}
                    inputStyle={{
                      width: '25rem',
                    }}
                    onChange={(event, newValue) => {
                      field.onChange(newValue?.value || 0);
                    }}
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                pt: '1rem',
                justifyContent: 'space-between',
                columnGap: '1rem',
              }}
            >
              <Controller
                name="format"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={t('view-order.search.format')}
                    options={formats as TOption[]}
                    inputStyle={{
                      flex: 0.5,
                      width: '12rem',
                    }}
                    onChange={(event, newValue) => {
                      field.onChange(newValue?.value || 0);
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
                  {t('view-order.search.requested-date')}
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
                          width: '12rem',
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '2rem',
              }}
            >
              <Controller
                name="packing"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={t('view-order.search.packaging-option')}
                    options={packingOptions as TOption[]}
                    inputStyle={{
                      width: '25rem',
                    }}
                    onChange={(event, newValue) =>
                      field.onChange(newValue?.value || 0)
                    }
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                pt: '1rem',
                columnGap: '1rem',
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
                  {t('view-order.search.requested-date')}
                </Label>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative',
                    gap: '1rem',
                  }}
                >
                  <Typography
                    sx={{
                      pt: '0.5rem',
                      px: '1rem',
                      position: 'absolute',
                      left: '-1.75rem',
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
                          width: '12rem',
                        }}
                      />
                    )}
                  />
                  <LoadingButton
                    type="submit"
                    sx={{
                      my: '0',
                    }}
                  >
                    {t('button.search')}
                  </LoadingButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </FormContainer>
    </Card>
  );
}

export default memo(OrderSearchView);
