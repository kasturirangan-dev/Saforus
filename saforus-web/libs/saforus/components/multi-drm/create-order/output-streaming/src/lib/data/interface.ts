import { DrmOutputStream, SupportedResolution } from "@web-workspace/saforus/components/multi-drm/create-order/data";
import { randomId } from "@web-workspace/shared/helpers/strings";
import { UseFormRegister } from "react-hook-form";

export interface StreamFormat {
  id: string,
  label: string,
  value: string,
  disabled: boolean,
}

export const STREAM_FORMATS: StreamFormat[] = [
  {
    id: randomId(),
    label: 'HLS',
    value: 'HLS',
    disabled: false,
  },
  {
    id: randomId(),
    label: 'DASH',
    value: 'DASH',
    disabled: false,
  },
];

export const RESOLUTION_BITRATE: SupportedResolution[] = [
  {
    id: '1',
    idx: '1',
    definition: "SD(48p)",
    resolution: "640x480",
    bitrate: '350'
  },
  {
    id: '2',
    idx: '2',
    definition: "HD(720p)",
    resolution: "1280x720(16-9)",
    bitrate: '1350'
  },
  {
    id: '3',
    idx: '3',
    definition: "FHD(1080p)",
    resolution: "1920x1080(16-9)",
    bitrate: '2700'
  },
  {
    id: '4',
    idx: '4',
    definition: "FHD(1200p)",
    resolution: "1920x1200",
    bitrate: '2700'
  },
  {
    id: '5',
    idx: '5',
    definition: "QHD(1440p)",
    resolution: "2560x1440(16-9)",
    bitrate: '3500'
  },
  {
    id: '6',
    idx: '6',
    definition: "QHD(1600p)",
    resolution: "2560x1600(16-10)",
    bitrate: '3500'
  },
  {
    id: '7',
    idx: '7',
    definition: "UHD(4K)",
    resolution: "3840x2160(16-9)",
    bitrate: '7500'
  }
];

type StreamFieldName = keyof DrmOutputStream;

export function getFieldRegisterStream(
  registerFn: UseFormRegister<DrmOutputStream>,
  fieldName: StreamFieldName
) {
  return registerFn(fieldName);
}