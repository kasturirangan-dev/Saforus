import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  MEDIA_TYPE,
  PiracyCreateRequest,
  SEARCH_TYPE,
  piracyValidationSchema,
} from './create-new-request.const';
import { useMutation, useQuery } from 'react-query';
import { SearchFile, createOrder } from './api';
import { CreateInfo, PiracyCreateForm } from './interface';
import { useSnapshot } from 'valtio';
import PiracyStore from './store';
import { randomId } from '@web-workspace/shared/helpers/strings';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import {
  FieldWithSupport,
  FileType,
} from '@web-workspace/saforus/common/model';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { getTeamId, showToast } from '@web-workspace/saforus/common/utils';
import {
  TrackingEvent,
  logEventAnalytics,
} from '@web-workspace/shared/analytics';
import { getAttachment } from '@web-workspace/shared/helpers/files/download-file';
import { PATTERN } from '@web-workspace/saforus/constants/validation';
import {
  FeatureFlag,
  isFeatureEnabled,
} from '@web-workspace/shared/feature-flag';

export const CREATE_FOLDER_STATUS = {
  EXISTED: 'existed',
  SUCCESSFUL: 'successful',
  FAILED: 'failed',
};

export function usePiracyData() {
  const contentMatchingType = [MEDIA_TYPE.IMG, MEDIA_TYPE.DOCUMENT];

  const [createOrderLoading, setCreateOrderLoading] = useState(false);
  const { t } = useTranslation();
  const { openDialog, closeDialog } = useSnapshot(DialogStore);
  const navigate = useNavigate();
  const {
    configFile,
    setFiles,
    removeFiles,
    setCreateInfo,
    contentType,
    watermarkInfo,
    setContentType,
    setSearchType,
    setWatermarkInfo,
    setFileErrorMsg,
    updateWatermarkFile,
  } = useSnapshot(PiracyStore);
  const teamId = getTeamId();

  const onFilesAdded = async (acceptedFiles: File[]) => {
    const mimeTypeToMediaType: { [key: string]: string } = {
      'image/*': 'IMG',
      'audio/*': 'AUDIO',
      'video/*': 'VIDEO',
      'application/pdf': 'DOCUMENT',
    };
    const fileType = acceptedFiles[0].type.includes('/pdf')
      ? acceptedFiles[0].type
      : acceptedFiles[0].type.replace(/\/.*$/, '/*');
    const contentType = fileType
      ? mimeTypeToMediaType[fileType]
      : 'ANY_AVAILABLE';

    const formatFile = acceptedFiles.map((file) => {
      const ext = file.name.split('.').pop() || '';
      const fileName = file.name.split('.').shift() || '';
      methods.setValue('title', fileName);

      const supportedFileFormat = configFile?.supportedExts?.find(
        (element: string) => element.includes(ext.toUpperCase())
      );
      if (!supportedFileFormat) {
        openDialog({
          name: DialogType.CommonError,
          props: {
            title: t('create-new-request.confirm.unsupported'),
            closeTitle: t('create-new-request.confirm.retry-btn'),
          },
        });
        return;
      }

      const supportedFileName = PATTERN.REQUEST_FILE_NAME.test(fileName);
      if (!supportedFileName) {
        setFileErrorMsg('create-watermarking.attack-file.invalid-name');
      }

      const supported = supportedFileFormat && supportedFileName;

      const id = randomId();
      const preview = URL.createObjectURL(file);
      setContentType(contentType);

      return {
        id: id,
        psnInfoId: id,
        psnInfoFileNm: file.name,
        contentType: {
          field: contentType,
          supported: supported,
        } as FieldWithSupport,
        format: ext,
        size: { field: file.size, supported: supported } as FieldWithSupport,
        supported: supported,
        file: file,
        preview: preview,
      } as FileType;
    });

    if (formatFile.length > 0 && formatFile[0]) {
      const currentFormatFile = formatFile[0];
      // uploadFileMutate(currentFormatFile);
      setFiles([currentFormatFile]);
      methods.setValue('fileIds', [currentFormatFile]);

      if (
        isFeatureEnabled(FeatureFlag.AUTO_MATCHING) &&
        contentMatchingType.includes(contentType)
      ) {
        onSearch();
      } else {
        setSearchType(SEARCH_TYPE.MANUAL);
      }
    }
  };

  useEffect(() => {
    if (createOrderLoading) {
      openDialog({
        name: DialogType.Loading,
        props: {
          title: t('create-new-request.create-loading'),
        },
      });
    } else {
      closeDialog();
    }
  }, [createOrderLoading]);

  const handleRemoveFile = (item: FileType) => {
    removeFiles(item.id);
    const fileIds = methods
      .getValues('fileIds')
      .filter((el) => el.id !== item.id);
    methods.setValue('fileIds', fileIds);
    setSearchType(SEARCH_TYPE.AUTO);
    setFileErrorMsg('');
    setWatermarkInfo(null);
  };

  const methods = useForm<PiracyCreateRequest>({
    defaultValues: {
      title: '',
      fileIds: [],
      confirmRequire: true,
    },
    resolver: yupResolver(piracyValidationSchema),
  });
  const trackingSubmitResult = (result: boolean) => {
    const submitedEvent = result
      ? TrackingEvent.PD_CreateOrder_Completed
      : TrackingEvent.PD_CreateOrder_Failed;
    logEventAnalytics(submitedEvent);
  };

  const onSubmit = async (data: PiracyCreateForm) => {
    setCreateOrderLoading(true);
    try {
      const response = (await createOrder(
        data,
        methods.getValues().fileIds[0]
      )) as any;

      if (response?.httpStatus === 'CREATED' && response?.resultCode === 201) {
        const createInfo: CreateInfo = {
          ...data,
          createTime: new Date(),
          requestor: AuthStore.userInfo?.fullName || 'Guest',
          id: randomId(),
          orderSrcId: response?.resourceId, // TODO: BE set resourceId as orderId
        };
        setCreateInfo(createInfo);
        openDialog({
          name: DialogType.Loading,
          props: {
            status: 'success',
            title: t('create-new-request.message.successful'),
          },
        });
        setTimeout(() => {
          navigate(
            `${ROUTES.PIRACY_DETECTION.VIEW_ORDER.children.PIRACY_ORDER_DETAIL.path}/${createInfo.orderSrcId}`,
            { replace: true, state: { from: 'create-new-request' } }
          );
        }, 3000);
      } else {
        console.warn(
          'createOrder piracy error',
          JSON.stringify(response, null, 2)
        );
        openDialog({
          name: DialogType.Loading,
          props: {
            status: 'failed',
            title: t('create-new-request.message.failed-title'),
            description: t('create-new-request.message.failed-description'),
          },
        });
        setTimeout(() => {
          closeDialog();
        }, 3000);
      }
      trackingSubmitResult(response && response?.resultCode);
    } catch (error) {
      console.warn('createOrder piracy', JSON.stringify(error));
      openDialog({
        name: DialogType.Loading,
        props: {
          status: 'failed',
          title: t('create-new-request.message.failed-title'),
          description: t('create-new-request.message.failed-description'),
        },
      });
      setTimeout(() => {
        closeDialog();
      }, 3000);
    } finally {
      closeDialog();
      setCreateOrderLoading(false);
    }
  };

  // Search watermarking order
  const { mutate: onSearch, isLoading: isSearching } = useMutation(
    () => {
      return SearchFile(methods.getValues().fileIds[0]);
    },
    {
      onSuccess: (response) => {
        const result = response?.data?.[0];
        if (!result) {
          setSearchType(SEARCH_TYPE.RETRY);
          return;
        }
        const watermarkInfo = {
          id: result.personalOrderSq,
          orderNo: result.psnOrderId,
          ...result,
        };
        setWatermarkInfo(watermarkInfo);

        // this is use for validate when selected a watermarking Order
        methods.setValue('watermarkingOrderNo', watermarkInfo.orderNo);
        methods.setValue(
          'watermarkingOrderInfoSq',
          watermarkInfo.personOrderInfoSq
        );
        methods.trigger('watermarkingOrderNo');
        methods.trigger('watermarkingOrderInfoSq');
      },
      onError: () => {
        setSearchType(SEARCH_TYPE.RETRY);
      },
    }
  );

  // Retrieve the watermarking order file
  // Handle cases where older watermarking orders don't have a thumbnail
  const { isFetching: isFetchingWatermarkFile } = useQuery(
    ['WATERMARK_FILE', watermarkInfo?.psnInfoId, watermarkInfo?.psnInfoFileNm],
    () => {
      // Check if there is a thumbnail
      if (watermarkInfo?.playback) {
        return watermarkInfo?.playback;
      }

      if (watermarkInfo?.thumbnail) {
        return watermarkInfo?.thumbnail;
      }

      // Otherwise, get original file
      return getAttachment({
        teamId: teamId,
        orderInfoId: watermarkInfo?.psnInfoId || '',
        orderInfoFileName: watermarkInfo?.psnInfoFileNm || '',
        timeout: 60000,
      }) as Promise<string>;
    },
    {
      onSuccess: (response) => {
        updateWatermarkFile({ watermarkFile: response });
      },
      enabled: Boolean(watermarkInfo?.psnInfoId),
    }
  );

  const { errors } = methods.formState;
  return {
    handleSubmit: methods.handleSubmit,
    onSubmit,
    errors,
    register: methods.register,
    setValue: methods.setValue,
    watch: methods.watch,
    methods,
    onFilesAdded,
    handleRemoveFile,
    trigger: methods.trigger,
    contentType,
    onSearch: () => onSearch(),
    isSearching,
  };
}
