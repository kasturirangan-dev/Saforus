import { lazy } from 'react';
import { CreateOrderStepsEnum } from '@web-workspace/saforus/components/multi-drm/create-order/data';
import { i18n } from '@web-workspace/shared/i18n';
import ChooseStorageSvg from './assets/choose-storage';
import PackageOptionSvg from './assets/package-option';
import OutputStreamingSvg from './assets/output-streaming';
import SubmitOrderSvg from './assets/submit-order';
const PackagingOption = lazy(
  () =>
    import(
      '@web-workspace/saforus/components/multi-drm/create-order/packaging-option'
    )
);

const ChooseStorage = lazy(
  () =>
    import(
      '@web-workspace/saforus/components/multi-drm/create-order/my-storage'
    )
);

const OutputStreaming = lazy(
  () =>
    import(
      '@web-workspace/saforus/components/multi-drm/create-order/output-streaming'
    )
);

const SubmitOrder = lazy(
  () =>
    import(
      '@web-workspace/saforus/components/multi-drm/create-order/submit-order'
    )
);

const CreateOrderStepsComponent = {
  [CreateOrderStepsEnum.PACKAGING_OPTION]: {
    component: PackagingOption,
    icon: PackageOptionSvg,
    label: 'multiDrm.create-order.steps.packaging-option',
    alt: 'Package',
  },
  [CreateOrderStepsEnum.CHOOSE_STORAGE]: {
    component: ChooseStorage,
    icon: ChooseStorageSvg,
    label: 'multiDrm.create-order.steps.choose-storage',
    alt: 'Storage',
  },
  [CreateOrderStepsEnum.OUTPUT_STREAMING]: {
    component: OutputStreaming,
    icon: OutputStreamingSvg,
    label: 'multiDrm.create-order.steps.output-streaming',
    alt: 'Config',
  },
  [CreateOrderStepsEnum.SUBMIT_ORDER]: {
    component: SubmitOrder,
    icon: SubmitOrderSvg,
    label: 'multiDrm.create-order.steps.submit-order',
    alt: 'Submit',
  },
};

export default CreateOrderStepsComponent;
