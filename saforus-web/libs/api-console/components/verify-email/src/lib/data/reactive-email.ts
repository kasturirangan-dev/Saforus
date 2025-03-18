import { useState } from 'react';
import useResendEmailServiceApi from './reactive-api';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import { useTranslation } from 'react-i18next';

export function useResendEmailData() {
  const { t } = useTranslation();
  const { postResendEmail } = useResendEmailServiceApi();
  const [loading, setLoading] = useState(false);
  const [resultResendEmail, setResultResendEmail] = useState<any | null>();

  const resendVerificationEmail = async (email: string) => {
    setLoading(true);

    try {
      const response = await postResendEmail(email);
      if (response.data.code === 'CSA1101') {
        showToast.error(t('apiRegister.errors.account-verified'));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return {
    resendVerificationEmail,
    loading,
    resultResendEmail,
  };
}
