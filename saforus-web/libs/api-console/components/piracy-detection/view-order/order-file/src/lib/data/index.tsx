import { useMutation, useQuery } from 'react-query';
import {
  QUERY_KEY,
  getDetectionResultData,
  getPiracyOrderDetail,
  retryDetection,
} from './api';
import { useMemo, useState } from 'react';
import {
  IPiracyDetailResponse,
  PiracyDetailData,
  PiracyOrderStatus,
} from '@web-workspace/api-console/components/piracy-detection/data';
import { useParams } from 'react-router-dom';
import { showToast } from '@web-workspace/saforus/common/utils';

export function useCurrentOrderData() {
  const { orderId, fileId } = useParams();
  const [refetchInterval, setRefetchInterval] = useState(0);

  const {
    isLoading,
    data: currentOrder,
    refetch,
  } = useQuery<unknown, Error, IPiracyDetailResponse>({
    queryKey: [QUERY_KEY.ORDER_DETAIL, orderId],
    queryFn: async () => {
      if (!orderId) {
        return;
      }
      return getPiracyOrderDetail(orderId);
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
        if (status === PiracyOrderStatus.AWAITING_PROCESS) {
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

  const getCurrentFile = (currentOrder: PiracyDetailData | undefined) => {
    if (
      currentOrder &&
      currentOrder.orderFiles &&
      currentOrder.orderFiles.length > 0
    ) {
      return currentOrder.orderFiles.find((file) => file.id === fileId);
    }
  };
  const currentFileData = getCurrentFile(currentOrder?.data);

  const { isLoading: loadingDetectResult, data: detectionData } = useQuery(
    [QUERY_KEY.DETECTION_RESULT, currentFileData?.moreInfo.detectedCode],
    async () => {
      const detectedCode = currentFileData?.moreInfo.detectedCode;
      if (detectedCode) {
        const response = await getDetectionResultData(detectedCode);
        return response;
      }
    },
    {
      enabled: !!currentFileData?.moreInfo.detectedCode,
      onError: (error) => {
        console.error('Error fetching detection order data:', error);
      },
    }
  );

  const detectionResult = useMemo(() => {
    if (!detectionData) return [];

    const wtrOrders = detectionData?.data?.records || [];
    const wtrFiles =
      wtrOrders.flatMap((order) =>
        order.orderFiles.flatMap((file) =>
          file.wtrOrderFiles.map((wtr) => ({
            id: wtr.id,
            wtrMsg: wtr.wtrMsg,
            wtrName: wtr.wtrName,
            wtrDescription: wtr.wtrDescription,
            createdAt: order.createdAt,
          }))
        )
      ) ?? [];

    return wtrFiles.filter(
      (file) => file.wtrMsg === currentFileData?.moreInfo.detectedCode
    );
  }, [detectionData, currentFileData?.moreInfo.detectedCode]);

  const { mutate: retryMutate, isLoading: isRetrying } = useMutation(
    ({
      orderId,
      fileId,
      origFileKey,
    }: {
      orderId: string;
      fileId: string;
      origFileKey: string;
    }) => {
      return retryDetection(orderId, fileId, origFileKey);
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const handleRetry = (origFileKey: string) => {
    if (!orderId || !fileId || !origFileKey) {
      showToast.error('Missing orderId, fileId or origFileKey');
      return;
    }
    retryMutate({ orderId, fileId, origFileKey });
  };

  return {
    currentOrder: currentOrder?.data,
    isLoading: isLoading || isRetrying || loadingDetectResult,
    currentFile: currentFileData,
    detectionResult: detectionResult,
    handleRetry,
  };
}
