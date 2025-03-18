import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { VariableSizeList as List } from 'react-window';
import { PDFDocumentProxy, PageViewport } from 'pdfjs-dist';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { LoadingProcessLayer } from './loading-process';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IPreviewPDF {
  link: string;
  title?: string;
  disableAction?: boolean;
  viewWidth?: number;
  viewHeight?: number;
  scale?: number;
  styleContainer?: CSSProperties;
  styleContent?: CSSProperties;
  numberDisplay?: number; // Limit the page display
}

export function PreviewPdf({
  title,
  link,
  disableAction = false,
  viewWidth = 1030,
  viewHeight = 390,
  scale = 1.0,
  styleContainer,
  styleContent,
  numberDisplay,
}: IPreviewPDF) {
  const listRef = useRef();

  const [numPages, setNumPages] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(scale);
  const zoomStep = 0.2;
  const maxZoom = 3.0;
  const minZoom = 0.5;

  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageViewports, setPageViewports] = useState<PageViewport[] | null>(
    null
  );

  /**
   * React-Window cannot get item size using async getter, therefore we need to
   * calculate them ahead of time.
   */
  useEffect(() => {
    setPageViewports(null);

    if (!pdf) {
      return;
    }
    const numPages = pdf.numPages as number;
    setNumPages(numPages);
    (async () => {
      const pageNumbers = Array.from(new Array(numPages)).map(
        (_, index) => index + 1
      );

      const promiseList = pageNumbers.map((pageNumber) =>
        pdf.getPage(pageNumber).then((page) => page.getViewport({ scale: 1 }))
      );

      const nextPageViewports = await Promise.all(promiseList);
      setPageViewports(nextPageViewports);
    })();
  }, [pdf]);

  const getPageHeight = (pageIndex: number) => {
    if (!pageViewports) {
      throw new Error('getPageHeight() called too early');
    }

    const pageViewport = pageViewports[pageIndex];

    return pageViewport.height * zoomLevel;
  };

  const onDocumentLoadSuccess = (pdfObject: PDFDocumentProxy) => {
    setPdf(pdfObject);
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

  const zoomIn = () => {
    setZoomLevel((currentZoom) => Math.min(currentZoom + zoomStep, maxZoom));
  };

  const zoomOut = () => {
    setZoomLevel((currentZoom) => Math.max(currentZoom - zoomStep, minZoom));
  };

  const jumpToPage = (page: number) => {
    if (page >= 1 && page <= (numPages || 0)) {
      setCurrentPage(page);
      listRef?.current?.scrollToItem(page - 1, 'smart');
    }
  };

  // Update page when zoom level changes
  useEffect(() => {
    if (pdf) {
      listRef?.current?.resetAfterIndex(0, false);
    }
  }, [zoomLevel]);

  const SelectPage = ({
    numPages,
    currentPage,
    selectAction,
  }: {
    numPages: number;
    currentPage: number;
    selectAction: (page: number) => void;
  }) => {
    const [selectPage, setSelectPage] = useState(currentPage);
    const handelUpdatePage = (e: any) => {
      setSelectPage(e.target.value);
    };
    const handelSelect = (e: any) => {
      if (e.key === 'Enter') {
        if (selectPage >= 1 && selectPage <= (numPages || 0)) {
          selectAction(selectPage);
        } else {
          setSelectPage(currentPage);
        }
      }
    };

    return (
      <TextField
        style={{ width: '60px' }}
        inputProps={{
          startAdornment: null,
          endAdornment: null,
          style: {
            padding: '9px 16px',
          },
        }}
        variant="outlined"
        value={selectPage}
        onChange={handelUpdatePage}
        onKeyDown={handelSelect}
      />
    );
  };

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    return (
      <div style={style}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Page
            key={`page_${index + 1}`}
            pageIndex={index}
            scale={zoomLevel}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </div>
      </div>
    );
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #EAEBF0',
        ...styleContainer,
      }}
    >
      {!disableAction && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px',
            borderBottom: '1px solid #EAEBF0',
          }}
        >
          <Typography gutterBottom>{title}</Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '5px',
            }}
          >
            <IconButton onClick={zoomIn} disabled={zoomLevel === maxZoom}>
              <AddOutlinedIcon
                sx={{ width: '35px', color: 'var(--gray-25)' }}
              />
            </IconButton>
            <Box
              sx={{
                padding: '9px 16px',
                borderRadius: '5px',
                border: '1px solid #DAE0E6',
              }}
            >
              <Typography>{Math.round(zoomLevel * 100)}%</Typography>
            </Box>
            <IconButton onClick={zoomOut} disabled={zoomLevel === minZoom}>
              <RemoveOutlinedIcon
                sx={{ width: '35px', color: 'var(--gray-25)' }}
              />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <SelectPage
              numPages={numPages}
              currentPage={currentPage}
              selectAction={jumpToPage}
            />
            <Typography>of {numPages || '--'}</Typography>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'var(--neutral-200)',
          position: 'relative',
          ...styleContent,
        }}
      >
        {link && (
          <Document
            file={link}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadProgress={onDocumentLoadProgress}
            loading={<LoadingProcessLayer progress={loadingProgress} />}
          >
            {pdf && pageViewports ? (
              <List
                width={viewWidth}
                height={viewHeight}
                estimatedItemSize={getPageHeight(0)}
                itemCount={numberDisplay || numPages}
                itemSize={getPageHeight}
                ref={listRef}
              >
                {Row}
              </List>
            ) : null}
          </Document>
        )}
      </Box>
    </Box>
  );
}

export default PreviewPdf;
