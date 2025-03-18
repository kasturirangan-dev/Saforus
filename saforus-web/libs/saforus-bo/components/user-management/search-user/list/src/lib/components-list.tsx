/* Note and explanation
(1) this is used for set text "A out of B"
    A is the number represent current page 
    B is the number represent total page 
(2) default when useSnapshot return users, it is an 
    object so i have to convert it to an array so it 
    it can be used in table
*/
/////////////////////////////////////////////////////////////////////

// Import area
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import SearchUserStore, {
  UserStatus,
  UserSubscription,
  UserType,
} from '@web-workspace/saforus-bo/components/user-management/search-user/data';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import { Box, InputLabel, SxProps, Typography } from '@mui/material';
import i18next from 'i18next';
import Table from '@web-workspace/shared/components/widgets/table';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import { Link } from 'react-router-dom';
import CommonStore from '@web-workspace/saforus-bo/common/data';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
/////////////////////////////////////////////////////////////////////

// Styled components declaration area
/////////////////////////////////////////////////////////////////////

// Interface and default Function declaration area
interface CustomInputLabelProps {
  sx?: SxProps;
  field: string;
  value: string;
}
/* eslint-disable-next-line */
export interface ListProps {
  orderLoading: boolean;
}

export function List(props: ListProps) {
  // hooks declaration area
  const { t } = useTranslation();
  const { openLNB } = useSnapshot(LayoutStore);
  const { setSearchQuery, searchQuery, users, totalPage, setUserId, total } =
    useSnapshot(SearchUserStore);
  const { userRoleList: userRoles } = useSnapshot(CommonStore);
  // (1)
  const [paginationModel, setPaginationModel] = useState({
    page: searchQuery.pageNo ?? 0,
    pageSize: 10,
  });

  const apiRef = useGridApiRef();
  useEffect(() => {
    if (searchQuery.pageNo !== paginationModel.page) {
      apiRef.current?.setPage(searchQuery.pageNo || 0);
    }
  }, [searchQuery.pageNo]);

  useEffect(() => {
    const pageNo = paginationModel.page;
    setSearchQuery({ pageNo });
  }, [paginationModel]);

  // (1)
  /////////////////////////////////////////////////////////////////

  // react function or function component declaration area
  function CustomInputLabel(props: CustomInputLabelProps) {
    let textColor = 'var(--gray-700)';
    let bgcolor = 'var(--neutral-300)';
    let value = props.value;
    switch (props.field) {
      case 'userRole':
        value =
          userRoles?.find((role) => role.value === props.value)?.label ??
          props.value;
        switch (props.value) {
          case UserType.Master:
            textColor = 'var(--purple-600)';
            bgcolor = 'var(--purple-50)';
            break;
          case UserType.PrivateUser:
            value = 'User';
            break;
        }
        break;
      case 'subscription':
        switch (props.value) {
          case UserSubscription.Standard:
            textColor = 'var(--green-700)';
            bgcolor = 'var(--green-50)';
            break;
          case UserSubscription.Enterprise:
            textColor = 'var(--purple-600)';
            bgcolor = 'var(--purple-50)';
            break;
        }
        break;
      case 'status':
        switch (props.value) {
          case UserStatus.Active:
            textColor = 'var(--green-700)';
            bgcolor = 'var(--green-50)';
            break;
        }
        break;
    }
    const textStyle = {
      borderRadius: '5px',
      bgcolor: bgcolor,
      color: textColor,
      padding: '4px 12px 4px 12px',
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.25rem',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    };
    return (
      <InputLabel color="primary" sx={textStyle}>
        {value}
      </InputLabel>
    );
  }
  /////////////////////////////////////////////////////////////////

  // variable declaration area
  // (2)
  const userArray = Array.from(users ?? []);
  // (2)
  const columns: GridColDef[] = [
    {
      field: 'email',
      headerName: `${t('userManagement.search-user.table.email')}`,
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
              <Typography
                color={'primary'}
                sx={{
                  cursor: 'pointer',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {params.value}
              </Typography>
            </Link>
          </Box>
        );
      },
    },
    {
      field: 'fullName',
      headerName: `${t('userManagement.search-user.table.name')}`,
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Box
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {params.value || '--'}
          </Box>
        );
      },
    },
    {
      field: 'userRole',
      headerName: `${t('userManagement.search-user.table.type')}`,
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <CustomInputLabel field={params.field} value={params.value} />;
      },
    },
    {
      field: 'teamName',
      headerName: `${t('userManagement.search-user.table.team-name')}`,
      align: 'center',
      headerAlign: 'center',
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Box
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {params.value || '--'}
          </Box>
        );
      },
    },
    {
      field: 'subscriptionPlanName',
      headerName: `${t('userManagement.search-user.table.subscription')}`,
      align: 'center',
      headerAlign: 'center',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <CustomInputLabel field={params.field} value={params.value} />;
      },
    },
    {
      field: 'status',
      headerName: `${t('userManagement.search-user.table.status')}`,
      width: 150,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'joinedDate',
      headerName: `${t('userManagement.search-user.table.joined')}`,
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Box>
            {formatDateWithLanguage(params?.value, i18next.language, true)}
          </Box>
        );
      },
    },
  ];
  /////////////////////////////////////////////////////////////////
  // (1)
  /////////////////////////////////////////////////////////////////
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
          {t('userManagement.search-user.table.title', {
            number: userArray.length,
          })}
        </Typography>
        <Box sx={{ color: 'var(--gray-25)', fontSize: '15px' }}>
          {t('userManagement.search-user.table.total', {
            total: totalPage,
            current: (searchQuery.pageNo ?? 0) + 1,
          })}
        </Box>
        <Box
          sx={{
            maxWidth: openLNB ? 'calc(100vw - 31rem)' : 'calc(100vw - 17rem)',
            mt: '1rem',
          }}
        >
          <Table
            apiRef={apiRef}
            rows={userArray || []}
            columns={columns}
            rowCount={total ?? 0}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            loading={props.orderLoading}
          />
        </Box>
      </Box>
    </Suspense>
  );
}

export default List;
/////////////////////////////////////////////////////////////////////
