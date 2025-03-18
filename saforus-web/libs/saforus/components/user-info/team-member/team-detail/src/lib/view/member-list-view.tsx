import { Box, Card, InputLabel, SxProps, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GridColDef } from '@mui/x-data-grid';
import { memo, Suspense, useEffect, useState } from 'react';
import Table from '@web-workspace/shared/components/widgets/table';
import { Link } from 'react-router-dom';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import {
  MemberExt,
  JoinedDate,
} from '@web-workspace/saforus/components/user-info/team-member/data';
import { UserRole, UserTeamStatus } from '@web-workspace/saforus/common/model';
import i18next from 'i18next';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { useSnapshot } from 'valtio';

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
  total: number;
};

function MemberListView({
  onPageChange,
  members = [],
  total,
}: MemberListProps) {
  const { t } = useTranslation();
  const { openLNB } = useSnapshot(LayoutStore);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // because members is return all from BE so pageModel is client 
  // useEffect(() => {
  //   onPageChange(paginationModel);
  // }, [paginationModel]);

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
            )} ${formatDateWithLanguage(
              joinedDate.invitationSentAt,
              i18next.language,
              true,
              undefined,
              undefined,
              true
            )}`;
            break;
          case UserTeamStatus.EXPIRED:
            valueDate = `${t(
              'team-member.table.expired-date'
            )} ${formatDateWithLanguage(
              joinedDate.invitationExpiredAt,
              i18next.language,
              true,
              undefined,
              undefined,
              true
            )}`;
            break;
          default:
            valueDate = formatDateWithLanguage(
              joinedDate.invitationAcceptedAt,
              i18next.language,
              true,
              undefined,
              undefined,
              true
            );
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
        <Typography variant="h6" fontWeight={600} color={'var(--gray-700)'}>
          {t('team-member.team-member-info.detail-members', {
            total: total || 0,
          })}
        </Typography>

        <Box
          sx={{
            maxWidth: openLNB ? 'calc(100vw - 31rem)' : 'calc(100vw - 17rem)',
            mt: '1rem',
          }}
        >
          <Table
            rows={members}
            columns={columns}
            rowCount={total}
            paginationModel={paginationModel}
            paginationMode="client"
            onPaginationModelChange={setPaginationModel}
          />
        </Box>
      </Card>
    </Suspense>
  );
}

export default memo(MemberListView);
