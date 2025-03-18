import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@web-workspace/api-console/common/views';
import {
  UserManagementStore,
  useUserData
} from '@web-workspace/api-bo/components/user-management/data';
import { useSnapshot } from 'valtio';
import UsersListView from './views/user-details-list-view';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
}));

export function ApiConsoleUserManagementConsole() {

  const { isFetching, onPageChange } = useUserData();
  const { userData, totalUsers } = useSnapshot(UserManagementStore);

  return (
    <BoxContainer>
      <PageTitle title={'Account Management'}>
        <Typography whiteSpace="pre-line">
          {'Create new accounts and manage existing user accounts efficiently to access CS API Website'}
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

export default ApiConsoleUserManagementConsole;
