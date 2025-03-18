import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import SearchInquiry from '@web-workspace/saforus-bo/components/customer-support/search-1-1-inquiries';
import { Container, Backdrop, CircularProgress } from '@mui/material';
import CommonStore from '@web-workspace/saforus-bo/common/data';

export function SearchInquiryContainer() {
  const { isLoading } = useSnapshot(CommonStore);
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);

  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <Backdrop
        open={isLoading}
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

      <SearchInquiry isLoading={isLoading} />
    </Container>
  );
}

export default SearchInquiryContainer;
