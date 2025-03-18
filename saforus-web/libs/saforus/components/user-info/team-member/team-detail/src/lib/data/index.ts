import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnapshot } from 'valtio';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import {
  fetchTeamDetail,
  fetchTeamOrders,
  QUERY_KEY,
  RequestTeamOrder,
  ResponseTeamOrder,
  TeamValidation,
  TeamValidationSchema,
  UserTeamStore,
} from '@web-workspace/saforus/components/user-info/team-member/data';
import AuthStore, { Member, Team } from '@web-workspace/shared/hooks/use-auth';
import { PATTERN } from '@web-workspace/saforus/constants/validation';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { UserRole } from '@web-workspace/saforus/common/model';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useNavigate, useParams } from 'react-router-dom';
import { cloneDeep } from 'lodash-es';
import { getTeamId } from '@web-workspace/saforus/common/utils';

const useTeamDetailData = () => {
  const {
    currentTeamId,
    setCurrentTeamId,
    team,
    originMembers,
    searchOrderQuery,
    setOrders,
    setTeam,
    setMembers,
    setMemberOptions,
    setOrdersLoading,
    setTotal,
  } = useSnapshot(UserTeamStore);
  const navigate = useNavigate();
  const { clearAuthState } = useSnapshot(AuthStore);

  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { openDialog } = useSnapshot(DialogStore);
  const teamId = getTeamId();

  const { isLoading, isError, data, isSuccess, isFetching } = useQuery<
    unknown,
    Error,
    ResponseTeamOrder
  >({
    queryKey: [QUERY_KEY.ORDER_LIST, ...Object.values(searchOrderQuery)],
    queryFn: async () => {
      const queryData = cloneDeep(
        searchOrderQuery
      ) as Partial<RequestTeamOrder>;
      if (!currentTeamId) {
        return fetchTeamOrders(queryData, Number(teamId));
      }
      return fetchTeamOrders(queryData, currentTeamId);
    },
  });

  const {
    data: teamData,
    isLoading: isLoadingTeam,
    isSuccess: isSuccessTeam,
  } = useQuery<Team | null>([QUERY_KEY.TEAM, teamId], () =>
    fetchTeamDetail(teamId)
  );

  useEffect(() => {
    if (teamData && isSuccessTeam) {
      const team = teamData as Team;
      if (team) {
        setTeam(team);
        setMembers(team?.teamMemberList ?? []);
        setTotal(team?.teamMemberList?.length ?? 0);
        const memberOptions =
          team?.teamMemberList?.filter(
            (member) => member.role !== 'TEAM_VIEWER'
          ) ?? [];
        setMemberOptions(memberOptions);
      }
    }
  }, [teamData, isSuccess]);

  useEffect(() => {
    if (isSuccess && data && !isError) {
      setOrders(data);
    }
    if (isError) {
      setOrders(null);
    }
    if (!currentTeamId) {
      setCurrentTeamId(Number(teamId));
    }
  }, [isLoading, data, isError]);

  useEffect(() => {
    setOrdersLoading(isFetching);
  }, [isFetching]);

  const updateTeamOverviewMutation = useMutation(
    (updatedData: Partial<Team>) =>
      UserTeamStore.updateTeamOverview(team?.id, updatedData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.TEAM);
        showToast.success(`${t('team-member.message.update-team-successful')}`, {
          delay: 0,
        });
      },
      onError: (error) => {
        showToast.error(`${t('team-member.message.update-team-failure')}`, {
          delay: 0,
        });
      },
    }
  );

  const updateTeamOwnerMutation = useMutation(
    (updatedData: Partial<Member>) =>
      UserTeamStore.changeOwner(team?.id, updatedData),
    {
      onSuccess: () => {
        showToast.success(`${t('team-member.message.update-team-successful')}`, {
          delay: 0,
        });
        clearAuthState();
        navigate(ROUTES.LOGIN.path, { replace: true });
      },
      onError(error: any) {
        showToast.warning(JSON.stringify(error.message));
      },
    }
  );

  // Yup schema for validation
  const teamValidationSchema: TeamValidationSchema<TeamValidation> = {
    name: string()
      .required(`${t('error-message.team-name-required')}`)
      .matches(
        PATTERN.COMPANY_NAME,
        `${t('error-message.name-special-allowed')}`
      )
      .max(50, `${t('error-message.max-length-50')}`)
      .matches(
        PATTERN.NOT_SPACE_START,
        `${t('error-message.name-not-start-space')}`
      ),
    description: string()
      .optional()
      .max(500, `${t('error-message.max-length-500')}`),
    teamOwnerId: string().required(`${t('error-message.required')}`),
  };

  const validationSchema = object().shape(teamValidationSchema);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    trigger,
    control,
  } = useForm<Team>({
    defaultValues: team as Team,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: Partial<Team>): Promise<void> => {
    await updateTeamOverviewMutation.mutateAsync(data);
  };

  // change team owner
  const onUpdateMemberRole = async (memberId: string) => {
    const member = originMembers.find(
      (member) => member.teamMemberUserId.toString() === memberId.toString()
    );
    const newMember = { ...member, role: UserRole.TEAM_OWNER };
    await updateTeamOwnerMutation.mutateAsync(newMember);
  };

  const onFieldSubmit = async (field: keyof Team) => {
    const isValid = await trigger(field);
    if (!isValid) {
      return false;
    }
    const updatedData = { [field]: getValues(field) };
    if (field === 'teamOwnerId') {
      const value = getValues('teamOwnerId');
      await onUpdateMemberRole(value);
    } else {
      await onSubmit(updatedData);
    }
    return true;
  };

  const onDelete = () => {
    openDialog({
      name: DialogType.DeleteSite,
      props: { siteName: team?.name },
    });
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    onFieldSubmit,
    setValue,
    errors,
    onDelete,
    control,
    getValues,
    isLoadingTeam,
  };
};

export default useTeamDetailData;
