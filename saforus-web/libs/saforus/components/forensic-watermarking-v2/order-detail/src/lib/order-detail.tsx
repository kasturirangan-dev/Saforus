import OrderDetailView from './view';
import { useViewOrderDetailData } from './data';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import DownloadFileStore from './data/store';
import { useSnapshot } from 'valtio';

export function OrderDetailComponent() {
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  const personOrderInfoSq = paramsAsObject.personOrderInfoSq;

  const { setRequestQuery, total, onReset } = useSnapshot(DownloadFileStore);
  useEffect(() => {
    setRequestQuery({ personOrderInfoSq });
    return () => {
      onReset();
    };
  }, []);

  const {
    isLoading,
    isDownloading,
    onDownloadHistory,
    onDownloadFiles,
    onShared,
  } = useViewOrderDetailData();

  return (
    <OrderDetailView
      isLoading={isLoading}
      isDownloading={isDownloading}
      onDownloadHistory={onDownloadHistory}
      onDownloadFiles={onDownloadFiles}
      onShared={onShared}
    />
  );
}

export default OrderDetailComponent;
