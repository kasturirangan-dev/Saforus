import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createOrder, uploadFile } from './api';
import { useSnapshot } from 'valtio';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { FileType } from '@web-workspace/api-console/common/model';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import { generateOrderNo } from './utils';
import { ApiResponseStatus } from '@web-workspace/api-console/common/model';
import { WatermarkingForm, WatermarkingValidationSchema } from './const';
import WatermarkingStore, {
  WatermarkFile,
  WatermarkingRequest,
} from '@web-workspace/api-console/components/watermarking/data';

export function useWatermarkingData() {
  const { setCreateOrderId } = useSnapshot(WatermarkingStore);

  const [createOrderLoading, setCreateOrderLoading] = useState(false);
  const { t } = useTranslation();
  const { openDialog, closeDialog } = useSnapshot(DialogStore);
  const navigate = useNavigate();

  const methods = useForm<WatermarkingForm>({
    resolver: yupResolver(WatermarkingValidationSchema),
  });

  const onSubmit = async (data: WatermarkingForm) => {
    const fileUploaded = data.file as FileType;
    const wtrOrderFiles = data.wtrOrderFiles as WatermarkFile[];

    const createOrderNo = generateOrderNo({
      contentType: fileUploaded.contentType,
    });
    const reqData = {
      title: fileUploaded.fileName,
      idempotencyKey: createOrderNo,
      files: [
        {
          fileName: fileUploaded.fileName,
          fileType: fileUploaded.contentType,
          fileSize: fileUploaded.fileSize,
          wtrOrderFiles: wtrOrderFiles,
        },
      ],
    } as WatermarkingRequest;

    setCreateOrderLoading(true);
    submitLoading();
    try {
      const response = await createOrder(reqData);
      if (response && response.code === 'CSW1118') {
        openDialog({
          name: DialogType.StorageLimit,
        });
        return;
      }
      if (response && response.code === 'CSW1117') {
        openDialog({
          name: DialogType.RequestLimit,
        });
        return;
      }
      if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
        const createData = response.data;
        await uploadFile(createData.orderFiles[0], fileUploaded.file);
        submitSuccess(createData.id, createData.orderFiles[0].id);
      } else {
        submitFailed(response?.code);
      }
    } catch (error) {
      console.warn('Request failed', JSON.stringify(error));
      submitFailed();
    } finally {
      setCreateOrderLoading(false);
    }
  };

  const submitLoading = () => {
    openDialog({
      name: DialogType.Loading,
      props: {
        title: t('apiWatermarking.create.loading'),
      },
    });
  };

  const submitSuccess = (orderId: string, fileId: string) => {
    openDialog({
      name: DialogType.Loading,
      props: {
        status: 'success',
        title: t('apiWatermarking.create.success'),
      },
    });
    setCreateOrderId(orderId);
    setTimeout(() => {
      closeDialog();
      navigate(
        `${API_ROUTES.VIEW_ORDERS.WTR_ORDERS.path}/${orderId}/files/${fileId}`
      );
    }, 3000);
  };

  const submitFailed = (code?: string) => {
    openDialog({
      name: DialogType.Loading,
      props: {
        status: 'failed',
        title: t('apiWatermarking.create.failed'),
        description: t('apiWatermarking.create.try-again'),
        msg: code ? t('apiWatermarking.create.errorCode', { code }) : '',
      },
    });
    setTimeout(() => {
      closeDialog();
    }, 3000);
  };

  const { errors } = methods.formState;
  return {
    handleSubmit: methods.handleSubmit,
    onSubmit,
    errors,
    setValue: methods.setValue,
    getValues: methods.getValues,
    watch: methods.watch,
    methods,
    loading: createOrderLoading,
  };
}
