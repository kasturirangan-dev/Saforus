import {
  fetchFromCollection,
  FIREBASE_COLLECTIONS,
} from '@web-workspace/shared/helpers/firebase';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { FeatureFlag, FeatureFlagStore } from './store';

// This hook returns the feature flag data from Firebase.
const useFeatureFlags = () => {
  const { setFeatureFlags, setError, setLoading, setIsFetched, loading } =
    useSnapshot(FeatureFlagStore);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFromCollection(
          FIREBASE_COLLECTIONS.FEATURE_FLAG
        );
        setFeatureFlags(
          (data as any).reduce(
            (allFlags: FeatureFlag[], currentFlags: FeatureFlag[]) => ({
              ...allFlags,
              ...currentFlags,
            }),
            {}
          )
        );
      } catch (e) {
        setError(e);
        setFeatureFlags([]);
      } finally {
        setLoading(false);
        setIsFetched(true);
      }
    };
    setLoading(true);
    fetchData();
  }, []);

  return {
    loading,
  };
};
export default useFeatureFlags;
