import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { Container, Backdrop, CircularProgress } from '@mui/material';
import CreateInquiryAuth from '@web-workspace/saforus/components/help/create-inquiry-auth';
import CommonStore from '@web-workspace/saforus/common/data';

export function CreateInquiryAuthContainer() {
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { isLoading } = useSnapshot(CommonStore);

  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <div>
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

      <CreateInquiryAuth />
    </div>
  );
}

export default CreateInquiryAuthContainer;
