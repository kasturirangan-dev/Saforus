import { useSnapshot } from 'valtio';
import { useMutation, useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import {
  ApiKeyDetails,
  ApiKeyStore,
  CreateApiKey,
  CreateApiKeySchema,
  QUERY_KEY,
} from '@web-workspace/api-console/components/api-key/data';
import { ApiResponseStatus } from '@web-workspace/api-console/common/model';
import { add } from 'date-fns';
import { formatTzDate } from '@web-workspace/shared/helpers/dates';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';

const useCreateApiKeyData = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const { searchQuery, setSearchQuery } = useSnapshot(ApiKeyStore);
  const { tzDisplayOffset: tzOffset } = useSnapshot(CsApiAuthStore);

  const { mutateAsync: onCreateAsync, isLoading: loading } = useMutation(
    (data: Partial<ApiKeyDetails>) => {
      const reqData = {
        name: data.name,
        // convert to user's timezone at end of the day
        expiredAt: formatTzDate(data.expiredAt, tzOffset, false),
      };
      return CreateApiKey(reqData);
    },
    {
      onSuccess: (response) => {
        if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
          // Refresh the api list in page 0
          if (searchQuery.page != 0) {
            setSearchQuery({ page: 0 });
          } else {
            queryClient.invalidateQueries(QUERY_KEY.API_KEY);
          }
        } else {
          showToast.error(response?.msg || 'Error');
        }
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setError,
    getValues,
    setValue,
    control,
  } = useForm<Partial<ApiKeyDetails>>({
    resolver: yupResolver(CreateApiKeySchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      expiredAt: new Date(),
      neverExpire: true,
    },
  });

  const onSubmit = async (data: Partial<ApiKeyDetails>) => {
    // Set expired date to 200 years if never expire is checked
    const expiredAt = data.neverExpire
      ? add(new Date(), { years: 200 })
      : data.expiredAt || new Date();

    await onCreateAsync({ ...data, expiredAt });
    onClose();
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
    watch,
    setError,
    control,
    getValues,
    setValue,
    loading,
  };
};

export default useCreateApiKeyData;
