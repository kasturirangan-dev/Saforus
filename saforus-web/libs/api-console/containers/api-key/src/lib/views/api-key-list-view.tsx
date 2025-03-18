import { Box, IconButton, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  ApiKeyDetails,
  ApiKeyStore,
} from '@web-workspace/api-console/components/api-key/data';
import { TableContent } from './table-content';
import {
  differenceDays,
  formatDateWithLanguage,
} from '@web-workspace/shared/helpers/dates';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { ActiveStatus } from '@web-workspace/shared/components/widgets/content-label';
import AddIcon from '../assets/add.svg';
import { StyledDataGrid } from '@web-workspace/api-console/common/views';
import { InlineSvg } from '@web-workspace/shared/components/widgets/icon';

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  padding: '8px 12px',
  cursor: 'pointer',
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: '6px',
  borderRadius: '5px',
  border: '1px solid var(--neutral-750)',

  '& svg': {
    fill: 'var(--gray-700)',
  },

  '&.MuiIconButton-colorError': {
    '&:hover': {
      backgroundColor: 'var(--red-100)',
      borderColor: 'var(--red-450)',
      '& svg': {
        fill: 'var(--red-600)',
      },
    },
  },
}));

type ApiKeyListProps = {
  apiKeys: ApiKeyDetails[];
  total: number;
  onPageChange: (selection: any) => void;
  loading: boolean;
};

