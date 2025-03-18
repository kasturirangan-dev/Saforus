import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { useMutation, useQueryClient } from 'react-query';
import React from 'react';
import { CreateTeamValidation, QUERY_KEY, TeamValidationSchema, UserTeamStore } from '@web-workspace/saforus/components/user-info/team-member/data';
import { PATTERN } from '@web-workspace/saforus/constants/validation';
import { Team } from '@web-workspace/shared/hooks/use-auth';

const useCreateTeamDialogData = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const snap = useSnapshot(UserTeamStore);
  const queryClient = useQueryClient();

  const createTeamMutation = useMutation(
    (newTeam: Partial<Team>) => snap.createTeam(newTeam),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.TEAMS);
        onClose();
      },
    }
  );

  const {
    mutateAsync: createTeam,
    isLoading: loading,
    error,
  } = createTeamMutation;

  const CreateTeamValidationSchema: TeamValidationSchema<CreateTeamValidation> = {
    name: string()
      .required(`${t('error-message.team-name-required')}`)
      .matches(PATTERN.COMPANY_NAME, `${t('error-message.name-special-allowed')}`)
      .max(50, `${t('error-message.max-length-50')}`)
      .matches(PATTERN.NOT_SPACE_START, `${t('error-message.name-not-start-space')}`),
    description: string().optional().max(500, `${t('error-message.max-length-500')}`)
  };
  const validationSchema = object().shape(CreateTeamValidationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Team>>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: Partial<Team>) => {
    await createTeam(data);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
    handleKeyPress,
    error,
  };
};

export default useCreateTeamDialogData;
