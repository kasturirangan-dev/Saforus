import { useWatermarkingData } from './data';
import CreateForensicWatermarkingView from './view';
import { WatermarkingCreateOrder } from './data/utils';
import { useTranslation } from 'react-i18next';
import { MEDIA_TYPE, UserRole } from '@web-workspace/saforus/common/model';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { useEffect } from 'react';
import {
  TrackingEvent,
  logEventAnalytics,
} from '@web-workspace/shared/analytics';
import WatermarkingStore from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import { useSnapshot } from 'valtio';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';

export function ForensicWatermarkingCreateComponent({
  availableSize,
}: {
  availableSize: number;
}) {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    setValue,
    getValues,
    watch,
    methods,
    loading,
    responseData,
  } = useWatermarkingData();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openDialog, closeDialog } = useSnapshot(DialogStore);

  const { currentOrder, setCreateStep } = useSnapshot(WatermarkingStore);

  const onSubmitHandler = (data: WatermarkingCreateOrder) => {
    if (AuthStore?.userInfo?.role === UserRole.TEAM_VIEWER) {
      showToast.error(t('page-watermarking.create.message.need-permission'));
      return;
    }
    // LogEvent before submit
    logEventAnalytics(TrackingEvent.Watermarking_CreateOrder);
    onSubmit(data);
  };

  const trackingSubmitResult = (result: boolean | undefined) => {
    if (result === true) {
      logEventAnalytics(TrackingEvent.Watermarking_CreateOrder_Completed);

      switch (currentOrder?.contentType) {
        case MEDIA_TYPE.IMG:
          logEventAnalytics(TrackingEvent.Watermarking_CreateOrder_Image);
          break;
        case MEDIA_TYPE.VIDEO:
          logEventAnalytics(TrackingEvent.Watermarking_CreateOrder_Video);
          break;
        case MEDIA_TYPE.AUDIO:
          logEventAnalytics(TrackingEvent.Watermarking_CreateOrder_Audio);
          break;
        case MEDIA_TYPE.DOCUMENT:
          logEventAnalytics(TrackingEvent.Watermarking_CreateOrder_Document);
          break;
      }
    } else if (result === false) {
      logEventAnalytics(TrackingEvent.Watermarking_CreateOrder_Failed);
    }
  };

  useEffect(() => {
    // LogEvent after submit
    trackingSubmitResult(responseData?.isSuccess);
    if (responseData?.isSuccess === false) {
      const filesUploaded = getValues('files');
      const fileSize = filesUploaded[0]?.size.field || 0;

      if (responseData?.data?.resultCd === '1' && availableSize < fileSize) {
        openCapacityDialog();
      } else if (responseData?.data?.messageKey) {
        openDialog({
          name: DialogType.Loading,
          props: {
            status: 'failed',
            title: t('create-watermarking.failed-title'),
            description: t('create-watermarking.failed-description'),
          },
        });
        setTimeout(() => {
          closeDialog();
        }, 3000);
      } else {
        openDialog({
          name: DialogType.WatermarkingSubmitError,
          props: {
            errorCode: responseData?.data?.resultCd,
          },
        });
      }
    } else if (responseData?.isSuccess === true) {
      setCreateStep(2);
    }
  }, [responseData]);

  const viewServicePlan = () => {
    navigate(ROUTES.USER_INFO.SERVICE_PLAN.path);
  };
  const openCapacityDialog = () => {
    if (availableSize > 0) {
      openDialog({
        name: DialogType.WatermarkContinue,
        props: {
          title: t('page-watermarking.create.storage-dialog.title'),
          description: t('page-watermarking.create.storage-dialog.description'),
          btnText: {
            primaryBtnText: t(
              'page-watermarking.create.storage-dialog.primaryAction'
            ),
            secondaryBtnText: t(
              'page-watermarking.create.storage-dialog.secondaryAction'
            ),
          },
          btnAction: {
            primaryBtnAction: closeDialog,
            secondaryBtnAction: viewServicePlan,
          },
          availableSize: availableSize,
        },
      });
    } else {
      openDialog({
        name: DialogType.WatermarkContinue,
        props: {
          title: t('page-watermarking.create.storage-dialog.noSpaceTitle'),
          description: t(
            'page-watermarking.create.storage-dialog.noSpaceDescription'
          ),
          btnText: {
            primaryBtnText: t(
              'page-watermarking.create.storage-dialog.noSpacePrimaryAction'
            ),
            secondaryBtnText: t(
              'page-watermarking.create.storage-dialog.noSpaceSecondaryAction'
            ),
          },
          btnAction: {
            primaryBtnAction: viewServicePlan,
            secondaryBtnAction: closeDialog,
          },
          availableSize: availableSize,
        },
      });
    }
  };

  return (
    <CreateForensicWatermarkingView
      handleSubmit={handleSubmit}
      onSubmit={onSubmitHandler}
      register={register}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
      methods={methods}
      loading={loading}
    />
  );
}

export default ForensicWatermarkingCreateComponent;
