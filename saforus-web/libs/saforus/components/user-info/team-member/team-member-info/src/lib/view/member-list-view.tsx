import {
  Box,
  Card,
  InputLabel,
  SxProps,
  Typography,
  styled,
} from '@mui/material';
import MuiButton from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import Table from '@web-workspace/shared/components/widgets/table';
import { Link } from 'react-router-dom';
import Button from '@web-workspace/shared/components/widgets/button';
import UserIcon from '../../assets/user.svg';
import UserBlockWhiteIcon from '../../assets/user-block-white.svg';
import UserBlockIcon from '../../assets/user-block.svg';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import {
  JoinedDate,
  MemberExt,
  UserTeamStore,
} from '@web-workspace/saforus/components/user-info/team-member/data';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { UserRole, UserTeamStatus } from '@web-workspace/saforus/common/model';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { getMinuteOffset } from '@web-workspace/saforus/common/utils';

const CustomButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: 5,
  boxShadow: `var(--shadow-xsm)`,
  padding: '12px 18px',
  fontWeight: '600',
  fontSize: '14px',
  cursor: 'pointer',
  textTransform: 'none',
  color: 'var(--red-500)',
  border: '1px solid var(--red-700)',
  '&.Mui-disabled': {
    background: 'var(--neutral-700)',
    color: 'var(--base-white)',
    border: '1px solid var(--neutral-700)',
  },
}));

interface IResultContentLabel {
  sx?: SxProps;
  field: string;
  value: string;
}

