import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Box, IconButton, Typography, styled } from '@mui/material';
import { LoadingProcessLayer } from './loading-process';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { prependBaseUrl } from '@web-workspace/shared/api/http-client';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IPreviewPDF {
  link: string;
  viewHeight?: number;
  viewWidth?: number | string;
  maxPage?: number;
}

const ActionButton = styled(IconButton)(() => ({
  height: '32px',
  width: '32px',
  borderRadius: '5px',
  border: '1px solid var(--neutral-750)',
}));

export function PreviewPdf({
  link,
  viewHeight = 390,
  viewWidth,
  maxPage = 1,
}: IPreviewPDF) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [loadingProgress, setLoadingProgress] = useState(0);

  const onDocumentLoadSuccess = (pdfObject: PDFDocumentProxy) => {
    setNumPages(Math.min(pdfObject.numPages, maxPage));
    setLoadingProgress(100); // Hide progress upon load
  };

  const onDocumentLoadProgress = ({
    loaded,
    total,
  }: {
    loaded: number;
    total: number;
  }) => {
    setLoadingProgress((loaded / total) * 100);
  };

  const onNextPage = () => {
    setCurrentPage((prev) => {
      if (prev + 1 >= numPages) {
        return prev;
      }
      return prev + 1;
    });
  };
  const onPrevPage = () => {
    setCurrentPage((prev) => {
      if (prev - 1 < 0) {
        return prev;
      }
      return prev - 1;
    });
  };

  return (
    <Box
      sx={{
        height: viewHeight,
        width: viewWidth || 'auto',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {link && (
        <Document
          file={prependBaseUrl(link)}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadProgress={onDocumentLoadProgress}
          loading={<LoadingProcessLayer progress={loadingProgress} />}
        >
          <Page
            pageIndex={currentPage}
            height={viewHeight}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      )}

      {maxPage !== 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',

            position: 'absolute',
            bottom: 12,
            right: 12,
          }}
        >
          <ActionButton onClick={onPrevPage}>
            <ChevronLeftIcon fontSize="small" />
          </ActionButton>
          <Typography variant="body2">
            {`${currentPage + 1}/${numPages}`}
          </Typography>
          <ActionButton onClick={onNextPage}>
            <ChevronRightIcon fontSize="small" />
          </ActionButton>
        </Box>
      )}
    </Box>
  );
}

export default PreviewPdf;
