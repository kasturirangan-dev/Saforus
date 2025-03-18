import { useEffect } from 'react';
import {
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  styled,
} from '@mui/material';
import useTeamDetailData from './data';
import Icon from '@web-workspace/shared/components/widgets/icon';
import MuiButton from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';

import {
  QUERY_KEY,
  UserTeamStore,
  fetchTeamDetail,
} from '@web-workspace/saforus/components/user-info/team-member/data';

import TeamInfoView from './view/team-info';
import { usePagingMemberListData } from './data/member-list';
import MemberListView from './view/member-list-view';
import TeamServicePlan from './view/team-service-plan';
import { Team } from '@web-workspace/shared/hooks/use-auth';
import TeamOrderComponent from './view/order-list';
import { useLocation } from 'react-router-dom';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  fontSize: 30,
  fontWeight: '600',
  lineHeight: '30px',
  textTransform: 'none',
  color: '#EFEFF1',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export function TeamMemberDetail() {
  const location = useLocation();
  const parts = location.pathname.split('/');
  const teamId = parts[parts.length - 1];
  const { team, setTeam, setMembers, setMemberOptions } =
    useSnapshot(UserTeamStore);
  const { t } = useTranslation();

  const { onPageChange, members, total } = usePagingMemberListData();
  
  const {
    handleSubmit,
    onSubmit,
    register,
    onFieldSubmit,
    errors,
    onDelete,
    setValue,
    control,
    getValues,
    isLoadingTeam
  } = useTeamDetailData();

  return (
    <Box
      sx={{
        height: '100%',
      }}
    >
      <Backdrop
        open={isLoadingTeam}
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
          alignItems: 'center',
        }}
      >
        <StyledButton
          onClick={() => {
            window.history.back();
          }}
          variant={'text'}
        >
          <Icon
            iconStyle={{ marginRight: '6px' }}
            name="arrow_left"
            size={45}
            color="#5F6D7E"
          />
        </StyledButton>
        <Typography variant="h5" color={'var(--gray-900)'}>
          {t('team-detail.title')}
        </Typography>
      </Box>
      {team && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            mt: '1.5rem',
          }}
        >
          <TeamInfoView
            team={team as Team}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            onFieldSubmit={onFieldSubmit}
            errors={errors}
            onDelete={onDelete}
            setValue={setValue}
            getValues={getValues}
            control={control}
          />
          <TeamServicePlan
            team={team as Team}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            onFieldSubmit={onFieldSubmit}
            errors={errors}
            onDelete={onDelete}
            control={control}
          />
          <MemberListView
            onPageChange={onPageChange}
            members={members ? [...members] : []}
            total={total}
          />

          <TeamOrderComponent />

          {/* <Box sx={{ mt: '1rem' }}>
            <MuiButton
              sx={{
                border: '1px solid var(--danger-400, #FD5E49)',
                boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.04)',
                padding: '12px 18px',
                textTransform: 'none',
                background: 'var(--base-white)',
                fontFamily: 'Noto Sans KR',
                fontSize: '15px',
                fontWeight: 600,
                lineHeight: '22px',
                letterSpacing: '-0.1px',
                color: 'var(--danger-500, #F15146)',
              }}
              color={'secondary'}
              onClick={handleDeleteTeam}
            >
              <img
                src={TrashIcon}
                width={20}
                height={20}
                alt="delete-team"
                loading="lazy"
                style={{ marginRight: '6px' }}
              />
              {t('team-detail.delete-team')}
            </MuiButton>
          </Box> */}
        </Box>
      )}
    </Box>
  );
}

export default TeamMemberDetail;
