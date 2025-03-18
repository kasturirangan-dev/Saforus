import React from 'react';

import Dialog from '@web-workspace/shared/components/widgets/dialog';
import Logo from '../assets/logo.svg';
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
import { Site } from '@web-workspace/saforus/components/settings/sites/data';

type AddSiteDialogViewProps = {
  onClose: () => void;
  register: UseFormRegister<Partial<Site>>;
  handleSubmit: UseFormHandleSubmit<Partial<Site>>;
  errors: FieldErrors<Partial<Site>>;
  onSubmit: (data: Partial<Site>) => void;
  loading: boolean;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddSiteDialogView: React.FC<AddSiteDialogViewProps> = ({
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
          src={Logo}
          alt="SaForus Logo"
          title="Add Site"
          width="32"
          height="32"
          loading="lazy"
        />
      }
      title={t('settings-pages.create-site.title')}
      subtitle={t('settings-pages.create-site.subtitle')}
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
            {t('button.continue')}
          </LoadingButton>
        </>
      }
      dialogContent={
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={`${t('settings-pages.create-site.site-name')}*`}
            {...register('siteName')}
            errorMessage={errors.siteName?.message}
            onKeyUp={handleKeyPress}
          />
          <Input
            label={t('settings-pages.create-site.site-url')}
            placeholder="http://www.mystraming.com (optional)"
            {...register('siteUrl')}
            errorMessage={errors.siteUrl?.message}
            onKeyUp={handleKeyPress}
          />
        </FormContainer>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    ></Dialog>
  );
};

export default AddSiteDialogView;
