import { Box, Card, SxProps, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import Table from '@web-workspace/shared/components/widgets/table';
import { useSnapshot } from 'valtio';
import { Link } from 'react-router-dom';
import {
  AdminUserCreditStore,
  UserCreditModel,
} from '@web-workspace/saforus/components/user-info/admin-user-credit/data';
import { UserRole } from '@web-workspace/saforus/common/model';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';

interface IResultContentLabel {
  sx?: SxProps;
  field: string;
  row: UserCreditModel;
}

function ResultContentLabel({ field, row, sx }: IResultContentLabel) {
  const { t } = useTranslation();
  let color = 'var(--gray-700)';
  let borderRadius = '0px';
  let px = '0';
  let py = '0';
  const usedCapacitySize = (row?.wtrUsedCapacitySize ?? 0) * 1000;
  const capacitySize = (row?.wtrCapacitySize ?? 0) * 1000;
  const roundedUsedCapacity = Math.ceil(usedCapacitySize);
  const roundedCapacitySize = Math.ceil(capacitySize);

  switch (field) {
    case 'userRole':
      color = row?.isAdmin ? 'var(--purple-600)' : 'var(--gray-700)';
      px = '1rem';
      py = '0.5rem';
      borderRadius = '8px';
      // eslint-disable-next-line no-case-declarations
      let valueStr = row?.userRole ?? '';
      if (row?.isAdmin) {
        valueStr = 'Admin';
      } else {
        switch (row?.userRole) {
          case UserRole.TEAM_EDITOR:
            valueStr = `${t('team-member.role.member')}`;
            break;
          case UserRole.TEAM_VIEWER:
            valueStr = `${t('team-member.role.viewer')}`;
            break;
          case UserRole.TEAM_OWNER:
            valueStr = `${t('team-member.role.owner')}`;
            break;
          case UserRole.PRIVATE_USER:
            valueStr = `${t('team-member.role.owner')}`;
            break;
          default:
            valueStr = row?.userRole ?? `${t('team-member.role.owner')}`;
            break;
        }
      }

      return (
        <Typography
          sx={{
            color,
            fontSize: '15px',
            fontWeight: '500',
            textAlign: 'center',
            borderRadius,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            backgroundColor: row?.isAdmin
              ? 'var(--purple-50)'
              : 'var(--neutral-300)',
            ...sx,
            px,
            py,
          }}
        >
          {valueStr}
        </Typography>
      );
    case 'wtrCapacitySize':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            sx={{
              color: 'var(--purple-400)',
              fontSize: '15px',
              fontWeight: '500',
              textAlign: 'center',
              ...sx,
              px,
              py,
            }}
          >
            {roundedUsedCapacity}
          </Typography>
          <Typography
            sx={{
              color,
              fontSize: '15px',
              fontWeight: '500',
              textAlign: 'center',
              ...sx,
              px,
              py,
            }}
          >
            {`/${roundedCapacitySize}`}
          </Typography>
        </Box>
      );
    case 'wtrUsedCapacitySize':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            sx={{
              color: 'var(--purple-400)',
              fontSize: '15px',
              fontWeight: '500',
              textAlign: 'center',
              ...sx,
              px,
              py,
            }}
          >
            {roundedUsedCapacity / 10}
          </Typography>
          <Typography
            sx={{
              color,
              fontSize: '15px',
              fontWeight: '500',
              textAlign: 'center',
              ...sx,
              px,
              py,
            }}
          >
            {`/${roundedCapacitySize / 10}`}
          </Typography>
        </Box>
      );
    default:
      return null;
  }
}

function UserCreditListView({
  onPageChange,
  userCredits = [],
  total,
  listLoading,
}: any) {
  const { t } = useTranslation();
  const { openLNB } = useSnapshot(LayoutStore);
  const { searchQuery } = useSnapshot(AdminUserCreditStore);
  const [paginationModel, setPaginationModel] = useState({
    page: searchQuery.pageNo || 0,
    pageSize: searchQuery.elementPerPage || 10,
  });

  // const [itemCount, setItemCount] = useState(0);
  // useEffect(() => {
  //   let count = searchQuery.pageNo ? searchQuery.pageNo + 10 : 10;
  //   if (count > total) {
  //     count = total;
  //   }
  //   setItemCount(count);
  // }, [searchQuery.pageNo, total]);

  useEffect(() => {
    onPageChange(paginationModel);
  }, [paginationModel]);

  const columns: GridColDef[] = [
    {
      field: 'userRole',
      headerName: `${t('userCredit.table.type')}`,
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <ResultContentLabel field={params.field} row={params.row} />;
      },
    },
    {
      field: 'email',
      headerName: `${t('userCredit.table.email')}`,
      width: 300,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const email = params.value;
        return (
          <Link
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            to={`mailto:${email}`}
          >
            {params.value}
          </Link>
        );
      },
    },
    {
      field: 'fullName',
      headerName: `${t('userCredit.table.name')}`,
      width: 250,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Typography
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            variant="body2"
            color={'var(--gray-900)'}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: 'wtrCapacitySize',
      headerName: `${t('userCredit.table.credit')}`,
      align: 'center',
      headerAlign: 'center',
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <ResultContentLabel field={params.field} row={params.row} />;
      },
    },
    {
      field: 'wtrUsedCapacitySize',
      headerName: `${t('userCredit.table.capacity')}`,
      align: 'center',
      headerAlign: 'center',
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <ResultContentLabel field={params.field} row={params.row} />;
      },
    },
  ];

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Loading...
        </Box>
      }
    >
      <Card
        sx={{
          mt: '1.5rem',
          background: 'var(--base-white)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
        }}
      >
        <Typography
          variant="h6"
          color={'var(--gray-900)'}
          sx={{ lineHeight: '44px' }}
        >
          {t('userCredit.total', {
            total: total,
          })}
        </Typography>
        <Box
          sx={{
            maxWidth: openLNB ? 'calc(100vw - 31rem)' : 'calc(100vw - 17rem)',
            mt: '1rem',
          }}
        >
          <Table
            rows={[...userCredits]}
            columns={columns}
            rowCount={total || 0}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            loading={listLoading}
          />
        </Box>
      </Card>
    </Suspense>
  );
}

export default memo(UserCreditListView);
