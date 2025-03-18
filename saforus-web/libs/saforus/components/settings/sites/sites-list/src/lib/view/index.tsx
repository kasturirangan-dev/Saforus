import { Site } from '@web-workspace/saforus/components/settings/sites/data';
import { Card, List, ListItem } from '@mui/material';
import React from 'react';
import { SiteDetail } from '@web-workspace/saforus/components/settings/sites/site-detail';

interface SettingsSitesListViewProps {
  sites: Site[];
}

const SettingsSitesListView: React.FC<SettingsSitesListViewProps> = ({
  sites,
}) => {
  return (
    <List sx={{ width: '100%', padding: 0 }}>
      {sites.map((site, index) => (
        <Card
          sx={{
            padding: 6,
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
            justifyContent: 'start',
            alignItems: 'start',
            marginBottom: index !== sites.length - 1 ? '1.5rem' : 0,
            overflow: 'auto',
          }}
          key={site.siteId}
        >
          <ListItem alignItems="flex-start" sx={{ width: '100%', padding: 0 }}>
            <SiteDetail site={site} />
          </ListItem>
        </Card>
      ))}
    </List>
  );
};

export default SettingsSitesListView;
