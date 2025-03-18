import { GridRowParams } from '@mui/x-data-grid';
import { ServiceViewOrderStore } from '@web-workspace/saforus/components/dashboard/view-order/data';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';

export function usePagingViewOrderingData() {
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery, pdOrders, pdTotal } = useSnapshot(
    ServiceViewOrderStore
  );

  const onPageChange = async (selection: any) => {
    const pageNoPd = selection.page;
    if (pageNoPd !== searchQuery.pageNoPd) {
      setSearchQuery({ pageNo: searchQuery.pageNo, pageNoPd });
    }
  };

  const onRowClick = (params: GridRowParams) => {
    const orderId = params.row.id;
    const detailPagePath =
      ROUTES.PIRACY_DETECTION.VIEW_ORDER.children.PIRACY_ORDER_DETAIL.path;
    const detailPageUrl = `${detailPagePath}/${orderId}`;

    const stateData = {
      dashboard: true,
      ...searchQuery,
    };

    // Navigate to the detail page with state
    navigate(detailPageUrl, { state: stateData });
  };

  return {
    orders: pdOrders,
    total: pdTotal,
    onPageChange,
    onRowClick,
  };
}
