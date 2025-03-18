interface FileInfo {
  contentType?: string;
  preview?: string;
  fileName?: string;
  fileSize?: string | number;
}

export interface MediaContentProps {
  file: FileInfo;
  control?: boolean;
  height?: string;
  width?: string;
  maxPdfPage?: number;
}

export interface MediaPreviewProps {
  file: FileInfo;
  onRemoveFile?: () => void;
  errorMsg?: string;
  height?: string;
  fullWidth?: boolean;
  control?: boolean;
  maxPdfPage?: number;
}
