import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@web-workspace/api-console/common/views';
import {
  AdminDashboardStore,
  useUserData
} from '@web-workspace/api-bo/components/admin-dashboard/data';
import { useSnapshot } from 'valtio';
import UsersListView from './views/user-details-list-view';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
}));

export function AdminDashboardContainer() {

  const { isFetching, onPageChange } = useUserData();
  const { userData, totalUsers } = useSnapshot(AdminDashboardStore);

  return (
    <BoxContainer>
      <PageTitle title={'Admin'}>
        <Typography whiteSpace="pre-line">
          {'Manage the system of CS API, monitor activities, handle members, and send invitations to join Back Office.'}
        </Typography>
      </PageTitle>

      {/* Api key tabel */}
      <UsersListView
        userData={[...userData]}
        total={totalUsers}
        onPageChange={onPageChange}
        loading={isFetching}
      />
    </BoxContainer>
  );
}

export default AdminDashboardContainer;
