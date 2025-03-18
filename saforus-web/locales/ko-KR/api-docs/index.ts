import { apiDocsSidemenu } from './api-docs-menu';
import codeExamples from './code-examples';
import tableData from './table-data';
import specifications from './specifications';
import userGuide from './user-guide';
import termDefiniton from './term-definition';
import {
  apiIntegration,
  integrationBasic,
  quickStart,
} from './api-integration';
import csApi from './cs-api';
import errorCodes from `./error-codes`;
import errorCodesData from `./table-error-codes`;

const apiDocs = {
  apiDocsSidemenu,
  'guide-menu': {
    guide: '가이드',
    contents: '목차',
  },
  codeExamples,
  tableData,
  specifications,
  userGuide,
  termDefiniton,
  apiIntegration,
  integrationBasic,
  quickStart,
  csApi,
  errorCodes,
  errorCodesData,
};
export default apiDocs;
