import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import MyAccountStore, {
  getFieldRegisterTeamInfo,
  TeamInformationType,
} from '@web-workspace/saforus/components/user-info/my-account/data';
import { Box, styled, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { formFields, validationSchema } from './data';
import InputToggle from '@web-workspace/shared/components/widgets/input-toggle';
import ArrowIcon from './assets/arrow.svg';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import UseSubscription from '@web-workspace/shared/hooks/use-subscription';

const FormContainer = styled('form')`
  position: relative;
`;

export function TeamInformation() {
  const { t } = useTranslation();
  const { loginInformation } = useSnapshot(MyAccountStore);

  const { subscriptionPlanDetail } = useSnapshot(UseSubscription);

  const teamMemberUrl = `${ROUTES.USER_INFO.TEAM.path}`;

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    getValues,
    setValue,
    trigger,
  } = useForm<TeamInformationType>({
    defaultValues: {},
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async () => {
    const isFormValid = await trigger();

    if (isFormValid) {
      const formData = getValues();
      mutation.mutate(formData);

      if (mutation.error) {
        console.error(mutation.error);
      }
    }
  };

  const renderCustomFormControl = (fieldName: string, isEditing: boolean) => {
    return null;
  };

  useEffect(() => {
    Object.entries(loginInformation).forEach(([key, value]) => {
      setValue(key as keyof TeamInformationType, value);
    });
  }, [loginInformation]);

  return (
    <Box width={{ xs: '100%', lg: '70%', xl: '50%' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ marginBottom: 0, marginTop: '0.5rem' }}>
          {t('myaccount.team-information.title')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src={ArrowIcon} />
          <Link
            to={teamMemberUrl}
            style={{
              color: 'var(--purple-500)',
              fontSize: '1rem',
              fontWeight: '600',
              lineHeight: '22px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Team & Members
          </Link>
        </Box>
      </Box>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field) => {
          if (field.name === 'subscriptionPlanName') {
            return (
              <InputToggle
                key={field.name}
                {...getFieldRegisterTeamInfo(register, field.name)}
                value={
                  subscriptionPlanDetail &&
                  loginInformation.userRole !== 'PRIVATE_USER'
                    ? subscriptionPlanDetail.title
                    : '--'
                }
                errorMessage={errors[field.name]?.message}
                label={`${t(field.label)}`}
                labelStyle={{ minWidth: 230 }}
                controlCss={{ background: 'var(--base-white)' }}
                disableActions={true}
                editModeFromParent={false}
              />
            );
          }
          return (
            <InputToggle
              key={field.name}
              {...getFieldRegisterTeamInfo(register, field.name)}
              value={
                loginInformation.userRole !== 'PRIVATE_USER'
                  ? loginInformation[field.name]
                  : '--'
              }
              errorMessage={errors[field.name]?.message}
              label={`${t(field.label)}`}
              labelStyle={{ minWidth: 230 }}
              controlCss={{ background: 'var(--base-white)' }}
              disableActions={true}
              editModeFromParent={false}
              limitedChars={field.name === 'teamOwnerName' ? 20 : undefined}
            />
          );
        })}
      </FormContainer>
    </Box>
  );
}

export default TeamInformation;
