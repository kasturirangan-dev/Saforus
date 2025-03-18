import { SettingSiteStore } from '@web-workspace/saforus/components/settings/sites/data';
import { useSnapshot } from 'valtio';

const useSitesListData = () => {
  const snap = useSnapshot(SettingSiteStore) as typeof SettingSiteStore;
  const { sites } = snap;

  return {
    sites: sites.slice(),
  };
};

export default useSitesListData;
