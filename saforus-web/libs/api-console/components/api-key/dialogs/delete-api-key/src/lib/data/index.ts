import { useSnapshot } from 'valtio';
import { useMutation, useQueryClient } from 'react-query';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import {
  ApiKeyDetails,
  ApiKeyStore,
  DeleteApiKey,
  QUERY_KEY,
} from '@web-workspace/api-console/components/api-key/data';
import { ApiResponseStatus } from '@web-workspace/api-console/common/model';

const useDeleteApiKeyData = ({
  selectedApiKey,
  onClose,
}: {
  selectedApiKey: ApiKeyDetails;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { searchQuery, setSearchQuery } = useSnapshot(ApiKeyStore);

  const { mutateAsync: onDeleteAsync, isLoading: loading } = useMutation(
    () => {
      return DeleteApiKey(selectedApiKey.id);
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

  const onSubmit = async () => {
    await onDeleteAsync();
    onClose();
  };

  return {
    onSubmit,
    loading,
  };
};

export default useDeleteApiKeyData;
