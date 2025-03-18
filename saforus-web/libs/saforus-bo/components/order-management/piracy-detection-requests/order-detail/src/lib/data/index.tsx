import { useQuery } from 'react-query';
import { getPiracyOrderDetail } from './api';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  fileType,
  IPiracyDetailResponse,
  StatusName,
  StatusOrder,
} from './interface';
import { PiracyDetailData } from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/data';
import { MOCK_FILE_URL } from './mock';

export function useCurrentOrderingData() {
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  const location = useLocation();
  const parts = location.pathname.split('/');
  const id = parts[parts.length - 1];
  const { isLoading, data: currentOrder } = useQuery<
    unknown,
    Error,
    IPiracyDetailResponse
  >({
    queryKey: ['PIRACY_ORDER_DETAIL'],
    queryFn: async () => {
      return getPiracyOrderDetail(id);
    },
    refetchOnWindowFocus: false,
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

  return {
    currentOrder: currentOrder?.data,
    isLoading,
    status:
      StatusOrder[
        currentOrder?.data?.status?.toLowerCase() || StatusName.COMPLETED
      ],
    type: currentOrder?.data?.contentType || fileType.IMG,
    fileUrl:
      getCurrentFile(currentOrder?.data)?.imageURL ||
      MOCK_FILE_URL[paramsAsObject.type || fileType.IMG],
    fileType: getCurrentFile(currentOrder?.data)
      ? getCurrentFile(currentOrder?.data)?.fileType
      : '',
    currentFile: getCurrentFile(currentOrder?.data),
  };
}

export default useCurrentOrderingData;
