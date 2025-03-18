/// <reference types="vite/client" />
interface ImportMetaEnv extends ViteEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_SESSION_STORAGE_LANG: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_HOME_URL: string;
  readonly VITE_TERMS_URL: string;
  readonly VITE_TERMS_KO_URL: string;
  readonly VITE_PRIVACY_URL: string;
  readonly VITE_PRIVACY_KO_URL: string;
  readonly VITE_SUPPORT_URL: string;
  readonly VITE_SUPPORT_KO_URL: string;
  readonly VITE_DATA_CONTROL_URL: string;
  readonly VITE_SOCKET_URL: string;
  readonly VITE_TUTORIAL_URL: string;
  readonly VITE_TUTORIAL_KO_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_APIKEY: string;
  readonly VITE_AUTHDOMAIN: string;
  readonly VITE_PROJECTID: string;
  readonly VITE_STORAGEBUCKET: string;
  readonly VITE_MESSAGINGSENDERID: string;
  readonly VITE_APPID: string;
  readonly VITE_MEASUREMENTID: string;
  readonly VITE_API_DOC_URL: string;
  readonly VITE_API_CONSOLE_URL: string;
  readonly VITE_ASSETS_URL: string;
  readonly VITE_HIDE_SIGNUP: string;
  readonly VITE_TOSS_CK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
