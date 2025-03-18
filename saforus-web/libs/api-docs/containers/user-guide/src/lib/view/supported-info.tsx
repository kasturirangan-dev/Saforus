import { Box, Stack, Typography, styled } from '@mui/material';
import GuideSection, {
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';
import { useTranslation } from 'react-i18next';

const StyledTContentTable = styled(Box)(({ theme }) => ({
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
}));

const RowInfo = ({
  label = '--',
  value = '--',
}: {
  label?: string | null;
  value?: string | null;
}) => {
  return (
    <Stack direction="row" className="row-info" bgcolor="var(--neutral-300)">
      <StyledTContentTable width="100px">
        <TextContent sx={{ fontWeight: 600 }}>{label}</TextContent>
      </StyledTContentTable>
      <StyledTContentTable flex={1}>
        <TextContent>{value}</TextContent>
      </StyledTContentTable>
    </Stack>
  );
};

export const SupportedInfo = () => {
  const { t } = useTranslation();

  const ServiceInfo = ({
    service = '--',
    contentTypes = ['image', 'video', 'audio', 'document'],
  }: {
    service?: string;
    contentTypes?: string[];
  }) => {
    return (
      <GuideSection
        id={`${service}`}
        label={t(`userGuide.supported.${service}.title`)} // added missing dot before title
        level={2}
        linkCopy={false}
        style={{ gap: '12px' }}
      >
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
          {contentTypes.map((type) => (
            <RowInfo
              key={type}
              label={t(`common.content-type.${type}`)}
              value={t(`userGuide.supported.${service}.${type}`)}
            />
          ))}
        </Stack>
      </GuideSection>
    );
  };

  return (
    <Box
      sx={{
        display: 'grid',
        padding: '16px',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        backgroundColor: 'var(--neutral-25)',
        borderRadius: '8px',
        border: '1px solid var(--neutral-400)',
      }}
    >
      <ServiceInfo service="watermarking-formats" />
      <ServiceInfo service="detection-formats" />
    </Box>
  );
};
