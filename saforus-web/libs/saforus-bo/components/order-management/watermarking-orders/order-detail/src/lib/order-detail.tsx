import OrderDetailView from './view';
import { useViewOrderDetailData } from './data';

export function OrderDetailComponent() {
  const { isLoading, files, total, onClearCache } = useViewOrderDetailData();
  return (
    <OrderDetailView
      isLoading={isLoading}
      files={files}
      total={total}
      onClearCache={onClearCache}
    />
  );
}

export default OrderDetailComponent;
