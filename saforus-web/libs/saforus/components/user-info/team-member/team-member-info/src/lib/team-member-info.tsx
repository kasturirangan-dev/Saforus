import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputBase,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { useTranslation } from 'react-i18next';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useSnapshot } from 'valtio';
import { useQuery, useQueryClient } from 'react-query';
import {
  QUERY_KEY,
  UserTeamStore,
  fetchTeamDetail,
  fetchTeams,
} from '@web-workspace/saforus/components/user-info/team-member/data';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { useSearchMemberData, useTeamInvitationData } from './data';
import NoTeamView from './view/no-team-view';
import TeamInfoView from './view/team-info';
import ExpiredMailView from './view/expired-mail-view';
import MemberSearchView from './view/member-search-view';
import { usePagingMemberListData } from './data/member-list';
import MemberListView from './view/member-list-view';
import AuthStore, { Team } from '@web-workspace/shared/hooks/use-auth';
import parseISO from 'date-fns/parseISO';
import { isEmpty } from 'lodash-es';
import { UserRole, UserTeamStatus } from '@web-workspace/saforus/common/model';

export function TeamMemberInfo() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    team,
    setTeam,
    createTeamResult,
    setSelectedMember,
    selectedMembers,
    memberLoading,
    setSearchQuery,
    setMemberOptions,
    currentTeamId,
    setCurrentTeamId,
    reset,
  } = useSnapshot(UserTeamStore);

  const { userInfo, setUserRole } = useSnapshot(AuthStore);
  const [memberInvitationStatus, setMemberInvitationStatus] = useState<
    string | null
  >();

  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    setValue,
    values,
    control,
    refetch,
  } = useSearchMemberData();
  const queryClient = useQueryClient();
  const { onPageChange, members, total } = usePagingMemberListData();

  const { data, isLoading } = useQuery<Team | null>(
    [QUERY_KEY.TEAM, currentTeamId],
    () => fetchTeamDetail(currentTeamId),
    {
      onSuccess(res) {
        const team = res as Team;
        if (team) {
          setTeam(team);
          setMemberOptions(team?.teamMemberList ?? []);
          const startDate = team.createdAt;
          if (startDate && !isEmpty(startDate)) {
            setSearchQuery({ startDate: parseISO(startDate) });
            // refetch member from the day team created
            setValue('startDate', new Date(startDate));
          }
        } else {
          setTeam();
        }
      },
    }
  );

  const { data: teams, isLoading: loadingTeams } = useQuery<Team[]>(
    QUERY_KEY.TEAMS,
    fetchTeams
  );

  useEffect(() => {
    if (teams && teams.length > 0) {
      const pubTeams = teams?.filter((team) => !team.isDefaultTeam);

      if (pubTeams && pubTeams.length > 0) {
        const team = pubTeams[0];
        const role = team?.teamMemberList?.find(
          (member) => member.emailAddress === AuthStore.userInfo?.email
        )?.role;
        if (!isEmpty(role)) {
          setUserRole(role);
        }
        if (team) {
          setCurrentTeamId(team.id);
          setMemberOptions(team?.teamMemberList ?? []);
          const startDate = team.createdAt;
          if (startDate && !isEmpty(startDate)) {
            setSearchQuery({ startDate: parseISO(startDate) });
          }
          queryClient.invalidateQueries(QUERY_KEY.TEAM);
          queryClient.invalidateQueries(QUERY_KEY.MEMBER_LIST);
        } else {
          setCurrentTeamId();
        }
      } else {
        setCurrentTeamId();
        setTeam();
      }
    } else {
      setCurrentTeamId();
      setTeam();
    }
  }, [teams]);

  useEffect(() => {
    if (createTeamResult) {
      if (createTeamResult?.isSuccess === true) {
        showToast.success(`${t('team-member.message.create-team-successful')}`, {
          delay: 0,
        });
      } else if (createTeamResult?.isSuccess === false) {
        if (createTeamResult?.data?.status) {
          showToast.error(
            `${t('team-member.message.create-team-failure-code', {
              code: createTeamResult?.data?.status,
            })}`,
            {
              delay: 0,
            }
          );
        } else {
          showToast.error(
            `${t('team-member.message.create-team-failure-no-code')}`,
            {
              delay: 0,
            }
          );
        }
      }
    }
    return () => {
      reset();
    };
  }, [createTeamResult]);

  const handleDeleteTeam = () => {
    dialogStore.openDialog({ name: DialogType.RemoveTeam });
  };

  useEffect(() => {
    if (team) {
      let memberInfor;
      if (team.teamMemberList) {
        memberInfor = team.teamMemberList.find(
          (mem) => mem.teamMemberUserId === userInfo?.id
        );
        setMemberInvitationStatus(memberInfor?.status);
      }
    }
  }, [team]);

  useEffect(() => {
    if (memberInvitationStatus === UserTeamStatus.INVITED) {
      dialogStore.openDialog({
        name: DialogType.AcceptInvitation,
        props: {
          onClose: () => {
            navigate(ROUTES.DASHBOARD.PACKAGES_DELIVERY.path, {
              replace: true,
            });
          },
        },
      });
    }
  }, [memberInvitationStatus]);

  const { loadingInvitations } = useTeamInvitationData();

  return (
    <Box
      sx={{
        height: '100%',
      }}
    >
      <Backdrop
        open={isLoading || loadingTeams || loadingInvitations}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          color: 'var(--main-brand)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h5"
          color={'var(--gray-900)'}
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {t('gnbmenu.team-members')}
        </Typography>

        <FormControl>
          <Controller
            name={'nameOrEmail'}
            control={control}
            render={({ field }) => (
              <Box
                sx={{
                  display: 'flex',
                  width: '25vw',
                  height: '56px',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '100px',
                  border: '1px solid var(--neutral-700, #DAE0E6)',
                  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.04)',
                  padding: '0.5rem 0.5rem 0.5rem 1rem',
                }}
              >
                <SearchIcon sx={{ width: '35px', color: 'var(--gray-25)' }} />
                <InputBase
                  sx={{
                    ml: 1,
                    flex: 1,
                    fontSize: '14px',
                    fontFamily: 'Noto Sans KR',
                    fontWeight: 700,
                    '& input:-webkit-autofill': {
                      '-webkit-box-shadow': '0 0 0 1000px white inset', // Fix for Chrome autofill background blue color
                    },
                  }}
                  placeholder={`${t(
                    'team-member.team-member-info.search-placeholder'
                  )}`}
                  inputProps={{
                    'aria-label': `${t(
                      'team-member.team-member-info.search-placeholder'
                    )}`,
                  }}
                  {...field}
                />
                <LoadingButton
                  loading={memberLoading}
                  disabled={Boolean(team) === false}
                  type="button"
                  onClick={() => {
                    handleSubmit(onSubmit)();
                  }}
                  sx={{
                    my: '2.3rem',
                    py: '0.5rem',
                    ml: '0.5rem',
                    borderRadius: '100px',
                  }}
                >
                  {t('button.search')}
                </LoadingButton>
              </Box>
            )}
          />
        </FormControl>
      </Box>

      {!team ? (
        <NoTeamView />
      ) : memberInvitationStatus === UserTeamStatus.EXPIRED ? (
        <ExpiredMailView />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            mt: '1.5rem',
          }}
        >
          <TeamInfoView teamInfo={team as Team} />

          <MemberSearchView
            register={register}
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            loading={memberLoading}
            setValue={setValue}
            values={values}
          />

          <MemberListView
            onPageChange={onPageChange}
            members={members ? [...members] : []}
            total={total}
            selectedMembers={selectedMembers ? [...selectedMembers] : []}
            setSelectedMembers={setSelectedMember}
            memberLoading={memberLoading}
            selectable={AuthStore.userInfo?.role === UserRole.TEAM_OWNER}
          />
        </Box>
      )}
      {team && AuthStore.userInfo?.role === UserRole.TEAM_OWNER && (
        <Box sx={{ marginTop: '1.5rem' }}>
          <LoadingButton
            sx={{
              padding: '0.75rem 1rem',
            }}
            onClick={handleDeleteTeam}
          >
            {t('delete-team.button-delete')}
          </LoadingButton>
        </Box>
      )}
    </Box>
  );
}

export default TeamMemberInfo;
