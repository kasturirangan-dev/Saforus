import { GridRowParams } from '@mui/x-data-grid';
import {
  ViewOrderStore,
  QUERY_KEY,
  deletePdOrder,
  deleteWtrOrder,
  OrderStatus,
} from '@web-workspace/api-console/components/view-orders/data';

import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useTranslation } from 'react-i18next';
import {
  ApiResponseStatus,
  OrderType,
} from '@web-workspace/api-console/common/model';
import { showToast } from '@web-workspace/shared/components/widgets/toast';

export function usePagingViewOrderingData() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openDialog, closeDialog } = useSnapshot(DialogStore);
  const { orders, total } = useSnapshot(ViewOrderStore);

  const onRowClick = (params: GridRowParams) => {
    if (params.row?.status === OrderStatus.EXPIRED) {
      return;
    }
    const orderId = params.row.id;
    const orderType = params.row.orderType;

    const detailPagePath =
      orderType === OrderType.DETECTION
        ? API_ROUTES.VIEW_ORDERS.PD_ORDERS.path
        : API_ROUTES.VIEW_ORDERS.WTR_ORDERS.path;
    const detailPageUrl = `${detailPagePath}/${orderId}`;

    // Navigate to the detail page
    navigate(detailPageUrl);
  };

  const onDeleteOrder = (orderType: string, orderId: string) => {
    openDialog({
      name: DialogType.DeleteOrderConfirm,
      props: {
        title:
          orderType === OrderType.DETECTION
            ? t('apiOrderList.delete.pd-title')
            : t('apiOrderList.delete.wtr-title'),
        description:
          orderType === OrderType.DETECTION
            ? t('apiOrderList.delete.pd-description')
            : t('apiOrderList.delete.wtr-description'),
        onContinue: () => {
          deleteMutate({ orderType, orderId });
          closeDialog();
        },
      },
    });
  };

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation(
    ({ orderId, orderType }: { orderId: string; orderType: string }) => {
      if (orderType === OrderType.DETECTION) {
        return deletePdOrder(orderId);
      } else {
        return deleteWtrOrder(orderId);
      }
    },
    {
      onSuccess: (response, { orderId }) => {
        if (response && response.code.endsWith(ApiResponseStatus.SUCCESS)) {
          showToast.success(
            t('apiOrderList.delete.success', { orderName: orderId })
          );
          queryClient.invalidateQueries(QUERY_KEY.VIEW_ORDER_LIST);
        } else {
          showToast.error(response?.msg || 'Error');
        }
      },
    }
  );

  return {
    orders: orders,
    total,
    onRowClick,
    onDeleteOrder,
    isDeleting,
  };
}
