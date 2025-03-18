import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Alert, Box, styled } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel';
import Table from '@web-workspace/shared/components/widgets/table';
import WarningIcon from '../assets/warning.svg';
import CustomNoRowsOverlay from './list-empty';
import { SupportedResolution } from '@web-workspace/saforus/components/multi-drm/create-order/data';
import { useTranslation } from 'react-i18next';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { useSnapshot } from 'valtio';

type Props = {
  items: SupportedResolution[];
  selectedItems: SupportedResolution[];
  setSelectedItems: (selectedItems: SupportedResolution[]) => void;
  isError: boolean;
};

const StyledAlert = styled(Alert)`
  background: #fef6f6;
  border: 1.5px solid #feb8ae;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.04);
  border-radius: 5px;
  padding: 13px 24px;

  & .MuiAlert-message {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 0;
    overflow: hidden;
  }

  & .MuiAlert-icon {
    padding: 0;
    margin-right: 1rem;
  }
`;

const ResolutionList: React.FC<Props> = ({
  items,
  selectedItems,
  setSelectedItems,
  isError,
}) => {
  const { t } = useTranslation();
  const { openLNB } = useSnapshot(LayoutStore);

  const columns: GridColDef[] = [
    {
      field: 'definition',
      headerName: `${t('multiDrm.table.definition')}`,
      width: 150,
    },
    {
      field: 'resolution',
      headerName: `${t('multiDrm.table.resolution')}`,
      width: 150,
    },
    {
      field: 'bitrate',
      headerName: `${t('multiDrm.table.bitrate')}`,
      width: 150,
    },
  ];

  const handleSelection = (selection: GridRowSelectionModel) => {
    const selectedRows = items.filter((e) => selection.includes(e.id));
    setSelectedItems(selectedRows);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          height: 500,
          maxWidth: openLNB ? 'calc(100vw - 31rem)' : 'calc(100vw - 17rem)',
        }}
      >
        <Table
          rows={items}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={handleSelection}
          rowSelectionModel={selectedItems.map((e) => e.id)}
        />
      </Box>
      {isError && (
        <StyledAlert
          sx={{ marginTop: '1.5rem' }}
          severity="error"
          icon={
            <img
              src={WarningIcon}
              alt="Warning"
              title="Warning"
              width={20}
              height={22}
              loading="lazy"
            />
          }
        >
          {t('multiDrm.message.least-one-of-resolution')}
        </StyledAlert>
      )}
    </Box>
  );
};

export default React.memo(ResolutionList);