function ApiKeyListView({
  apiKeys = [],
  total,
  onPageChange,
  loading,
}: ApiKeyListProps) {
  const { t } = useTranslation();
  const { tzDisplayOffset: tzOffset, timeZone } = useSnapshot(CsApiAuthStore);
  const { searchQuery } = useSnapshot(ApiKeyStore);

  const [paginationModel, setPaginationModel] = useState({
    page: searchQuery.page || 0,
    pageSize: searchQuery.pageSize || 10,
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

  const handleCreateApiKey = () => {
    if (total < 10) {
      dialogStore.openDialog({
        name: DialogType.CsApiCreateApiKey,
      });
    } else {
      dialogStore.openDialog({
        name: DialogType.ContactSupport,
        props: {
          title: `${t('apiKeyManagement.reached-limit.title')}`,
          description: `${t('apiKeyManagement.reached-limit.description')}`,
          cancelTitle: `${t('apiKeyManagement.button.cancel')}`,
          contactTitle: `${t(`apiKeyManagement.button.contact-support`)}`,
        },
      });
    }
  };

  const handleEditApiKey = (apiKey: ApiKeyDetails) => {
    dialogStore.openDialog({
      name: DialogType.CsApiEditApiKey,
      props: {
        selectedApiKey: apiKey,
      },
    });
  };

  const handleDeleteApiKey = (apiKey: ApiKeyDetails) => {
    dialogStore.openDialog({
      name: DialogType.CsApiDeleteApiKey,
      props: {
        selectedApiKey: apiKey,
      },
    });
  };

  const expriesText = (expiredDate: Date) => {
    const dayLeft = differenceDays(new Date(), expiredDate);
    return t('apiKeyManagement.table.days-left', {
      numberOfDay: dayLeft > 0 ? dayLeft : 0,
    });
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: `${t('apiKeyManagement.table.name')}`,
      minWidth: 130,
      maxWidth: 250,
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <TableContent value={params.value} />;
      },
    },
    {
      field: 'token',
      headerName: `${t('apiKeyManagement.table.token')}`,
      minWidth: 250,
      maxWidth: 400,
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent
            value={params.value}
            canCopy={true}
            contentWidth="320px"
          />
        );
      },
    },

    {
      field: 'status',
      headerName: `${t('apiKeyManagement.table.status')}`,
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <ActiveStatus value={params.value} />;
      },
    },
    {
      field: 'expiredAt',
      headerName: `${t('apiKeyManagement.table.expires')}`,
      minWidth: 120,
      maxWidth: 150,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent
            value={
              params.row.neverExpire
                ? t('apiKeyManagement.table.never-expire')
                : expriesText(params.value)
            }
          />
        );
      },
    },
    {
      field: 'createdAt',
      headerName: `${t('apiKeyManagement.table.created-date')}`,
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
            value={`${formattedDate} (GMT${timeZone})`}
            styleContent={{ color: 'var(--gray-25)' }}
          />
        );
      },
    },
    {
      field: 'action',
      headerName: '',
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <ActionButton onClick={() => handleEditApiKey(params.row)}>
              <InlineSvg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4.17657 14.1368L4.96872 14.4009L4.17657 14.1368ZM4.80089 12.2639L4.00874 11.9998H4.00874L4.80089 12.2639ZM5.44509 11.2215L6.03553 11.812L6.03553 11.812L5.44509 11.2215ZM11.6666 4.99999L11.0762 4.40956L11.0762 4.40956L11.6666 4.99999ZM15 8.33333L15.5904 8.92376L15 8.33333ZM8.77843 14.5549L8.18799 13.9644L8.18799 13.9644L8.77843 14.5549ZM7.73608 15.1991L8.00013 15.9912L8.00013 15.9912L7.73608 15.1991ZM5.86312 15.8234L6.12717 16.6155H6.12717L5.86312 15.8234ZM8.43672 14.8738L7.93385 14.2072L7.93385 14.2072L8.43672 14.8738ZM8.17417 15.0361L7.80284 14.2882L8.17417 15.0361ZM15.803 5.92663L15.0548 6.29739V6.29739L15.803 5.92663ZM15.803 7.40669L15.0548 7.03593V7.03593L15.803 7.40669ZM12.5933 4.19698L12.964 4.94516V4.94516L12.5933 4.19698ZM14.0733 4.19698L13.7026 4.94516L13.7026 4.94516L14.0733 4.19698ZM4.96388 11.8258L5.71177 12.1971L5.71178 12.1971L4.96388 11.8258ZM5.12615 11.5632L4.45956 11.0604L4.45956 11.0604L5.12615 11.5632ZM3.86599 15.6289L3.0795 15.9094L3.86599 15.6289ZM4.37101 16.134L4.09055 16.9205L4.09055 16.9205L4.37101 16.134ZM11.4237 5.24292C11.0976 4.91683 10.5689 4.91683 10.2429 5.24292C9.91677 5.56901 9.91677 6.0977 10.2429 6.42379L11.4237 5.24292ZM13.5762 9.75712C13.9023 10.0832 14.431 10.0832 14.7571 9.75712C15.0831 9.43103 15.0831 8.90234 14.7571 8.57625L13.5762 9.75712ZM4.96872 14.4009L5.59304 12.5279L4.00874 11.9998L3.38442 13.8728L4.96872 14.4009ZM6.03553 11.812L12.2571 5.59043L11.0762 4.40956L4.85466 10.6311L6.03553 11.812ZM14.4095 7.74289L8.18799 13.9644L9.36886 15.1453L15.5904 8.92376L14.4095 7.74289ZM7.47203 14.4069L5.59907 15.0312L6.12717 16.6155L8.00013 15.9912L7.47203 14.4069ZM8.18799 13.9644C8.00622 14.1462 7.96948 14.1803 7.93385 14.2072L8.93959 15.5404C9.08933 15.4274 9.21861 15.2955 9.36886 15.1453L8.18799 13.9644ZM8.00013 15.9912C8.20172 15.924 8.37749 15.8674 8.54549 15.784L7.80284 14.2882C7.76286 14.308 7.71591 14.3256 7.47203 14.4069L8.00013 15.9912ZM7.93385 14.2072C7.89278 14.2382 7.84892 14.2653 7.80284 14.2882L8.54549 15.784C8.68411 15.7151 8.81604 15.6336 8.9396 15.5404L7.93385 14.2072ZM14.4095 5.59043C14.9116 6.09247 15.0095 6.20604 15.0548 6.29739L16.5511 5.55588C16.3535 5.15707 15.9971 4.81626 15.5904 4.40956L14.4095 5.59043ZM15.5904 8.92376C15.9971 8.51706 16.3535 8.17625 16.5511 7.77744L15.0548 7.03593C15.0095 7.12728 14.9116 7.24084 14.4095 7.74289L15.5904 8.92376ZM15.0548 6.29739C15.1701 6.53007 15.1701 6.80325 15.0548 7.03593L16.5511 7.77744C16.898 7.07753 16.898 6.25579 16.5511 5.55588L15.0548 6.29739ZM12.2571 5.59043C12.7591 5.08838 12.8727 4.99042 12.964 4.94516L12.2225 3.44881C11.8237 3.64644 11.4829 4.00286 11.0762 4.40956L12.2571 5.59043ZM15.5904 4.40956C15.1837 4.00286 14.8429 3.64644 14.4441 3.44881L13.7026 4.94516C13.7939 4.99042 13.9075 5.08838 14.4095 5.59043L15.5904 4.40956ZM12.964 4.94516C13.1967 4.82986 13.4699 4.82986 13.7026 4.94516L14.4441 3.44881C13.7442 3.10197 12.9224 3.10197 12.2225 3.44881L12.964 4.94516ZM5.59304 12.5279C5.67433 12.284 5.69193 12.2371 5.71177 12.1971L4.21599 11.4545C4.13258 11.6225 4.07593 11.7982 4.00874 11.9998L5.59304 12.5279ZM4.85466 10.6311C4.70441 10.7813 4.57252 10.9106 4.45956 11.0604L5.79275 12.0661C5.81963 12.0305 5.85376 11.9937 6.03553 11.812L4.85466 10.6311ZM5.71178 12.1971C5.73466 12.151 5.76176 12.1072 5.79275 12.0661L4.45956 11.0604C4.36636 11.1839 4.28482 11.3158 4.21599 11.4545L5.71178 12.1971ZM3.38442 13.8728C3.25397 14.2641 3.13701 14.6124 3.07043 14.8957C3.00676 15.1667 2.94652 15.5365 3.0795 15.9094L4.65248 15.3485C4.68891 15.4506 4.64825 15.4816 4.69615 15.2777C4.74114 15.0863 4.82775 14.8238 4.96872 14.4009L3.38442 13.8728ZM5.59907 15.0312C5.17615 15.1722 4.9137 15.2588 4.72224 15.3038C4.51839 15.3517 4.5493 15.311 4.65147 15.3475L4.09055 16.9205C4.46345 17.0534 4.8333 16.9932 5.10426 16.9295C5.3876 16.8629 5.73583 16.746 6.12717 16.6155L5.59907 15.0312ZM3.0795 15.9094C3.2477 16.3811 3.61887 16.7523 4.09055 16.9205L4.65147 15.3475C4.65147 15.3475 4.65152 15.3475 4.65159 15.3475C4.65167 15.3476 4.65175 15.3476 4.65182 15.3477C4.65195 15.3477 4.65204 15.3478 4.65209 15.3479C4.65214 15.3479 4.65221 15.348 4.6523 15.3481C4.65234 15.3482 4.65239 15.3483 4.65242 15.3484C4.65246 15.3484 4.65248 15.3485 4.65248 15.3485L3.0795 15.9094ZM10.2429 6.42379L13.5762 9.75712L14.7571 8.57625L11.4237 5.24292L10.2429 6.42379Z"
                  fill="#inherit"
                />
              </InlineSvg>
            </ActionButton>
            <ActionButton
              color="error"
              onClick={() => handleDeleteApiKey(params.row)}
            >
              <InlineSvg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5.91034 17.3183L6.28942 16.5744L5.91034 17.3183ZM5.18198 16.59L5.92597 16.2109L5.92597 16.2109L5.18198 16.59ZM14.8187 16.59L14.0747 16.2109L14.0747 16.2109L14.8187 16.59ZM14.0903 17.3183L13.7112 16.5744H13.7112L14.0903 17.3183ZM4.16699 4.99833C3.70583 4.99833 3.33199 5.37217 3.33199 5.83333C3.33199 6.29449 3.70583 6.66833 4.16699 6.66833V4.99833ZM15.8337 6.66833C16.2948 6.66833 16.6687 6.29449 16.6687 5.83333C16.6687 5.37217 16.2948 4.99833 15.8337 4.99833V6.66833ZM14.1653 5.83333V14.8333H15.8353V5.83333H14.1653ZM12.3337 16.665H7.66699V18.335H12.3337V16.665ZM4.16533 5.83333V14.8333H5.83533V5.83333H4.16533ZM7.66699 16.665C7.1865 16.665 6.87636 16.6644 6.64032 16.6451C6.41404 16.6266 6.33035 16.5952 6.28942 16.5744L5.53126 18.0623C5.84685 18.2231 6.17478 18.2826 6.50433 18.3095C6.82414 18.3356 7.21406 18.335 7.66699 18.335V16.665ZM4.16533 14.8333C4.16533 15.2863 4.16468 15.6762 4.19081 15.996C4.21773 16.3256 4.27719 16.6535 4.43799 16.9691L5.92597 16.2109C5.90512 16.17 5.87375 16.0863 5.85526 15.86C5.83597 15.624 5.83533 15.3138 5.83533 14.8333H4.16533ZM6.28942 16.5744C6.13293 16.4946 6.00571 16.3674 5.92597 16.2109L4.43799 16.9691C4.67783 17.4398 5.06054 17.8225 5.53126 18.0623L6.28942 16.5744ZM14.1653 14.8333C14.1653 15.3138 14.1647 15.624 14.1454 15.86C14.1269 16.0863 14.0955 16.17 14.0747 16.2109L15.5627 16.9691C15.7235 16.6535 15.7829 16.3256 15.8098 15.996C15.836 15.6762 15.8353 15.2863 15.8353 14.8333H14.1653ZM12.3337 18.335C12.7866 18.335 13.1765 18.3356 13.4963 18.3095C13.8259 18.2826 14.1538 18.2231 14.4694 18.0623L13.7112 16.5744C13.6703 16.5952 13.5866 16.6266 13.3603 16.6451C13.1243 16.6644 12.8141 16.665 12.3337 16.665V18.335ZM14.0747 16.2109C13.9949 16.3674 13.8677 16.4946 13.7112 16.5744L14.4694 18.0623C14.9401 17.8225 15.3228 17.4398 15.5627 16.9691L14.0747 16.2109ZM4.16699 6.66833H5.00033V4.99833H4.16699V6.66833ZM5.00033 6.66833H15.0003V4.99833H5.00033V6.66833ZM15.0003 6.66833H15.8337V4.99833H15.0003V6.66833ZM7.91866 5.16667C7.91866 4.22392 8.77865 3.335 10.0003 3.335V1.665C8.00034 1.665 6.24866 3.1639 6.24866 5.16667H7.91866ZM10.0003 3.335C11.222 3.335 12.082 4.22392 12.082 5.16667H13.752C13.752 3.1639 12.0003 1.665 10.0003 1.665V3.335ZM6.24866 5.16667V5.83333H7.91866V5.16667H6.24866ZM12.082 5.16667V5.83333H13.752V5.16667H12.082Z"
                  fill="inherit"
                />
              </InlineSvg>
            </ActionButton>
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
              color={'var(--purple-400)'}
            >
              {total}
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color={'var(--gray-700)'}
            >
              {t('apiKeyManagement.table.api-keys')}
            </Typography>
          </Box>

          <StyledButton onClick={handleCreateApiKey} sx={{ gap: '6px' }}>
            <img src={AddIcon} alt="add-icon" />
            {t('apiKeyManagement.button.create')}
          </StyledButton>
        </Box>
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
            <StyledDataGrid
              apiRef={apiRef}
              rows={apiKeys}
              columns={columns}
              rowCount={total || 0}
              paginationModel={paginationModel}
              paginationMode="server"
              onPaginationModelChange={setPaginationModel}
              loading={loading}
              hideFooter={true}
            />
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
}

export default memo(ApiKeyListView);
