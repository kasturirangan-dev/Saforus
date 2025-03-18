import { useTranslation } from 'react-i18next';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { PlanInfo, PLAN_TYPE } from '@web-workspace/api-console/common/model';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

export function PlanAction({
  plan,
  openPlanInfo,
  isMostPopular,
  canUpgrade,
  subscriptionTier,
}: {
  plan: PlanInfo;
  openPlanInfo: (plan: PlanInfo) => void;
  isMostPopular: boolean;
  canUpgrade: boolean;
  subscriptionTier: string;
}) {
  const { t, i18n } = useTranslation();

  const GetPlan = (
    <Button
      className={isMostPopular && canUpgrade ? 'popular' : ''}
      fullWidth
      sx={{
        height: 46,
        gap: '6px',
        '&.popular': {
          background: 'var(--orange-600)',
          '&:hover': {
            background: 'var(--orange-500)',
          },
        },
      }}
      disabled={!canUpgrade}
      onClick={() => openPlanInfo(plan)}
    >
      {t(`apiServicePlan.button.${plan.planType}`)}
      <Icon name="arrow_right" size={20} color="var(--base-white)" />
    </Button>
  );

  const linkSupport = getEnvVar(
    i18n.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );
  const Contact = (
    <Button
      className={isMostPopular ? 'popular' : ''}
      fullWidth
      sx={{
        height: 46,
        gap: '6px',
      }}
      onClick={() => {
        window.open(linkSupport, '_blank');
      }}
    >
      {t(`apiServicePlan.button.${plan.planType}`)}
      <Icon name="arrow_right" size={20} color="var(--base-white)" />
    </Button>
  );

  const ManagePlan = (
    <Button
      color="secondary"
      fullWidth
      sx={{ height: 46 }}
      onClick={() => openPlanInfo(plan)}
    >
      {t('apiServicePlan.button.managePlan')}
    </Button>
  );

  switch (plan.planType) {
    case PLAN_TYPE.FREE:
      return subscriptionTier ? null : GetPlan;
    case PLAN_TYPE.ENTERPRISE:
      return plan.planType === subscriptionTier ? ManagePlan : Contact;
    default:
      return plan.planType === subscriptionTier ? ManagePlan : GetPlan;
  }
}

export default PlanAction;
