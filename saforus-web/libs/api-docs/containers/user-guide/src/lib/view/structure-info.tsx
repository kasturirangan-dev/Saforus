import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import goOutIcon from '../assets/go-out.svg';
import { TransContent } from '@web-workspace/api-docs/components/guides/section';
import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';
import { useNavigate } from 'react-router-dom';

const ActionBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  bottom: 0,
}));

export const StructureInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const ServiceInfo = ({
    flow = '--',
    path,
  }: {
    flow?: string;
    path?: string;
  }) => {
    const handleClick = () => {
      if (path) {
        navigate(path);
      }
    };
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '16px',
          backgroundColor: 'var(--neutral-300)',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'var(--neutral-600)',
          },
          borderRadius: '8px',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <Typography variant="body2" fontWeight={600} color="var(--gray-700)">
          {t(`userGuide.structure.${flow}.title`)}
        </Typography>

        <Typography variant="body2" color="var(--gray-800)" component="div">
          <TransContent i18nKey={`userGuide.structure.${flow}.content`} />
        </Typography>

        <ActionBox>
          <img src={goOutIcon} loading="lazy" />
        </ActionBox>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
      }}
    >
      <ServiceInfo
        flow="authentication-flow"
        path={API_DOCS_ROUTES.CS_API.AUTHENTICATION.path}
      />
      <ServiceInfo flow="watermarking-flow" />
      <ServiceInfo flow="detection-flow" />
      <ServiceInfo flow="webhook-flow" />
    </Box>
  );
};
