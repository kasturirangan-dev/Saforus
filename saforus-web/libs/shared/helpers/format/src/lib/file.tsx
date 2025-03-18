// Convert to a valid format
export const getValidFormat = (formatOrExt?: string) => {
  formatOrExt = formatOrExt?.toUpperCase();
  if (formatOrExt === 'JPG') return 'JPEG';
  if (formatOrExt === 'TIF') return 'TIFF';
  return formatOrExt;
};
