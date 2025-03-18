import { Site } from '@web-workspace/saforus/components/settings/sites/data';
import React from 'react';
import useSiteDetailData from './data';
import SiteDetailView from './view';

interface SiteDetailProps {
  site: Site;
}

export const SiteDetail: React.FC<SiteDetailProps> = ({ site }) => {
  const { handleSubmit, onSubmit, register, onFieldSubmit, errors, onDelete } =
    useSiteDetailData({ site });

  return (
    <SiteDetailView
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      onFieldSubmit={onFieldSubmit}
      errors={errors}
      site={site}
      onDelete={onDelete}
    />
  );
};
