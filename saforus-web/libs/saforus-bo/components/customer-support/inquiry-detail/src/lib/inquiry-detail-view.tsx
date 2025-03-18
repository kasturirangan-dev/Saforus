import { Backdrop, Box, CircularProgress } from '@mui/material';
import { Header } from './views/header';
import { InquiryView } from './views/Inquiry-view';
import { HistoryPanel } from './views/history-panel';
import { Reply } from './views/reply';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  Inquiry,
  MyInquiriesStore,
} from '@web-workspace/saforus-bo/components/customer-support/data';
import { useTranslation } from 'react-i18next';

export function InquiryDetailView({
  isLoading,
  inquiryId,
  refetch,
}: {
  isLoading: boolean;
  inquiryId: string;
  refetch: () => void;
}) {
  const [historyOpen, setHistoryOpen] = useState(true);

  const { currentInquiry } = useSnapshot(MyInquiriesStore);

  const [quesInquiry, setQuesInquiry] = useState<Inquiry | null>(null);
  const [ansInquiry, setAnsInquiry] = useState<Inquiry | null>(null);

  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (currentInquiry && currentInquiry.length > 0) {
      const questQA =
        currentInquiry.filter((item) => item.questionAnswer === 'QUESTION') ??
        null;

      const ansQA =
        currentInquiry.filter((item) => item.questionAnswer === 'ANSWER') ??
        null;
      if (questQA && questQA.length > 0) {
        setQuesInquiry(questQA[0] as Inquiry);
      } else {
        setQuesInquiry(null);
      }
      if (ansQA && ansQA.length > 0) {
        setAnsInquiry(ansQA[0] as Inquiry);
      } else {
        setAnsInquiry(null);
      }
    }
  }, [currentInquiry]);

  return (
    <Box sx={{ flex: 1 }}>
      <Backdrop
        open={isLoading}
        sx={{
          display: 'flex',
          zIndex: 3000,
          color: 'var(--main-brand)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {!isLoading && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: isPreviewMode ? 'column' : 'row',
            justifyContent: 'space-between',
            height: isPreviewMode ? 'calc(100% - 80px)' : 'auto',
            overflowY: 'scroll',
          }}
        >
          <Box
            sx={{
              width: isPreviewMode
                ? '100%'
                : historyOpen
                ? 'calc(100% - 400px)'
                : 'calc(100% - 60px)',
            }}
          >
            {quesInquiry && (
              <Header
                quesInquiry={quesInquiry}
                ansInquiry={ansInquiry!}
                isBackArrow={isPreviewMode ? false : isEditMode ? true : true}
              />
            )}
            {quesInquiry && <InquiryView quesInquiry={quesInquiry} />}
            <Reply
              ansInquiry={ansInquiry}
              quesInquiry={quesInquiry!}
              inquiryId={inquiryId}
              refetch={refetch}
              handlePreview={setIsPreviewMode}
              handleEditMode={setIsEditMode}
              isPreviewMode={isPreviewMode}
              isEditMode={isEditMode}
            />
          </Box>
          {!isPreviewMode && (
            <HistoryPanel
              quesInquiry={quesInquiry!}
              ansInquiry={ansInquiry!}
              open={historyOpen}
              setOpen={setHistoryOpen}
            />
          )}
        </Box>
      )}
    </Box>
  );
}

export default InquiryDetailView;
