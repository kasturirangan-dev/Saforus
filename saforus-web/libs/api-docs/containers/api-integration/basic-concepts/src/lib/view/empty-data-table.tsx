import { useTranslation } from 'react-i18next';
import { Box, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import {
  StyledTable,
  StyledTableContainer,
  TableContent,
  TablePre,
} from '@web-workspace/api-docs/components/guides/specification-table';
import { CodeContent } from '@web-workspace/api-docs/components/guides/section';
import { memo } from 'react';

interface Item {
  case: string;
  type: string;
  normal: string;
  expected: string;
}

const EmptyDataTable = ({ keyData }: { keyData: string }) => {
  const { t } = useTranslation();

  const data = t(keyData, {
    returnObjects: true,
  }) as Item[];
  if (!Array.isArray(data)) return null;

  return (
    <StyledTableContainer>
      <StyledTable sx={{ '& .MuiTableCell-root': { verticalAlign: 'middle' } }}>
        <TableHead>
          <TableRow>
            <TableCell width={160}>
              {t('integrationBasic.server-response.empty-types.table.case')}
            </TableCell>
            <TableCell width={330}>
              {t('integrationBasic.server-response.empty-types.table.normal')}
            </TableCell>
            <TableCell width={330} className="highlight-header">
              {t('integrationBasic.server-response.empty-types.table.expected')}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={`row-${index}`}>
              <TableCell>
                <Box display="flex" gap="10px" alignItems="center">
                  <TableContent>{item.case ?? '--'}</TableContent>
                  <CodeContent>{item.type}</CodeContent>
                </Box>
              </TableCell>
              <TableCell>
                <TablePre
                  dangerouslySetInnerHTML={{
                    __html: item.normal.replace(/ {2}/g, ' ') ?? '--',
                  }}
                  sx={{ '& gray': { color: 'var(--neutral-800)' } }}
                />
              </TableCell>
              <TableCell className="highlight">
                <TablePre>
                  {item.expected.replace(/ {2}/g, ' ') ?? '--'}
                </TablePre>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default memo(EmptyDataTable);
