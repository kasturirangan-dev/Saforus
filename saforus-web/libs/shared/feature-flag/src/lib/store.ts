import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

export const enum FeatureFlag {
  SHOW_CLOUD_STORAGE = 'showCloudStorage',
  PD = 'pd',
  FWM = 'fwm',
  NOTIFICATION = 'notification',
  PNG = 'png',
  TIFF = 'tiff',
  ALLOW_PDF = 'allowPdf',
  REQUESTFOREXTENSION = 'requestForExtension', // button request for extension at free plan in service and plan page
  THUMBNAILS = 'thumbnails',
  ANALYTICS = 'analytics',
  RESPONSIVE = 'responsive',
  AUTO_MATCHING = 'autoMatching', // Enable auto matching in Privacy Detection
  SHOW_ANNOUCEMENT = 'showAnnouncement'
}

type FeatureFlags = {
  [key in FeatureFlag]: boolean;
};

interface State {
  featureFlags: FeatureFlags | null;
  loading: boolean;
  error: any;
  isFetched: boolean;
}

interface Action {
  setFeatureFlags: (featureFlags: FeatureFlags) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: any) => void;
  setIsFetched: (isFetched: boolean) => void;
}

const initialState: State = {
  featureFlags: null,
  loading: false,
  error: null,
  isFetched: false,
};

export const FeatureFlagStore = proxy<State & Action>({
  ...initialState,
  setError: (error: any) => (FeatureFlagStore.error = error),
  setFeatureFlags: (featureFlags: FeatureFlags) =>
    (FeatureFlagStore.featureFlags = featureFlags),
  setLoading: (loading: boolean) => (FeatureFlagStore.loading = loading),
  setIsFetched: (isFetched: boolean) => (FeatureFlagStore.isFetched = true),
});

export function isFeatureEnabled(featureFlag: FeatureFlag) {
  return FeatureFlagStore.featureFlags?.[featureFlag];
}

devtools(FeatureFlagStore, { name: 'FEATURE_FLAG' });
