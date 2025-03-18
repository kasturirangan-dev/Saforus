import { MEDIA_TYPE } from '@web-workspace/api-console/common/model';

export interface OrderNoProps {
  contentType: string;
  prefix?: string;
  length?: number;
}

export const generateOrderNo = ({
  contentType,
  prefix = 'F',
  length = 13,
}: OrderNoProps): string => {
  let infix = 'I';
  switch (contentType) {
    case MEDIA_TYPE.IMG:
      infix = 'I';
      break;
    case MEDIA_TYPE.VIDEO:
      infix = 'V';
      break;
    case MEDIA_TYPE.AUDIO:
      infix = 'A';
      break;
    case MEDIA_TYPE.DOCUMENT:
      infix = 'D';
      break;
    default:
      infix = '';
      break;
  }
  const head = prefix + infix;
  const pnt = length > 0 || length < 13 ? length : 13;
  const body = Date.now().toString().substring(0, pnt);
  return `${head}-${body}`;
};
