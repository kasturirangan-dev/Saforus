import { useQuery } from 'react-query';
import {
  QUERY_KEY,
  getWtrOrderDetail,
  handleDownloadFile,
  handleDownloadZip,
} from './api';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IWtrDetailResponse,
  WtrDetailData,
  WtrOrderStatus,
} from '@web-workspace/api-console/components/watermarking/data';

export function useCurrentOrderData() {
  const { orderId, fileId } = useParams();
  const [refetchInterval, setRefetchInterval] = useState(0);

  const { isLoading, data: currentOrder } = useQuery<
    unknown,
    Error,
    IWtrDetailResponse
  >({
    queryKey: [QUERY_KEY.ORDER_DETAIL, orderId],
    queryFn: async () => {
      if (!orderId) {
        return;
      }
      return getWtrOrderDetail(orderId);
    },
    onSuccess: (response) => {
      const { data } = response;
      const { orderFiles } = data;
      if (orderFiles?.length > 0) {
        const status = data.status;
        const esCompletedTime = new Date(
          orderFiles[0].moreInfo?.estimatedCompletionTime
        );
        const now = new Date();
        if (status === WtrOrderStatus.AWAITING_PROCESS) {
          //Refetch the details in progress order every second
          setRefetchInterval(
            esCompletedTime && esCompletedTime > now ? 1000 : 3000
          );
        } else {
          setRefetchInterval(0);
        }
      }
    },
    refetchInterval: refetchInterval,
  });

  const getCurrentFile = (currentOrder: WtrDetailData | undefined) => {
    if (
      currentOrder &&
      currentOrder.orderFiles &&
      currentOrder.orderFiles.length > 0
    ) {
      return currentOrder.orderFiles.find((file) => file.id === fileId);
    }
  };

  const currentFileData = getCurrentFile(currentOrder?.data);

  const [isDownloading, setDownloading] = useState(false);
  const getFilename = (url: string) => {
    const match = url.match(/[^/?#]+(?=\?|$)/);
    const fileName = match ? match[0] : '';
    return decodeURIComponent(fileName);
  };

  const onDownloadFiles = async (selectedIds: string[]) => {
    try {
      setDownloading(true);
      // Refetch newest order detail
      const orderResponse = await getWtrOrderDetail(orderId!);
      const orderFile = orderResponse.data.orderFiles.find(
        (file) => file.id === fileId
      );
      const wtrOrderFiles = orderFile?.wtrOrderFiles;

      const selectedFiles =
        wtrOrderFiles
          ?.filter((file) => selectedIds.includes(file.id))
          .map((file) => ({
            id: file.id,
            fileUrlDownload: file.wtrDownloadUrl,
            fileName: getFilename(file.wtrDownloadUrl),
          })) ?? [];

      if (selectedFiles.length === 1) {
        await handleDownloadFile(selectedFiles[0]);
      } else if (selectedFiles.length > 1) {
        await handleDownloadZip(selectedFiles, orderFile?.fileName || 'files');
      }
    } finally {
      setDownloading(false);
    }
  };
  return {
    currentOrder: currentOrder?.data,
    isLoading: isLoading || isDownloading,
    currentFile: currentFileData,
    onDownloadFiles,
  };
}
