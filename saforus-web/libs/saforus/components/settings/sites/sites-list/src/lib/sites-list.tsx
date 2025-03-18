import useSitesListData from './data';
import SettingsSitesListView from './view';

const SettingSitesList = () => {
  const { sites } = useSitesListData();
  return <SettingsSitesListView sites={sites} />;
};

export default SettingSitesList;
