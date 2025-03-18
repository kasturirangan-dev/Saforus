import { USER_GUIDE } from './user-guide';
import { TERM_DEFINITION } from './term-definition';
import { API_INTEGRATION_ROUTES } from './api-integration';
import { CS_API_ROUTES } from './cs-api';
import { ERROR_CODES } from './error-codes';
import { WEBHOOKS } from './webhook-api';
import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';
import SaforusPagesNotfound from '@web-workspace/saforus/pages/notfound';
import { Navigate, createBrowserRouter } from 'react-router-dom';

const AppRouter = createBrowserRouter([
  {
    path: '',
    element: <Navigate to={API_DOCS_ROUTES.USER_GUIDE.path} replace />,
  },
  { ...USER_GUIDE },
  { ...TERM_DEFINITION },
  { ...API_INTEGRATION_ROUTES },
  { ...CS_API_ROUTES },
  { ...ERROR_CODES },
  { ...WEBHOOKS },
  {
    path: API_DOCS_ROUTES.NOTFOUND.path,
    element: <SaforusPagesNotfound />,
  },
]);

export default AppRouter;
