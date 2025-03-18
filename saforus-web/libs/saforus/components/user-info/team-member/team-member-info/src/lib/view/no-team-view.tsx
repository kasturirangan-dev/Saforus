import { Box, Card, Typography } from '@mui/material';
import EmptyTeam from '../../assets/empty-team-logo.svg';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import Button from '@web-workspace/shared/components/widgets/button';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import UseSubscription from '@web-workspace/shared/hooks/use-subscription';

const NoTeamView = () => {
  const { t } = useTranslation();

  const [canCreateTeam, setcanCreateTeam] = useState(true);

  const { subscriptionPlanDetail } = useSnapshot(UseSubscription);

  useEffect(() => {
    if (
      subscriptionPlanDetail == undefined ||
      subscriptionPlanDetail.noOfTeams < 1
    ) {
      setcanCreateTeam(false);
    }
  }, []);

  const handleCreateTeam = () => {
    dialogStore.openDialog({ name: DialogType.CreateTeam });
  };
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
        mt: '1.5rem',
        mb: '1.5rem',
        padding: '1.5rem',
      }}
    >
      <Typography variant="h6" color={'var(--gray-900)'}>
        {t('team-member.team-member-info.no-team')}
      </Typography>
      <Box sx={{ mt: '1rem', mb: '1rem' }}>
        <img
          src={EmptyTeam}
          width={450}
          height={350}
          alt="no team"
          loading="lazy"
        />
      </Box>

      <Typography variant="subtitle2" color={'var(--gray-50)'}>
        {t('team-member.team-member-info.no-team-des-1')}
      </Typography>
      <Typography variant="subtitle2" color={'var(--gray-50)'}>
        {t('team-member.team-member-info.no-team-des-2')}
      </Typography>

      <Button
        type="button"
        sx={{
          mt: '1rem',
          padding: '12px 18px',
          fontSize: '15px',
          fontWeight: 600,
          lineHeight: '24px',
        }}
        onClick={handleCreateTeam}
        disabled={!canCreateTeam}
      >
        {t('team-member.button.create-team')}
      </Button>
    </Card>
  );
};

export default NoTeamView;
