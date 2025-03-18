import { useTranslation } from 'react-i18next';
import ContentLabel from '@web-workspace/shared/components/widgets/content-label';
import { StatusName } from '../data/interface';

export const DetectionStatus = (props: { statusName: string }) => {
  const { t } = useTranslation();
  let label = '';
  let color = '';
  let backgroundColor = '';
  switch (props.statusName) {
    case StatusName.AUTO_DETECTION:
      label = t('piracy-order-view.order-detail.auto-detection');
      color = 'var(--gray-700)';
      backgroundColor = 'var(--neutral-300)';
      break;
    case StatusName.EXPERT_DETECTION:
      label = t('piracy-order-view.order-detail.expert-detection');
      color = 'var(--gray-700)';
      backgroundColor = 'var(--neutral-300)';
      break;
    case StatusName.IN_QUEUE:
      label = t('piracy-order-view.order-detail.inqueue');
      color = 'var(--gray-700)';
      backgroundColor = 'var(--neutral-300)';
      break;
    case StatusName.COMPLETED:
      label = t('piracy-order-view.order-detail.completed');
      color = 'var(--green-700)';
      backgroundColor = 'var(--green-50)';
      break;
    case StatusName.INPROGRESS:
      label = t('piracy-order-view.order-detail.inprogress');
      color = 'var(--purple-600)';
      backgroundColor = 'var(--purple-50)';
      break;
    case StatusName.FAILED:
      label = t('piracy-order-view.order-detail.failed');
      color = 'var(--red-600)';
      backgroundColor = 'var(--red-100)';
      break;
    default:
      return null;
  }

  return (
    <ContentLabel
      label={label}
      style={{ color, backgroundColor, display: 'inline-block' }}
    />
  );
};
