import { GridRowParams } from '@mui/x-data-grid';
import { PiracyOrderStore } from '@web-workspace/saforus/components/piracy-detection/view-order/data';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';

export function usePagingViewOrderingData() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, orders, total } =
    useSnapshot(PiracyOrderStore);

  const onPageChange = async (selection: any) => {
    const fromRow = selection.page;
    setSearchQuery({ pageNo: fromRow });
  };

  const onRowClick = (params: GridRowParams) => {
    const orderId = params.row.id;
    const detailPagePath =
      ROUTES.PIRACY_DETECTION.VIEW_ORDER.children.PIRACY_ORDER_DETAIL.path;

    // Combine setSearchQuery from both detail and list to avoid query default at store when back from detail to list
    const detailPageUrl = `${detailPagePath}/${orderId}`;

    const stateData = {
      ...searchQuery,
    };
    // Navigate to the detail page
    navigate(detailPageUrl, { state: stateData });
  };

  return {
    orders: orders,
    total,
    onPageChange,
    onRowClick,
  };
}
