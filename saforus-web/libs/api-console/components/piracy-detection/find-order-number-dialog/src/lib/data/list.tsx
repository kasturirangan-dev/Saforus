import { GridRowParams } from '@mui/x-data-grid';
import { useSnapshot } from 'valtio';
import {
  FindWtrOrderStore,
  OrderDetail,
} from '@web-workspace/api-console/components/piracy-detection/find-order-number-data';

export function usePagingViewOrderingData() {
  const {
    orders,
    total,
    setSearchQuery,
    getNextPage,
    setSelectedWatermarkFile,
    setIsPreview,
  } = useSnapshot(FindWtrOrderStore);

  const onNextPage = () => {
    const nextPage = getNextPage();
    nextPage && setSearchQuery({ page: nextPage });
  };
  const onSelectRow = (params: GridRowParams) => {
    const wtrOder = params.row as OrderDetail;
    const wtrOrderFile = wtrOder.orderFiles[0];
    setSelectedWatermarkFile({
      orderId: wtrOder.id,
      orderFile: wtrOrderFile,
    });
  };

  const onPreviewOrder = (params: GridRowParams) => {
    onSelectRow(params);
    setIsPreview(true);
  };

  return {
    orders,
    total,
    onNextPage,
    onSelectRow,
    onPreviewOrder,
  };
}
