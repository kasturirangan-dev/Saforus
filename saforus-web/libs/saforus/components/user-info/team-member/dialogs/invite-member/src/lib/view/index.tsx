import React from 'react';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import User from '../assets/user.svg';
import {
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '@web-workspace/shared/components/widgets/input';
import Button from '@web-workspace/shared/components/widgets/button';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import { UserRole } from '@web-workspace/saforus/common/model';
import { Member } from '@web-workspace/shared/hooks/use-auth';

type InviteMemberDialogViewProps = {
  onClose: () => void;
  register: UseFormRegister<Partial<Member>>;
  handleSubmit: UseFormHandleSubmit<Partial<Member>>;
  errors: FieldErrors<Partial<Member>>;
  onSubmit: (data: Partial<Member>) => void;
  loading: boolean;
  control: any;
};

const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;



const InviteMemberDialogView: React.FC<InviteMemberDialogViewProps> = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  onClose,
  control,
  loading,
}) => {
  const { t } = useTranslation();

  const ROLES = [
    {
      label: t('team-member.role.member'),
      value: UserRole.TEAM_EDITOR,
    },
    {
      label: t('team-member.role.viewer'),
      value: UserRole.TEAM_VIEWER,
    },
  ];

  return (
    <Dialog
      icon={
        <img
          src={User}
          alt="SaForus Logo"
          title="Create Team"
          width="32"
          height="32"
          loading="lazy"
        />
      }
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      title={`${t('team-member.dialog.invite-member-title')}`}
      subtitle={t('team-member.dialog.invite-member-description')}
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('button.cancel')}
          </Button>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            fullWidth
            sx={{ height: 46 }}
            loading={loading}
            type="submit"
          >
            {t('button.invite')}
          </LoadingButton>
        </>
      }
      dialogContent={
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={`${t('team-member.invite-member.name')}*`}
            placeholder={`${t('team-member.invite-member.name-placeholder')}`}
            {...register('fullName')}
            errorMessage={errors.fullName?.message}
          />
          <Input
            inputStyle={{ height: 'auto' }}
            label={`${t('team-member.invite-member.email')}*`}
            placeholder={`${t('team-member.invite-member.email-placeholder')}`}
            {...register('emailAddress')}
            errorMessage={errors.emailAddress?.message}
          />
          <Controller
            name="userRole"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                title={`${t('team-member.invite-member.role')}*`}
                options={ROLES as any}
                placeholder={`${t(
                  'team-member.invite-member.role-placeholder'
                )}`}
                onChange={(event, newValue) =>
                  field.onChange(newValue?.value || 0)
                }
                errorMessage={
                  errors.userRole?.message &&
                  (t(`${errors.userRole?.message}`) as string)
                }
              />
            )}
          />
        </FormContainer>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    ></Dialog>
  );
};

export default InviteMemberDialogView;
