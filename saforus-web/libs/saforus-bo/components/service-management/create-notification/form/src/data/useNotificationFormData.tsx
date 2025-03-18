/* 
Note
(1) form is used here to update ui bc:
+ autocomplete take input is object type TOption but
expect out put is value
+ image upload: mainly for sync between when data is not load and it will render an empty box 
(2) when refresh page the store reset so if you in edit page there is no data of notice to edit.
Path stay the same so id of notice always there to refetch data
*/
import { useMutation, useQuery, useQueryClient } from 'react-query';
import CreateNotificationStore, {
  mockNotificationType,
  mockPageShow,
  validationSchema,
  NotificationForm,
  createNewNotification,
  mockNotifications,
  FormMode,
  ResponseGetNotificationContent,
  NotificationLang,
  ResponseGetNotificationInfor,
  NotificationType,
} from '@web-workspace/saforus-bo/components/service-management/create-notification/data';
import { useSnapshot } from 'valtio';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import initialState from '@web-workspace/saforus-bo/components/service-management/create-notification/data';
import { useLocation, useNavigate } from 'react-router-dom';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import {
  deleteNotification,
  getNotificationContent,
  getNotificationInfor,
  updateNotificationExistContent,
  updateNotificationNewContent,
} from '@web-workspace/saforus-bo/components/service-management/edit-notification/data';

