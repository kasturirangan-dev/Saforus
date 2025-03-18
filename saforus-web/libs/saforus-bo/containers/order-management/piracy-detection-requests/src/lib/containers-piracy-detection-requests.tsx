import { Container, Backdrop, CircularProgress, Box } from '@mui/material';
import PiracyOrderList from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/list';
import PiracyOrderSearch from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/search';
import usePiracyDetectionRequestsData from './data';
import { useSnapshot } from 'valtio';
import { PiracyDetectionRequestsStore } from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/data';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { useEffect } from 'react';
import CommonStore from '@web-workspace/saforus-bo/common/data';

export function ContainersOrderManagementPiracyDetectionRequests() {
  const { resetPiracyDetectionRequestStore } = useSnapshot(
    PiracyDetectionRequestsStore
  );
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { isLoading: isLoadingOptions } = useSnapshot(CommonStore);
  const { isLoadingRequest } = usePiracyDetectionRequestsData();

  useEffect(() => {
    resetPiracyDetectionRequestStore();
    setMainLayoutCss({ height: 'fit-content', width: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <Backdrop
        open={isLoadingOptions}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          color: 'var(--main-brand)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '3.125rem',
          gap: '1.5rem',
        }}
      >
        {!isLoadingOptions && <PiracyOrderSearch />}
        <PiracyOrderList isRequestsLoading={isLoadingRequest} />
      </Box>
    </Container>
  );
}

export default ContainersOrderManagementPiracyDetectionRequests;
