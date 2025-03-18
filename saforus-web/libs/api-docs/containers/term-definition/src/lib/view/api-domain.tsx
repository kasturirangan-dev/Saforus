import { Box, Link, Stack, Typography, styled } from '@mui/material';
import { StyledLink } from '@web-workspace/api-docs/components/guides/section';

const StyledTContentTable = styled(Box)(({ theme }) => ({
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
}));

export const ApiDomain = ({
  label = '--',
  value = '--',
}: {
  label?: string;
  value?: string;
}) => {
  return (
    <Stack direction="row" border="1px solid var(--neutral-400)">
      <StyledTContentTable bgcolor="var(--neutral-400)">
        <Typography variant="body2" fontWeight={600} color="var(--gray-200)">
          {label}
        </Typography>
      </StyledTContentTable>
      <StyledTContentTable flex={1}>
        <Typography variant="body2" fontWeight={500}>
          <StyledLink href={value}>{value}</StyledLink>
        </Typography>
      </StyledTContentTable>
    </Stack>
  );
};
