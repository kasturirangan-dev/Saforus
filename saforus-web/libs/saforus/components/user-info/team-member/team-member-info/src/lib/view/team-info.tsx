import { Box, ButtonBase, Card, Typography } from '@mui/material';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import RightArrow from '../../assets/right-arrow.svg';
import { useTranslation } from 'react-i18next';
import InputToggle from '@web-workspace/shared/components/widgets/input-toggle';
import { useNavigate } from 'react-router-dom';
import { Team } from '@web-workspace/shared/hooks/use-auth';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { useSnapshot } from 'valtio';
import UseSubscription from '@web-workspace/shared/hooks/use-subscription';

import { SubscriptionPlan } from '@web-workspace/saforus/common/model';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';

export interface TeamInfoProps {
  teamInfo?: Team;
}

const TeamInfoView = (props: TeamInfoProps) => {
  const { teamInfo } = props;
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const navigate = useNavigate();
  const { subscriptionPlanDetail } = useSnapshot(UseSubscription);
  let PlanTitle: string;

  switch (subscriptionPlanDetail?.title) {
    case SubscriptionPlan.FREE:
      PlanTitle = t('team-member.team-member-info.free-plan');
      break;
    case SubscriptionPlan.STANDARD:
      PlanTitle = t('team-member.team-member-info.standard-plan');
      break;
    case SubscriptionPlan.ENTERPRISE:
      PlanTitle = t('team-member.team-member-info.enterprise-plan');
      break;
    default:
      PlanTitle = '--';
      break;
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        background: '#FFFFFF',
        borderRadius: '8px',
        flex: 'none',
        order: 0,
        padding: '1.5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: { sm: '100%', lg: '70%', xl: '50%' },
        }}
      >
        <Typography
          variant="h6"
          color={'var(--gray-900)'}
          sx={{
            maxWidth: '70%',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
          }}
        >
          {teamInfo?.name}
        </Typography>
        <ButtonBase
          onClick={() => {
            navigate(
              `${ROUTES.USER_INFO.TEAM.children.TEAM_DETAIL.path}/${teamInfo?.id}`
            );
          }}
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img
            src={RightArrow}
            width={20}
            height={20}
            alt="arrow-right"
            loading="lazy"
          />
          <Typography
            variant={'body1'}
            fontWeight={600}
            noWrap
            color={'var(--purple-500)'}
          >
            {t('team-member.team-member-info.team-details')}
          </Typography>
        </ButtonBase>
      </Box>

      <Box
        sx={{
          width: { sm: '100%', lg: '70%', xl: '50%' },
          mt: '1rem',
        }}
      >
        <InputToggle
          value={`${teamInfo?.teamOwnerName} (${teamInfo?.teamOwnerEmail})`}
          label={`${t('team-member.team-member-info.team-owner')}*`}
          labelStyle={{ minWidth: 230, color: 'var(--gray-700)' }}
          disableActions={true}
          valueCss={{ color: 'var(--gray-300)' }}
          limitedChars={20}
        />
        <InputToggle
          value={PlanTitle}
          label={`${t('team-member.team-member-info.team-service-plan')}*`}
          labelStyle={{ minWidth: 230, color: 'var(--gray-700)' }}
          disableActions={true}
          valueCss={{ color: 'var(--gray-300)' }}
        />
        <InputToggle
          value={`${teamInfo?.description ?? '--'}`}
          label={`${t('team-member.team-member-info.description')}`}
          labelStyle={{ minWidth: 230, color: 'var(--gray-700)' }}
          disableActions={true}
          valueCss={{
            color: 'var(--gray-300)',
            wordBreak: 'break-word',
          }}
        />
      </Box>

      <Typography
        sx={{ mt: '1rem' }}
        variant="subtitle2"
        color={'var(--gray-25)'}
      >
        {`${t('team-member.team-member-info.created')} ${formatDateWithLanguage(
          {
            date: teamInfo?.createdAt,
            isDetail: true,
            withSlash: true,
            tzOffset,
          }
        )}`}
      </Typography>
    </Card>
  );
};

export default TeamInfoView;
