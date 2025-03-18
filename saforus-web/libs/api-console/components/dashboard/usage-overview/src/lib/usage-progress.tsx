import { Box } from '@mui/material';
import { ApiDashboardStore } from '@web-workspace/api-console/components/dashboard/data';
import { StatisticCard } from './views/statistic-card';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { useEffect } from 'react';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';

const formatBytes = (bytes: number, unit?: string) => {
  if (bytes === 0) return { size: '0', unit: 'GB' };
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = unit
    ? sizes.indexOf(unit)
    : Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(1));
  return { size, unit: sizes[i] };
};

const UsageProgress = ({ loading }: { loading: boolean }) => {
  const { usageOverview } = useSnapshot(ApiDashboardStore);
  const { userInfo } = useSnapshot(CsApiAuthStore);
  const { openDialog } = useSnapshot(DialogStore);

  const { t } = useTranslation();

  const usedStorage = usageOverview?.storageUsageInByte || 0;
  const totalStorage =
    userInfo?.subscription?.plan.moreInfo.storageInBytes || 0;
  const storageProgress =
    totalStorage > 0
      ? Math.min(
          parseFloat(((usedStorage / totalStorage) * 100).toFixed(0)),
          100
        )
      : 0;

  const { size: totalStorageSize, unit: totalStorageUnit } =
    formatBytes(totalStorage);
  const { size: usedStorageSize } = formatBytes(usedStorage, totalStorageUnit);

  const fileReq = usageOverview?.webRequestCount || 0;
  const fileLimit = userInfo?.subscription?.plan.moreInfo.fileQtyLimit || 0;
  const fileProgress =
    fileLimit > 0
      ? Math.min(parseFloat(((fileReq / fileLimit) * 100).toFixed(0)), 100)
      : 0;

  useEffect(() => {
    if (totalStorage && usedStorage >= totalStorage) {
      openDialog({
        name: DialogType.StorageLimit,
      });
    } else if (fileLimit && fileReq >= fileLimit) {
      openDialog({
        name: DialogType.RequestLimit,
      });
    }
  }, [usedStorage, fileReq, fileLimit, totalStorage]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
      }}
    >
      <LoadingOverLayer loading={loading} />

      <StatisticCard
        height="90px"
        title={t('apiDashboard.usage-overview.webRequests')}
        value={Boolean(fileLimit) ? `${fileReq}/${fileLimit}` : fileReq}
        description={t('apiDashboard.usage-overview.files')}
        progress={fileProgress}
      />

      <StatisticCard
        height="90px"
        title={t('apiDashboard.usage-overview.api-requests')}
        value={usageOverview?.apiRequestCount}
        description={t('apiDashboard.usage-overview.files')}
      />

      <StatisticCard
        height="90px"
        title={t('apiDashboard.usage-overview.storage')}
        value={
          Boolean(totalStorage)
            ? `${usedStorageSize}/${totalStorageSize}`
            : usedStorageSize
        }
        description={totalStorageUnit}
        progress={storageProgress}
      />
    </Box>
  );
};

export default UsageProgress;
