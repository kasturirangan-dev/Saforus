import { GridRowParams } from '@mui/x-data-grid';
import { useSnapshot } from 'valtio';
import { FindWtrOrderStore } from '@web-workspace/saforus/components/piracy-detection/find-order-number-data';

export function usePagingViewOrderingData() {
  const {
    orders,
    total,
    setSearchQuery,
    getNextPage,
    setSelectedWatermarkFile,
    setMediaType,
    setIsPreview,
  } = useSnapshot(FindWtrOrderStore);

  const onNextPage = () => {
    const nextPage = getNextPage();
    nextPage && setSearchQuery({ pageNo: nextPage });
  };

  const onSelectRow = (params: GridRowParams) => {
    setSelectedWatermarkFile({
      id: params.row.id,
      orderNo: params.row.orderNo,
      personalOrderSq: params.row.id,
      psnInfoFileNm: params.row.details[0]?.fileName,
      personOrderInfoSq: params.row.details[0]?.personOrderInfoSq,
      psnInfoId: params.row.details[0]?.psnInfoId,
      contentType: params.row.contentType,
      thumbnail: params.row.details[0]?.moreInfo?.craftedLinks?.large,
      playback: params.row.details[0]?.moreInfo?.craftedLinks?.playback,
    });
    setMediaType(params.row.contentType);
  };

  const onPreviewOrder = (params: GridRowParams) => {
    onSelectRow(params);
    setMediaType(params.row.contentType);
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
