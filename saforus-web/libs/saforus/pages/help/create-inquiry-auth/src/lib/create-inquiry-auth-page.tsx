import CreateInquiryAuthContainer from '@web-workspace/saforus/containers/help/create-inquiry-auth';
import MyInquiryContainer from '@web-workspace/saforus/containers/help/inquiry';
import AuthStore from '@web-workspace/shared/hooks/use-auth';

export function CreateInquiryAuthPage() {
  return AuthStore?.userInfo?.devMode ? (
    <CreateInquiryAuthContainer />
  ) : (
    <MyInquiryContainer />
  );
}

export default CreateInquiryAuthPage;
