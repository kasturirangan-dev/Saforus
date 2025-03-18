import { useSnapshot } from 'valtio';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect } from 'react';
import ViewOrderDetailStore from "../store";
import { ResponseOrderDetail } from "../interface";
import { fetchOrderDetail, QUERY_KEY_ORDER_DETAIL } from "../api";

export function useViewOrderDetailData() {

  const { requestQuery, files, setFiles, total } =
    useSnapshot(ViewOrderDetailStore);
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery<
    unknown,
    Error,
    ResponseOrderDetail
  >({
    queryKey: [QUERY_KEY_ORDER_DETAIL, ...Object.values(requestQuery)],
    queryFn: async () => {
      if (requestQuery.orderId) {
        return fetchOrderDetail(requestQuery);
      }
      return null;
    },
  });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      setFiles(data);
    }
    if (isError) {
      setFiles({ data: [], total: 0 });
    }
    ViewOrderDetailStore.orderDetailLoading = isLoading;
  }, [isLoading, data, isError]);

  const newFile = files?.map(el => {
    return {
      ...el,
      format: el?.format.toUpperCase() || ''
    }
  })

  const onClearCache = async () => {
    queryClient.invalidateQueries([QUERY_KEY_ORDER_DETAIL, ...Object.values(requestQuery)]);
  };
  return {
    files: newFile,
    total,
    isLoading,
    onClearCache
  };
}
