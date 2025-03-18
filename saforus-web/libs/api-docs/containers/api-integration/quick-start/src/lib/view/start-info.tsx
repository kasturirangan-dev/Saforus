import { Trans, useTranslation } from 'react-i18next';
import {
  CodeContent,
  SectionContent,
  StyledAlert,
  TransContent,
} from '@web-workspace/api-docs/components/guides/section';
import { Box, ButtonBase, Stack, Typography, styled } from '@mui/material';
import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

const StyledTContentTable = styled(Box)(({ theme }) => ({
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',

  fontFamily: 'Inter',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: '-0.1px',
  color: 'var(--gray-200)',
}));

const RowInfo = ({
  label = '',
  value = '',
}: {
  label?: React.ReactNode;
  value?: React.ReactNode;
}) => {
  return (
    <Stack direction="row" className="row-info" bgcolor="var(--neutral-300)">
      <StyledTContentTable width="85px">{label}</StyledTContentTable>
      <StyledTContentTable flex={1}>{value}</StyledTContentTable>
    </Stack>
  );
};

export const StartInfo = () => {
  const { t, i18n } = useTranslation();
  const linkSupport = getEnvVar(
    i18n.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );

  const ServiceInfo = ({ env, link }: { env: string; link: string }) => {
    return (
      <Stack
        sx={{
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid var(--neutral-400)',
          '.row-info:not(:last-child)': {
            borderBottom: '1px solid var(--neutral-25)',
          },
        }}
      >
        <RowInfo
          label={<strong>{t(`quickStart.get-start.${env}.title`)}</strong>}
        />
        <RowInfo
          label={'Domain'}
          value={
            <TransContent
              i18nKey={`quickStart.get-start.${env}.domain`}
              link={link}
            />
          }
        />
        <RowInfo
          label={'ApiKey'}
          value={
            env === 'production' ? (
              <ButtonBase
                onClick={() => {
                  window.open(linkSupport, '_blank');
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight="600"
                  color="var(--purple-500)"
                >
                  {t(`quickStart.get-start.${env}.api-key`)}
                </Typography>
              </ButtonBase>
            ) : (
              <CodeContent sx={{ padding: 0 }}>
                {t(`quickStart.get-start.${env}.api-key`)}
              </CodeContent>
            )
          }
        />
      </Stack>
    );
  };

  return (
    <>
      <SectionContent
        contentKey="quickStart.get-start.content-1"
        link={API_DOCS_ROUTES.CS_API.ROOT}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SectionContent contentKey="quickStart.get-start.content-2" />
        <Box
          sx={{
            display: 'grid',
            padding: '16px',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            backgroundColor: 'var(--neutral-25)',
            borderRadius: '12px',
            border: '1px solid var(--neutral-400)',
          }}
        >
          <ServiceInfo env="staging" link="https://stag-cs.saforus.com/" />
          <ServiceInfo env="production" link="https://cs.saforus.com/" />
        </Box>
      </Box>

      <StyledAlert severity="info">
        <Trans i18nKey="quickStart.get-start.alert" />
      </StyledAlert>
    </>
  );
};
