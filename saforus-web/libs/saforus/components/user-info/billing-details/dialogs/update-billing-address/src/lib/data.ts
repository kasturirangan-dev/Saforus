import { useMutation, useQueryClient } from 'react-query';
import {
  Address,
  QUERY_KEYS_BILLING_DETAIL,
  UpdateBillingBody,
  useBillingDetailApis,
} from '@web-workspace/saforus/components/user-info/billing-details/data';
import { showToast } from '@web-workspace/saforus/common/utils';

const useUpdateBillingDetailData = () => {
  const queryClient = useQueryClient();
  const { updateAddress } = useBillingDetailApis();

  const { mutate: updateBillingAddress } = useMutation(
    (data: Address) => updateAddress(data.id, data as UpdateBillingBody),
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_KEYS_BILLING_DETAIL.GET_BILLING]);
        showToast.success('Billing Address has been updated successfully');
      },
      onError(error) {
        showToast.warning(
          'Billing Address has not been updated successfully, please try again.'
        );
      },
    }
  );

  return {
    updateBillingAddress,
  };
};

export default useUpdateBillingDetailData;
