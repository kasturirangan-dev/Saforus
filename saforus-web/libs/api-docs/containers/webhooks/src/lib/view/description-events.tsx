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
} from '@web-workspace/api-docs/components/guides/specification-table';
import { Fragment } from 'react';
import CodeView from '@web-workspace/api-docs/components/guides/code-view';

interface item {
  step: string;
  description: string;
  note: string;
  keyExample?: string;
}

export const DescriptionEvents = ({ keyData }: { keyData: string }) => {
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
            <TableCell width={410}>
              {t('csApi.webhooks.events.table.event')}
            </TableCell>
            <TableCell width={410}>
              {t('csApi.webhooks.events.table.description')}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item, index) => (
            <Fragment key={`row-${index}`}>
              <TableRow>
                <TableCell>
                  <TableCodeContent key={index}>{item.step}</TableCodeContent>
                </TableCell>
                <TableCell>
                  <TransContent i18nKey={`${keyData}.${index}.description`} />
                </TableCell>
              </TableRow>
              {/*example */}
              {item.keyExample && (
                <TableRow>
                  <TableCell colSpan={2}>
                    <CodeView
                      title={t('apiIntegration.example-code.title') || ''}
                      codes={t(item.keyExample, {
                        returnObjects: true,
                      })}
                      displayLanguage="json"
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
