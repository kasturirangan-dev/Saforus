import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import FindOrderNumberSearchView from './view/search-view';
import FindOrderNumberOrderListView from './view/order-list-view';
import { useSearchViewOrderingData } from './data/search';
import { usePagingViewOrderingData } from './data/list';
import CommonStore from '@web-workspace/saforus/common/data';
import FindOrderFooter from './view/footer';
import SelectOrderImage from './view/select-order-image';

export function FindOrderNumberDialog({ onClose, onApply }: any) {
  const { t } = useTranslation();
  const { isLoading } = useSnapshot(CommonStore);
  const { orderLoading } = useSearchViewOrderingData();

  const { orders, total, onNextPage, onSelectRow, onPreviewOrder } =
    usePagingViewOrderingData();

  return (
    <Dialog
      maxWidth={'lg'}
      PaperProps={{
        style: {
          width: '720px',
          padding: '4px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '16px',
        },
      }}
      title={`${t('find-order-number.title')}`}
      onClose={onClose}
      titleCss={{
        padding: '24px',
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '28px',
        color: 'var(--gray-700)',
      }}
      contentCss={{
        paddingBottom: '1.5rem',
        overflow: 'hidden',
      }}
      footer={<FindOrderFooter onApply={onApply} onClose={onClose} />}
      dialogContent={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {!isLoading && <FindOrderNumberSearchView />}
          <FindOrderNumberOrderListView
            orders={orders}
            total={total}
            orderLoading={orderLoading}
            onNextPage={onNextPage}
            onSelectRow={onSelectRow}
            onPreviewOrder={onPreviewOrder}
          />
          <SelectOrderImage />
        </Box>
      }
    ></Dialog>
  );
}

export default FindOrderNumberDialog;
