import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

import { i18n, initializeI18next } from '@web-workspace/shared/i18n';
import { I18nextProvider } from 'react-i18next';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { GoogleOAuthProvider } from '@react-oauth/google';

const sessionLangKey = getEnvVar('VITE_SESSION_STORAGE_LANG') || '';
const clientId = getEnvVar('VITE_GOOGLE_CLIENT_ID');

// Initialize i18next with the session language key
// Check if the language key is set when the app is prerendered
initializeI18next(
  sessionLangKey,
  window.__PRERENDER_INJECTED?.lang || undefined
);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </StrictMode>
  </GoogleOAuthProvider>
);
