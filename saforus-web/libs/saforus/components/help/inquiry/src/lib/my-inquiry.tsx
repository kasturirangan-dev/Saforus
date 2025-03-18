import { Box, Card, Typography } from '@mui/material';
import InquirySearch from './views/inquiry-search';
import { useTranslation } from 'react-i18next';
import CardFeatureItem from './views/card-feature-item';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';
import QuestionIcon from './assets/question.svg';
import VideoIcon from './assets/video.svg';
import ChatIcon from './assets/chat.svg';
import InquiryListView from './views/inquiry-list-view';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { pxToVw } from '@web-workspace/saforus/common/utils';

export function MyInquiry({ isLoading }: { isLoading: boolean }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const linkSupport = getEnvVar(
    i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}
      >
        <CardFeatureItem
          icon={ChatIcon}
          title={`${t('help.my-inquiries.inquiry')}`}
          description={`${t('help.my-inquiries.inquiry-desc')}`}
          onClickButton={() => {
            AuthStore?.userInfo?.devMode
              ? navigate(ROUTES.HELP.INQUIRY.path)
              : window.open(linkSupport, '_blank');
          }}
          buttonTitle={`${t('help.compose')}`}
        />
        <CardFeatureItem
          icon={QuestionIcon}
          title={'FAQ'}
          description={`${t('help.my-inquiries.faq-desc')}`}
          onClickButton={() => {
            window.open(
              getEnvVar(
                i18next.language === 'en' ? 'VITE_FAQ_URL' : 'VITE_FAQ_KO_URL'
              ),
              '_blank'
            );
          }}
          buttonTitle={`${t('button.see-all')}`}
        />
        <CardFeatureItem
          sx={{ flex: 1 }}
          icon={VideoIcon}
          title={`${t('help.my-inquiries.tutorial')}`}
          description={`${t('help.my-inquiries.tutorial-desc')}`}
          onClickButton={() => {
            window.open(
              getEnvVar(
                i18next.language === 'en'
                  ? 'VITE_TUTORIAL_URL'
                  : 'VITE_TUTORIAL_KO_URL'
              ),
              '_blank'
            );
          }}
          buttonTitle={`${t('help.watch-tutorial')}`}
        />
      </Box>

      {!isLoading && AuthStore?.userInfo?.devMode && <InquirySearch />}
      {AuthStore?.userInfo?.devMode && <InquiryListView />}
    </Box>
  );
}

export default MyInquiry;
