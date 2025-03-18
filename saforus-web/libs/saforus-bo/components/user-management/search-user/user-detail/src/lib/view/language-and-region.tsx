import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Control, Controller } from 'react-hook-form';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import { useSnapshot } from 'valtio';
import SearchUserStore, {
  UpdateUserInformationRequest,
} from '@web-workspace/saforus-bo/components/user-management/search-user/data';

export interface LanguageAndRegionProps {
  onSubmit: () => void;
  control: Control<Partial<UpdateUserInformationRequest>>;
}

export function LanguageAndRegion(props: LanguageAndRegionProps) {
  const { t } = useTranslation();
  const { userInformation, languageOptions, timezoneOptions } =
    useSnapshot(SearchUserStore);

  return (
    <Box
      sx={{
        padding: '1.5rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--neutral-700)',
        background: 'var(--base-white)',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 0, marginTop: '0.5rem' }}>
        {t('userManagement.search-user.user-detail.language-and-region')}
      </Typography>
      <Box>
        <form>
          <Controller
            name="languageCode"
            control={props.control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                title={t('userManagement.search-user.user-detail.language')}
                options={languageOptions}
                defaultValue={languageOptions.find(
                  (el) => el.value === userInformation?.languageCode
                )}
                inputStyle={{
                  width: '280px',
                }}
                onChange={(event, newValue) => {
                  field.onChange(newValue?.value || 0);
                  props.onSubmit()
                }}
              />
            )}
          />
          <Controller
            name="timeZone"
            control={props.control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                title={t('userManagement.search-user.user-detail.time-zone')}
                options={timezoneOptions}
                defaultValue={timezoneOptions.find(
                  (el) => el.value === userInformation?.timeZone
                )}
                inputStyle={{
                  width: '280px',
                }}
                onChange={(event, newValue) => {
                  field.onChange(newValue?.value || 0);
                  props.onSubmit()
                }}
              />
            )}
          />
        </form>
      </Box>
    </Box>
  );
}
