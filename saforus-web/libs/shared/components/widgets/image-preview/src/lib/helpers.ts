export const isTiffFile = (fileName: string | null | undefined) => {
  return fileName?.split('.')?.[1]?.toLowerCase().includes('tif');
};
