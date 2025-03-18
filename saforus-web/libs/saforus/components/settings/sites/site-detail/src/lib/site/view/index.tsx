import { Box, Button, styled, Typography } from '@mui/material';
import InputToggle from '@web-workspace/shared/components/widgets/input-toggle';
import {
  getFieldRegisterSite,
  Site,
} from '@web-workspace/saforus/components/settings/sites/data';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import StorageList from '@web-workspace/saforus/components/settings/sites/storage-list';

interface SiteDetailViewProps {
  handleSubmit: UseFormHandleSubmit<Site>;
  onSubmit: (data: Partial<Site>) => Promise<void>;
  register: UseFormRegister<Site>;
  site: Site;
  onFieldSubmit: (field: keyof Site) => Promise<boolean>;
  errors: FieldErrors<Site>;
  onDelete: () => void;
}

const StyledForm = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledDeleteButton = styled(Button)`
  background: var(--red-200);
  border: 1px solid var(--red-400);
  box-shadow: var(--shadow-xsm);
  border-radius: 6px;
  color: var(--red-600);
  padding: 0.5rem 1rem;
  text-transform: none;
  font-weight: 600;
`;

const SiteDetailView: React.FC<SiteDetailViewProps> = ({
  handleSubmit,
  onSubmit,
  register,
  site,
  onFieldSubmit,
  errors,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <StyledForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: '1.25rem' }}
        >
          <InputToggle
            {...getFieldRegisterSite(register, 'siteName')}
            showBorder={false}
            value={site.siteName}
            errorMessage={errors.siteName?.message}
            submitValue={async () => {
              return await onFieldSubmit('siteName');
            }}
            valueCss={{
              fontSize: '22px',
              fontWeight: 700,
              lineHeight: '30px',
              letterSpacing: '-0.01em',
            }}
            containerCss={{
              fontWeight: 700,
              fontSize: 28,
            }}
            controlCss={{
              gap: '0.5rem',
              flexGrow: 0,
              padding: 0,
            }}
            iconSize={24}
          />
          <StyledDeleteButton onClick={onDelete}>
            {t('button.delete')}
          </StyledDeleteButton>
        </Box>

        <Typography sx={{ color: 'var(--gray-25)' }}>
          Created {formatDateWithLanguage(site.createdAt)}
        </Typography>
        <InputToggle
          {...getFieldRegisterSite(register, 'siteUrl')}
          value={site.siteUrl}
          errorMessage={errors.siteUrl?.message}
          submitValue={async () => {
            return await onFieldSubmit('siteUrl');
          }}
          label={t('settings-pages.site-detail.url-label')}
          containerCss={{ width: '50%' }}
        />
        <InputToggle
          {...getFieldRegisterSite(register, 'siteId')}
          value={site.siteId}
          label={t('settings-pages.site-detail.site-id-label')}
          canEdit={false}
          containerCss={{ width: '50%' }}
        />
        <InputToggle
          {...getFieldRegisterSite(register, 'siteKey')}
          value={site.siteKey}
          label={t('settings-pages.site-detail.site-key-label')}
          canEdit={false}
          containerCss={{ width: '50%' }}
        />
        <InputToggle
          {...getFieldRegisterSite(register, 'accessKey')}
          value={site.accessKey}
          label={t('settings-pages.site-detail.access-key-label')}
          canEdit={false}
          containerCss={{ width: '50%', marginBottom: '1.5rem' }}
        />
      </form>

      <StorageList storages={site.storages} siteId={site.id} />
    </StyledForm>
  );
};

export default React.memo(SiteDetailView);
