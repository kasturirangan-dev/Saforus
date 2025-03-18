import SettingsSitesContainer from '@web-workspace/saforus/containers/settings/sites';
import { Box, Container, Typography } from '@mui/material';
import Button from '@web-workspace/shared/components/widgets/button';
import { useTranslation } from 'react-i18next';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';

const SettingsSitesPage = () => {
  const { t } = useTranslation();

  const onAddSite = () => {
    dialogStore.openDialog({ name: DialogType.CreateSite });
  };

  return (
    <Container
      maxWidth={false}
      sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 6 }}
      >
        <Typography variant="h5" sx={{ m: 0 }}>
          {t('settings-pages.sites.title')}
        </Typography>
        <Button sx={{ px: 4 }} onClick={onAddSite}>
          {t('settings-pages.sites.add-site')}
        </Button>
      </Box>
      <SettingsSitesContainer />
    </Container>
  );
};

export default SettingsSitesPage;
