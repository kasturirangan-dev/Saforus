import { Box, Typography } from '@mui/material';
import { AccountAndTeamInformation } from './view/account-and-team-information';
import { EmailSubscription } from './view/email-subscription';
import { LanguageAndRegion } from './view/language-and-region';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { UpdateUserInformationRequest } from '@web-workspace/saforus-bo/components/user-management/search-user/data';
import Button from '@web-workspace/shared/components/widgets/button';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface ComponentsUserDetailProps {
  register: UseFormRegister<Partial<UpdateUserInformationRequest>>;
  control: Control<Partial<UpdateUserInformationRequest>>;
  watch: UseFormWatch<Partial<UpdateUserInformationRequest>>;
  getValues: UseFormGetValues<Partial<UpdateUserInformationRequest>>;
  setValue: UseFormSetValue<Partial<UpdateUserInformationRequest>>;
  onSubmit: () => void;
}

export function ComponentsUserDetail(props: ComponentsUserDetailProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <AccountAndTeamInformation
        register={props.register}
        getValues={props.getValues}
        watch={props.watch}
        onSubmit={props.onSubmit}
        control={props.control}
        setValue={props.setValue}
      />
      <EmailSubscription
        register={props.register}
        onSubmit={props.onSubmit}
        control={props.control}
      />
      <LanguageAndRegion onSubmit={props.onSubmit} control={props.control} />
      <Box
        sx={{
          display: 'flex',
          padding: '1.5rem',
          flexDirection: 'column',
          gap: '1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--neutral-700)',
          background: 'var(--base-white)',
        }}
      >
        <Typography variant="h6">
          {t('userManagement.search-user.user-detail.order-history')}
        </Typography>
        <Button
          color="secondary"
          sx={{ height: 'fit-content', width: 'fit-content' }}
          // onClick={}
        >
          {t('userManagement.search-user.user-detail.button.view-orders')}
        </Button>
      </Box>
    </Box>
  );
}

export default ComponentsUserDetail;
