/* eslint-disable-next-line */
import DynamicMetatagContainer from '@web-workspace/saforus/containers/dynamic-metatag';
import SaforusContainersLogin from '@web-workspace/saforus/containers/login';
import { useTranslation } from 'react-i18next';

export interface SaforusPagesLoginProps {
  [key: string]: any;
}

export function SaforusPagesLogin(props: SaforusPagesLoginProps) {
  const { t } = useTranslation();

  return (
    <div>
      <DynamicMetatagContainer
        title={t('pageHeader.login.title')}
        desc={t('pageHeader.login.desc')}
      />
      <SaforusContainersLogin />
    </div>
  );

  // Contain form login, form footer
  // Return <>
  //  <FormLoginContainer />
  //  <FormFooterContainer />
  // </>
  // => A page can contains many containers
  // => A container can contains many components. If it's simple enough, container is just enough
}

export default SaforusPagesLogin;
