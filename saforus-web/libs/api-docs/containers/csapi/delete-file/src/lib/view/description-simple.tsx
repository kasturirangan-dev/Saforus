import { useTranslation } from 'react-i18next';
import {
  CodeContent,
  TransContent,
} from '@web-workspace/api-docs/components/guides/section';
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  StyledTable,
  StyledTableContainer,
  TableCodeContent,
} from '@web-workspace/api-docs/components/guides/specification-table';
import { Fragment } from 'react';

interface item {
  step: string;
  description: string;
  note: string;
  keyExample?: string;
}

export const DescriptionFlow = ({ keyData }: { keyData: string }) => {
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
            <TableCell width={620}>
              {t('csApi.descriptionTable.description')}
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
            </Fragment>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};
