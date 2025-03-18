import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import {
  TeamValidationSchema,
  QUERY_KEY,
  UserTeamStore,
  createInvitation,
  InvitationErrorCode,
} from '@web-workspace/saforus/components/user-info/team-member/data';
import { PATTERN } from '@web-workspace/saforus/constants/validation';
import { InviteValidation } from './interface';
import { useSnapshot } from 'valtio';
import { Member } from '@web-workspace/shared/hooks/use-auth';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';

const useInviteMemberData = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { currentTeamId, searchQuery } = useSnapshot(UserTeamStore);
  const { t } = useTranslation();
  // const {
  //   mutate: onInviteMember,
  //   isLoading: loading,
  //   error,
  // } = useMutation(inviteMember, {
  //   onSuccess: () => {
  //     showToast.success(
  //       `${t('team-member.message.invite-member-successful')}`,
  //       {
  //         delay: 0,
  //       }
  //     );
  //     queryClient.invalidateQueries([
  //       QUERY_KEY.MEMBER_LIST,
  //       ...Object.values(searchQuery),
  //     ]);
  //     onClose();
  //   },
  // });

  const inviteMemberValidationSchema: TeamValidationSchema<InviteValidation> = {
    // fullName: string()
    //   .required(
    //     `${t('error-message.invite-member-error-message.name-required')}`
    //   )
    //   .matches(
    //     PATTERN.EXCLUDES_SPECIAL_CHARACTER,
    //     `${t(
    //       'error-message.invite-member-error-message.exclucdes-special-characters'
    //     )}`
    //   )
    //   .max(
    //     50,
    //     `${t('error-message.invite-member-error-message.max-50-character')}`
    //   )
    //   .matches(
    //     PATTERN.FIRST_LETTER,
    //     `${t(
    //       'error-message.invite-member-error-message.first-character-must-letter'
    //     )}`
    //   ),
    fullName: string()
      .required(`${t('error-message.name-required')}`)
      .matches(PATTERN.NAME, `${t('error-message.name-invalid')}`)
      .matches(
        PATTERN.NOT_SPACE_START,
        `${t('error-message.name-not-start-space')}`
      )
      .max(50, `${t('error-message.max-length-50')}`),
    emailAddress: string()
      .required(
        `${t('error-message.invite-member-error-message.email-required')}`
      )
      .matches(
        PATTERN.EMAIL,
        `${t('error-message.invite-member-error-message.email-format')}`
      )
      .matches(
        PATTERN.ONLY_ENGLISH,
        `${t('error-message.invite-member-error-message.email-must-english')}`
      )
      .max(
        254,
        `${t('error-message.invite-member-error-message.max-254-character')}`
      ),
    userRole: string().required(
      `${t('error-message.invite-member-error-message.role-required')}`
    ),
  };
  const validationSchema = object().shape(inviteMemberValidationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Partial<Member>>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: Partial<Member>) => {
    try {
      setLoading(true);
      const response = await createInvitation({
        ...data,
        teamId: currentTeamId,
      });

      if (
        response &&
        response.resultCode >= 200 &&
        response.resultCode <= 299
      ) {
        showToast.success(`${t('team-member.message.invite-member-successful')}`, {
          delay: 0,
        });
        queryClient.refetchQueries([QUERY_KEY.MEMBER_LIST]);
      } else {
        if (response?.status) {
          const defaultMessage = `${t(
            'team-member.dialog.invite-member-failed',
            {
              code: response.status,
            }
          )}`;

          showToast.error(
            response.status === InvitationErrorCode.MEMBER_OF_ANOTHER_TEAM
              ? t('team-member.dialog.member-of-another-team')
              : defaultMessage,
            {
              delay: 0,
            }
          );
        } else {
          showToast.error(
            `${t('team-member.dialog.invite-member-failed-nocode')}`,
            {
              delay: 0,
            }
          );
        }
      }
    } catch (error) {
      console.warn('error inviteMember', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    control,
    loading,
  };
};

export default useInviteMemberData;
