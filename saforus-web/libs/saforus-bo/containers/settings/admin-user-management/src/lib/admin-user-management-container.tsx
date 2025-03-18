import { Container, Backdrop, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useQuery } from 'react-query';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import AdminUserList from '@web-workspace/saforus-bo/components/settings/admin-user-management/list';
import AdminUserSearch from '@web-workspace/saforus-bo/components/settings/admin-user-management/search';
import CommonStore, {
  QUERY_COMMON_KEY,
  getRequesters,
} from '@web-workspace/saforus-bo/common/data';
import { TOption } from '@web-workspace/saforus-bo/common/model';
import { AdminUserManagementStore } from '@web-workspace/saforus-bo/components/settings/admin-user-management/data';

export function AdminUserManagementContainer() {
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  const { setMarkAnyUsers, setUsers } = useSnapshot(AdminUserManagementStore);

  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  const { isSuccess } = useQuery<unknown, Error, any>({
    refetchOnWindowFocus: false,
    queryKey: [QUERY_COMMON_KEY.WATERMARKING_ORDERS_REQUESTERS],
    queryFn: async () => {
      return getRequesters();
    },
    onSuccess: (data: any) => {
      if (data) {
        let mappedOptions: TOption[] = [];
        let mappedUsers: TOption[] = [];
        if (Array.isArray(data)) {
          mappedOptions = data.map((item: any) => {
            if (item?.userId === 0) {
              return {
                label: item?.email || '',
                value: item?.email || '',
              };
            }
            return {
              label: item?.email || '',
              value: item?.email || '',
            };
          }) as TOption[];
          mappedUsers = data.map((item: any) => {
            if (item?.userId === 0) {
              return {
                label: item?.email || '',
                value: item?.userId || '',
              };
            }
            return {
              label: item?.email || '',
              value: item?.userId || '',
            };
          }) as TOption[];
        }
        const filterRequesters = mappedOptions.filter((el) =>
          el.value.toString().toLowerCase().endsWith('@markany.com')
        );

        const filterUsers = mappedUsers.filter((el) =>
          el.label.toString().toLowerCase().endsWith('@markany.com')
        );

        setMarkAnyUsers(filterRequesters);
        setUsers(filterUsers);
      } else {
        setMarkAnyUsers([]);
        setUsers([]);
      }
    },
  });

  return (
    <Container maxWidth={false}>
      {/* <Backdrop
        open={!isSuccess}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          color: 'var(--main-brand)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <AdminUserSearch />
      <AdminUserList />
    </Container>
  );
}

export default AdminUserManagementContainer;
