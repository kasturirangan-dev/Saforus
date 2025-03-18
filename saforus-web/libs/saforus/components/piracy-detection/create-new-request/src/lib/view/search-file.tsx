import {
  Box,
  LinearProgress,
  Typography,
  linearProgressClasses,
  styled,
} from '@mui/material';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import SearchIcon from '../assets/search_white.svg';
import SearchBlack from '../assets/search_black.svg';
import { useTranslation } from 'react-i18next';
import { SEARCH_TYPE } from '../data/create-new-request.const';
import { useEffect, useState } from 'react';
import Tooltip from '@web-workspace/shared/components/widgets/tooltip';
import Icon from '@web-workspace/shared/components/widgets/icon';

const StyleLinearProgress = styled(LinearProgress)(({ theme }) => ({
  color: 'primary',
  height: '8px',
  borderRadius: '4px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'var(--purple-50)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: '4px',
    backgroundColor: 'var(--purple-600)',
  },
}));

const SearchContent = ({
  searchType,
  autoSearch,
  manualSelect,
}: {
  searchType: SEARCH_TYPE;
  autoSearch: () => void;
  manualSelect: () => void;
}) => {
  const { t } = useTranslation();

  switch (searchType) {
    case SEARCH_TYPE.AUTO:
      return (
        <>
          <img src={SearchBlack} alt="search-icon" />
          <Typography variant="subtitle2" color={'var(--gray-700)'}>
            {t('create-new-request.search-watermark.watermarked-file')}
          </Typography>
        </>
      );
    case SEARCH_TYPE.RETRY:
      return (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
              width: '100%',
            }}
          >
            <Box display="flex" gap="8px">
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color={'var(--gray-700)'}
              >
                {t('create-new-request.search-watermark.not-found')}
              </Typography>
              <Tooltip
                title={null}
                titleHeader={`${t(
                  'create-new-request.search-watermark.not-found-desc'
                )}`}
                titleHeaderStyle={{ textAlign: 'center' }}
                placement="top"
              >
                <Icon name="information" size={16} color={'var(--gray-25)'} />
              </Tooltip>
            </Box>
            <Typography variant="subtitle2" color={'var(--gray-700)'}>
              <span
                style={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginRight: '4px',
                }}
                onClick={autoSearch}
              >
                {t('create-new-request.search-watermark.try-again')}
              </span>
              {t('create-new-request.search-watermark.help-text')}
            </Typography>
          </Box>
          <Button
            sx={{ gap: '6px', padding: '12px 18px', width: '300px' }}
            onClick={manualSelect}
          >
            <img src={SearchIcon} alt="search-icon" />
            {t('create-new-request.search-watermark.search-file')}
          </Button>
        </>
      );
    case SEARCH_TYPE.MANUAL:
      return (
        <>
          <Typography variant="subtitle2" color={'var(--gray-700)'}>
            {t('create-new-request.search-watermark.search-text')}
          </Typography>
          <Button
            sx={{ gap: '6px', padding: '12px 18px', width: '300px' }}
            onClick={manualSelect}
          >
            <img src={SearchIcon} alt="search-icon" />
            {t('create-new-request.search-watermark.search-file')}
          </Button>
        </>
      );
    default:
      return null; // Optionally return null if searchType is unknown
  }
};

export const SearchFile = ({
  searchType,
  autoSearch,
  manualSelect,
  isSearching,
}: {
  searchType: SEARCH_TYPE;
  autoSearch: () => void;
  manualSelect: () => void;
  isSearching: boolean;
}) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const timeoutDuration = 60000; // Checking search api timeout duration

  useEffect(() => {
    let timerId: NodeJS.Timer;
    if (isSearching) {
      const startTime = Date.now();
      timerId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / timeoutDuration) * 100, 100);
        const easedProgress = Math.sqrt(progress / 100) * 100;

        setProgress(easedProgress);
        if (progress === 100) {
          clearInterval(timerId);
        }
      }, 100);
    } else {
      setProgress(0);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isSearching]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
      }}
    >
      {isSearching ? (
        <>
          <Box sx={{ width: '100%', maxWidth: '320px' }}>
            <StyleLinearProgress variant="determinate" value={progress} />
          </Box>
          <Typography variant="subtitle2" color={'var(--gray-50)'}>
            {t('create-new-request.search-watermark.searching')}
          </Typography>
        </>
      ) : (
        <SearchContent
          searchType={searchType}
          autoSearch={autoSearch}
          manualSelect={manualSelect}
        />
      )}
    </Box>
  );
};
