import { PATTERN } from '@web-workspace/saforus/constants/validation';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { createInquiry } from '@web-workspace/saforus/components/help/data';
import { getTeamId } from '@web-workspace/saforus/common/utils';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export const inquiryValidationSchema = yup
  .object({
    title: yup.string()
      .required('error-message.title-required')
      .matches(PATTERN.TITLE, 'error-message.title-invalid')
      .max(150, 'error-message.max-length-150'),
    email: yup
      .string()
      .required('error-message.email-required')
      .matches(PATTERN.EMAIL, 'error-message.email-invalid')
      .max(254, 'error-message.max-length-254'),
    company: yup
      .string()
      .required('error-message.company-name-required')
      .max(50, 'error-message.max-length-50')
      .matches(PATTERN.COMPANY_NAME, 'error-message.name-special-allowed'),
    category: yup
      .string()
      .required('error-message.required'),
    content: yup.string()
      .required('error-message.content-required')
      .min(100, 'error-message.min-length-100')
      .max(1000, 'error-message.max-length-1000'),
    files: yup
      .array()
      .max(1, 'error-message.max-file-length')
      .optional(),
    agreement: yup
      .boolean()
      .required('error-message.checkbox-required')
      .oneOf([true], 'error-message.checkbox-required'),
    share: yup
      .boolean()
      .optional(),
  })
  .required();

export type InquiryFieldValuesForm = yup.InferType<typeof inquiryValidationSchema>;


export function useCreateInquiryData() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: InquiryFieldValuesForm) => {
    try {
      setLoading(true);
      const teamId = getTeamId() ?? '';

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('qaType', 'QUESTION');
      formData.append('qaNo', '');
      formData.append('qaCategory', data.category);
      formData.append('teamId', teamId ? teamId.toString() : '');
      formData.append('userId', AuthStore.userInfo?.id ?? '');
      data.files?.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('isOpenToTeam', data.share ? 'true' : 'false');

      const response = await createInquiry(formData);
      if (response.resultCode === 201) {
        showToast.success(
          `${t('help.create-inquiry.create-successful')}`,
          {
            delay: 0,
          }
        );
        navigate(`${ROUTES.HELP.HELP_CENTER.children.INQUIRY_DETAIL.path}/${response.resourceId}`, { replace: true });
      } else if (response.resultCode === 401048) {
        showToast.error(
          `${t('help.create-inquiry.create-failed-max-file')}`,
          {
            delay: 0,
          }
        );
      } else if (response.resultCode === 401049) {
        showToast.error(
          `${t('help.create-inquiry.create-failed-max-file-size')}`,
          {
            delay: 0,
          }
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<InquiryFieldValuesForm>({
    resolver: yupResolver(inquiryValidationSchema),
    defaultValues: {
      title: '',
      email: AuthStore.userInfo?.email ?? '',
      company: AuthStore.userInfo?.company ?? '',
      category: '',
      content: '',
      files: [],
      agreement: false,
      share: false,
    },
  });

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    control,
    setValue,
    getValues,
    isLoading: loading,
  }
}