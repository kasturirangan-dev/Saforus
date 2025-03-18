import { useSnapshot } from 'valtio';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { sub } from 'date-fns';
import {
  PiracyDetectionRequestsStore,
  RequestPiracyDetectionRequests,
  validationSchema,
} from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/data';
import { ServiceType } from '@web-workspace/saforus-bo/common/model';

export function usePiracyDetectionSearchData() {
  const { setSearchQuery } = useSnapshot(PiracyDetectionRequestsStore);

  const currentDate = new Date();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
    reset,
  } = useForm<Partial<RequestPiracyDetectionRequests>>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      // teamId: 0,
      emailIdOrName: '',
      orderNo: '',
      serviceType: ServiceType.PIRACY_DETECTION,
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
