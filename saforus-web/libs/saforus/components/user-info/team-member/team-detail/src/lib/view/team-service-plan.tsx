import { Box, Card, Typography, styled, ButtonBase } from '@mui/material';
import { Control } from 'react-hook-form';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputToggle from '@web-workspace/shared/components/widgets/input-toggle';
import ExternalLinkIcon from '../../assets/external_link.svg';
import AuthStore, { Team } from '@web-workspace/shared/hooks/use-auth';
import { UserRole } from '@web-workspace/saforus/common/model';
import { useSnapshot } from 'valtio';
import UseSubscription from '@web-workspace/shared/hooks/use-subscription';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import i18next from 'i18next';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { useMemo } from 'react';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';

const FormContainer = styled('form')`
  width: 100%;
`;

export interface TeamInfoProps {
  team?: Team;
  handleSubmit: UseFormHandleSubmit<Team>;
  onSubmit: (data: Team) => Promise<void>;
  register: UseFormRegister<Team>;
  onFieldSubmit: (field: keyof Team) => Promise<boolean>;
  errors: FieldErrors<Team>;
  onDelete: () => void;
  control: Control<Team>;
}

const TeamServicePlan = ({
  team,
  handleSubmit,
  onSubmit,
  register,
  onFieldSubmit,
  errors,
  onDelete,
  control,
}: TeamInfoProps) => {
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const navigate = useNavigate();
  const { subscriptionPlanDetail } = useSnapshot(UseSubscription);
  const subscribedDate = useMemo(() => {
    return formatDateWithLanguage({
      date: subscriptionPlanDetail?.subscribedAt,
      isDetail: true,
      withSlash: true,
      tzOffset,
    });
  }, [subscriptionPlanDetail?.subscribedAt, i18next.language]);
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
        mt: '1rem',
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', lg: '60%', xl: '50%' },
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" color={'var(--gray-900)'}>
          {t('team-detail.team-service-plan')}
        </Typography>

        {AuthStore.userInfo?.role === UserRole.TEAM_OWNER && (
          <ButtonBase
            onClick={() => {
              navigate(ROUTES.USER_INFO.SERVICE_PLAN.path);
            }}
          >
            <img
              src={ExternalLinkIcon}
              width={20}
              height={20}
              alt="change-plan-team"
              loading="lazy"
              style={{ marginRight: '6px' }}
            />
            <Typography
              variant="body1"
              color={'color: var(--gray-700, #272D37)'}
            >
              {t('team-detail.change')}
            </Typography>
          </ButtonBase>
        )}
      </Box>
      <Box sx={{ width: { sm: '100%', lg: '60%', xl: '50%' }, mt: '1rem' }}>
        <InputToggle
          value={
            subscriptionPlanDetail?.title ?? `${t('team-detail.free-plan')}`
          }
          label={`${t('team-detail.subscription-type')}`}
          labelStyle={{ minWidth: 230, color: 'var(--gray-700)' }}
          valueCss={{ color: 'var(--gray-300)' }}
          disableActions
        />

        <Typography
          sx={{ mt: '1rem' }}
          variant="subtitle2"
          color={'var(--gray-25)'}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: t('team-detail.subscription-on', {
                date: subscribedDate,
              }),
            }}
          />
        </Typography>
      </Box>
    </Card>
  );
};

export default TeamServicePlan;
