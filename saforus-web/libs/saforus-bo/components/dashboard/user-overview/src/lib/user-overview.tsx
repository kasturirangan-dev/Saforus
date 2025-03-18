import { Box, Typography, styled } from '@mui/material';
import {
  StaticsTitle,
  BoxContent,
} from '@web-workspace/saforus-bo/components/dashboard/common';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { AdminDashboardStore } from '@web-workspace/saforus-bo/components/dashboard/data';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import Table from '@web-workspace/shared/components/widgets/table';
import { GridColDef } from '@mui/x-data-grid';
import SearchUserStore from '@web-workspace/saforus-bo/components/user-management/search-user/data';
import { CustomLabel } from '@web-workspace/saforus-bo/common/view';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import i18next from 'i18next';
import { Link } from 'react-router-dom';

interface UserOverViewProps {
  isloading: boolean;
}

export const TableContent = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',

  color: 'var(--gray-700)',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}));

const UserOverView: React.FC<UserOverViewProps> = ({ isloading }) => {
  const { t } = useTranslation();
  const { users } = useSnapshot(AdminDashboardStore);
  const { setUserId } = useSnapshot(SearchUserStore);

  const usersArray = Array.from(users ?? []);

  const columns: GridColDef[] = [
    {
      field: 'email',
      headerName: `${t('adminDashboard.user-overview.email')}`,
      width: 250,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const id = params?.row?.userId;
        const detailPageUrl = `${BO_ROUTES.USER_MANAGEMENT.SEARCH_USERS.children.USER_DETAIL.path}/${id}`;
        return (
          <Box>
            <Link
              to={detailPageUrl}
              onClick={() => {
                setUserId(id);
              }}
            >
              <TableContent sx={{ color: 'var(--primary--400)' }}>
                {params.value}
              </TableContent>
            </Link>
          </Box>
        );
      },
    },
    {
      field: 'fullName',
      headerName: `${t('adminDashboard.user-overview.name')}`,
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <TableContent>{params.value}</TableContent>;
      },
    },
    {
      field: 'userRole',
      headerName: `${t('adminDashboard.user-overview.type')}`,
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <CustomLabel value={params.value} />;
      },
    },
    {
      field: 'teamName',
      headerName: `${t('adminDashboard.user-overview.team-name')}`,
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <TableContent>{params.value}</TableContent>;
      },
    },
    {
      field: 'subscriptionPlanName',
      headerName: `${t('adminDashboard.user-overview.subscription')}`,
      align: 'center',
      headerAlign: 'center',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const isFree = params.value === 'Free Trial';
        return (
          params.value && (
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{
                textTransform: 'capitalize',
                display: 'inline-block',
                padding: '2px 8px',
                borderRadius: '5px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: isFree ? 'var(--gray-700)' : 'var(--green-700)',
                bgcolor: isFree ? 'var(--neutral-300)' : 'var(--green-50)',
              }}
            >
              {params.value}
            </Typography>
          )
        );
      },
    },
    {
      field: 'status',
      headerName: `${t('adminDashboard.user-overview.status')}`,
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <CustomLabel value={params.value} />;
      },
    },
    {
      field: 'joinedDate',
      headerName: `${t('adminDashboard.user-overview.joined')}`,
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent sx={{ color: 'var(--gray-25)' }}>
            {formatDateWithLanguage(params?.value, i18next.language, true)}
          </TableContent>
        );
      },
    },
  ];

  return (
    <BoxContent gap="24px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <StaticsTitle>{t('adminDashboard.user-overview.title')}</StaticsTitle>
        <Link
          to={BO_ROUTES.USER_MANAGEMENT.SEARCH_USERS.path}
          style={{
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            letterSpacing: '-0.1px',
            textDecorationLine: 'underline',
            textUnderlineOffset: '2px',
            color: 'var(--gray-100)',
          }}
        >
          {t('adminDashboard.see-more')}
        </Link>
      </Box>

      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
          <Table
            rows={usersArray}
            columns={columns}
            paginationMode="server"
            loading={isloading}
            hideFooter={true}
          />
        </Box>
      </Box>
    </BoxContent>
  );
};
export default UserOverView;
