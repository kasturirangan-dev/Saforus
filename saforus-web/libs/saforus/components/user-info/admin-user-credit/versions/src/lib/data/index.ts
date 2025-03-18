import { useEffect, useState } from 'react';
import {
  fetchFromCollection,
  FIREBASE_COLLECTIONS,
} from '@web-workspace/shared/helpers/firebase';

const useVersionData = () => {
  const [data, setData] = useState({ apps: [], modules: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const versions = await fetchFromCollection(FIREBASE_COLLECTIONS.VERSION);
      if (versions.length) {
        const apps = versions[0]?.apps ?? [];
        const appsArr = apps.map((app: any) => ({
          title: app?.app_name ?? '',
          version: app?.version ?? '',
        }));

        const modules = versions[0]?.modules ?? [];
        const modulesArr = modules.map((module: any) => ({
          title: module.app_name ?? '',
          version: module?.version ?? '',
        }));
        setData({ apps: appsArr, modules: modulesArr });
      }

      setLoading(false);
    };

    getData();
  }, []);

  return {
    data,
    loading,
  };
};

export default useVersionData;
