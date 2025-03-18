import { Box, Card, Collapse } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardTitle } from '@web-workspace/saforus/components/forensic-watermarking-v2/common';
import { StyledDataGrid, TableContent } from './styled-elements';
import { GridColDef } from '@mui/x-data-grid';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useSnapshot } from 'valtio';
import { ExpandIcon } from '@web-workspace/shared/components/widgets/icon';

interface ShareInfo {
  id?: number;
  wtrCode?: string;
  fileName?: string;
  sharedEmails?: string[];
  shareDate?: Date | string;
}

const SharedHistory = ({ shareList }: { shareList: ShareInfo[] }) => {
  const { t } = useTranslation();
  const [expand, setExpand] = useState(true);
  const { timeZone, tzDisplayOffset: tzOffset } = useSnapshot(AuthStore);

  const columns: GridColDef[] = [
    {
      field: 'wtrCode',
      headerName: `${t(
        'watermarked-order-detail.shared-history.watermark-code'
      )}`,
      width: 200,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent
            sx={{
              color: 'var(--purple-600)',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            {params.value ?? '--'}
          </TableContent>
        );
      },
    },
    {
      field: 'fileName',
      headerName: `${t('watermarked-order-detail.shared-history.file-name')}`,
      minWidth: 300,
      maxWidth: 600,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <TableContent> {params.value ?? '--'}</TableContent>;
      },
    },
    {
      field: 'sharedEmails',
      headerName: `${t('watermarked-order-detail.shared-history.share-email')}`,
      width: 350,
      sortable: true,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6em',
              width: '100%',
            }}
          >
            {params.value.map((email: string, index: number) => (
              <Box
                key={index}
                sx={{
                  padding: '2px 8px',
                  backgroundColor: 'var(--neutral-300)',
                  borderRadius: '5px',
                  color: 'var(--gray-700)',
                }}
              >
                {email}
              </Box>
            ))}
          </TableContent>
        );
      },
    },

    {
      field: 'shareDate',
      headerName: `${t('watermarked-order-detail.shared-history.share-date')}`,
      width: 280,
      sortable: true,
      disableColumnMenu: true,
      renderCell(params) {
        const formattedDate = params.value
          ? formatDateWithLanguage({
              date: params.value,
              isDetail: true,
              withSlash: true,
              tzOffset,
            })
          : '--';
        return (
          <TableContent sx={{ color: 'var(--gray-25)' }}>
            {`${formattedDate} (GMT${timeZone})`}
          </TableContent>
        );
      },
    },
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: 'var(--base-white)',
        borderRadius: '8px',
        border: '1px solid var(--neutral-600)',
      }}
    >
      <CardTitle
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => setExpand(!expand)}
      >
        {t('watermarked-order-detail.shared-history.title')}
        <p
          style={{
            margin: '4px',
            display: 'inline-flex',
            width: '18px',
            height: '18px',
            alignItems: 'center',
            justifyContent: 'center',
            border: '0.75px solid var(--gray-100)',
            borderRadius: '50%',

            fontFamily: 'Inter',
            fontSize: '10px',
            fontWeight: 500,
            lineHeight: '18px',
            color: 'var(--gray-100)',
          }}
        >
          {shareList.length}
        </p>
        <ExpandIcon expand={expand} iconProps={{ color: 'var(--gray-50)' }} />
      </CardTitle>
      <Collapse in={expand}>
        <Box sx={{ padding: '0px 16px 16px 16px' }}>
          <Box sx={{ overflow: 'auto' }}>
            <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
              <StyledDataGrid
                rows={shareList}
                columns={columns}
                paginationMode="server"
                loading={false}
                hideFooter={true}
                getRowHeight={() => 'auto'}
              />
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
};

export default SharedHistory;
