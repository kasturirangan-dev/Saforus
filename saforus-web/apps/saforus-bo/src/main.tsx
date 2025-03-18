import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { i18n, initializeI18next } from '@web-workspace/shared/i18n';
import { I18nextProvider } from 'react-i18next';
import theme from '@web-workspace/saforus-bo/themes';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

const sessionLangKey = getEnvVar('VITE_SESSION_STORAGE_LANG') || '';
initializeI18next(sessionLangKey, 'en');

// Set default language English for BO
i18n.changeLanguage('en');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ThemeProvider>
  </StrictMode>
);
