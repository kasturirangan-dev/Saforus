import {
  TransContent,
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';

import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';

export const WebhookInfo = () => {
  const { t } = useTranslation();

  return (
    <TextContent component="div">
      <TransContent
        i18nKey="integrationBasic.webhook.content-1"
        link={`${API_DOCS_ROUTES.TERM_DEFINITION.path}#webhook`}
      />
      <br />
      <br />
      <TransContent
        i18nKey="integrationBasic.webhook.content-2"
        link={`${API_DOCS_ROUTES.WEBHOOKS.path}#securing`}
      />
    </TextContent>
  );
};
