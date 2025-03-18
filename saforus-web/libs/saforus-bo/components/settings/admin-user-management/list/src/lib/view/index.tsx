import { Box, Card, SxProps, Typography, styled } from '@mui/material';
import MuiButton from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import {
  GridColDef,
  GridRowSelectionModel,
  useGridApiRef,
} from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import Table from '@web-workspace/shared/components/widgets/table';
import { useSnapshot } from 'valtio';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import {
  AdminUserManagementStore,
  AdminUserModel,
} from '@web-workspace/saforus-bo/components/settings/admin-user-management/data';
import BoAuthStore from '@web-workspace/shared/hooks/use-bo-auth';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import OutIcon from '../assets/out.svg';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';

const CustomButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: 5,
  boxShadow: `var(--shadow-xsm)`,
  padding: '12px 18px',
  fontWeight: '600',
  fontSize: '14px',
  cursor: 'pointer',
  textTransform: 'none',
  color: 'var(--base-white)',
  backgroundColor: 'var(--red-500)',
  border: '1px solid var(--red-500)',
  '&.Mui-disabled': {
    background: 'var(--neutral-500)',
    color: 'var(--base-white)',
    border: '1px solid var(--neutral-500)',
  },
  '&:hover': {
    background: 'var(--red-400)',
    color: 'var(--base-white)',
    border: '1px solid var(--red-400)',
  },
}));

interface IResultContentLabel {
  sx?: SxProps;
  field: string;
  row: AdminUserModel;
}

function ResultContentLabel({ field, row, sx }: IResultContentLabel) {
  const { t } = useTranslation();
  let color = 'var(--gray-700)';
  let borderRadius = '0px';
  let px = '0';
  let py = '0';

  switch (field) {
    case 'userRole':
      color = row?.isAdmin ? 'var(--purple-600)' : 'var(--gray-700)';
      px = '1rem';
      py = '0.5rem';
      borderRadius = '8px';

      return (
        <Typography
          sx={{
            color,
            fontSize: '15px',
            fontWeight: '500',
            textAlign: 'center',
            borderRadius,
            backgroundColor: row?.isAdmin
              ? 'var(--purple-50)'
              : 'var(--neutral-300)',
            ...sx,
            px,
            py,
          }}
        >
          {row?.role}
        </Typography>
      );
    case 'status':
      color =
        row?.status === 'active' ? 'var(--green-700)' : 'var(--base-white)';
      px = '1rem';
      py = '0.5rem';
      borderRadius = '8px';

      // eslint-disable-next-line no-case-declarations
      let valueStr = row?.status ?? '';
      if (row?.status === 'active') {
        valueStr = t('boSettings.admin-user-management.active');
      } else {
        valueStr = t('boSettings.admin-user-management.inactive');
      }

      return (
        <Typography
          sx={{
            color,
            fontSize: '15px',
            fontWeight: '500',
            textAlign: 'center',
            borderRadius,
            backgroundColor:
              row?.status === 'active'
                ? 'var(--green-50)'
                : 'var(--neutral-800)',
            ...sx,
            px,
            py,
          }}
        >
          {valueStr}
        </Typography>
      );
    default:
      return null;
  }
}

