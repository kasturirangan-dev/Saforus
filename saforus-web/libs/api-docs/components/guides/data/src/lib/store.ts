import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { Language } from './interface';

interface GuideState {
  // Active section id
  activeSectionId: string | null;
  // Is observing active section
  isObserving: boolean;
  codeLanguage: Language;

  setActiveSectionId: (id: string | null) => void;
  setCodeLanguage: (language: string) => void;
  setIsObserving: (isObserving: boolean) => void;
}

function createApiKeyStore() {
  const store: GuideState = {
    activeSectionId: null,
    isObserving: false,
    codeLanguage: 'java',

    setActiveSectionId: (id: string | null) => {
      GuideStore.activeSectionId = id;
    },
    setCodeLanguage: (language: string) => {
      GuideStore.codeLanguage = language as Language;
    },
    setIsObserving: (isObserving: boolean) => {
      GuideStore.isObserving = isObserving;
    },
  };
  return store;
}

const GuideStore = proxy<GuideState>(createApiKeyStore());
export default GuideStore;

devtools(GuideStore, { name: 'GUIDE_STORE' });
