import { useSnapshot } from 'valtio';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import { DownloadFileResponse } from './interface';
import {
  fetchFileList,
  QUERY_KEY_DOWNLOAD_FILES,
  getSharedHistory,
  shareFile,
} from './api';
import DownloadFileStore from './store';
import { useLocation } from 'react-router-dom';
import { getTeamId } from '@web-workspace/saforus/common/utils';
import {
  HandleDownloadFile,
  HandleDownloadZip,
} from '@web-workspace/shared/helpers/files/download-file';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useTranslation } from 'react-i18next';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import WatermarkingStore, {
  IOrderFile,
  QUERY_KEY,
  StatusName,
  WatermarkingOrderInfo,
  getOrderFileList,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/data';

export function useViewOrderDetailData() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { userInfo } = useSnapshot(AuthStore);
  const { currentOrder, saveOrder } = useSnapshot(WatermarkingStore);
  const { selectedFiles, requestQuery, setFiles } =
    useSnapshot(DownloadFileStore);
  const [isDownloading, setDownloading] = useState(false);

  const location = useLocation();
  const parts = location.pathname.split('/');
  const orderNo = parts[parts.length - 1];

  // Get order info including the status of the order
  const [refetchInterval, setRefetchInterval] = useState(0);

  const { isLoading: orderLoading } = useQuery<IOrderFile[]>(
    [QUERY_KEY.ORDER_DETAIL, orderNo],
    () => getOrderFileList(orderNo),
    {
      onSuccess: (data) => {
        if (data && data.length > 0) {
          const orderData = data[0];
          saveOrder({
            ...currentOrder,
            orderNo: orderNo,
            contentType: orderData.psnFileMediaCd,
            thumbnail: orderData.moreInfo?.craftedLinks?.large,
            playback: orderData.moreInfo?.craftedLinks?.playback,
            fileName: orderData.fileName,
            status: orderData.progress,
            requestor:
              userInfo?.email === orderData.regId
                ? userInfo.fullName
                : orderData.regId,
            requestedDate: orderData.regDt,
            estimatedCompletionTime: orderData.estimatedCompletionTime,
          } as WatermarkingOrderInfo);

          const fileStatus = orderData.progress;
          const esCompletedTime = new Date(orderData.estimatedCompletionTime);
          const now = new Date();
          if (
            fileStatus === StatusName.IN_QUEUE ||
            fileStatus === StatusName.IN_PROGRESS
          ) {
            //Refetch the details in progress created order every second
            setRefetchInterval(
              esCompletedTime && esCompletedTime > now ? 1000 : 3000
            );
          } else {
            setRefetchInterval(0);
          }
        }
      },
      refetchInterval: refetchInterval,
      enabled: Boolean(orderNo),
    }
  );

  const { isLoading } = useQuery<unknown, Error, DownloadFileResponse>({
    queryKey: [QUERY_KEY_DOWNLOAD_FILES, ...Object.values(requestQuery)],
    queryFn: async () => {
      if (requestQuery.personOrderInfoSq) {
        return fetchFileList(requestQuery);
      }
    },
    onSuccess: (data) => {
      if (data) {
        setFiles(data);
      } else {
        setFiles({ data: [], total: 0 });
      }
    },
    enabled: Boolean(requestQuery?.personOrderInfoSq),
  });

  useEffect(() => {
    if (currentOrder?.status) {
      queryClient.invalidateQueries(QUERY_KEY_DOWNLOAD_FILES);
    }
  }, [currentOrder?.status]);

  const onDownloadHistory = async () => {
    setDownloading(true);
    try {
      await getSharedHistory({
        teamId: getTeamId(),
        personOrderInfoSq: requestQuery?.personOrderInfoSq,
      });
    } catch (error) {
      console.error(
        'An error occurred while getting the shared history:',
        error
      );
    } finally {
      setDownloading(false);
    }
  };

  const onDownloadFiles = async () => {
    if (selectedFiles.length === 0) {
      return;
    }

    try {
      setDownloading(true);
      if (selectedFiles.length === 1) {
        await HandleDownloadFile(
          selectedFiles[0].fileId,
          selectedFiles[0].fileName,
          AuthStore.token,
          t
        );
      } else if (selectedFiles.length > 1) {
        await HandleDownloadZip(
          [...selectedFiles],
          currentOrder?.fileName || orderNo,
          AuthStore.token,
          t
        );
      }
    } finally {
      setDownloading(false);
    }
  };

  const onShared = async (personalOrderResultSq: string, sharedEmails: string[]) => {
    const res = await shareFile({
      personalOrderResultSq,
      sharedEmails,
    });
    if (res?.resultMsg === 'OK') {
      showToast.success(t('watermarked-order-detail.share-success', { email: sharedEmails.join(', ') }));
    } else {
      showToast.error(t('watermarked-order-detail.share-fail'));
    }
    // refetchFiles();
    queryClient.invalidateQueries(QUERY_KEY_DOWNLOAD_FILES);
  };

  return {
    isLoading: orderLoading || isLoading,
    isDownloading,
    onDownloadHistory,
    onDownloadFiles,
    onShared,
  };
}
