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
  TableCodeContent,
} from '@web-workspace/api-docs/components/guides/specification-table';
import {
  CodeContent,
  TransContent,
} from '@web-workspace/api-docs/components/guides/section';

interface Item {
  code: string;
  description: string;
  action: string;
}

const ErrorCodesTable = ({
  keyData,
  type = 'system',
}: {
  keyData: string;
  type?: 'system' | 'business';
}) => {
  const { t } = useTranslation();

  const data = t(keyData, {
    returnObjects: true,
  }) as Item[];
  if (!Array.isArray(data)) return null;
  return (
    <>
      <Label
        label={t(`errorCodes.table.${type}`)}
        bgcolor={type === 'system' ? 'var(--red-100)' : 'var(--green-100)'}
      />
      <StyledTableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell width={100}>{t('errorCodes.table.code')}</TableCell>
              <TableCell width={360}>
                {t('errorCodes.table.description')}
              </TableCell>
              <TableCell width={360}>{t('errorCodes.table.action')}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={`row-${index}`}>
                <TableCell>
                  <TableCodeContent>{item.code}</TableCodeContent>
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <TransContent
                    i18nKey={`${keyData}.${index}.action`}
                  ></TransContent>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </>
  );
};

const Label = ({ label, bgcolor }: { label: string; bgcolor: string }) => {
  return (
    <Typography
      variant="caption"
      fontFamily="Inter, Noto Sans KR"
      fontWeight={500}
      sx={{
        padding: '2px 8px',
        borderRadius: '5px',
        bgcolor,
        width: 'fit-content',
      }}
    >
      {label}
    </Typography>
  );
};

export const ErrorCodesView = ({ keyData }: { keyData: string }) => {
  return (
    <>
      <ErrorCodesTable keyData={`${keyData}.system`} type="system" />
      <ErrorCodesTable keyData={`${keyData}.business`} type="business" />
    </>
  );
};
