import {
  Box,
  InputLabel,
  Menu,
  MenuItem,
  SxProps,
  Typography,
  styled,
} from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import Table from '@web-workspace/shared/components/widgets/table';
import ChevronUpDownIcon from '../assets/expand-verical.svg';
import ChevronDownIcon from '../assets/chevronDown.svg';
import LanguageIcon from '../assets/ico_translate_black.svg';
import { useTranslation } from 'react-i18next';
import NotificationListStore, {
  NotificationStatus,
  NotificationType,
  TableFieldKey,
  Notification,
  PageShowNotification,
  PageInWord,
} from '@web-workspace/saforus-bo/components/service-management/notification-list/data';
import { useEffect, useState } from 'react';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { useNotificationListData } from '../data/useNotificationListData';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { Link } from 'react-router-dom';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import CreateNotificationStore from '@web-workspace/saforus-bo/components/service-management/create-notification/data';

const StyledTable = styled(Table)(() => ({
  '& .MuiDataGrid-iconButtonContainer': {
    visibility: 'visible',
  },
}));

const StyledInputLabel = ({ value }: { value: string }) => {
  const { t } = useTranslation();
  let textColor: string;
  let bgColor: string;
  let valueLabel = value;
  switch (value) {
    case NotificationType.Event:
      textColor = 'var(--green-700)';
      bgColor = 'var(--green-50)';
      valueLabel = t('serviceManagement.notification-list.table.event');
      break;
    case NotificationType.Notice:
      textColor = 'var(--purple-600)';
      bgColor = 'var(--purple-50)';
      valueLabel = t('serviceManagement.notification-list.table.notice');
      break;
    case NotificationType.All:
      textColor = 'var(--gray-700)';
      bgColor = 'var(--neutral-300)';
      valueLabel = t('serviceManagement.notification-list.table.all');
      break;
    default:
      textColor = 'var(--gray-700)';
      bgColor = 'var(--neutral-300)';
      valueLabel = 'Undefined';
      break;
  }
  return (
    <Box>
      <InputLabel
        color="primary"
        sx={{
          display: 'flex',
          borderRadius: '5px',
          bgcolor: bgColor,
          color: textColor,
          padding: '2px 8px',
          fontSize: '0.8125rem',
          fontWeight: '500',
          lineHeight: '1.125rem',
          gap: '0.25rem',
          alignItems: 'center',
        }}
      >
        {valueLabel}
      </InputLabel>
    </Box>
  );
};

