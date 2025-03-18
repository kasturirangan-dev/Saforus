import { Box, Button, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useMemo, useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  UserDetails,
  AdminDashboardStore,
  TimeZones,
} from '@web-workspace/api-bo/components/admin-dashboard/data';
import { TableContent } from './table-content';
import {
  formatDateWithLanguage,
  formatedTimezone,
  getLocalTimeZone,
} from '@web-workspace/shared/helpers/dates';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { ActiveStatus, RoleStatus } from '@web-workspace/shared/components/widgets/content-label';
import AddIcon from '../assets/add.svg';
import EditIcon from '../assets/edit.svg';
import { StyledDataGrid } from '@web-workspace/api-bo/common/views';

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  padding: '8px 12px',
  cursor: 'pointer',
  background: '#2C3444'
}));

const StyledImage = styled('img')(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    boxShadow: `var(--shadow-md)`,
  },
}));


type UserDataListProps = {
  userData: UserDetails[];
  total: number;
  onPageChange: (selection: any) => void;
  loading: boolean;
};

function UsersListView({
  userData = [],
  total,
  onPageChange,
  loading,
}: UserDataListProps) {
  const { t } = useTranslation();
  const { tzDisplayOffset: tzOffset, timeZone } = useSnapshot(CsApiAuthStore);
  const { searchQuery } = useSnapshot(AdminDashboardStore);

  const [paginationModel, setPaginationModel] = useState({
    page: searchQuery.page || 0,
    pageSize: searchQuery.size || 10,
  });

  useEffect(() => {
    onPageChange(paginationModel);
  }, [paginationModel]);

  // Reset page no when search query change
  const apiRef = useGridApiRef();
  useEffect(() => {
    if (searchQuery.page !== paginationModel.page) {
      apiRef.current?.setPage(searchQuery.page || 0);
    }
  }, [searchQuery.page]);

  const currentTmeZone = useMemo(() => {
    const { localTz } = getLocalTimeZone();
    const { timeZone } = formatedTimezone(localTz);
    const timeZoneObject = TimeZones.find((el) => el.value === timeZone);

    return timeZoneObject?.value
  }, []);

  const handleAddUser = () => {
    dialogStore.openDialog({
      name: DialogType.CsApiBoAdminAddUser,
    });
  };

  const handleEditUser = (userData: UserDetails) => {
    dialogStore.openDialog({
      name: DialogType.CsApiBoAdminEditUser,
      props: {
        selectedUserData: userData,
      },
    });
  };

  const columns: GridColDef[] = [
    {
      field: 'action',
      headerName: `Edit`,
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <StyledImage
              src={EditIcon}
              alt="Edit"
              onClick={() => handleEditUser(params.row)}
            />
          </Box>
        );
      },
    },
    {
      field: 'accountName',
      headerName: `Name`,
      minWidth: 250,
      maxWidth: 300,
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <TableContent value={params.value} />;
      },
    },
    {
      field: 'email',
      headerName: `Email`,
      minWidth: 250,
      maxWidth: 350,
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <TableContent value={params.value} link={params.value} />;
      },
    },
    {
      field: `roles`,
      headerName: `Role`,
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const rolesPriority = ['SYS_ADMIN', 'ADMIN', 'VIEWER'];
        const highestRole = rolesPriority.find(role => params.value.includes(role)) || 'VIEWER';
        return <RoleStatus value={highestRole} />;
      },
    },
    {
      field: 'status',
      headerName: `Status`,
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <ActiveStatus value={params.value} />;
      },
    },
    {
      field: 'joinedAt',
      headerName: `Joined Date`,
      width: 250,
      sortable: false,
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
          <TableContent
            value={`${formattedDate} GMT(${currentTmeZone})`}
            styleContent={{ color: 'var(--gray-25)' }}
          />
        );
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
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color={'var(--gray-700)'}
            >
              {'Team Members'}
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color={'var(--purple-400)'}
            >
              {total}
            </Typography>
          </Box>

          <StyledButton onClick={handleAddUser} sx={{
            gap: '3px', color: 'var(--base-white)', borderRadius: '5px'
          }}>
            <img src={AddIcon} alt="add-icon" />
            Invite Member
          </StyledButton>
        </Box>
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
            <StyledDataGrid
              apiRef={apiRef}
              rows={userData}
              columns={columns}
              rowCount={total || 0}
              paginationModel={paginationModel}
              paginationMode="server"
              onPaginationModelChange={setPaginationModel}
              loading={loading}
              hideFooter={false}
            />
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
}

export default memo(UsersListView);
