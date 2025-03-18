import emptySvg from './assets/empty.svg';
import { Box, Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import dialogStore from '@web-workspace/shared/components/dialogs/store';
import { DialogType } from '@web-workspace/shared/components/dialogs/store';

const EmptyList = () => {
  const onAddSite = () => {
    dialogStore.openDialog({ name: DialogType.CreateSite });
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img
        src={emptySvg}
        alt="Empty List"
        title="No Sites Available"
        width="660"
        height="350"
        loading="lazy"
      />
      <Typography
        variant="body1"
        sx={{
          whiteSpace: 'pre-line',
          textAlign: 'center',
          mt: 6,
          fontWeight: 500,
          fontSize: 20,
        }}
      >
        <Trans
          i18nKey={'settings-pages.sites.empty-list'}
          components={[
            <Box
              component="a"
              onClick={onAddSite}
              sx={{
                fontWeight: '500',
                color: 'var(--purple-400)',
                cursor: 'pointer',
              }}
            ></Box>,
          ]}
        ></Trans>
      </Typography>
    </Box>
  );
};

export default EmptyList;
