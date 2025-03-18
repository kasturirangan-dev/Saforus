const enMeta = {
  formatList: [
    { label: 'All', value: 'ALL' },
    { label: 'JPEG', value: 'JPG' },
    { label: 'PNG', value: 'PNG' },
    { label: 'TIFF', value: 'TIFF' },
    { label: 'BMP', value: 'BMP' },
    { label: 'PDF', value: 'PDF' },
  ],
};
const krMeta = {
  formatList: [
    { label: '전체', value: 'ALL' },
    { label: 'JPEG', value: 'JPG' },
    { label: 'PNG', value: 'PNG' },
    { label: 'TIFF', value: 'TIFF' },
    { label: 'BMP', value: 'BMP' },
    { label: 'PDF', value: 'PDF' },
  ],
};

export function getMeta(lang: string) {
  return lang === 'en' ? enMeta : krMeta;
}