const StyledStatusInputLabel = ({
  value,
  handleClick,
}: {
  value: string;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  const { t } = useTranslation();
  let textColor: string;
  let bgColor: string;
  let valueLabel = value;
  switch (value) {
    case NotificationStatus.Publish:
      textColor = 'var(--green-700)';
      bgColor = 'var(--green-50)';
      valueLabel = t('serviceManagement.notification-list.table.publish');
      break;
    case NotificationStatus.Hide:
    case NotificationStatus.All:
      textColor = 'var(--gray-700)';
      bgColor = 'var(--neutral-300)';
      valueLabel = t('serviceManagement.notification-list.table.hide');
      break;
    default:
      textColor = 'var(--gray-700)';
      bgColor = 'var(--neutral-300)';
      valueLabel = 'Undefined';
      break;
  }

  return (
    <Box>
      <InputLabel
        color="primary"
        sx={{
          display: 'flex',
          borderRadius: '5px',
          bgcolor: bgColor,
          color: textColor,
          padding: '2px 8px',
          fontSize: '0.8125rem',
          fontWeight: '500',
          lineHeight: '1.125rem',
          gap: '0.25rem',
          alignItems: 'center',
        }}
        onClick={handleClick}
      >
        {valueLabel}
        <img
          src={ChevronDownIcon}
          alt="ChevronDownIcon"
          title="ChevronDownIcon"
          width={12}
          height={12}
          loading="lazy"
        />
      </InputLabel>
    </Box>
  );
};

const StyledLangInputLabel = ({
  value,
  sx,
}: {
  value: string;
  sx?: SxProps;
}) => {
  return (
    <InputLabel
      color="primary"
      sx={{
        display: 'flex',
        borderRadius: '5px',
        bgcolor: 'var(--neutral-300)',
        padding: '2px 8px',
        fontSize: '0.8125rem',
        fontWeight: '500',
        lineHeight: '1.125rem',
        gap: '0.25rem',
        alignItems: 'center',
        ...sx,
      }}
    >
      <img
        src={LanguageIcon}
        alt="LanguageIcon"
        title="LanguageIcon"
        width={12}
        height={12}
        loading="lazy"
      />
      {value}
    </InputLabel>
  );
};

export function NotificationList() {
  const { t } = useTranslation();
  const { openLNB } = useSnapshot(LayoutStore);
  const { isLoading, onPageChange, mutate } = useNotificationListData();
  const { setNotificationForm } = useSnapshot(CreateNotificationStore);
  const { notifications, searchParams, total } = useSnapshot(
    NotificationListStore
  );

  // handle change notice status
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [id, setId] = useState(0);
  const [noticeVersion, setNoticeVersion] = useState('');
  const [selectedRow, setSelectedRow] = useState<Notification>();
  const [showOnPage, setShowOnPage] = useState('');
  const handleShow = () => {
    mutate({
      id: id,
      status: NotificationStatus.Publish,
      noticeVersion: noticeVersion,
      showOnPage: showOnPage,
    });
    setAnchorEl(null);
  };

  const handleHide = () => {
    mutate({
      id: id,
      status: NotificationStatus.Hide,
      noticeVersion: noticeVersion,
      showOnPage: showOnPage,
    });
    setAnchorEl(null);
  };

  const handleOnRowClick = (params: GridRowParams) => {
    setId(params.row.id);
    setSelectedRow(params.row);
    setNoticeVersion(params.row.version);
    setShowOnPage(params.row.displayedOn);
  };
  ////////////////////////////////////////////

  // handle paging for table
  const [paginationModel, setPaginationModel] = useState({
    page: searchParams.pageNo || 0,
    pageSize: searchParams.elementPerPage || 10,
  });

  useEffect(() => {
    onPageChange(paginationModel);
  }, [paginationModel]);
  ///////////////////////////////////////////////

  const rows = Array.from(notifications);

  const columns: GridColDef[] = [
    {
      field: TableFieldKey.type,
      headerName: `${t('serviceManagement.notification-list.table.type')}`,
      flex: 1,
      sortable: true,
      disableColumnMenu: true,
      renderCell(params) {
        const type = params.value;
        return <StyledInputLabel value={type} />;
      },
    },
    {
      field: TableFieldKey.description,
      headerName: `${t('serviceManagement.notification-list.table.summary')}`,
      flex: 4,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const id = params.row.id;
        const editPageUrl = `${BO_ROUTES.SERVICE_MANAGEMENT.NOTIFICATION_MANAGEMENT.children.EDIT_NOTICE.path}/${id}`;
        return (
          <Link
            style={{
              cursor: 'pointer',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
            to={editPageUrl}
          >
            {params.value}
          </Link>
        );
      },
    },
    {
      field: TableFieldKey.langs,
      headerName: `${t('serviceManagement.notification-list.table.lang')}`,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '16px 0px',
            }}
          >
            {params.value.includes('EN') && (
              <StyledLangInputLabel value={'EN'} />
            )}
            {params.value.includes('KO') && (
              <StyledLangInputLabel value={'KO'} />
            )}
          </Box>
        );
      },
    },
    {
      field: TableFieldKey.updatedBy,
      headerName: `${t('serviceManagement.notification-list.table.editor')}`,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: TableFieldKey.status,
      headerName: `${t('serviceManagement.notification-list.table.status')}`,
      flex: 1.5,
      sortable: true,
      disableColumnMenu: true,
      renderCell(params) {
        const status = params.value;
        return (
          <Box>
            <StyledStatusInputLabel value={status} handleClick={handleClick} />
          </Box>
        );
      },
    },
    {
      field: TableFieldKey.displayedOn,
      headerName: `${t(
        'serviceManagement.notification-list.table.display-on'
      )}`,
      flex: 2,
      sortable: true,
      disableColumnMenu: true,
      renderCell(params) {
        let display = '';
        switch (params.value) {
          case PageShowNotification.Login:
            display = PageInWord.Login;
            break;
          case PageShowNotification.Dashboard:
            display = PageInWord.Dashboard;
            break;
          case PageShowNotification.DigitalWatermarking:
            display = PageInWord.DigitalWatermarking;
            break;
          case PageShowNotification.PiracyDetection:
            display = PageInWord.PiracyDetection;
            break;
          default:
            display = '--';
        }
        return <Typography>{display}</Typography>;
      },
    },
    {
      field: 'noticePeriod',
      headerName: `${t(
        'serviceManagement.notification-list.table.notice-period'
      )}`,
      flex: 3,
      sortable: false,
      disableColumnMenu: true,
      valueGetter: (params) => {
        const startDate = formatDateWithLanguage({
          date: new Date(params.row.startTime),
          isAmPm: true,
          withSlash: true,
        });
        const endDate = formatDateWithLanguage({
          date: new Date(params.row.endTime),
          isAmPm: true,
          withSlash: true,
        });
        return `${startDate} ~ ${endDate}`;
      },
    },
    {
      field: 'preview',
      headerName: '',
      flex: 1.5,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <LoadingButton color="secondary">
            {t('serviceManagement.notification-list.button.preview')}
          </LoadingButton>
        );
      },
    },
  ];

  const sortIcon = () => (
    <img
      src={ChevronUpDownIcon}
      alt="ChevronUpDownIcon"
      title="ChevronUpDownIcon"
      width={18}
      height={19}
      loading="lazy"
    />
  );

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: openLNB ? 'calc(100vw - 29rem)' : 'calc(100vw - 13rem)',
      }}
    >
      <StyledTable
        rows={rows}
        columns={columns}
        rowCount={total || 0}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        loading={isLoading}
        slots={{
          columnSortedAscendingIcon: sortIcon,
          columnSortedDescendingIcon: sortIcon,
          columnUnsortedIcon: sortIcon,
        }}
        onRowClick={handleOnRowClick}
        getRowHeight={() => 'auto'}
        noRowText={`${t('serviceManagement.notification-list.table.no-row')}`}
        noResultText={`${t(
          'serviceManagement.notification-list.table.no-result'
        )}`}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleHide}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            {t('serviceManagement.notification-list.table.hide')}
            {selectedRow?.status === NotificationStatus.Hide && (
              <Icon name="check" size={16} />
            )}
          </Box>
        </MenuItem>
        <MenuItem onClick={handleShow}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            {t('serviceManagement.notification-list.table.show')}
            {selectedRow?.status === NotificationStatus.Publish && (
              <Icon name="check" size={16} />
            )}
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default NotificationList;
