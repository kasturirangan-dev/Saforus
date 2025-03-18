import {
  Box,
  styled,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@mui/material';
import { MediaConfigs } from '@web-workspace/api-console/common/model';
import { useTranslation } from 'react-i18next';
import image from '../assets/image.svg';
import document from '../assets/document.svg';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  border: '1px solid var(--neutral-500)',
}));

const StyledTable = styled(Table)(({ theme }) => ({
  backgroundColor: 'var(--base-white)',
  borderStyle: 'hidden',

  '& .MuiTableCell-root': {
    border: '1px solid var(--neutral-400)',
  },

  '& th': {
    backgroundColor: 'var(--neutral-400)',
    padding: '12px 16px',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
    color: 'var(--gray-950)',
  },

  '& td': {
    padding: '8px 16px',
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '-0.1px',
  },
}));

interface SupportedData {
  id: number;
  type: string;
  icon: string;
  fileFormat: string[];
  minResolution: string;
  maxResolution: string | Record<string, string>[];
}

const supportedData = [
  {
    id: 1,
    type: 'image',
    icon: image,
    fileFormat: MediaConfigs.IMG.supportedFormats,
    minResolution: MediaConfigs.IMG.supportedResolutions.min,
    maxResolution: MediaConfigs.IMG.supportedResolutions.max,
  },
  {
    id: 2,
    type: 'document',
    icon: document,
    fileFormat: MediaConfigs.DOCUMENT.supportedFormats,
    minResolution: MediaConfigs.DOCUMENT.supportedResolutions.min,
    maxResolution: MediaConfigs.DOCUMENT.supportedResolutions.max,
  },
] as SupportedData[];

const SupportedTable = () => {
  const { t } = useTranslation();

  const RowInfo = ({ data }: { data: SupportedData }) => {
    return (
      <TableRow>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={data.icon} alt={data.type} width={22} height={22} />
            {t(`common.content-type.${data.type}`)}
          </Box>
        </TableCell>
        <TableCell>{data.fileFormat.join(', ')}</TableCell>
        <TableCell>{data.minResolution}</TableCell>
        <TableCell height="60px">
          {typeof data.maxResolution === 'string'
            ? data.maxResolution
            : data.maxResolution.map((item, index) => {
                const key = Object.keys(item)[0];
                const value = item[key];
                return (
                  <div key={index}>
                    {t(`api-file-supported.table.${key.toLowerCase()}`)}:{' '}
                    {value}
                  </div>
                );
              })}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <StyledTableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell width={150}>
              {t('api-file-supported.table.type')}
            </TableCell>
            <TableCell width={350}>
              {t('api-file-supported.table.file-format')}
            </TableCell>
            <TableCell width={350}>
              {t('api-file-supported.table.min-res')}
            </TableCell>
            <TableCell width={350}>
              {t('api-file-supported.table.max-res')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {supportedData.map((item) => (
            <RowInfo key={item.id} data={item} />
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default SupportedTable;
