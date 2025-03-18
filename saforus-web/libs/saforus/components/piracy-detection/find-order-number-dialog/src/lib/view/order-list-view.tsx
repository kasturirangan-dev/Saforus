import { Box, Typography, Radio } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  GridColDef,
  GridEventListener,
  useGridApiRef,
  gridRowsMetaSelector,
} from '@mui/x-data-grid';
import { memo, Suspense, useCallback, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { FindWtrOrderStore } from '@web-workspace/saforus/components/piracy-detection/find-order-number-data';
import {
  formatDate,
  formatDateWithLanguage,
} from '@web-workspace/shared/helpers/dates';
import ImagePreview, {
  isTiffFile,
} from '@web-workspace/shared/components/widgets/image-preview';
import ContentLabel from '@web-workspace/shared/components/widgets/content-label';
import { StyledDataGrid, TableContent } from './styled-elements';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { MEDIA_TYPE } from '@web-workspace/saforus/common/model';

function FindOrderNumberOrderListView({
  orders,
  total,
  orderLoading,
  onNextPage,
  onSelectRow,
  onPreviewOrder,
}: any) {
  const { t } = useTranslation();
  const { timeZone, tzDisplayOffset: tzOffset } = useSnapshot(AuthStore);
  const { searchQuery } = useSnapshot(FindWtrOrderStore);

  const apiRef = useGridApiRef();
  const orderArray = Array.from(orders);

  const scrollEndThreshold = 200;
  const isInScrollBottomArea = useRef<boolean>(false);
  const handleRowsScrollEnd = useCallback<
    GridEventListener<'scrollPositionChange'>
  >(
    (scrollPosition) => {
      if (scrollPosition.top === 0) return;

      const rowsMeta = gridRowsMetaSelector(apiRef.current.state);
      const contentHeight = Math.max(rowsMeta.currentPageTotalHeight, 1);
      const dimensions = apiRef.current.getRootDimensions();
      if (!dimensions) return;

      const scrollPositionBottom =
        scrollPosition.top + dimensions.viewportOuterSize.height;
      if (scrollPositionBottom < contentHeight - scrollEndThreshold) {
        isInScrollBottomArea.current = false;
      }
      if (
        scrollPositionBottom >= contentHeight - scrollEndThreshold &&
        !isInScrollBottomArea.current
      ) {
        onNextPage();
        isInScrollBottomArea.current = true;
      }
    },
    [apiRef, orderArray, total]
  );

  useEffect(() => {
    // The `subscribeEvent` method will automatically unsubscribe in the cleanup function of the `useEffect`.
    return apiRef.current.subscribeEvent(
      'scrollPositionChange',
      handleRowsScrollEnd
    );
  }, [apiRef]);

  useEffect(() => {
    // If it's the first page, scroll to the top
    // Avoid immediate trigger handleRowsScrollEnd when the searchQuery changes
    if (searchQuery.pageNo === 0) {
      setTimeout(() => {
        if (apiRef.current) {
          apiRef.current.scrollToIndexes({ rowIndex: 0, colIndex: 0 });
        }
      }, 0);
    }
  }, [apiRef, searchQuery.pageNo]);

  const SelectorCell = ({ params }: { params: any }) => {
    const { selectedWatermarkFile } = useSnapshot(FindWtrOrderStore);

    const handleRadioChange = () => {
      onSelectRow(params);
    };

    return (
      <Radio
        onChange={handleRadioChange}
        checked={selectedWatermarkFile?.id === params.row.id}
        value={params.row.id}
        name="row-selector-radio"
        inputProps={{ 'aria-label': 'Select Row' }}
        sx={{
          color: 'var(--neutral-750)', // Default color
        }}
      />
    );
  };

  const ThumbnailCell = ({ params }: { params: any }) => {
    const thumbnailUrl = params.row.details[0]?.moreInfo?.craftedLinks?.small;
    const fileName = params.row.details[0]?.fileName;
    const contentType = params.row.contentType;

    const format = params.row.details[0]?.format;
    let formatValue = format?.toUpperCase();
    if (format?.startsWith('.')) {
      formatValue = format?.slice(1).toUpperCase();
    }
    const isTiff = isTiffFile(params.row.details[0]?.fileName);

    const handleThumbnailClick = () => {
      onPreviewOrder(params);
    };

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 0px',
          overflow: 'hidden',
        }}
      >
        <Box onClick={handleThumbnailClick} sx={{ cursor: 'pointer' }}>
          <ImagePreview
            src={contentType === MEDIA_TYPE.AUDIO ? '' : thumbnailUrl} // Display default thumbnail for audio files
            alt={fileName}
            containerStyle={{
              height: '60px',
              width: '60px',
              flexShrink: 0,
              backgroundColor: 'var(--neutral-600)',
              overflow: 'hidden',
              borderRadius: '8px',
              border: '1px solid var(--neutral-500)',
            }}
            style={{ objectFit: 'cover' }}
            mediaType={contentType}
            isTiff={isTiff}
            thumbnailStyle="icon"
            iconStyle={{
              width: '24px',
              height: '24px',
            }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="4px"
          width="calc(100% - 68px)"
        >
          <TableContent>{fileName || '--'}</TableContent>
          {formatValue && (
            <ContentLabel
              neutral
              variant="caption"
              label={formatValue}
              style={{
                padding: '2px 8px',
                width: 'fit-content',
              }}
            />
          )}
        </Box>
      </Box>
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'selector',
      headerName: '',
      width: 52,
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <SelectorCell params={params} />,
    },
    {
      field: 'thumbnail',
      headerName: `${t('privacy-model-view-order.table.thumbnail-image')}`,
      minWidth: 300,
      maxWidth: 550,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <ThumbnailCell params={params} />,
    },

    {
      field: 'requestDate',
      headerName: `${t('page-watermarking.table.requested')}`,
      width: 200,
      sortable: true,
      disableColumnMenu: true,
      renderCell(params) {
        const formattedDate = params.value
          ? formatDateWithLanguage({
              date: params.value,
              isDetail: false,
              withSlash: true,
              tzOffset,
            })
          : '--';
        const formatTime = params.value
          ? formatDate(params.value, 'h:mm a', timeZone)
          : '';
        return (
          <TableContent sx={{ color: 'var(--gray-25)' }}>
            {formattedDate}
            <br />
            {`${formatTime} (GMT${timeZone})`}
          </TableContent>
        );
      },
    },
  ];

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Loading...
        </Box>
      }
    >
      <Box display="flex" flexDirection="column" gap="12px">
        <Box
          sx={{
            width: '100%',
            height: '510px',
            maxHeight: 'calc(100vh - 400px)',
            display: 'table',
            tableLayout: 'fixed',
          }}
        >
          <StyledDataGrid
            apiRef={apiRef}
            rows={orderArray}
            columns={columns}
            rowCount={total || 0}
            paginationMode="server"
            loading={orderLoading}
            onRowClick={onSelectRow}
            rowHeight={84}
            style={{
              height: '100%',
              maxHeight: 'min(calc(100vh - 400px), 510px)',
            }}
            noResultText={`${t('view-watermarked-order.table.no-results')}`}
            hideFooter={true}
          />
        </Box>

        {orderArray.length > 0 && (
          <Typography
            variant="caption"
            sx={{
              backgroundColor: 'var(--neutral-300)',
              padding: '2px 8px',
              borderRadius: '5px',
              border: '1px solid var(--neutral-700)',
              fontWeight: 600,
              color: 'var(--gray-700)',
              width: 'fit-content',
            }}
          >
            {t('common.total', {
              total,
            })}
          </Typography>
        )}
      </Box>
    </Suspense>
  );
}

export default memo(FindOrderNumberOrderListView);
