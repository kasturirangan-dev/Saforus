import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import HomeContent from '@web-workspace/saforus/components/home';

export function HomeContainer() {
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);

  useEffect(() => {
    setMainLayoutCss({
      height: '100%',
      padding: '0px',
    });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return <HomeContent />;
}

export default HomeContainer;
