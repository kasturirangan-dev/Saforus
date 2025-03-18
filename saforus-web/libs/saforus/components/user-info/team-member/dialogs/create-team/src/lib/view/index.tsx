import React from 'react';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import UserIcon from '../assets/user-circle.svg';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '@web-workspace/shared/components/widgets/input';
import Button from '@web-workspace/shared/components/widgets/button';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { styled } from '@mui/material';
import { Team } from '@web-workspace/shared/hooks/use-auth';

type CreateTeamDialogViewProps = {
  onClose: () => void;
  register: UseFormRegister<Partial<Team>>;
  handleSubmit: UseFormHandleSubmit<Partial<Team>>;
  errors: FieldErrors<Partial<Team>>;
  onSubmit: (data: Partial<Team>) => void;
  loading: boolean;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CreateTeamDialogView: React.FC<CreateTeamDialogViewProps> = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  onClose,
  loading,
  handleKeyPress,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      icon={
        <img
          src={UserIcon}
          alt="team"
          title="Create Team"
          width="32"
          height="32"
          loading="lazy"
        />
      }
      title={`${t('team-member.dialog.create-team-title')}`}
      subtitle={t('team-member.dialog.create-team-description')}
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('team-member.button.cancel')}
          </Button>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            fullWidth
            sx={{ height: 46 }}
            loading={loading}
            type="submit"
          >
            {t('team-member.button.continue')}
          </LoadingButton>
        </>
      }
      dialogContent={
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={`${t('team-member.create-team.team-name')}*`}
            placeholder={`${t(
              'team-member.create-team.team-name-placeholder'
            )}`}
            {...register('name')}
            errorMessage={errors.name?.message}
            onKeyUp={handleKeyPress}
          />
          <Input
            inputStyle={{ height: 'auto' }}
            multiline
            rows={4}
            label={`${t('team-member.create-team.team-description')}`}
            placeholder={`${t(
              'team-member.create-team.team-description-placeholder'
            )}`}
            {...register('description')}
            errorMessage={errors.description?.message}
            onKeyUp={handleKeyPress}
          />
        </FormContainer>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    ></Dialog>
  );
};

export default CreateTeamDialogView;
