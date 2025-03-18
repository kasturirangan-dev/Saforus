import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import {
  DRM_QUERY_KEY,
  IResponseDrmServiceInfo,
  MultiDrmCreateOrderStore,
  fetchDrmServiceInfo,
} from '@web-workspace/saforus/components/multi-drm/create-order/data';
import { Box, Typography } from '@mui/material';
import DrmStepper from '@web-workspace/saforus/components/multi-drm/create-order/stepper';
import CreateOrderStepsComponent from '@web-workspace/saforus/components/multi-drm/create-order/configs';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import {
  QUERY_KEY as SITE_QUERY_KEY,
  Site,
  fetchSites,
} from '@web-workspace/saforus/components/settings/sites/data';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

export function MultiDrmCreateOrderContainer() {
  const { completed, getStepDetails, onSetCommonData, currentStep } =
    useSnapshot(MultiDrmCreateOrderStore);
  const { data: sites } = useQuery<Site[]>(
    SITE_QUERY_KEY.SITES_LIST,
    fetchSites
  );

  const { data: drmServiceInfo } = useQuery<IResponseDrmServiceInfo>(
    DRM_QUERY_KEY.DRM_SERVICE,
    fetchDrmServiceInfo
  );

  useEffect(() => {
    if (sites && sites.length) {
      onSetCommonData('sites', sites);
    }
  }, [sites]);

  useEffect(() => {
    if (
      drmServiceInfo?.drmOptionList &&
      drmServiceInfo?.drmOptionList?.length > 0
    ) {
      onSetCommonData('drmOptions', drmServiceInfo.drmOptionList);
    }
  }, [drmServiceInfo]);

  const { t } = useTranslation();

  const { component: CurrentStepComponent, label } = getStepDetails(
    CreateOrderStepsComponent
  );

  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <Typography variant="h3" sx={{ m: 0 }}>
        {t(label)}
      </Typography>
      {completed === false && <DrmStepper />}
      <CurrentStepComponent />
    </Box>
  );
}

export default MultiDrmCreateOrderContainer;