function AdminUserListView({
  onPageChange,
  adminUsers,
  total,
  listLoading,
  setSelectedItems,
  selectedItems,
}: {
  onPageChange: (paginationModel: { page: number; pageSize: number }) => void;
  adminUsers: AdminUserModel[];
  total: number;
  listLoading: boolean;
  setSelectedItems: (items: AdminUserModel[]) => void;
  selectedItems: AdminUserModel[];
}) {
  const { t } = useTranslation();
  const { userInfo } = useSnapshot(BoAuthStore);
  const { openLNB } = useSnapshot(LayoutStore);
  const { searchQuery } = useSnapshot(AdminUserManagementStore);
  const [paginationModel, setPaginationModel] = useState({
    page: searchQuery.pageNo || 0,
    pageSize: searchQuery.elementPerPage || 10,
  });

  // Reset page no when search query change
  const apiRef = useGridApiRef();
  useEffect(() => {
    if (searchQuery.pageNo !== paginationModel.page) {
      apiRef.current?.setPage(searchQuery.pageNo || 0);
    }
  }, [searchQuery.pageNo]);

  const handleRemoveMember = () => {
    dialogStore.openDialog({ name: DialogType.BoDeleteAdminUsers });
  };

  const handleUpdateMember = (data: AdminUserModel) => {
    dialogStore.openDialog({
      name: DialogType.BoUpdateAdminUser,
      props: { adminUser: data },
    });
  };

  const handleSelection = (selection: GridRowSelectionModel) => {
    const selectedRows = adminUsers.filter((e) => selection.includes(e.id));
    setSelectedItems(selectedRows);
  };

  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (total) {
      const totalPage = Math.ceil(total / paginationModel.pageSize);
      setTotalPages(totalPage);
    } else {
      setTotalPages(0);
    }
  }, [total]);

  useEffect(() => {
    onPageChange(paginationModel);
  }, [paginationModel]);

  const columns: GridColDef[] = [
    {
      field: 'userRole',
      headerName: `${t('boSettings.admin-user-management.table.Type')}`,
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <ResultContentLabel field={params.field} row={params.row} />;
      },
    },
    {
      field: 'email',
      headerName: `${t('boSettings.admin-user-management.table.email')}`,
      width: 300,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const email = params.value;
        return (
          <MuiButton
            variant="text"
            sx={{
              color: 'var(--purple-500, #5D55F6)',
              fontFamily: 'Noto Sans KR',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              textTransform: 'none',
              padding: '0',
              textDecoration: 'underline',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            onClick={() => handleUpdateMember(params.row as AdminUserModel)}
          >
            {email}
          </MuiButton>
        );
      },
    },
    {
      field: 'fullName',
      headerName: `${t('boSettings.admin-user-management.table.name')}`,
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
      field: 'status',
      headerName: `${t('boSettings.admin-user-management.table.status')}`,
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
      field: 'createdDate',
      headerName: `${t('boSettings.admin-user-management.table.joined')}`,
      align: 'center',
      headerAlign: 'center',
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Box>
            {formatDateWithLanguage(
              params?.value,
              i18next.language,
              true,
              undefined,
              userInfo?.timeZoneName
            )}
          </Box>
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
      <Card
        sx={{
          mt: '1.5rem',
          background: 'var(--base-white)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            color={'var(--gray-900)'}
            sx={{ lineHeight: '44px' }}
          >
            {t('boSettings.admin-user-management.total', {
              total: total,
            })}
          </Typography>

          <Box>
            <CustomButton
              disabled={selectedItems.length <= 0}
              onClick={handleRemoveMember}
            >
              <img
                src={OutIcon}
                alt="remove"
                width={16}
                height={16}
                loading="lazy"
                style={{ marginRight: '0.5rem' }}
              />
              {t('team-member.team-member-info.remove-members')}
            </CustomButton>
          </Box>
        </Box>
        <Typography
          variant="body1"
          color={'var(--gray-25)'}
          sx={{ mt: '0.5rem' }}
        >
          {t('boSettings.admin-user-management.page-of-total', {
            page: (searchQuery.pageNo || 0) + 1,
            totalPage: totalPages,
          })}
        </Typography>
        <Box
          sx={{
            maxWidth: openLNB ? 'calc(100vw - 31rem)' : 'calc(100vw - 17rem)',
            mt: '1rem',
          }}
        >
          <Table
            apiRef={apiRef}
            rows={[...adminUsers]}
            columns={columns}
            rowCount={total || 0}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            loading={listLoading}
            checkboxSelection={true}
            rowSelection={true}
            rowSelectionModel={selectedItems.map((e) => e.id)}
            onRowSelectionModelChange={handleSelection}
            isRowSelectable={(params) =>
              params.row.email !== BoAuthStore.userInfo?.email
            }
            getRowClassName={(params) =>
              params.row.email !== BoAuthStore.userInfo?.email
                ? ''
                : 'row-disabled'
            }
          />
        </Box>
      </Card>
    </Suspense>
  );
}

export default memo(AdminUserListView);
