import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import {
  QUERY_KEY,
  SettingSiteStore,
  Site,
  SiteValidation,
  ValidationSchema,
} from '@web-workspace/saforus/components/settings/sites/data';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnapshot } from 'valtio';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';

const useSiteDetailData = ({ site }: { site: Site }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { openDialog } = useSnapshot(DialogStore);
  const { setCurrentSiteId } = useSnapshot(SettingSiteStore);

  const updateSiteOverviewMutation = useMutation(
    (updatedData: Partial<Site>) =>
      SettingSiteStore.updateSiteOverview(site.siteId, updatedData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.SITES_LIST);
      },
    }
  );

  // Yup schema for validation
  const siteValidationSchema: ValidationSchema<SiteValidation> = {
    siteName: string().required(t('error-message.required')),
    siteUrl: string()
      .url(t('settings-pages.error-message.url-invalid'))
      .required(t('error-message.required')),
  };

  const validationSchema = object().shape(siteValidationSchema);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    trigger,
  } = useForm<Site>({
    defaultValues: site,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: Partial<Site>): Promise<void> => {
    await updateSiteOverviewMutation.mutateAsync(data);
  };

  const onFieldSubmit = async (field: keyof Site) => {
    const isValid = await trigger(field);
    if (!isValid) {
      return false;
    }
    const updatedData = { [field]: getValues(field) };
    await onSubmit(updatedData);
    return true;
  };

  const onDelete = () => {
    setCurrentSiteId(site.id);
    openDialog({
      name: DialogType.DeleteSite,
      props: { siteName: site.siteName },
    });
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    onFieldSubmit,
    errors,
    onDelete,
  };
};

export default useSiteDetailData;
