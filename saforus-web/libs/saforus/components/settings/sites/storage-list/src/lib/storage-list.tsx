import StoragesEmptyList from '@web-workspace/saforus/components/settings/sites/storage-empty-list';
import React from 'react';
import {
  SettingSiteStore,
  SiteStorage,
} from '@web-workspace/saforus/components/settings/sites/data';
import { Box, List, Typography } from '@mui/material';
import StorageDetail from '@web-workspace/saforus/components/settings/sites/storage-detail';
import { useTranslation } from 'react-i18next';
import Button from '@web-workspace/shared/components/widgets/button';
import { useSnapshot } from 'valtio';
import StorageForm from '@web-workspace/saforus/components/settings/sites/storage-form';

interface StorageListProps {
  storages: SiteStorage[];
  siteId: number;
}

const StorageList: React.FC<StorageListProps> = ({ storages, siteId }) => {
  const { t } = useTranslation();
  const {
    editingStorageId,
    setNewStorageForm,
    setCurrentSiteId,
    newStorageForm,
    currentSiteId,
  } = useSnapshot(SettingSiteStore);

  const isEditing = Boolean(editingStorageId);
  const isAddNewStorage = Boolean(newStorageForm) && siteId === currentSiteId;

  const onAddStorage = () => {
    if (isEditing || isAddNewStorage) {
      return;
    }
    setNewStorageForm();
    setCurrentSiteId(siteId);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ marginBottom: 0 }}>
          {t('settings-pages.storage.title')}
        </Typography>
        <Button
          color="secondary"
          onClick={onAddStorage}
          disabled={Boolean(editingStorageId) || isAddNewStorage}
        >
          {t('settings-pages.storage.add-storage')}
        </Button>
      </Box>
      {isAddNewStorage && (
        <Box
          sx={{
            padding: '1rem',
            marginTop: '1.5rem',
            background: 'var(--neutral-100)',
          }}
        >
          <StorageForm
            storage={newStorageForm as SiteStorage}
            isEditing={true}
            key="new-storage"
          />
        </Box>
      )}
      {!storages?.length && !isAddNewStorage ? (
        <StoragesEmptyList siteId={siteId} onAdd={onAddStorage} />
      ) : (
        <List sx={{ width: '100%', padding: 0 }}>
          {storages.map((storage) => (
            <StorageDetail storage={storage} key={storage.id} />
          ))}
        </List>
      )}
    </>
  );
};

export default StorageList;
