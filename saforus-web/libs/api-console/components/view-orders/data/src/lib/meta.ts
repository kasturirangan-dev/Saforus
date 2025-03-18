import { ChanelType, OrderType } from '@web-workspace/api-console/common/model';
import { OrderStatus } from './interface';

const enMeta = {
  orderTypeList: [
    { label: 'All', value: 'ALL' },
    { label: 'Watermarking', value: OrderType.WATERMARKING },
    { label: 'Detection', value: OrderType.DETECTION },
  ],
  formatList: [
    { label: 'All', value: 'ALL' },
    { label: 'JPEG', value: 'JPG' },
    { label: 'PNG', value: 'PNG' },
    { label: 'TIFF', value: 'TIFF' },
    { label: 'BMP', value: 'BMP' },
    { label: 'PDF', value: 'PDF' },
  ],
  statusList: [
    { label: 'All', value: 'ALL' },
    { label: 'In Progress', value: OrderStatus.AWAITING_PROCESS },
    { label: 'Processed', value: OrderStatus.PROCESSED },
    { label: 'Expired', value: OrderStatus.EXPIRED },
  ],
  channelList: [
    { label: 'All', value: 'ALL' },
    { label: 'Web request', value: ChanelType.WEB },
    { label: 'API request', value: ChanelType.API },
  ],
};
const krMeta = {
  orderTypeList: [
    { label: '전체', value: 'ALL' },
    { label: '워터마크', value: OrderType.WATERMARKING },
    { label: '검출', value: OrderType.DETECTION },
  ],
  formatList: [
    { label: '전체', value: 'ALL' },
    { label: 'JPEG', value: 'JPG' },
    { label: 'PNG', value: 'PNG' },
    { label: 'TIFF', value: 'TIFF' },
    { label: 'BMP', value: 'BMP' },
    { label: 'PDF', value: 'PDF' },
  ],
  statusList: [
    { label: '전체', value: 'ALL' },
    { label: '작업중', value: OrderStatus.AWAITING_PROCESS },
    { label: '처리 완료', value: OrderStatus.PROCESSED },
    { label: '만료됨', value: OrderStatus.EXPIRED },
  ],
  channelList: [
    { label: '전체', value: 'ALL' },
    { label: '세이포러스 웹', value: ChanelType.WEB },
    { label: 'API', value: ChanelType.API },
  ],
};

export function getMeta(lang: string) {
  return lang === 'en' ? enMeta : krMeta;
}
