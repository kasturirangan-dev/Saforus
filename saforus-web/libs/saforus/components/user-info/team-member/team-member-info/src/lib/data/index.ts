import { useEffect } from 'react';
import { date, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import {
  QUERY_KEY,
  TeamValidationSchema,
  SearchMemberValues,
  SearchMemberValidation,
  UserTeamStore,
  fetchMembers,
  MemberSearchType,
  fetchMetaData,
  MembersResponseData,
  fetchInvitation,
  InvitationStatus,
  InvitationErrorCode,
} from '@web-workspace/saforus/components/user-info/team-member/data';
import { useQuery } from 'react-query';
import { Member } from '@web-workspace/shared/hooks/use-auth';
import { cloneDeep } from 'lodash-es';
import { TOption } from '@web-workspace/saforus/common/model';
import { getTeamId } from '@web-workspace/saforus/common/utils';
import { useSearchParams } from 'react-router-dom';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';

const enabledState = new Map();

const useQueryWithEffect = ({
  key,
  queryFn,
  setSearchTypes,
}: {
  key: string;
  queryFn: any;
  setSearchTypes: (values: any[], type: MemberSearchType) => void;
}) => {
  // Initialize `enabled` to `true` if it hasn't been set for this key.
  if (!enabledState.has(key)) {
    enabledState.set(key, true);
  }

  const { isLoading, isError, data, error } = useQuery<unknown, Error, any[]>({
    queryKey: [key],
    queryFn: queryFn,
    enabled: enabledState.get(key),
    onSuccess: () => {
      // Set `enabled` to `false` after the first successful fetch.
      enabledState.set(key, false);
    },
  });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      const responseData = data?.data ?? {};

      const allItem: TOption = { label: 'All', value: '' };
      let roleList: TOption[] = [];
      let userStatus: TOption[] = [];
      roleList.push(allItem);
      if (responseData?.userRoleList) {
        // data for role filter on search team member
        const dataList = responseData?.userRoleList as string[];
        const convertList = dataList.map((item) => ({
          label: item,
          value: item,
        }));
        roleList = [...roleList, ...convertList];
        setSearchTypes(roleList, MemberSearchType.ROLE);
      }

      if (responseData?.userTeamStatusList) {
        // data for invitation status filter on search team member
        const dataList = responseData?.userTeamStatusList as string[];
        const convertList = dataList.map((item) => ({
          label: item,
          value: item,
        }));
        userStatus = [...userStatus, ...convertList];
        setSearchTypes(userStatus, MemberSearchType.STATUS);
      }
    } else {
      setSearchTypes([], MemberSearchType.ROLE);
      setSearchTypes([], MemberSearchType.STATUS);
    }
  }, [isLoading, data, isError]);

  return { isLoading, isError, data, error };
};

export function useSearchMemberData() {
  const {
    currentTeamId,
    searchQuery,
    setSearchQuery,
    setMembers,
    setTotal,
    setSearchTypes,
    setMemberLoading,
  } = useSnapshot(UserTeamStore);
  const teamId = getTeamId();

  const { isLoading, isError, data, refetch, isFetching } = useQuery<
    unknown,
    Error,
    any
  >({
    queryKey: [QUERY_KEY.MEMBER_LIST, ...Object.values(searchQuery)],
    queryFn: async () => {
      const queryData = cloneDeep(searchQuery) as Partial<SearchMemberValues>;
      queryData.startDate = searchQuery.startDate;
      queryData.endDate = searchQuery.endDate;

      return fetchMembers(queryData, teamId);
    },
    enabled: !!searchQuery.startDate,
  });

  useQueryWithEffect({
    key: QUERY_KEY.META_DATA,
    queryFn: fetchMetaData,
    setSearchTypes,
  });

  // Yup schema for validation
  const searchValidationSchema: TeamValidationSchema<SearchMemberValidation> = {
    nameOrEmail: string().optional(),
    role: string().optional(),
    status: string().optional(),
    startDate: date()
      .nullable()
      .optional()
      .transform((v) =>
        v instanceof Date && !isNaN(v.getMilliseconds()) ? v : null
      ),
    endDate: date()
      .nullable()
      .optional()
      .transform((v) =>
        v instanceof Date && !isNaN(v?.getMilliseconds()) ? v : null
      )
      .when('startDate', (startDate, yup) =>
        startDate instanceof Date && !isNaN(startDate?.getMilliseconds())
          ? yup.min(startDate, 'To date should be later than from date')
          : yup
      ),
  };
  const validationSchema = object().shape(searchValidationSchema);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useForm<Partial<SearchMemberValues>>({
    resolver: yupResolver(validationSchema),
    defaultValues: searchQuery,
  });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      const response = data as MembersResponseData;
      const members = response?.data?.elementList ?? ([] as Member[]);
      setMembers(members);
      setTotal(response?.data?.totalElements ?? 0);
    }
    if (isError) {
      setTotal(0);
      setMembers([]);
    }
    UserTeamStore.memberLoading = isLoading;
  }, [isLoading, data, isError]);

  useEffect(() => {
    setMemberLoading(isFetching);
  }, [isFetching]);

  const onSubmit = async (data: Partial<SearchMemberValues>) => {
    setValue('pageNo', 0);
    setSearchQuery(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    values: getValues(),
    onSubmit,
    control,
    refetch,
  };
}

export function useTeamInvitationData() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  const { setInvitation } = useSnapshot(UserTeamStore);
  const { isLoading: loadingInvitations } = useQuery({
    queryKey: QUERY_KEY.INVITATIONS,
    queryFn: async () => {
      return fetchInvitation(paramsAsObject?.invitationToken);
    },
    onSuccess: (response) => {
      let errorMessage = null;
      const invitation = response?.data;
      setInvitation(invitation);
      if (invitation) {
        switch (invitation.status) {
          case InvitationStatus.PENDING:
            dialogStore.openDialog({
              name: DialogType.ConfirmInvitation,
            });
            break;
          case InvitationStatus.ACCEPTED:
            errorMessage = t('team-member.message.invitation-error.accepted');
            break;
          case InvitationStatus.DECLINED:
            errorMessage = t('team-member.message.invitation-error.declined');
            break;
          case InvitationStatus.EXPIRED:
            errorMessage = t('team-member.message.invitation-error.expired');
            break;
          default:
            break;
        }
      } else {
        switch (response?.status) {
          case InvitationErrorCode.TEAM_DELETED:
            errorMessage = t(
              'team-member.message.invitation-error.team-deleted'
            );
            break;
          case InvitationErrorCode.INVALID_INVITEE:
            errorMessage = t('team-member.message.invitation-error.not-found');
            break;
          default:
            errorMessage = paramsAsObject?.invitationToken
              ? t('team-member.message.invitation-error.not-found')
              : null;
            break;
        }
      }
      errorMessage && showToast.warning(errorMessage, { delay: 0 });
    },
  });
  return { loadingInvitations };
}
