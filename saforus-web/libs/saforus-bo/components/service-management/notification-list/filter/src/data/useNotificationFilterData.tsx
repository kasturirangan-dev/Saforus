import { useQuery } from 'react-query';
import NotificationListStore, {
  mockNotificationEditor,
  RequestNotificationList,
} from '@web-workspace/saforus-bo/components/service-management/notification-list/data';
import { useSnapshot } from 'valtio';
import { useForm } from 'react-hook-form';

export const useNotificationFilterData = () => {
  const { setOptionData, searchParams, setSearchParam } = useSnapshot(
    NotificationListStore
  );

  const { isSuccess: isSuccessNotificationEditor } = useQuery(
    'editor',
    mockNotificationEditor,
    {
      onSuccess(data) {
        setOptionData('editorOption', data.notificationData);
      },
    }
  );

  const { handleSubmit, control, setValue } = useForm<RequestNotificationList>({
    defaultValues: {
      startTime: searchParams.startTime,
      endTime: searchParams.endTime,
    },
  });

  const onSubmit = (data: any) => {
    setSearchParam(data);
  };

  return {
    isOptionLoaded: isSuccessNotificationEditor,
    handleSubmit,
    control,
    setValue,
    onSubmit,
  };
};
