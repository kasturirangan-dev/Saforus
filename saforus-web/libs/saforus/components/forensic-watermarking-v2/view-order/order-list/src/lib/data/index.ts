import { useSnapshot } from 'valtio';
import {
  QUERY_KEY,
  ViewOrderStore,
  deleteOrder,
  fetchFileList,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/view-order/data';
import { GridRowParams } from '@mui/x-data-grid';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useNavigate } from 'react-router-dom';
import WatermarkingStore, {
  IOrderFile,
  WatermarkingOrderInfo,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import {
  HandleDownloadFile,
  HandleDownloadZip,
} from '@web-workspace/shared/helpers/files/download-file';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useState } from 'react';

export function usePagingViewOrderingData() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openDialog, closeDialog } = useSnapshot(DialogStore);

  const { saveOrder } = useSnapshot(WatermarkingStore);
  const { orders, total, searchQuery, setSearchQuery } =
    useSnapshot(ViewOrderStore);

  // set the pageNo in search param when event change page trigger
  const onPageChange = async (selection: any) => {
    const pageNo = selection.page;
    if (pageNo !== searchQuery.pageNo) {
      setSearchQuery({ pageNo });
    }
  };
  const onRowClick = (params: GridRowParams) => {
    // Extract necessary values from params
    const {
      orderNo,
      title,
      contentType,
      userFullName,
      orderStatus,
      requestDate,
      details: orderDetail,
    } = params.row;
    const orderFile =
      orderDetail.length === 1 ? (orderDetail[0] as IOrderFile) : null;

    // orderInfoSq has been included if order only has one file
    const personOrderInfoSq = orderFile?.personOrderInfoSq;
    const detailPagePath =
      ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.children
        .WATERMARKING_HISTORY_DETAIL.path;

    // Combine setSearchQuery from both detail and list to avoid query default at store when back from detail to list
    const detailPageUrl = `${detailPagePath}/${orderNo}?title=${
      title || ''
    }&personOrderInfoSq=${personOrderInfoSq || ''}`;

    // Save detail before navigate if order only has one file
    if (orderFile) {
      saveOrder({
        orderNo: orderNo,
        contentType: contentType,
        thumbnail: orderFile.moreInfo?.craftedLinks?.large,
        playback: orderFile.moreInfo?.craftedLinks?.playback,
        fileName: orderFile.fileName,
        status: orderStatus,
        requestor: userFullName,
        requestedDate: requestDate,
      } as WatermarkingOrderInfo);
    }

    const stateData = {
      ...searchQuery,
    };
    // Navigate to the detail page
    navigate(detailPageUrl, { state: stateData });
  };

  const onDeleteOrder = (orderId: string, orderNo: string) => {
    openDialog({
      name: DialogType.WatermarkConfirm,
      props: {
        title: t('watermarked-order-detail.delete-order.title'),
        description: t('watermarked-order-detail.delete-order.description'),
        btnContinueText: t('watermarked-order-detail.delete-order.delete'),
        btnCancelText: t('watermarked-order-detail.delete-order.cancel'),
        onContinue: () => {
          deleteMutate({ orderId, orderNo });
          closeDialog();
        },
      },
    });
  };
  const onDownLoad = (personOrderInfoSq: string, psnInfoFileNm: string) => {
    downloadHandler(personOrderInfoSq, psnInfoFileNm);
  };

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation(
    ({ orderId, orderNo }: { orderId: string; orderNo: string }) => {
      return deleteOrder(orderId);
    },
    {
      onSuccess: (response, { orderNo }) => {
        if (
          response &&
          response.resultCode >= 200 &&
          response.resultCode <= 299
        ) {
          showToast.success(
            t('watermarked-order-detail.delete-success', { orderNo })
          );
          queryClient.invalidateQueries(QUERY_KEY.FORENSIC_VIEW_ORDER_LIST);
        } else {
          showToast.error(response.resultMsg || 'Delete failed');
        }
      },
    }
  );

  const [isDownloading, setDownloading] = useState(false);
  const downloadHandler = async (
    personOrderInfoSq: string,
    psnInfoFileNm: string
  ) => {
    try {
      setDownloading(true);
      const { data } = await fetchFileList(personOrderInfoSq);
      const selectedFiles = data.map(
        ({ id, fileName }: { id: string; fileName: string }) => ({
          fileId: id,
          fileName,
        })
      );

      if (selectedFiles.length === 1) {
        await HandleDownloadFile(
          selectedFiles[0].fileId,
          selectedFiles[0].fileName,
          AuthStore.token,
          t
        );
      } else if (selectedFiles.length > 1) {
        await HandleDownloadZip(
          [...selectedFiles],
          psnInfoFileNm,
          AuthStore.token,
          t
        );
      }
    } finally {
      setDownloading(false);
    }
  };

  return {
    orders,
    total,
    onPageChange,
    onRowClick,
    onDeleteOrder,
    onDownLoad,
    isDownloading,
    isDeleting,
  };
}
