import { useTranslation } from 'react-i18next';
import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  StyledTable,
  StyledTableContainer,
  TableContent,
  TablePre,
} from '@web-workspace/api-docs/components/guides/specification-table';
import { memo } from 'react';
import { TransContent } from '@web-workspace/api-docs/components/guides/section';

interface Item {
  code: string;
  type: string;
  description: string;
  example: string;
}

const CodeExampleTable = ({ keyData }: { keyData: string }) => {
  const { t } = useTranslation();

  const data = t(keyData, {
    returnObjects: true,
  }) as Item[];
  if (!Array.isArray(data)) return null;

  return (
    <StyledTableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell width={100}>
              {t('integrationBasic.server-response.code-example.table.code')}
            </TableCell>
            <TableCell width={360}>
              {t(
                'integrationBasic.server-response.code-example.table.description'
              )}
            </TableCell>
            <TableCell width={360}>
              {t('integrationBasic.server-response.code-example.table.example')}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={`row-${index}`}>
              <TableCell>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="var(--gray-700)"
                >
                  {item.code}
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" gap="10px">
                  <TableContent
                    sx={{
                      backgroundColor:
                        item.type === 'success'
                          ? 'var(--green-200)'
                          : 'var(--red-300)',
                      flexShrink: 0,
                      padding: '2px 8px',
                      borderRadius: '5px',
                      height: 'fit-content',
                      '& gray': { color: 'var(--neutral-800)' },
                    }}
                  >
                    {t(
                      `integrationBasic.server-response.code-example.table.${item.type}`
                    )}
                  </TableContent>
                  <TableContent>
                    <TransContent i18nKey={`${keyData}.${index}.description`} />
                  </TableContent>
                </Box>
              </TableCell>
              <TableCell>
                <TablePre>
                  {item.example.replace(/ {2}/g, ' ') ?? '--'}
                </TablePre>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default memo(CodeExampleTable);
