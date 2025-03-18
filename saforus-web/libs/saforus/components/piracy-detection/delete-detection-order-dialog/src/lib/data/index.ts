import { useSnapshot } from 'valtio';
import { useMutation, useQueryClient } from 'react-query';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import {
  PiracyOrderStore,
  deletePdOrder,
  QUERY_KEY,
} from '@web-workspace/saforus/components/piracy-detection/view-order/data';
import { useTranslation } from 'react-i18next';


const useDeleteDetectionOrderData = ({
  orderId,
  orderName,
  onClose,
}: {
  orderId: string;
  orderName: string;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { searchQuery, setSearchQuery } = useSnapshot(PiracyOrderStore);

  const { mutateAsync: onDeleteAsync, isLoading: loading } = useMutation(
    () => {
      return deletePdOrder(orderId);
    },
    {
      onSuccess: (response) => {   
        if (response && response.resultCode >= 200 && response.resultCode <= 299) {
          showToast.success(t('delete.success', { orderName }));
          queryClient.invalidateQueries(QUERY_KEY.PIRACY_VIEW_ORDER_LIST);
        } else {
          showToast.error(response?.resultMsg || 'Delete failed');
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

export default useDeleteDetectionOrderData;
