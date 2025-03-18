import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import HelpContent from '@web-workspace/saforus/components/help/views';

export function HelpContainer() {
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

  return <HelpContent />;
}

export default HelpContainer;