export const useCreateNotificationFormData = (toggle: boolean) => {
  const {
    setOptionData,
    notificationForm,
    setNotificationForm,
    formLanguage,
    saveFormData,
    formState,
    typeOption,
    pageOption,
    resetState,
    setResponseGetNotificationContent,
    setCurrentNoticeVersion,
  } = useSnapshot(CreateNotificationStore);

  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>(); // (1)
  const [enableContent, setEnableContent] = useState(true);
  const [enableNotice, setEnableNotice] = useState(true);

  const notificationId = location.pathname.split('/').pop(); // (2)

  // A function to format to TOption
  const getOptionData = (array: { label: string; value: string }[]) => {
    return array.map(({ label, value }: { label: string; value: string }) => ({
      label,
      value,
    }));
  };

  const { isLoading: isSuccessNotificationPage } = useQuery(
    'page',
    mockPageShow,
    {
      onSuccess(data) {
        setOptionData('pageOption', getOptionData(data.notificationData));
      },
      // enabled: pageOption.length === 0,
    }
  );

  const { isLoading: isSuccessNotificationType } = useQuery(
    'type',
    mockNotificationType,
    {
      onSuccess(data) {
        setOptionData('typeOption', getOptionData(data.notificationData));
      },
      // enabled: typeOption.length === 0,
    }
  );

  const { mutate } = useMutation(() => createNewNotification(), {
    onSuccess(data, variables, context) {
      navigate(BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.path);
      resetState();
    },
    onError(error, variables, context) {
      showToast.warning('Create notification failed!');
    },
  });

  const { mutate: updateNewContent } = useMutation(
    () => updateNotificationNewContent(),
    {
      onSuccess(data, variables, context) {
        // navigate(BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.path);
        // resetState();
        refetch();
        setCurrentNoticeVersion(true);
      },
      onError(error, variables, context) {
        showToast.warning('Update notification failed!');
      },
    }
  );

  const { mutate: updateModifiedContent } = useMutation(
    () => updateNotificationExistContent(),
    {
      onSuccess(data, variables, context) {
        // navigate(BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.path);
        // resetState();
        refetch();
        setCurrentNoticeVersion(true);
      },
      onError(error, variables, context) {
        showToast.warning('Update notification failed!');
      },
    }
  );

  const formValue = {
    type: notificationForm.type,
    summary: notificationForm.summary,
    title: notificationForm.title,
    imgFile: null,
    isDoNotViewButtonShow: notificationForm.isDoNotViewButtonShow,
    isBannerShow: notificationForm.isBannerShow,
    description: notificationForm.description,
    showOnPage: notificationForm.showOnPage,
    startNotice: new Date(notificationForm.startNotice),
    endNotice: new Date(notificationForm.endNotice),
  };

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
    clearErrors,
    getValues,
    resetField,
    reset,
  } = useForm<NotificationForm>({
    defaultValues: {
      type: NotificationType.Notice,
      summary: '',
      title: '',
      imgFile: null,
      isDoNotViewButtonShow: true,
      isBannerShow: true,
      description: '',
      showOnPage: undefined,
      startNotice: new Date(),
      endNotice: new Date(),
    },
    resolver: yupResolver(validationSchema(toggle)),
  });

  // handle when form being edited
  const type = watch('type');
  const summary = watch('summary');
  const title = watch('title');
  const description = watch('description');
  const isDoNotViewButtonShow = watch('isDoNotViewButtonShow');
  const isBannerShow = watch('isBannerShow');
  const showOnPage = watch('showOnPage');
  const startNotice = watch('startNotice');
  const endNotice = watch('endNotice');
  const status = watch('status');
  const imgFile = watch('imgFile');
  const noticePeriodInvalid = watch('noticePeriodInvalid');
  const formData = new FormData();
  useEffect(() => {
    setNotificationForm(getValues());
    if (imgFile) {
      //check if image uploaded to avoid empty data for banner cause error when calling api
      formData.append('banner', imgFile?.file);
    }
    if (type) {
      formData.append('type', type);
    }
    formData.append('description', summary);
    if (title) formData.append('title', title);
    if (status) formData.append('status', status);
    if (startNotice instanceof Date && endNotice instanceof Date) {
      formData.append(
        'startTime',
        format(new Date(startNotice), "yyyy-MM-dd'T'HH:mm:ss") // Convert them to ISO strings.
      );
      formData.append(
        'endTime',
        format(new Date(endNotice), "yyyy-MM-dd'T'HH:mm:ss") // Convert them to ISO strings.
      );
    }
    formData.append('showDoNotViewButton', `${isDoNotViewButtonShow}`);
    formData.append('showBanner', `${isBannerShow}`);
    formData.append('displayedOn', `${showOnPage}`);
    if (description) formData.append('message', description);
    formData.append('lang', formLanguage);
    formData.append('noticePeriodInvalid', `${noticePeriodInvalid}`);
    formData.append(
      'noticeContentVersion',
      `${notificationForm.noticeContentVersion}`
    );
    formData.append('noticeVersion', `${notificationForm.noticeVersion}`);
    saveFormData(formData);
  }, [
    type,
    summary,
    title,
    description,
    isDoNotViewButtonShow,
    isBannerShow,
    showOnPage,
    startNotice,
    endNotice,
    status,
    imgFile,
    noticePeriodInvalid,
  ]);
  ///////////////////////////////////////////////

  // handle when lang change
  useEffect(() => {
    resetField('title', {
      defaultValue: notificationForm.title ? notificationForm.title : '',
    });
    resetField('description', {
      defaultValue: notificationForm.description
        ? notificationForm.description
        : '',
    });
  }, [formLanguage]);
  /////////////////////////////////////////////

  // fetch data of content for noti
  const { isLoading: isContentLoading } = useQuery(
    ['EDIT_NOTICE_CONTENT'],
    () => getNotificationContent(notificationId),
    {
      onSuccess(data: ResponseGetNotificationContent) {
        setResponseGetNotificationContent(data);
        const contentInEnglish = data.data.find(
          (content) => content.lang === NotificationLang.EN
        );
        // update data to useForm
        reset({
          ...formValue,
          title: contentInEnglish?.title,
          description: contentInEnglish?.message,
          filePreview: contentInEnglish?.bannerUrl,
        });
        ////////////////////////////////////////////////
        setEnableContent(false);
      },
      enabled: formState === FormMode.Edit && enableContent, // query once to avoid while editing field it refetch and reset field value
    }
  );

  const { isLoading: isNoticeLoading, refetch } = useQuery(
    ['EDIT_NOTICE_INFOR'],
    () => {
      return getNotificationInfor(notificationId);
    },
    {
      onSuccess(data: ResponseGetNotificationInfor) {
        // update data to store to make select show on page valid
        const notiForm = {
          ...initialState.notificationForm,
          id: data.data.id,
          type: data.data.type,
          summary: data.data.description,
          status: data.data.status,
          startNotice: data.data.startTime,
          endNotice: data.data.endTime,
          isDoNotViewButtonShow: data.data.showDoNotViewButton,
          isBannerShow: data.data.showBanner,
          showOnPage: data.data.displayedOn,
          noticeVersion: data.data.version,
          updatedAt: data.data.updatedAt,
        };
        setNotificationForm(notiForm);

        reset({
          ...formValue,
          type: data.data.type,
          isDoNotViewButtonShow: data.data.showDoNotViewButton,
          isBannerShow: data.data.showBanner,
          showOnPage: data.data.displayedOn,
          summary: data.data.description,
          startNotice: new Date(data.data.startTime),
          endNotice: new Date(data.data.endTime),
        });

        setForm({
          type: data.data.type,
          showOnPage: data.data.displayedOn,
        });
        ////////////////////////////////////////////////
        setEnableNotice(false);
      },
      enabled: formState === FormMode.Edit && enableNotice, // query once to avoid while editing field it refetch and reset field value
    }
  );

  const onSubmit = async (data: NotificationForm) => {
    if (formState === FormMode.Create) {
      mutate();
    }
    if (formState === FormMode.Edit) {
      if (notificationForm.contentId) {
        updateModifiedContent();
      } else {
        updateNewContent();
      }
    }
  };

  return {
    isOptionLoading: isSuccessNotificationPage || isSuccessNotificationType,
    handleSubmit,
    register,
    control,
    errors,
    onSubmit,
    setValue,
    isValid,
    clearErrors,
    getValues,
    resetField,
    isLoading: isContentLoading || isNoticeLoading,
    form,
  };
};

export const useEditNotificationFormData = () => {
  const navigate = useNavigate();

  const { mutate: deleteNotice } = useMutation(() => deleteNotification(), {
    onSuccess(data, variables, context) {
      navigate(BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.path);
    },
    onError(error, variables, context) {
      showToast.warning('Delete notification failed!');
    },
  });
  return {
    deleteNotice,
  };
};
