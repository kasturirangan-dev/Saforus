import { Box, Card, Collapse, Link, Stack, Typography } from '@mui/material';
import { ExpandIcon } from '@web-workspace/shared/components/widgets/icon';
import { useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  MediaConfigs,
  OrderType,
  PLAN_TYPE,
} from '@web-workspace/api-console/common/model';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import ImageIcon from '../assets/image.svg';
import InfoIcon from '../assets/info.svg';
// import VideoIcon from '../assets/video.svg';
// import AudioIcon from '../assets/audio.svg';
import DocumentIcon from '../assets/document.svg';
import ContentLabel from '@web-workspace/shared/components/widgets/content-label';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { useSnapshot } from 'valtio';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';
import { getSupportedSize } from './utils';
import { formatSize } from '@web-workspace/shared/helpers/format';
import Tooltip from '@web-workspace/shared/components/widgets/tooltip';
import SupportedTable from './supported-table';

const ConfigsInfo = ({
  label = '--',
  formats = [],
  icon,
}: {
  label: string;
  formats: string[];
  icon: string;
}) => {
  return (
    <Stack direction="row" gap="8px" alignItems="center" key={label}>
      {icon && <img src={icon} height={24} width={24} />}
      <Typography color="var(--gray-50)">{label}</Typography>

      {formats.map((format, index) => (
        <ContentLabel
          key={format}
          neutral
          variant="caption"
          label={format}
          style={{
            padding: '2px 8px',
          }}
        />
      ))}
    </Stack>
  );
};

const SupportedInfo = ({ serviceType }: { serviceType?: OrderType }) => {
  const { t, i18n } = useTranslation();
  const [expand, setExpand] = useState(true);
  const { userInfo } = useSnapshot(CsApiAuthStore);

  const linkSupport = getEnvVar(
    i18n.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );
  const linkPricingPlan = API_ROUTES.USER_INFO.CURRENT_PLAN.path;

  const maxSupportedSize = useMemo(() => {
    const size = getSupportedSize(
      userInfo?.subscription?.plan?.planType,
      serviceType
    );
    return formatSize(size).replace(' ', '');
  }, [userInfo?.subscription?.plan?.planType, serviceType]);

  const SupportSize = () => {
    const tier = userInfo?.subscription?.plan?.planType;

    let messageKey = '';
    let link = '';

    if (serviceType === OrderType.DETECTION) {
      switch (tier) {
        case PLAN_TYPE.FREE:
        case PLAN_TYPE.BASIC:
        case PLAN_TYPE.PROFESSIONAL:
          messageKey = 'file-size-2';
          link = linkSupport;
          break;
        default:
          messageKey = 'file-size-contact';
          link = linkSupport;
      }
    } else {
      switch (tier) {
        case PLAN_TYPE.FREE:
        case PLAN_TYPE.BASIC:
          messageKey = 'file-size';
          link = linkPricingPlan;
          break;
        case PLAN_TYPE.PROFESSIONAL:
          messageKey = 'file-size-2';
          link = linkSupport;
          break;
        default:
          messageKey = 'file-size-contact';
          link = linkSupport;
      }
    }

    return (
      <Trans
        i18nKey={`api-file-supported.${messageKey}`}
        values={{ size: maxSupportedSize }}
        components={[<Link target="_blank" href={link} underline="none" />]}
      />
    );
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: 'var(--base-white)',
        borderRadius: '8px',
        border: '1px solid var(--neutral-600)',
      }}
    >
      <Box
        onClick={() => setExpand(!expand)}
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <ExpandIcon
          sx={{ marginLeft: '16px' }}
          expand={expand}
          iconProps={{ color: 'var(--gray-50)' }}
        />
        <Box sx={{ display: 'flex', gap: '4px' }}>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingBlock: '12px',
              paddingLeft: '8px',
              fontWeight: 500,
              color: 'var(--gray-100)',
            }}
          >
            {t('api-file-supported.title')}
          </Typography>
          <Tooltip
            sx={{ whiteSpace: 'pre-line' }}
            title={null}
            titleHeader={t('api-file-supported.tooltip')}
            titleHeaderStyle={{ textAlign: 'center' }}
            placement="top"
          >
            <img src={InfoIcon} alt="info" loading="lazy" />
          </Tooltip>
        </Box>
      </Box>

      <Collapse in={expand}>
        <Stack sx={{ padding: '10px 16px 10px 20px', gap: '8px' }}>
          {/* <ConfigsInfo
            label={`${t('common.content-type.image')}`}
            formats={MediaConfigs.IMG.supportedFormats}
            icon={ImageIcon}
          /> */}
          {/* <ConfigsInfo
            label={`${t('common.content-type.video')}`}
            formats={MediaConfigs.VIDEO.supportedFormats}
            icon={VideoIcon}
          />
          <ConfigsInfo
            label={`${t('common.content-type.audio')}`}
            formats={MediaConfigs.AUDIO.supportedFormats}
            icon={AudioIcon}
          /> */}
          {/* <ConfigsInfo
            label={`${t('common.content-type.document')}`}
            formats={MediaConfigs.DOCUMENT.supportedFormats}
            icon={DocumentIcon}
          /> */}
          <SupportedTable />
        </Stack>
        <Typography
          sx={{
            padding: '12px 16px',
            color: 'var(--gray-50)',
            whiteSpace: 'pre-wrap',
            backgroundColor: 'var(--neutral-50)',
          }}
        >
          <SupportSize />
        </Typography>
      </Collapse>
    </Card>
  );
};

export default SupportedInfo;
