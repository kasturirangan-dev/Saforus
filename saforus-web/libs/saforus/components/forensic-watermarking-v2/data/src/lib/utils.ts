import { MEDIA_TYPE } from "@web-workspace/saforus/common/model";

export interface OrderNoProps {
  mediaType: string,
  prefix?: string,
  length?: number,
}

export const generateOrderNo = ({
  mediaType,
  prefix = 'F',
  length = 13,
}: OrderNoProps): string => {
  let infix = 'I';
  switch (mediaType) {
    case MEDIA_TYPE.IMG:
      infix = 'I';
      break;
    case MEDIA_TYPE.VIDEO:
      infix = 'V';
      break;
    case MEDIA_TYPE.AUDIO:
      infix = 'A';
      break;
    case MEDIA_TYPE.STREAMING:
      infix = 'S';
      break;
    case MEDIA_TYPE.STREAMING_MUSIC:
      infix = 'M'
      break;
    case MEDIA_TYPE.DOCUMENT:
      infix = 'D'
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

const maxWtrCode = 2147483638; // 2^31 - 10
export const generateWtrCode = (max = maxWtrCode) => {
  const randomNum = Math.floor(Math.random() * (max + 1));
  return randomNum;
};
