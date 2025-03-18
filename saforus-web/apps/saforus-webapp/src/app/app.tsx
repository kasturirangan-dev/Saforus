import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from '@web-workspace/saforus/themes';

import AppRouter from '@web-workspace/saforus/app-routes';
import GlobalDialog from '@web-workspace/shared/components/dialogs/global';
import LoadingIndicator from '@web-workspace/shared/components/widgets/loading-indicator';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './app.module.scss';
import ToastContainer from '@web-workspace/shared/components/widgets/toast';
import useFeatureFlags from '@web-workspace/shared/feature-flag';
// import { setMediaConfigs } from '@web-workspace/saforus/common/model';
import { i18n } from '@web-workspace/shared/i18n';
import { useTranslation } from 'react-i18next';
import { performance, analytics } from '@web-workspace/shared/helpers/firebase';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export function App() {
  // Initialize Firebase with performance and analytics
  const initFirebase = { performance, analytics };

  // Load feature flags
  const { loading: configLoaded } = useFeatureFlags();

  const { t } = useTranslation();

  // useEffect(() => {
  //   setMediaConfigs(); // to mutate the media configs based on feature flags
  // }, [configLoaded]);

  const themeObj = theme(i18n.language === 'en' ? ['Inter'] : ['Noto Sans KR']);

  return (
    <ThemeProvider theme={themeObj}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={AppRouter} />
            <GlobalDialog />
            <ToastContainer />
          </QueryClientProvider>
        </LocalizationProvider>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
