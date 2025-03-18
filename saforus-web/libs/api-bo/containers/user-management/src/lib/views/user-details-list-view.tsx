import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  UserDetails,
  UserManagementStore,
} from '@web-workspace/api-bo/components/user-management/data';
import { TableContent } from './table-content';
import {
  formatDateWithLanguage,
} from '@web-workspace/shared/helpers/dates';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
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
  const { searchQuery } = useSnapshot(UserManagementStore);

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

  const handleAddUser = () => {
    dialogStore.openDialog({
      name: DialogType.CsApiBoAddUser,
    });
  };

  const handleEditUserData = (userData: UserDetails) => {
    dialogStore.openDialog({
      name: DialogType.CsApiBoEditUser,
      props: {
        selectedUserData: userData,
      },
    });
  };

  const columns: GridColDef[] = [
    {
      field: 'action',
      headerName: `Edit`,
      width: 125,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <StyledImage
              src={EditIcon}
              alt="Edit"
              onClick={() => handleEditUserData(params.row)}
            />
          </Box>
        );
      },
    },
    {
      field: 'accountName',
      headerName: `User Name`,
      minWidth: 200,
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
        return <TableContent value={params.value} />;
      },
    },
    {
      field: `companyName`,
      headerName: `Company`,
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <TableContent value={params.value} />;
      },
    },
    {
      field: 'createdAt',
      headerName: `Created Date`,
      width: 350,
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
            value={`${formattedDate} (GMT${timeZone})`}
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
              Total: {total} Accounts
            </Typography>
          </Box>

          <StyledButton onClick={handleAddUser} sx={{
            gap: '3px',
          }}>
            <img src={AddIcon} alt="add-icon" />
            New Account
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
