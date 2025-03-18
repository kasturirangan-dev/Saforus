import React, { useState } from 'react';
import {
  SettingSiteStore,
  SiteStorage,
} from '@web-workspace/saforus/components/settings/sites/data';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  styled,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  DateFormat,
  formatDate,
  formatDateWithLanguage,
} from '@web-workspace/shared/helpers/dates';
import StorageForm from '@web-workspace/saforus/components/settings/sites/storage-form';
import { useSnapshot } from 'valtio';
import { i18n } from '@web-workspace/shared/i18n';

export interface StorageDetailProps {
  storage: SiteStorage;
}

const StyledAccordion = styled(Accordion, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})(({ theme, expanded }) => ({
  marginTop: '1.5rem',
  boxShadow: 'none',
  height: 'fit-content',

  '&.Mui-expanded:first-of-type': {
    marginTop: '1.5rem',
  },
  '&.Mui-expanded': {
    margin: '1.5rem 0',
  },
  '&:before': {
    backgroundColor: 'transparent',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)`
  background: var(--base-white);
  border-radius: var(--space-8);
  border: 1px solid var(--neutral-700);
  box-shadow: none;
  padding: 2.5rem 1.5rem;
  height: 94px;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  padding: 0 1rem 1rem;
  background: var(--neutral-100);
`;

const StorageDetail: React.FC<StorageDetailProps> = ({ storage }) => {
  const { editingStorageId, newCreatedStorageId, serviceRegions } =
    useSnapshot(SettingSiteStore);

  const isEditing = editingStorageId === storage.id;
  const defaultExpanded = newCreatedStorageId === storage.id;
  const selectedRegion = serviceRegions?.find(
    (region) => region.id === storage.serviceRegionIdx
  );

  return (
    <StyledAccordion defaultExpanded={defaultExpanded}>
      <StyledAccordionSummary
        expandIcon={
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            sx={{
              border: '1px solid var(--neutral-700)',
              boxShadow: 'var(--shadow-xsm)',
              borderRadius: '5px',
              width: 46,
              height: 46,
            }}
          >
            <ExpandMoreIcon />
          </Box>
        }
      >
        <Box display="flex" gap="1rem" width="100%" alignItems="center">
          <Typography fontSize="1rem" fontWeight={600}>
            {storage.storageName}
          </Typography>
          <Box
            color="var(--purple-600)"
            display="flex"
            alignItems="center"
            sx={{
              background: '#F9F8FB',
              padding: '0.25rem 0.75rem',
              fontSize: 14,
            }}
          >
            {selectedRegion
              ? `${
                  i18n.language === 'en'
                    ? selectedRegion.descEn
                    : selectedRegion.descKr
                } (${selectedRegion.region})`
              : 'No region selected'}
          </Box>
          <Typography
            color="var(--gray-25)"
            sx={{ marginLeft: 'auto', marginRight: '1rem' }}
          >{`created ${formatDateWithLanguage(storage.createdAt)}`}</Typography>
        </Box>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <StorageForm storage={storage} isEditing={isEditing} />
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default StorageDetail;
