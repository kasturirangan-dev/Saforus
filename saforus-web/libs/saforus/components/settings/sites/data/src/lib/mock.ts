import { Site, SiteStorage } from './interface';

const mockSites: Site[] = [
  {
    siteId: '9AM8',
    siteName: 'Site 1',
    siteUrl: 'https://site1.com',
    siteKey: 'site1_key',
    accessKey: 'access_key_1',
    storages: [
      {
        storageName: 'Storage 1',
        bucketName: 'Package 1',
        storagePath: '/path/to/file1',
        accessKey: 'access_key_1',
        secretKey: 'secret_key_1',
        storageId: 'storage_id_1',
        storageType: 'Type 1',
        serviceRegionIdx: 'ap-southeast-1',
        ioType: 'Input',
        description: 'Description 1',
        createdAt: new Date(),
      },
      {
        storageName: 'Storage 2',
        bucketName: 'Package 2',
        storagePath: '/path/to/file2',
        accessKey: 'access_key_2',
        secretKey: 'secret_key_2',
        storageId: 'storage_id_2',
        storageType: 'Type 2',
        serviceRegionIdx: 'ap-southeast-1',
        ioType: 'Output',
        description: 'Description 2',
        createdAt: new Date(),
      },
    ],
    createdAt: new Date(),
  },
  {
    siteId: '10ABM1',
    siteName: 'Site 2',
    siteUrl: 'https://site2.com',
    siteKey: 'site2_key',
    accessKey: 'access_key_2',
    storages: [
      {
        storageName: 'Storage 3',
        bucketName: 'Package 3',
        storagePath: '/path/to/file3',
        accessKey: 'access_key_3',
        secretKey: 'secret_key_3',
        storageId: 'storage_id_3',
        storageType: 'Type 3',
        serviceRegionIdx: 'ap-southeast-1',
        ioType: 'Input',
        description: 'Description 3',
        createdAt: new Date(),
      },
      {
        storageName: 'Storage 4',
        bucketName: 'Package 4',
        storagePath: '/path/to/file4',
        accessKey: 'access_key_4',
        secretKey: 'secret_key_4',
        storageId: 'storage_id_4',
        storageType: 'Type 4',
        serviceRegionIdx: 'ap-southeast-1',
        ioType: 'Output',
        description: 'Description 4',
        createdAt: new Date(),
      },
    ],
    createdAt: new Date(),
  },
];

export function mockCreateSites(newSite: Partial<Site>): Promise<Site> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const createdSite: Site = {
        ...(newSite as Site),
        siteId: `site_${Date.now()}`,
        storages: [],
        createdAt: new Date(),
        siteKey: `site_key_${Date.now()}`,
        accessKey: `access_key_${Date.now()}`,
      };

      mockSites.unshift(createdSite);

      resolve(createdSite);
    }, 1000); // Simulate API delay
  });
}

export function mockFetchSites(): Promise<Site[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockSites]); // Return a copy of the mockSites list to simulate API response
    }, 1000); // Simulate API delay
  });
}

export function mockUpdateSite(
  siteId: string,
  updatedOverview: Partial<Site>
): Promise<Site> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const siteIndex = mockSites.findIndex((s) => s.siteId === siteId);
      if (siteIndex !== -1) {
        mockSites[siteIndex] = {
          ...mockSites[siteIndex],
          ...updatedOverview,
        };
        resolve(mockSites[siteIndex]);
      } else {
        throw new Error('Site not found');
      }
    }, 1000); // Simulate API delay
  });
}

export function mockUpdateStorage(
  siteId: string,
  storageId: string,
  updatedStorage: SiteStorage
): Promise<SiteStorage> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const siteIndex = mockSites.findIndex((s) => s.siteId === siteId);
      if (siteIndex !== -1) {
        const storageIndex = mockSites[siteIndex].storages.findIndex(
          (s) => s.storageId === storageId
        );
        if (storageIndex !== -1) {
          mockSites[siteIndex].storages[storageIndex] = {
            ...mockSites[siteIndex].storages[storageIndex],
            ...updatedStorage,
          };
          resolve(mockSites[siteIndex].storages[storageIndex]);
        } else {
          throw new Error('Storage not found');
        }
      } else {
        throw new Error('Site not found');
      }
    }, 1000); // Simulate API delay
  });
}

export function mockCreateStorage(
  siteId: string,
  newStorage: SiteStorage
): Promise<SiteStorage> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const siteIndex = mockSites.findIndex((s) => s.siteId === siteId);
      if (siteIndex !== -1) {
        const newStorageWithId = {
          ...newStorage,
          storageID: `${new Date().getTime()}-${newStorage.storageName}`, // Generate a unique storage ID
        };
        mockSites[siteIndex].storages.unshift(newStorageWithId);
        resolve(newStorageWithId);
      } else {
        throw new Error('Site not found');
      }
    }, 1000); // Simulate API delay
  });
}

export function mockDeleteSite(siteId: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const siteIndex = mockSites.findIndex((site) => site.siteId === siteId);
      if (siteIndex !== -1) {
        mockSites.splice(siteIndex, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 1000); // Simulate API delay
  });
}

export function mockDeleteStorage(
  siteId: string,
  storageId: string
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const siteIndex = mockSites.findIndex((site) => site.siteId === siteId);
      if (siteIndex !== -1) {
        const storageIndex = mockSites[siteIndex].storages.findIndex(
          (storage) => storage.storageId === storageId
        );
        if (storageIndex !== -1) {
          mockSites[siteIndex].storages.splice(storageIndex, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    }, 1000); // Simulate API delay
  });
}
