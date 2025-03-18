import { useQuery } from 'react-query';
import { QUERY_KEY, getPiracyOrderDetail } from './api';
import { useLocation } from 'react-router-dom';
import { IPiracyDetailResponse, PiracyDetailData } from './interface';
import { useState } from 'react';
import { PiracyOrderStatus } from '@web-workspace/saforus/components/piracy-detection/view-order/data';

export function useCurrentOrderingData() {
  const location = useLocation();
  const parts = location.pathname.split('/');
  const orderSrcId = parts[parts.length - 1];

  const [refetchInterval, setRefetchInterval] = useState(0);

  const { isLoading, data: currentOrder } = useQuery<
    unknown,
    Error,
    IPiracyDetailResponse
  >({
    queryKey: [QUERY_KEY.ORDER_DETAIL, orderSrcId],
    queryFn: async () => {
      return getPiracyOrderDetail(orderSrcId);
    },
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const { data } = response;
      const { fileList } = data;
      if (fileList?.length > 0) {
        const fileStatus = fileList[0].status;
        const esCompletedTime = new Date(fileList[0].estimatedCompletionTime);
        const now = new Date();
        if (
          fileStatus === PiracyOrderStatus.IN_QUEUE ||
          fileStatus === PiracyOrderStatus.IN_PROGRESS
        ) {
          //Refetch the details for in progress order every second
          setRefetchInterval(
            esCompletedTime && esCompletedTime > now ? 1000 : 3000
          );
        } else {
          setRefetchInterval(0);
        }
      }
    },
    refetchInterval: refetchInterval,
    enabled: Boolean(orderSrcId),
  });

  const getCurrentFile = (currentOrder: PiracyDetailData | undefined) => {
    if (
      currentOrder &&
      currentOrder.fileList &&
      currentOrder.fileList.length > 0
    ) {
      if (currentOrder.fileList[0].fileName) {
        const splitName = currentOrder.fileList[0].fileName.split('.');
        return {
          ...currentOrder.fileList[0],
          fileType: splitName && splitName.length > 0 ? splitName[1] : '',
        };
      }
    }
  };

  // const { data: imageData } = useQuery<unknown, Error, string>({
  //   queryKey: ['PIRACY_ORDER_DETAIL_IMAGE', id],
  //   queryFn: async () => {
  //     return getPdAttachment({
  //       orderId: fileId as any,
  //       getImageinBase64: true,
  //     });
  //   },
  //   refetchOnWindowFocus: false,
  //   enabled:
  //     (currentOrder?.data?.contentType === MEDIA_TYPE.IMG ||
  //       currentOrder?.data?.contentType === MEDIA_TYPE.VIDEO) &&
  //     Boolean(fileId),
  //   retry: false,
  // });

  const currentFileData = getCurrentFile(currentOrder?.data);

  return {
    currentOrder: currentOrder?.data,
    isLoading,
    currentFile: currentFileData,
  };
}

export default useCurrentOrderingData;
