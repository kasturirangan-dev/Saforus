import { Box, Card, Collapse, Link, Stack, Typography } from '@mui/material';
import ImageIcon from '../assets/image.svg';
import VideoIcon from '../assets/video.svg';
import AudioIcon from '../assets/audio.svg';
import DocumentIcon from '../assets/document.svg';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { CardTitle } from '@web-workspace/saforus/components/forensic-watermarking-v2/common';
import { ExpandIcon } from '@web-workspace/shared/components/widgets/icon';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';
import ContentLabel from '@web-workspace/shared/components/widgets/content-label';
import { MediaConfigs } from '@web-workspace/saforus/common/model';

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

const SupportedInfo = () => {
  const { t } = useTranslation();
  const [expand, setExpand] = useState(true);
  const linkSupport = getEnvVar(
    i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );

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
        <CardTitle
          sx={{
            paddingLeft: 2,
          }}
        >
          {t('create-new-request.supported.title')}
        </CardTitle>
      </Box>

      <Collapse in={expand}>
        <Stack sx={{ padding: '10px 16px 10px 20px', gap: '8px' }}>
          <ConfigsInfo
            label={`${t('common.content-type.image')}`}
            formats={MediaConfigs.IMG.supportedFormats}
            icon={ImageIcon}
          />
          <ConfigsInfo
            label={`${t('common.content-type.video')}`}
            formats={MediaConfigs.VIDEO.supportedFormats}
            icon={VideoIcon}
          />
          <ConfigsInfo
            label={`${t('common.content-type.audio')}`}
            formats={MediaConfigs.AUDIO.supportedFormats}
            icon={AudioIcon}
          />
          <ConfigsInfo
            label={`${t('common.content-type.document')}`}
            formats={MediaConfigs.DOCUMENT.supportedFormats}
            icon={DocumentIcon}
          />
        </Stack>
        <Typography
          sx={{
            padding: '12px 16px',
            color: 'var(--gray-50)',
            whiteSpace: 'pre-wrap',
            backgroundColor: 'var(--neutral-50)',
          }}
        >
          <Trans
            i18nKey="create-new-request.supported.file-size"
            components={[
              <Link target="_blank" href={linkSupport} underline="none" />,
            ]}
          ></Trans>
        </Typography>
      </Collapse>
    </Card>
  );
};

export default SupportedInfo;
