import { Box, Button, Card, styled, Typography } from '@mui/material';
import DatePicker from '@web-workspace/shared/components/widgets/date-picker';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import { useSnapshot } from 'valtio';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import {
  MyInquiriesStore,
  RequestMyInquiries,
} from '@web-workspace/saforus/components/help/data';
import { TOption } from '@web-workspace/saforus-bo/common/model';
import CommonStore from '@web-workspace/saforus-bo/common/data';

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
  register: UseFormRegister<Partial<RequestMyInquiries>>;
  handleSubmit: UseFormHandleSubmit<Partial<RequestMyInquiries>>;
  setValue: UseFormSetValue<Partial<RequestMyInquiries>>;
  values: Partial<RequestMyInquiries>;
  errors: FieldErrors<Partial<RequestMyInquiries>>;
  onSubmit: (data: Partial<RequestMyInquiries>) => void;
  loading: boolean;
  control: Control<Partial<RequestMyInquiries>>;
};

// ... (same import statements as before)

function InquirySearchFilterView({
  handleSubmit,
  onSubmit,
  loading,
  register,
  setValue,
  values,
  control,
}: ViewOrderSearchProps) {
  const { t } = useTranslation();
  const {
    inquiryTypeList: categories,
    inquiryStatusList: status,
    adminList,
  } = useSnapshot(CommonStore);

  const { searchQuery } = useSnapshot(MyInquiriesStore);

  return (
    <Card
      sx={{
        padding: 6,
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          textTransform: 'none',
        }}
      >
        <Typography variant="h6" color={'var(--gray-900)'}>
          {t('boInquiry.search.title')}
        </Typography>
        <Button
          sx={{
            textTransform: 'none',
          }}
          variant="outlined"
        >
          {t('boInquiry.search.createForm')}
        </Button>
      </Box>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'flex',
            columnGap: '2rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              pt: '1rem',
              justifyContent: 'space-between',
              columnGap: '2rem',
            }}
          >
            {categories.length > 0 && (
              <Controller
                name="qaCategory"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={`${t('boInquiry.search.category')}`}
                    options={categories as TOption[]}
                    defaultValue={
                      categories.find(
                        (el) => `${el.value}` === `${searchQuery?.qaCategory}`
                      ) || categories[0]
                    }
                    inputStyle={{
                      width: '15rem',
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
                name="qaStatus"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={`${t('boInquiry.search.status')}`}
                    value={searchQuery.qaStatus}
                    options={status as TOption[]}
                    defaultValue={
                      status.find(
                        (el) => `${el.value}` === `${searchQuery?.qaStatus}`
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
            {adminList.length > 0 && (
              <Controller
                name="adminId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={`${t('boInquiry.search.replier')}`}
                    options={adminList as TOption[]}
                    defaultValue={
                      adminList.find(
                        (el) => `${el.value}` === `${searchQuery?.adminId}`
                      ) || adminList[0]
                    }
                    inputStyle={{
                      width: '15rem',
                    }}
                    onChange={(event, newValue) =>
                      field.onChange(newValue?.value || 'ALL')
                    }
                  />
                )}
              />
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                flex: 1,
              }}
            >
              <Label sx={{ fontWeight: 500 }}>
                {t('boInquiry.search.dates')}
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
                        width: '11rem',
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
                        width: '11rem',
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
            <LoadingButton
              loading={loading}
              type="submit"
              sx={{
                my: '2.3rem',
                py: '0.5rem',
                ml: '-1rem',
              }}
            >
              {t('boInquiry.search.button')}
            </LoadingButton>
          </Box>
        </Box>
      </FormContainer>
    </Card>
  );
}

export default memo(InquirySearchFilterView);
