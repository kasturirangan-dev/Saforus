import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { CreateInfo, PiracyStoreType } from './interface';
import { MEDIA_TYPE, MediaConfigs } from '@web-workspace/saforus/common/model';
import { SEARCH_TYPE } from './create-new-request.const';

const PiracyStore = proxy<PiracyStoreType>(createStore());

function createStore() {
  const store: PiracyStoreType = {
    files: [],
    title: '',
    mediaType: 'ANY_AVAILABLE',
    createInfo: null,
    contentType: '',
    configFile: MediaConfigs.ANY_AVAILABLE,
    searchType: SEARCH_TYPE.AUTO,
    fileErrorMsg: '',
    watermarkInfo: null,

    setConfigFile: (mediaType: string) => {
      switch (mediaType) {
        case MEDIA_TYPE.VIDEO:
          PiracyStore.configFile = MediaConfigs.VIDEO;
          break;
        case MEDIA_TYPE.AUDIO:
          PiracyStore.configFile = MediaConfigs.AUDIO;
          break;
        case MEDIA_TYPE.DOCUMENT:
          PiracyStore.configFile = MediaConfigs.DOCUMENT;
          break;
        case 'ANY_AVAILABLE':
          PiracyStore.configFile = MediaConfigs.ANY_AVAILABLE;
          break;
        default:
          PiracyStore.configFile = MediaConfigs.IMG;
          break;
      }
    },
    setContentType: (contentType: string) => {
      switch (contentType) {
        case MEDIA_TYPE.VIDEO:
          PiracyStore.contentType = 'VIDEO';
          break;
        case MEDIA_TYPE.AUDIO:
          PiracyStore.contentType = 'AUDIO';
          break;
        case MEDIA_TYPE.DOCUMENT:
          PiracyStore.contentType = 'DOCUMENT';
          break;
        default:
          PiracyStore.contentType = 'IMG';
          break;
      }
    },
    setFiles: (value) => {
      if (value && value?.length > 0) {
        PiracyStore.files.push(...value);
      } else {
        PiracyStore.files = [];
      }
    },
    removeFiles: (id: string) => {
      PiracyStore.files = PiracyStore.files.filter((el) => el && el.id !== id);
    },
    setMediaType: (mediaType) => {
      PiracyStore.mediaType = mediaType;
    },
    setTitle: (value: string) => {
      PiracyStore.title = value;
    },
    setCreateInfo: (value: CreateInfo | null) => {
      PiracyStore.createInfo = value;
    },
    setSearchType: (value: SEARCH_TYPE) => {
      PiracyStore.searchType = value;
    },
    setFileErrorMsg: (errorMsg) => {
      PiracyStore.fileErrorMsg = errorMsg;
    },
    setWatermarkInfo: (data) => {
      PiracyStore.watermarkInfo = data;
    },
    updateWatermarkFile: (data) => {
      if (PiracyStore.watermarkInfo) {
        PiracyStore.watermarkInfo = { ...PiracyStore.watermarkInfo, ...data };
      }
    },

    onReset: () => {
      PiracyStore.files = [];
      PiracyStore.title = '';
      PiracyStore.mediaType = 'ANY_AVAILABLE';
      PiracyStore.configFile = MediaConfigs.ANY_AVAILABLE;
      PiracyStore.searchType = SEARCH_TYPE.AUTO;
      PiracyStore.fileErrorMsg = '';
      PiracyStore.watermarkInfo = null;
    },
  };
  return store;
}

devtools(PiracyStore, { name: 'PIRACY_DETECTION' });

export default PiracyStore;
