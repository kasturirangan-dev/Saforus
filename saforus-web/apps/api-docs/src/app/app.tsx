import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from '@web-workspace/api-docs/app-routes';
import GlobalDialog from '@web-workspace/shared/components/dialogs/global';
import LoadingIndicator from '@web-workspace/shared/components/widgets/loading-indicator';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './app.module.scss';
import ToastContainer from '@web-workspace/shared/components/widgets/toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export function App() {
  return (
    <React.Suspense fallback={<LoadingIndicator />}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={AppRouter} />
          <GlobalDialog />
          <ToastContainer />
        </QueryClientProvider>
      </LocalizationProvider>
    </React.Suspense>
  );
}

export default App;
