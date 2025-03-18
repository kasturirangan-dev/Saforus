import {
  Box,
  FormControlLabel,
  Switch,
  Typography,
  styled,
} from '@mui/material';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import React, { useEffect, useState } from 'react';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import Cloud from '../assets/cloud.svg';
import CreateTeam from '../assets/create-team.svg';
import Dollar from '../assets/dollar.svg';
import Download from '../assets/download.svg';
import PiracyDetection from '../assets/piracy-detection.svg';
import WaterMakingCode from '../assets/watermaking-code.svg';
import WaterMakingCapacity from '../assets/watermarking-capacity.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useSnapshot } from 'valtio';
import { BillingStore } from '@web-workspace/saforus/components/user-info/service-plan-billing/data';
import { useSearchParams } from 'react-router-dom';
import PlanView from './plan-view';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';

const StyledService = styled(Box)`
  height: 234px;
  text-align: center;
  padding: 36px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledHeader = styled(Box)`
  font-size: 2rem;
  line-height: 40px;
  letter-spacing: -0.64px;
  font-style: normal;
  font-weight: 700;
`;

const SpanBox = React.forwardRef(function SpanBox(props, ref) {
  return <Box ref={ref} component="span" {...props} />;
});

const StyledKeyParameter = styled(SpanBox)`
  color: var(--gray-700);
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 146.667% */
  letter-spacing: -0.1px;
`;

const StyledMoney = styled(Box)`
  color: var(--gray-700);
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 44px;
  letter-spacing: -0.72px;
`;

const StyledItem = styled(Box)`
  min-height: 61px;
  padding: 18px 28px;
  border-top: 1px solid var(--neutral-700);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.1px;
  color: var(--gray-50);
  white-space: nowrap;
`;

interface ServicePlanProps {
  handleSubscription: (planId: number, teamId: number | null) => void;
}

const STRIPE_CALLBACKS = {
  success: 'PENDING_PAYMENT_STATUS',
  cancel: 'PAYMENT_CANCELLED',
};

export function ServicePlanView({ handleSubscription }: ServicePlanProps) {
  const [searchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { plans, setYearlyBilling, yearlyBilling } = useSnapshot(BillingStore);
  const freePlan = plans.find((item) => item.id === 1);
  const standardPlan = plans.find((item) => item.id === 2);
  const [subButtonText, setSubButtonText] = useState<string>(
    yearlyBilling
      ? (t('servicePlan.subscription.button.switch-yearly-desc') || '')
      : (t('servicePlan.subscription.button.switch-monthly-desc') || '')
  );

  useEffect(() => {
    if (yearlyBilling) {
      setSubButtonText(
        t('servicePlan.subscription.button.switch-yearly-desc') as string
      );
    } else {
      setSubButtonText(
        t('servicePlan.subscription.button.switch-monthly-desc') as string
      );
    }
  }, [yearlyBilling, t]);

  useEffect(() => {
    if (paramsAsObject?.checkout_status) {
      if (paramsAsObject?.checkout_status === STRIPE_CALLBACKS.cancel) {
        showToast.warning(t('servicePlan.subscription.subscription-payment-fail'), {
          toastId: 'subscription-payment-fail',
        });
      }
      if (paramsAsObject?.checkout_status === STRIPE_CALLBACKS.success) {
        showToast.success(
          t('servicePlan.subscription.subscription-payment-success'),
          {
            toastId: 'subscription-payment-success',
          }
        );
      }
      navigate(ROUTES.USER_INFO.SERVICE_PLAN.path, {
        replace: true,
      });
    }
  }, []);

  const data = [
    {
      title: t('servicePlan.subscription.create-team'),
      icon: CreateTeam,
    },
    {
      title: t('servicePlan.subscription.cloud-storage'),
      icon: Cloud,
    },
    {
      title: t('servicePlan.subscription.forensic-watermarking-capacity'),
      icon: WaterMakingCapacity,
    },
    {
      title: t('servicePlan.subscription.watermark-code'),
      icon: WaterMakingCode,
    },
    {
      title: t('servicePlan.subscription.downloads-per-order'),
      icon: Download,
    },
    {
      title: t('servicePlan.subscription.piracy-detection-pm'),
      icon: PiracyDetection,
    },
    {
      title: t('servicePlan.subscription.additional-charge'),
      icon: Dollar,
    },
  ];

  const handleChangeCycle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYearlyBilling(event.target.checked);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        backgroundColor: '#ffffff',
      }}
    >
      <Box sx={{ backgroundColor: 'var(--neutral-50)' }}>
        <StyledService sx={{ padding: '1.75rem' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                sx={{ marginRight: 0, marginLeft: 0 }}
                control={
                  <Switch
                    color="primary"
                    checked={yearlyBilling}
                    onChange={handleChangeCycle}
                  />
                }
                label={
                  <Typography
                    color={
                      yearlyBilling ? 'var(--gray-25)' : 'var(--purple-400)'
                    }
                    sx={{
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: '24px',
                      letterSpacing: '-0.1px',
                    }}
                  >
                    {t('servicePlan.subscription.monthly')}
                  </Typography>
                }
                labelPlacement="start"
              />
              <Typography
                color={yearlyBilling ? 'var(--purple-400)' : 'var(--gray-25)'}
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '24px',
                  letterSpacing: '-0.1px',
                }}
              >
                {t('servicePlan.subscription.annually')}
              </Typography>
              <Typography
                color="var(--base-white)"
                sx={{
                  backgroundColor: yearlyBilling
                    ? 'var(--purple-400)'
                    : 'var(--gray-25)',
                  ml: '0.5rem',
                  fontSize: '13px',
                  fontWeight: 500,
                  lineHeight: '24px',
                  letterSpacing: '-0.1px',
                  px: '0.5rem',
                  borderRadius: '5px',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('servicePlan.subscription.10off')}
              </Typography>
            </Box>
          </Box>
        </StyledService>
        {data &&
          data.map((el) => {
            return (
              <StyledItem key={el.title}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  {' '}
                  <img src={el.icon} /> {el.title}{' '}
                </Box>
              </StyledItem>
            );
          })}
      </Box>
      {plans.map((plan) => (
        <PlanView
          key={plan?.id ?? `${plan.title}-${plan.price}`}
          plan={plan}
          title={plan.title}
          price={plan.price}
          paymentInterval={plan.paymentInterval}
          subscriptionButtonTitle={''}
          disabled={plan.isNewSubscriptionAllowed}
          createTeam={false}
          cloudStorage={plan.cloudStorageSize}
          forensicWatermarkingCapacity={plan.wtrCapacitySize}
          watermarkCode={`${plan.wtrCodeMinValue}-${plan.wtrCodeMaxValue}`}
          downloadPerOrder={plan.noOfDownloadsPerOrder}
          piracyDetection={plan.noOfPdAllowed}
          additionalCharge={undefined}
          handleSubscription={handleSubscription}
          subButtonText={subButtonText}
        />
      ))}
    </Box>
  );
}

export default ServicePlanView;