function CustomInputLabel({ field, value, sx }: IResultContentLabel) {
  const { t } = useTranslation();
  let textColor = 'var(--gray-700)';
  let bgColor = 'var(--neutral-300)';
  let valueLabel = value;
  switch (field) {
    case 'role':
      switch (value) {
        case UserRole.TEAM_OWNER:
          textColor = 'var(--purple-600)';
          bgColor = 'var(--purple-50)';
          valueLabel = t('team-member.role.owner');
          break;
        case UserRole.TEAM_EDITOR:
          valueLabel = t('team-member.role.member');
          break;
        case UserRole.TEAM_VIEWER:
          valueLabel = t('team-member.role.viewer');
          break;
      }
      break;
    case 'status':
      switch (value) {
        case UserTeamStatus.JOINED:
          textColor = 'var(--green-700)';
          bgColor = 'var(--green-50)';
          valueLabel = t('team-member.status.joined');
          break;
        case UserTeamStatus.INVITED:
          textColor = 'var(--orange-600)';
          bgColor = 'var(--orange-50)';
          valueLabel = t('team-member.status.invited');
          break;
        case UserTeamStatus.EXPIRED:
          textColor = 'var(--base-white)';
          bgColor = 'var(--neutral-800)';
          valueLabel = t('team-member.status.expired');
          break;
      }
      break;
    default:
      textColor = 'var(--gray-700)';
      bgColor = 'var(--neutral-300)';
      break;
  }

  return (
    <InputLabel
      color="primary"
      sx={{
        borderRadius: '5px',
        bgcolor: bgColor,
        color: textColor,
        padding: '4px 12px 4px 12px',
        fontSize: '0.875rem',
        fontWeight: '500',
        lineHeight: '1.25rem',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {valueLabel}
    </InputLabel>
  );
}

function ResultContentLabel({ field, value, sx }: IResultContentLabel) {
  const { t } = useTranslation();
  const valueStr = value;
  let color = 'var(--gray-700)';
  let textDecorationLine = 'none';
  const borderRadius = '0px';
  const fontWeight = '400';
  const px = '0';
  const py = '0';
  switch (field) {
    case 'emailAddress':
      color = 'var(--purple-400)';
      textDecorationLine = 'underline';
      break;
    default:
      break;
  }

  return (
    <Typography
      sx={{
        color,
        textDecorationLine,
        fontSize: '15px',
        fontWeight,
        textAlign: 'center',
        borderRadius,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        ...sx,
        px,
        py,
      }}
    >
      {valueStr}
    </Typography>
  );
}

type MemberListProps = {
  onPageChange: (selection: any) => void;
  members: MemberExt[];
  selectedMembers: MemberExt[];
  setSelectedMembers: (members: MemberExt[]) => void;
  total: number;
  memberLoading?: boolean;
  selectable?: boolean;
};

function MemberListView({
  onPageChange,
  members = [],
  setSelectedMembers,
  total,
  selectedMembers,
  memberLoading,
  selectable,
}: MemberListProps) {
  const { searchQuery } = useSnapshot(UserTeamStore);
  const { openLNB } = useSnapshot(LayoutStore);
  const { t } = useTranslation();
  const tzOffset = getMinuteOffset();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // Reset page no when search query change
  // const apiRef = useGridApiRef();
  // useEffect(() => {
  //   if (searchQuery.pageNo !== paginationModel.page) {
  //     apiRef.current?.setPage(searchQuery.pageNo || 0);
  //   }
  // }, [searchQuery.pageNo]);

  const [removable, setRemovable] = useState(false);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    onPageChange(paginationModel);
  }, [paginationModel]);

  useEffect(() => {
    setEditable(selectable ? selectable : false);
  }, [selectable]);

  useEffect(() => {
    setRemovable(selectedMembers.length > 0);
  }, [selectedMembers]);

  const columns: GridColDef[] = [
    {
      field: 'emailAddress',
      headerName: `${t('team-member.table.email')}`,
      width: 400,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const email = params.value;
        return (
          <Link to={`mailto:${email}`}>
            <ResultContentLabel
              sx={{
                cursor: 'pointer',
              }}
              field={params.field}
              value={params.value}
            />
          </Link>
        );
      },
    },
    {
      field: 'fullName',
      headerName: `${t('team-member.table.name')}`,
      width: 400,
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
      field: 'role',
      headerName: `${t('team-member.table.role')}`,
      width: 200,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <CustomInputLabel field={params.field} value={params.value} />;
      },
    },
    {
      field: 'status',
      headerName: `${t('team-member.table.status')}`,
      width: 180,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <CustomInputLabel field={params.field} value={params.value} />;
      },
    },
    {
      field: 'joinedDate',
      headerName: `${t('team-member.table.joined')}`,
      width: 300,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        const joinedDate = params.value as JoinedDate;
        let valueDate = joinedDate.invitationSentAt;
        switch (joinedDate.status) {
          case UserTeamStatus.INVITED:
            valueDate = `${t(
              'team-member.table.invited-date'
            )} ${formatDateWithLanguage({
              date: joinedDate.invitationSentAt,
              isDetail: true,
              withSlash: true,
              tzOffset,
            })}`;
            break;
          case UserTeamStatus.EXPIRED:
            valueDate = `${t(
              'team-member.table.expired-date'
            )} ${formatDateWithLanguage({
              date: joinedDate.invitationExpiredAt,
              isDetail: true,
              withSlash: true,
              tzOffset,
            })}`;
            break;
          default:
            valueDate = formatDateWithLanguage({
              date: joinedDate.invitationAcceptedAt,
              isDetail: true,
              withSlash: true,
              tzOffset,
            });
            break;
        }
        return (
          <ResultContentLabel
            field={params.field}
            value={valueDate}
            sx={{
              color: 'var(--gray-25, #919BA7)',
            }}
          />
        );
      },
    },
  ];

  const handleSelection = (selection: GridRowSelectionModel) => {
    const selectedRows = members.filter((e) => selection.includes(e.id));
    setSelectedMembers(selectedRows);
  };

  const handleInviteMember = () => {
    if (total < 20) {
      dialogStore.openDialog({ name: DialogType.InviteMember });
    } else {
      showToast.error(
        `${t('team-member.dialog.invite-member-failed-exceeded-limit', {
          quantity: 20,
        })}`,
        {
          delay: 0,
        }
      );
    }
  };

  const handleRemoveMember = () => {
    dialogStore.openDialog({ name: DialogType.RemoveTeamMember });
  };

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            height: '100%',
            width: '100%',
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
        <Typography variant="h6" fontWeight={600} color={'var(--gray-700)'}>
          {t('team-member.team-member-info.members', { total: total || 0 })}
        </Typography>

        {AuthStore.userInfo?.role === UserRole.TEAM_OWNER && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1.5rem',
              mt: '14px',
              mb: '14px',
            }}
          >
            <Button
              color="secondary"
              sx={{ fontSize: '14px', fontWeight: 700, padding: '8px 12px' }}
              onClick={handleInviteMember}
            >
              <img
                src={UserIcon}
                alt="invite"
                width={16}
                height={16}
                loading="lazy"
                style={{ marginRight: '0.5rem' }}
              />
              {t('team-member.team-member-info.invite-member')}
            </Button>
            <CustomButton disabled={!removable} onClick={handleRemoveMember}>
              <img
                src={removable ? UserBlockIcon : UserBlockWhiteIcon}
                alt="remove"
                width={16}
                height={16}
                loading="lazy"
                style={{ marginRight: '0.5rem' }}
              />
              {t('team-member.team-member-info.remove-members')}
            </CustomButton>
          </Box>
        )}
        <Box
          sx={{
            maxWidth: openLNB ? 'calc(100vw - 31rem)' : 'calc(100vw - 17rem)',
            mt: '1rem',
          }}
        >
          <Table
            // apiRef={apiRef}
            rows={members}
            columns={columns}
            rowCount={total}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            checkboxSelection={selectable}
            rowSelection={true}
            onRowSelectionModelChange={handleSelection}
            rowSelectionModel={selectedMembers.map((e) => e.id)}
            isRowSelectable={(params) =>
              params.row.role !== UserRole.TEAM_OWNER
            }
            getRowClassName={(params) =>
              params.row.role !== UserRole.TEAM_OWNER ? '' : 'row-disabled'
            }
            loading={memberLoading}
          />
        </Box>
      </Card>
    </Suspense>
  );
}

export default memo(MemberListView);
