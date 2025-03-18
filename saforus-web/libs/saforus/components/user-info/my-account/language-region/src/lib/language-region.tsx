import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRegisterData } from './data';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import { TOption } from '@web-workspace/saforus/common/model';
import { useSnapshot } from 'valtio';
import MyAccountStore from '@web-workspace/saforus/components/user-info/my-account/data';
import { Controller } from 'react-hook-form';
import { pxToVw } from '@web-workspace/saforus/common/utils';

export function LanguageRegion({ onInfoChange }: any) {
  const { t } = useTranslation();
  const { timeZones = [], languages = [], control } = useRegisterData();
  const { loginInformation } = useSnapshot(MyAccountStore);
  const FormContainer = styled('form')``;
  return (
    <Box
      sx={{
        width: '50%',
        display: 'flex',
        gap: pxToVw('1.5rem'),
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 0, marginTop: pxToVw('0.5rem') }}>
        {t('myaccount.language-and-region.title')}
      </Typography>

      <Box>
        <FormContainer>
          <Controller
            name="languageCode"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                title={t('myaccount.language-and-region.language')}
                options={(languages as TOption[]) || []}
                defaultValue={languages.find(
                  (el) => el.value === loginInformation?.languageCode
                )}
                inputStyle={{
                  width: pxToVw('280px'),
                }}
                onChange={(event, newValue) => {
                  onInfoChange('language', newValue);
                  return field.onChange(newValue?.value || 0);
                }}
              />
            )}
          />

          <Controller
            name="timeZone"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                title={t('myaccount.language-and-region.time-zone')}
                options={(timeZones as TOption[]) || []}
                defaultValue={
                  timeZones.find(
                    (el: TOption) => el.label === loginInformation?.timeZoneName
                  ) ??
                  timeZones.find(
                    (el: TOption) => el.value === loginInformation?.timeZone
                  )
                }
                inputStyle={{
                  width: pxToVw('280px'),
                }}
                onChange={(event, newValue) => {
                  onInfoChange('timeZone', newValue);
                  return field.onChange(newValue || 0);
                }}
              />
            )}
          />
        </FormContainer>
      </Box>
    </Box>
  );
}

export default LanguageRegion;
