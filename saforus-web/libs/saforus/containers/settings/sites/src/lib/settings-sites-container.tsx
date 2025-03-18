import { Card } from '@mui/material';
import EmptyList from '@web-workspace/saforus/components/settings/sites/sites-empty-list';
import { useSnapshot } from 'valtio';
import SettingSitesList from '@web-workspace/saforus/components/settings/sites/sites-list';
import { useQuery } from 'react-query';
import LoadingIndicator from '@web-workspace/shared/components/widgets/loading-indicator';
import {
  fetchServiceRegions,
  fetchSites,
  QUERY_KEY,
  ServiceRegion,
  SettingSiteStore,
  Site,
} from '@web-workspace/saforus/components/settings/sites/data';
import { useEffect } from 'react';
import MainLayoutStore from '@web-workspace/shared/helpers/layout/store';

const SettingsSitesContainer = () => {
  const { setSites, sites, setServiceRegions } = useSnapshot(SettingSiteStore);
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(MainLayoutStore);
  const { data, isLoading } = useQuery<Site[]>(
    QUERY_KEY.SITES_LIST,
    fetchSites
  );

  const { data: serviceRegions } = useQuery<ServiceRegion[]>(
    QUERY_KEY.SERVICE_REGIONS,
    fetchServiceRegions
  );

  useEffect(() => {
    if (data && data.length) {
      setSites(data);
      setMainLayoutCss({ height: 'fit-content' });
    } else {
      resetMainLayoutCss();
    }
    return () => {
      resetMainLayoutCss();
    };
  }, [data]);

  useEffect(() => {
    if (serviceRegions && serviceRegions.length) {
      setServiceRegions(serviceRegions);
    }
  }, [serviceRegions]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const isEmpty = Boolean(!sites?.length);
  if (isEmpty || !sites) {
    return (
      <Card
        sx={{
          padding: 6,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <EmptyList />
      </Card>
    );
  }

  return <SettingSitesList />;
};

export default SettingsSitesContainer;
