import { yupResolver } from '@hookform/resolvers/yup';
import {
  RequestWatermarkingOrders,
  WatermarkingOrdersStore,
  validationSchema,
} from '@web-workspace/saforus-bo/components/order-management/watermarking-orders/data';
import { sub } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { ServiceType } from '@web-workspace/saforus-bo/common/model';

export function useWatermarkingSearchData() {
  const { setSearchQuery } = useSnapshot(WatermarkingOrdersStore);

  const currentDate = new Date();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
    reset,
  } = useForm<Partial<RequestWatermarkingOrders>>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      // teamId: 0,
      // userId: 0,
      emailIdOrName: '',
      orderNo: '',
      serviceType: ServiceType.DIGITAL_WATERMARKING,
      orderRequestStatus: 'ALL',
      contentType: 'ALL',
      format: 'ALL',
      startDate: sub(currentDate, { days: 30 }),
      endDate: currentDate,
      pageNo: 0,
      elementPerPage: 10,
    },
  });

  const onSubmit = () => {
    setValue('pageNo', 0);
    setSearchQuery(getValues());
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
    setValue,
    values: getValues(),
    onSubmit,
    handleKeyPress,
    control,
    reset,
  };
}
