import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { Container } from '@mui/material';
import InquiryDetail from '@web-workspace/saforus/components/help/inquiry-detail';

export function InquiryDetailContainer() {
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);

  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <div>
      <InquiryDetail />
    </div>
  );
}

export default InquiryDetailContainer;
