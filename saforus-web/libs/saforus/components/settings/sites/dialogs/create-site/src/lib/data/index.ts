import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  QUERY_KEY,
  SettingSiteStore,
  Site,
  SiteValidation,
  ValidationSchema,
} from '@web-workspace/saforus/components/settings/sites/data';
import { useSnapshot } from 'valtio';
import { useMutation, useQueryClient } from 'react-query';
import React from 'react';

const useCreateSiteDialogData = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const snap = useSnapshot(SettingSiteStore);
  const queryClient = useQueryClient();

  const createSiteMutation = useMutation(
    (newSite: Partial<Site>) => snap.createSite(newSite),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.SITES_LIST);
        onClose();
      },
    }
  );

  const {
    mutateAsync: createSite,
    isLoading: loading,
    error,
  } = createSiteMutation;

  // Yup schema for validation
  const siteDialogValidationSchema: ValidationSchema<SiteValidation> = {
    siteName: string().required(t('error-message.required')),
    siteUrl: string().url(t('settings-pages.error-message.url-invalid')),
  };
  const validationSchema = object().shape(siteDialogValidationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Site>>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: Partial<Site>) => {
    await createSite(data);
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

export default useCreateSiteDialogData;
