import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { ServiceRegion, Site, SiteStorage } from './interface';

import {
  createSites,
  updateSite,
  deleteSite,
  createStorage,
  updateStorage,
  deleteStorage,
} from './api';

interface SettingSiteStoreType {
  sites: Site[] | null;
  setSites: (sites: Site[]) => void;
  currentSiteId: number | null;
  setCurrentSiteId: (siteId: number | null) => void;
  editingStorageId: number | null;
  setEditingStorageId: (storageId: number | null) => void;
  newCreatedStorageId: number | null;

  newStorageForm: SiteStorage | null;
  setNewStorageForm: (reset?: boolean) => void;

  serviceRegions: ServiceRegion[] | null;
  setServiceRegions: (data: ServiceRegion[]) => void;

  updateSiteOverview: (
    siteId: string,
    updatedOverview: Partial<Site>
  ) => Promise<Site | null>;
  updateStorage: (
    storageId: number | null,
    updatedStorage: SiteStorage
  ) => Promise<SiteStorage | undefined | null>;
  createSite: (newSite: Partial<Site>) => Promise<Site>;
  addNewStorage: (newStorage: SiteStorage) => Promise<SiteStorage | null>;
  turnOffStorageForm: () => void;
  findSiteIdByStorageId: (storageId: number | null) => number | null;
  deleteSite: (siteId: number) => Promise<boolean>;
  deleteStorage: (storageId: number) => Promise<boolean>;
}

function createSettingSiteStore() {
  const store: SettingSiteStoreType = {
    sites: null,
    setSites: (sites) => {
      SettingSiteStore.sites = sites;
    },
    currentSiteId: null,
    setCurrentSiteId: (siteId) => {
      SettingSiteStore.currentSiteId = siteId;
    },
    editingStorageId: null,
    setEditingStorageId: (storageId) => {
      SettingSiteStore.editingStorageId = storageId;
      const siteId = SettingSiteStore.findSiteIdByStorageId(storageId);
      SettingSiteStore.setCurrentSiteId(siteId);
    },
    newCreatedStorageId: null,

    newStorageForm: null,
    setNewStorageForm: (reset = false) => {
      if (reset) {
        SettingSiteStore.newStorageForm = null;
      } else {
        SettingSiteStore.newStorageForm = {
          storageName: '',
          bucketName: '',
          storagePath: '',
          accessKey: '',
          secretKey: '',
          storageId: '',
          storageType: '',
          serviceRegionIdx: 0,
          ioType: 0,
          description: '',
        };
      }
    },

    serviceRegions: [],
    setServiceRegions: (data) => {
      SettingSiteStore.serviceRegions = data;
    },

    updateSiteOverview: async (siteId, updatedOverview) => {
      const siteIndex = (SettingSiteStore.sites || []).findIndex(
        (s: Site) => s.siteId === siteId
      );
      let updatedData = null;
      if (siteIndex !== -1) {
        const currentSiteData = (SettingSiteStore.sites || [])[siteIndex];
        // Merge current site data with updated data
        const combinedData = { ...currentSiteData, ...updatedOverview };
        // Call the real API to update the site
        updatedData = await updateSite(combinedData);
        if (updatedData) {
          // Update the site in the store with the new data
          (SettingSiteStore.sites || [])[siteIndex] = updatedData;
        }
      }
      return updatedData;
    },
    updateStorage: async (storageId, updatedStorage) => {
      const siteId = SettingSiteStore.currentSiteId;

      if (!siteId || !storageId) {
        return null;
      }
      let updatedData = await updateStorage(updatedStorage);

      // API success, but doesn't contain data
      if (!updatedData && updatedData !== null) {
        updatedData = updatedStorage;
      }

      if (updatedData) {
        const siteIndex = (SettingSiteStore.sites || []).findIndex(
          (s) => s.id === siteId
        );
        if (siteIndex !== -1) {
          const storageIndex = (SettingSiteStore.sites || [])[
            siteIndex
          ].storages.findIndex((s: SiteStorage) => s.storageId === storageId);
          if (storageIndex !== -1) {
            (SettingSiteStore.sites || [])[siteIndex].storages[storageIndex] =
              updatedData;
          }
          return updatedData;
        }
      }
      return null;
    },
    createSite: async (newSite) => {
      const result = await createSites(newSite);
      if (result === null) {
        // Return the error response
        return {
          isSuccess: false,
          data: null,
        };
      } else {
        // Remove the created site if an error occurs
        const siteIndex = (SettingSiteStore.sites || []).findIndex(
          (site) => site.id === result.id
        );
        if (siteIndex !== -1) {
          (SettingSiteStore.sites || []).splice(siteIndex, 1);
        }
      }
      return result;
    },
    addNewStorage: async (newStorage) => {
      const siteId = SettingSiteStore.currentSiteId;
      if (!siteId) {
        return null;
      }
      const siteIndex = (SettingSiteStore.sites || []).findIndex(
        (s: Site) => s.id === siteId
      );
      if (siteIndex !== -1) {
        const newStorageWithId: SiteStorage = {
          ...newStorage,
          relateId: siteId,
        };
        const createdStorage = await createStorage(newStorageWithId);
        if (!createdStorage.isSuccess) {
          (SettingSiteStore.sites || [])[siteIndex].storages.shift(); // Remove the newly added storage from the list
          return null;
        }
        (SettingSiteStore.sites || [])[siteIndex].storages.unshift(
          createdStorage.data
        );
        SettingSiteStore.newCreatedStorageId = createdStorage.data.id || null;
        return createdStorage;
      }
      return null;
    },
    turnOffStorageForm: () => {
      SettingSiteStore.setEditingStorageId(null);
      SettingSiteStore.setNewStorageForm(true);
    },
    findSiteIdByStorageId: (storageId) => {
      for (const site of SettingSiteStore.sites || []) {
        if (
          site.storages.some((storage: SiteStorage) => storage.id === storageId)
        ) {
          return site.id;
        }
      }
      return null;
    },
    deleteSite: async (siteId) => {
      const success = await deleteSite(siteId);
      if (success) {
        SettingSiteStore.sites = (SettingSiteStore.sites || []).filter(
          (site) => site.id !== siteId
        );
        SettingSiteStore.setCurrentSiteId(null);
      }
      return success;
    },
    deleteStorage: async (storageId) => {
      const siteId = SettingSiteStore.findSiteIdByStorageId(storageId);
      if (!siteId) {
        return false;
      }
      const success = await deleteStorage(storageId);
      if (success) {
        const siteIndex = (SettingSiteStore.sites || []).findIndex(
          (site) => site.id === siteId
        );
        if (siteIndex !== -1) {
          (SettingSiteStore.sites || [])[siteIndex].storages =
            (SettingSiteStore.sites || [])[siteIndex].storages.filter(
              (storage) => storage.id !== storageId
            );
        }
      }
      return success;
    },
  };

  return store;
}

const SettingSiteStore = proxy<SettingSiteStoreType>(createSettingSiteStore());

devtools(SettingSiteStore, { name: 'SETTINGS_SITES' });

export default SettingSiteStore;
