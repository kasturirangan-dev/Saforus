import { useTranslation } from 'react-i18next';
import {
  CodeContent,
  TransContent,
} from '@web-workspace/api-docs/components/guides/section';
import { Box, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import {
  StyledTable,
  StyledTableContainer,
  TableCodeContent,
} from './styled-table';
import { Fragment } from 'react';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';

interface item {
  step: string;
  description: string;
  note: string;
  keyExample?: string;
  link?: string;
}

export const DescriptionTable = ({ keyData }: { keyData: string }) => {
  const { t } = useTranslation();
  const data = t(keyData, {
    returnObjects: true,
  }) as item[];

  if (!Array.isArray(data)) return null;

  return (
    <StyledTableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell width={200}>
              {t('csApi.descriptionTable.step')}
            </TableCell>
            <TableCell width={310}>
              {t('csApi.descriptionTable.description')}
            </TableCell>
            <TableCell width={310}>
              {t('csApi.descriptionTable.note')}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item, index) => (
            <Fragment key={`row-${index}`}>
              <TableRow>
                <TableCell rowSpan={item.keyExample ? 2 : 1}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {item.step.split('\n').map((part, index) => (
                      <TableCodeContent key={index}>{part}</TableCodeContent>
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <TransContent
                    i18nKey={`${keyData}.${index}.description`}
                    link={item.link}
                  />
                </TableCell>
                <TableCell>
                  <TransContent i18nKey={`${keyData}.${index}.note`} />
                </TableCell>
              </TableRow>
              {/*example */}
              {item.keyExample && (
                <TableRow>
                  <TableCell colSpan={2}>
                    <CodeView
                      title={t('csApi.example') || ''}
                      codes={t(item.keyExample, {
                        returnObjects: true,
                      })}
                    />
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};
