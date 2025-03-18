import React, { useMemo } from 'react';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { useTranslation } from 'react-i18next';
import { Box, Typography, styled } from '@mui/material';
import { useSnapshot } from 'valtio';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  PLAN_TYPE,
  PlanInfo,
  SubscriptionDetail,
} from '@web-workspace/api-console/common/model';
import ServiceInfo from './view/service-info';
import SubscriptionInfo from './view/subscription-info';
import CardView from './view/card-view';
import { PlanTitle, StyledAlert } from './view/styled-elements';
import { addMonths, addYears } from 'date-fns';
import ActionButton from './view/actionButton';
import { formatBillingDate } from '@web-workspace/shared/helpers/dates';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

const BoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}));

type PlanInfoDialogProps = {
  plan: PlanInfo;
  currentPlan: SubscriptionDetail;
  onSubscribe: (plan: PlanInfo) => void;
  onCancel: () => void;
  isLoading: boolean;
  cancelledAt?: Date | string;
  onClose: () => void;
};

const PlainInfoDialog: React.FC<PlanInfoDialogProps> = ({
  plan,
  currentPlan,
  onSubscribe,
  onCancel,
  isLoading,
  cancelledAt,
  onClose,
}) => {
  const { t, i18n } = useTranslation();
  const linkSupport = getEnvVar(
    i18n.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );
  const { tzDisplayOffset: tzOffset } = useSnapshot(CsApiAuthStore);
  const isInBillingCycle =
    currentPlan?.plan && currentPlan?.plan?.planType !== PLAN_TYPE.FREE;
  const card = currentPlan?.paymentCards?.find((card) => card.isDefault);

  const actionType = (() => {
    if (plan.planType === PLAN_TYPE.ENTERPRISE) return 'CONTACT';
    if (plan.planType === currentPlan?.plan?.planType) return 'VIEW';
    if (card) return 'UPGRADE';
    return 'SUBSCRIBE';
  })();

  const showUpgradeDes = actionType === 'UPGRADE' && isInBillingCycle;
  const showUpgradeAlert =
    currentPlan?.moreInfo?.isFreeUpgradeBillingCycle && !cancelledAt;

  const title = useMemo(() => {
    const planTitle = t(`apiServicePlan.plan.${plan.planType}`);
    if (actionType === 'UPGRADE') {
      return t('apiServicePlan.planDetail.upgradeTitle', { plan: planTitle });
    }
    return planTitle;
  }, [i18n.language, currentPlan, plan.planType]);

  const now = new Date();
  const startDate = formatBillingDate(
    isInBillingCycle ? currentPlan?.billingStartDate : now,
    tzOffset
  );
  const nextPayDate = formatBillingDate(
    isInBillingCycle
      ? currentPlan?.nextPayDate
      : plan.billingType === 'YEARLY'
      ? addYears(now, 1)
      : addMonths(now, 1),
    tzOffset
  );

  const PlanAction = () => {
    if (actionType === 'CONTACT') {
      return (
        <ActionButton
          color="secondary"
          onClick={() => {
            window.open(linkSupport, '_blank');
          }}
        >
          {t('apiServicePlan.planDetail.contact')}
        </ActionButton>
      );
    }

    if (cancelledAt) return null;
    switch (actionType) {
      case 'SUBSCRIBE':
        return (
          <ActionButton onClick={() => onSubscribe(plan)} loading={isLoading}>
            {t('apiServicePlan.planDetail.pay', {
              amount: parseInt(plan.price).toLocaleString(),
            })}
          </ActionButton>
        );
      case 'VIEW':
        return (
          <ActionButton
            color="secondary"
            onClick={() => onCancel()}
            loading={isLoading}
          >
            {t('apiServicePlan.planDetail.cancel')}
          </ActionButton>
        );
      case 'UPGRADE':
        return (
          <ActionButton onClick={() => onSubscribe(plan)} loading={isLoading}>
            {isLoading
              ? t('apiServicePlan.planDetail.upgrading')
              : t('apiServicePlan.planDetail.upgrade')}
          </ActionButton>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '580px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '10px',
        },
      }}
      onClose={onClose}
      disableBackdropClick={true}
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      rightIconCss={{
        marginRight: '1rem',
        marginTop: '1rem',
      }}
      footer={<PlanAction />}
      dialogCss={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
      dialogContent={
        <BoxContainer>
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <PlanTitle>{title}</PlanTitle>
            {cancelledAt && (
              <Typography
                variant="caption"
                sx={{
                  padding: '2px 8px',
                  color: 'var(--base-white)',
                  backgroundColor: 'var(--neutral-800)',
                  borderRadius: '5px',
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: t('apiServicePlan.planDetail.cancelOn', {
                      date: formatBillingDate(cancelledAt, tzOffset),
                    }),
                  }}
                />
              </Typography>
            )}
          </Box>
          {showUpgradeAlert && (
            <StyledAlert severity="info">
              <div
                dangerouslySetInnerHTML={{
                  __html: t('apiServicePlan.planDetail.updateAlert', {
                    plan: t(`apiServicePlan.plan.${plan.planType}`),
                    endDate: nextPayDate,
                    nextPayDate: nextPayDate,
                  }),
                }}
              />
            </StyledAlert>
          )}
          <ServiceInfo plan={plan} />
          <SubscriptionInfo
            plan={plan}
            startDate={startDate}
            nextPayDate={nextPayDate}
            cancelledAt={cancelledAt}
          />
          {card && (
            <CardView
              cardCompany={card.cardCompany}
              cardNumber={card.cardNumber}
            />
          )}
          {showUpgradeDes && (
            <StyledAlert severity="warning">
              <div
                dangerouslySetInnerHTML={{
                  __html: t('apiServicePlan.planDetail.upgradeDes', {
                    plan: t(`apiServicePlan.plan.${plan.planType}`),
                    endDate: nextPayDate,
                    nextPayDate: nextPayDate,
                  }),
                }}
              />
            </StyledAlert>
          )}
          {cancelledAt && (
            <StyledAlert severity="info">
              <div
                dangerouslySetInnerHTML={{
                  __html: t('apiServicePlan.planDetail.cancelAlert', {
                    plan: t(`apiServicePlan.plan.${plan.planType}`),
                    endDate: nextPayDate,
                    nextPayDate: nextPayDate,
                  }),
                }}
              />
            </StyledAlert>
          )}
        </BoxContainer>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default PlainInfoDialog;
