import { Box, Card, styled, Typography } from '@mui/material';

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
import { SearchMemberValues } from '@web-workspace/saforus/components/user-info/team-member/data';
import { TOption } from '@web-workspace/saforus/common/model';
import CommonStore from '@web-workspace/saforus/common/data';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';
import { addMinutes, subMinutes } from 'date-fns';

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

type ViewSearchProps = {
  register: UseFormRegister<Partial<SearchMemberValues>>;
  handleSubmit: UseFormHandleSubmit<Partial<SearchMemberValues>>;
  setValue: UseFormSetValue<Partial<SearchMemberValues>>;
  values: Partial<SearchMemberValues>;
  errors: FieldErrors<Partial<SearchMemberValues>>;
  onSubmit: (data: Partial<SearchMemberValues>) => void;
  loading: boolean;
  control: Control<Partial<SearchMemberValues>>;
};

function MemberSearchView({
  handleSubmit,
  onSubmit,
  loading,
  register,
  setValue,
  values,
  control,
}: ViewSearchProps) {
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const { userRoleList: userRoles, userTeamStatusList: teamStatus } =
    useSnapshot(CommonStore);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        background: '#FFFFFF',
        borderRadius: '8px',
        flex: 'none',
        order: 0,
        padding: '1.5rem 1.5rem 0 1.5rem',
      }}
    >
      <Typography
        sx={{
          fontWeight: '600',
          mb: '1rem',
          fontSize: '28px',
          lineHeight: '38px',
        }}
      >
        {t('team-member.team-member-info.search-member')}
      </Typography>

      <FormContainer>
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
              justifyContent: 'space-between',
              columnGap: '1rem',
            }}
          >
            {teamStatus.length > 0 && (
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={`${t('team-member.team-member-info.status')}`}
                    options={teamStatus as TOption[]}
                    // Use the value prop instead of the defaultValue prop
                    defaultValue={teamStatus.find(
                      (el) => `${el.value}` === field.value
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    inputStyle={{
                      width: 200,
                    }}
                    onChange={(event, newValue) =>
                      field.onChange(newValue?.value || 'ALL')
                    }
                  />
                )}
              />
            )}
            {userRoles.length > 0 && (
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    title={`${t('team-member.team-member-info.role')}`}
                    options={userRoles as TOption[]}
                    // Use the value prop instead of the defaultValue prop
                    defaultValue={userRoles.find(
                      (el) => `${el.value}` === field.value
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    inputStyle={{
                      width: 200,
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
              }}
            >
              <Label sx={{ fontWeight: 500 }}>
                {t('team-member.team-member-info.date')}
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
                          field.onChange(subMinutes(date, tzOffset));
                        } else {
                          field.onChange(null);
                        }
                      }}
                      value={
                        field.value
                          ? addMinutes(new Date(field.value), tzOffset)
                          : null
                      }
                      sx={{
                        width: 200,
                      }}
                    />
                  )}
                />

                <Typography
                  sx={{
                    pt: '0.5rem',
                    px: '0.5rem',
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
                          field.onChange(subMinutes(date, tzOffset));
                        } else {
                          field.onChange(null);
                        }
                      }}
                      value={
                        field.value
                          ? addMinutes(new Date(field.value), tzOffset)
                          : null
                      }
                      sx={{
                        width: 200,
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
            <LoadingButton
              loading={loading}
              type="button"
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
              sx={{
                my: '2.3rem',
                py: '0.5rem',
              }}
            >
              {t('button.search')}
            </LoadingButton>
          </Box>
        </Box>
      </FormContainer>
    </Card>
  );
}

export default memo(MemberSearchView);
