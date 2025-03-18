import { yupResolver } from '@hookform/resolvers/yup';
import {
  ExpirationSchema,
  RequestWaterExpiration,
  changeExpiredDate,
} from '@web-workspace/saforus-bo/components/order-management/watermarking-orders/data';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useSnapshot } from 'valtio';
import DownloadFileStore from '../store';
import { format } from 'date-fns';
import { QUERY_KEY_DOWNLOAD_FILES } from '../api';

export function useWatermarkingExpirationData() {
  const { requestQuery, setExpiredDate } = useSnapshot(DownloadFileStore);
  const queryClient = useQueryClient();
  const currentDate = new Date();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
    reset,
  } = useForm<Partial<RequestWaterExpiration>>({
    resolver: yupResolver(ExpirationSchema),
    defaultValues: {
      expiredDate: currentDate,
    },
  });

  const { mutate: updateExpiredDate } = useMutation(
    async ({
      expDt,
      personOrderInfoSq,
    }: {
      expDt: string;
      personOrderInfoSq: string;
    }) => {
      await changeExpiredDate(expDt, personOrderInfoSq);
    },
    {
      onSuccess(data, variables, context) {
        const exDate = getValues('expiredDate') as Date;
        queryClient.invalidateQueries([
          QUERY_KEY_DOWNLOAD_FILES,
          ...Object.values(requestQuery),
        ]);
        setExpiredDate(exDate);
        showToast.success('Expired date has been updated successfully');
      },
      onError(error, variables, context) {
        showToast.warning(
          'Expired date CAN NOT be updated. Contact Super Admin or mention @saforus-help in Slack'
        );
      },
    }
  );

  const onSubmit = (data: any) => {
    const exDate = getValues('expiredDate') as Date;
    if (exDate) {
      updateExpiredDate({
        expDt: format(exDate, "yyyy-MM-dd'T'HH:mm:ss"),
        personOrderInfoSq: requestQuery.personOrderInfoSq,
      });
    }
    // FIXME call API and update data
    // Reload data
  };

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    values: getValues(),
    onSubmit,
    control,
    reset,
  };
}
