import {
  Alert,
  Box,
  Table,
  TableContainer,
  TypographyProps,
  styled,
} from '@mui/material';
import {
  CodeContent,
  TextContent,
} from '@web-workspace/api-docs/components/guides/section';

const TextStyle = {
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '22px',
  letterSpacing: '-0.1px',
  color: 'var(--gray-200)',
  whiteSpace: 'pre-line',
  '& strong': {
    fontWeight: 600,
  },
};
export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  border: '1px solid var(--neutral-500)',
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  backgroundColor: 'var(--neutral-25)',
  borderStyle: 'hidden',

  '& .MuiTableCell-root': {
    verticalAlign: 'top',
    padding: '8px 16px',
    border: '1px solid var(--neutral-500)',
  },

  '& th': {
    backgroundColor: 'var(--neutral-400)',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-700)',
  },

  '& td': {
    ...TextStyle,
  },

  '& .highlight-header': {
    backgroundColor: 'var(--purple-100)',
  },
  '& .highlight': {
    backgroundColor: 'var(--purple-50)',
  },
}));

export const TableContent = TextContent;

export const TableCodeContent = styled((props: TypographyProps) => (
  <Box sx={{ wordBreak: 'break-all', lineHeight: '20px' }}>
    <CodeContent {...props} />
  </Box>
))();

export const TablePre = styled('pre')`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--gray-700);

  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
`;

export const TableAlert = styled(Alert)(({ theme }) => ({
  marginTop: '10px',
  borderRadius: '8px',
  padding: '6px 12px',
  '& .MuiAlert-icon': {
    marginRight: '6px',
    padding: '4px 0px',
  },
  '& .MuiAlert-message': {
    padding: 0,
    ...TextStyle,
  },

  '&.MuiAlert-standardInfo': {
    backgroundColor: 'var(--purple-50)',
  },
  '&.MuiAlert-standardWarning': {
    backgroundColor: 'var(--orange-50)',
  },
}));
