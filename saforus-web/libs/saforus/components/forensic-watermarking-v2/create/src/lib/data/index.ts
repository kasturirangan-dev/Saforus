import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { WatermarkingCreateOrder, watermarkingValidationSchema } from './utils';
import { randomId } from '@web-workspace/shared/helpers/strings';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { FileType } from '@web-workspace/saforus/common/model';
import {
  WatermarkingOrderInfo,
  createWatermark,
  generateOrderNo,
  StatusName,
  QUERY_KEY,
  getOrderFileList,
  generateWtrCode,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import { useMutation, useQuery } from 'react-query';
import { getTeamId } from '@web-workspace/saforus/common/utils';
import { useEffect, useState } from 'react';
import WatermarkingStore from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import { useSnapshot } from 'valtio';
import _ from 'lodash-es';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useTranslation } from 'react-i18next';

export function useWatermarkingData() {
  const { t } = useTranslation();

  const [responseData, setResponseData] = useState({});
  const { saveCreateOrderNo, saveOrder } = useSnapshot(WatermarkingStore);
  const { openDialog, closeDialog } = useSnapshot(DialogStore);

  const { mutateAsync: onCreateAsync, isLoading: loading } = useMutation(
    createWatermark,
    {
      onSuccess: (response) => {
        if (response?.resultCd === '0') {
          const cloneData = _.cloneDeep(response);
          setResponseData({ isSuccess: true, data: cloneData });
        } else {
          if (response.resultCd === '95') {
            setResponseData({
              isSuccess: false,
              data: {
                ...response,
                messageKey: 'api.submit-order-fwm.incorrect-format',
              },
            });
          }
          if (response?.resultCd === '100') {
            setResponseData({
              isSuccess: false,
              data: {
                ...response,
                messageKey: 'api.submit-order-fwm.key-already-exists',
              },
            });
          }
          if (response?.resultCd === '1') {
            setResponseData({
              isSuccess: false,
              data: {
                ...response,
                messageKey: response?.resultMsg,
              },
            });
          } else {
            setResponseData({ isSuccess: false, data: response });
          }
        }
      },
    }
  );

  useEffect(() => {
    if (loading) {
      openDialog({
        name: DialogType.Loading,
        props: {
          title: t('page-watermarking.loading-description-1'),
          description: t('page-watermarking.loading-description-2'),
        },
      });
    } else {
      closeDialog();
    }
  }, [loading]);

  const onSubmit = async (data: WatermarkingCreateOrder) => {
    const fileUploaded = data.files[0] as FileType;
    const contentType = fileUploaded.contentType.field as string;
    const createOrderNo = generateOrderNo({ mediaType: contentType });
    const watermarkCodes = data.watermarkCodes.map((item, index) => ({
      wtrMsg: data.startNum + index,
      description: item.description,
    }));

    const teamId = getTeamId();

    const reqData = {
      token: AuthStore.token ?? '',
      userName: AuthStore.userInfo?.email ?? '',
      psnOrderId: createOrderNo,
      psnFileArr: [fileUploaded.file],
      psnFileCnt: 1,
      psnFileMediaCd: contentType,
      psnFwmTpCd: 'Y',
      psnDrmTpCd: 'N',
      psnStartNum: data.startNum,
      psnEndNum: data.startNum + data.watermarkCodes.length - 1,
      psnGpuYn: 'N',
      title: fileUploaded.psnInfoFileNm,
      psnDescriptionsJson: JSON.stringify(watermarkCodes),
      userId: AuthStore.userInfo?.id,
      teamId: teamId,
    };

    saveCreateOrderNo(createOrderNo);
    saveOrder({
      orderNo: createOrderNo,
      file: fileUploaded,
      status: StatusName.IN_QUEUE,
      requestor: AuthStore?.userInfo?.fullName,
      requestedDate: new Date(),
    } as WatermarkingOrderInfo);

    await onCreateAsync(reqData);

    closeDialog();
  };

  const methods = useForm<WatermarkingCreateOrder>({
    defaultValues: {
      files: [],
      contentType: '',
      startNum: generateWtrCode(),
      watermarkCodes: [],
    },
    resolver: yupResolver(watermarkingValidationSchema),
  });
  const { errors } = methods.formState;

  return {
    handleSubmit: methods.handleSubmit,
    onSubmit,
    errors,
    register: methods.register,
    setValue: methods.setValue,
    getValues: methods.getValues,
    watch: methods.watch,
    methods,
    loading,
    responseData,
  };
}
