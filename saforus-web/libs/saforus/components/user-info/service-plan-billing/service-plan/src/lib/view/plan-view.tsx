/* Note 
(1) Condition for show 'Request for Extension' button
- Free Plan expired: Show 'Request for Extension' 
- Standard (Active): Hide 'Request for Extension'
*/
import { Box, Typography, styled } from '@mui/material';
import {
  BillingStore,
  Plan,
} from '@web-workspace/saforus/components/user-info/service-plan-billing/data';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import PlanEnterprise from '../assets/plan-enterprise.svg';
import { differenceDays } from '@web-workspace/shared/helpers/dates';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import i18next from 'i18next';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { UserRole } from '@web-workspace/saforus/common/model';
import useSubscription from '@web-workspace/shared/hooks/use-subscription';
import {
  FeatureFlag,
  isFeatureEnabled,
} from '@web-workspace/shared/feature-flag';
import { getPublicTeamId } from '@web-workspace/saforus/common/utils';

interface PlanViewProps {
  plan: Plan;
  title: string;
  price: number;
  paymentInterval: string;
  subscriptionButtonTitle: string;
  disabled: boolean;
  createTeam: boolean;
  cloudStorage: number | string;
  forensicWatermarkingCapacity: number | string;
  watermarkCode: string;
  downloadPerOrder: number | string;
  piracyDetection: number | string;
  additionalCharge: any;
  subButtonText: string;
  handleSubscription: (planId: number, teamId: number | null) => void;
}

const StyledService = styled(Box)`
  height: 234px;
  text-align: left;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled(Box)`
  font-size: 22px;
  line-height: 40px;
  letter-spacing: -0.64px;
  font-style: normal;
`;

const SpanBox = React.forwardRef(function SpanBox(props, ref) {
  return <Box ref={ref} component="span" {...props} />;
});

const StyledKeyParameter = styled(SpanBox)`
  color: var(--gray-700);
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 146.667% */
  letter-spacing: -0.1px;
`;

const StyledMoney = styled(Box)`
  color: var(--gray-700);
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 44px;
  letter-spacing: -0.8px;
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

const PlanView = ({
  plan,
  title,
  price,
  paymentInterval,
  subscriptionButtonTitle,
  disabled,
  createTeam,
  cloudStorage,
  forensicWatermarkingCapacity,
  watermarkCode,
  downloadPerOrder,
  piracyDetection,
  additionalCharge,
  handleSubscription,
  subButtonText,
}: PlanViewProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [disableSubscriptionButton, setDisableSubscriptionButton] =
    useState(true);
  const [isCreateTeam, setIsCreateTeam] = useState(
    t('servicePlan.subscription.not-supported')
  );
  const isCustom = t('servicePlan.subscription.custom');
  const { subscriptionPlanDetail } = useSnapshot(useSubscription);
  const { yearlyBilling } = useSnapshot(BillingStore);

  const [buttonTitle, setButtonTitle] = useState(
    t('servicePlan.subscription.button.get-started')
  );
  const linkSupport = getEnvVar(
    i18next.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );

  const handleContactSale = () => {
    window.open(linkSupport, '_blank');
  };
  const handleInvoices = () => {
    navigate(ROUTES.USER_INFO.BILLING_DETAIL.path);
  };

  // const moveToMonthlyUsage = () => {
  //   navigate(ROUTES.USER_INFO.MONTHLY_USAGE.path);
  // };

  const isFree = plan.subscriptionCostType.toLowerCase() === 'free';
  const isPaid = plan.subscriptionCostType.toLowerCase() === 'paid';
  const isCustomized = plan.paymentInterval === 'customized';
  const pubTeamId = getPublicTeamId();

  // Update condition for showMasterMenu on SF-2297
  const showMasterMenu =
    AuthStore?.userInfo?.devMode ||
    AuthStore?.userInfo?.role === UserRole.TEAM_OWNER ||
    (isPaid && !pubTeamId);

  const isShowRequestExtensionEnable = isFeatureEnabled(
    FeatureFlag.REQUESTFOREXTENSION
  );

  const showRequestExtension =
    isFree &&
    isShowRequestExtensionEnable &&
    AuthStore.userInfo?.subscriptionPlanStatus === 'expired';

  const isPlanSubscribed = plan.isItCurrentPlanOfUser;
  const { subscriptionInformation } = useSnapshot(BillingStore);

  const isCurrentPlanIsStandardActive =
    subscriptionPlanDetail?.subscriptionCostType === 'PAID' &&
    subscriptionPlanDetail.subscriptionStatus === 'ACTIVE';

  const daysLeft = useMemo(() => {
    if (!isFree) return 0;
    const daysLeft = differenceDays(
      new Date(),
      AuthStore?.userInfo?.subscriptionPlanDetailList?.[0]?.subscriptionEndsAt
    );
    const daysIn2DigitsString = daysLeft.toString().padStart(2, '0');
    return daysIn2DigitsString;
  }, []);

  useEffect(() => {
    if (plan.noOfTeams > 0) {
      setIsCreateTeam(t('servicePlan.subscription.supported'));
    } else {
      setIsCreateTeam(t('servicePlan.subscription.not-supported'));
    }
  }, [i18n.language]);

  useEffect(() => {
    if (plan.isNewSubscriptionAllowed) {
      setDisableSubscriptionButton(false);
    }
  }, []);
  const showPrice = () => {
    if (isPlanSubscribed) {
      if (isFree) {
        return (
          <Box
            sx={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              mt: '2rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '2px',
                alignItems: 'center',
              }}
            >
              {daysLeft?.split('').map((item: string, index: number) => (
                <Typography
                  key={index}
                  sx={{
                    backgroundColor: 'var(--neutral-600)',
                    borderRadius: '4px',
                    color: 'var(--gray-700)',
                    fontSize: '40px',
                    padding: '5px 9px',
                    fontWeight: 700,
                    lineHeight: '44px',
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
            <Typography color={'var(--gray-700)'}>
              {t('servicePlan.subscription.days-remaning')}
            </Typography>
          </Box>
        );
      } else {
        if (!showMasterMenu) {
          return (
            <Typography mt={'45px'}>
              {t('servicePlan.subscription.plan-selected-master')}
            </Typography>
          );
        } else {
          return null;
        }
      }
    }
    if (isCustomized) {
      return (
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={'0.8rem'}
          my={'0.3rem'}
        >
          <img src={PlanEnterprise} alt="plan-enterprise" />
          <Typography
            sx={{
              color: 'var(--gray-50)',
              fontSize: '16px',
              fontWeight: 500,
              lineheight: '24px',
              letterSpacing: '-0.1px',
            }}
          >
            /{t('servicePlan.subscription.customized-price')}
          </Typography>
        </Box>
      );
    } else {
      if (i18next.language === 'en') {
        return (
          <>
            <StyledMoney component={'span'}>${plan.price}</StyledMoney>
            {plan.paymentInterval === 'year' ? ' /yr' : ' /mo'}
          </>
        );
      } else {
        return (
          <StyledMoney
            component={'span'}
            display={'flex'}
            gap={'0.5rem'}
            alignItems={'center'}
          >
            {plan?.price ? (
              <>
                <Typography
                  display={'inline'}
                  variant="h6"
                  color={'var(--gray-50)'}
                >
                  {plan?.paymentInterval === 'year' ? '연' : '월'}
                </Typography>{' '}
                ${plan.price}
              </>
            ) : (
              <>
                <Typography
                  display={'inline'}
                  variant="h6"
                  color={'var(--gray-50)'}
                >
                  월
                </Typography>{' '}
                {plan.price}{' '}
                <Typography
                  display={'inline'}
                  variant="h6"
                  color={'var(--gray-50)'}
                >
                  원
                </Typography>
              </>
            )}
          </StyledMoney>
        );
      }
    }
  };

  const SubscribeButton = () => {
    if (isCustomized) {
      // render contact sale button
      return (
        <LoadingButton
          variant="outlined"
          sx={{
            height: 46,
            color: 'var(--purple-600)',
            border: '2px solid var(--purple-600)',
          }}
          disabled={disableSubscriptionButton}
          onClick={handleContactSale}
        >
          {t('servicePlan.subscription.button.contact-sales')}
        </LoadingButton>
      );
    }
    // render button for free plan // (1)
    if (isFree) {
      if (AuthStore.userInfo?.subscriptionPlanStatus === 'expired') {
        if (!isShowRequestExtensionEnable) {
          return null;
        }
        return (
          <LoadingButton
            sx={{
              height: 36,
              color: 'var(--purple-600)',
            }}
            variant="outlined"
            disabled={disableSubscriptionButton}
            onClick={handleContactSale}
          >
            {t('servicePlan.subscription.button.request-extension')}
          </LoadingButton>
        );
      } else if (isCurrentPlanIsStandardActive) {
        return null;
      } else
        return (
          <LoadingButton
            variant="outlined"
            sx={{
              height: 46,
              color: 'var(--purple-600)',
              border: '2px solid var(--purple-600)',
            }}
            disabled={disableSubscriptionButton}
            onClick={() =>
              handleSubscription(plan.id, subscriptionInformation.teamId)
            }
          >
            {t('servicePlan.subscription.button.get-started')}
          </LoadingButton>
        );
    }
    return (
      // render normal button for other plan
      <>
        <LoadingButton
          sx={{ height: 46 }}
          disabled={disableSubscriptionButton}
          onClick={() =>
            handleSubscription(plan.id, subscriptionInformation.teamId)
          }
        >
          {subscriptionPlanDetail === null
            ? t('servicePlan.subscription.button.get-started')
            : plan.paymentInterval === 'year'
            ? t('servicePlan.subscription.button.switch-yearly')
            : t('servicePlan.subscription.button.switch-monthly')}
        </LoadingButton>
        {subButtonText && (
          <Typography mt="8px" fontSize={'12px'} color={'var(--gray-50)'}>
            {subButtonText}
          </Typography>
        )}
      </>
    );
  };

  return (
    <Box>
      <StyledService>
        <StyledHeader fontWeight={isPlanSubscribed ? 700 : 500}>
          {plan.title}
        </StyledHeader>
        {isPlanSubscribed && (
          <Box mt={'0.5rem'}>
            <Typography
              component={'span'}
              sx={{
                color: '#574EFA',
                padding: '2px 8px',
                fontSize: '13px',
                fontWeight: 500,
                lineHeight: '20px',
                backgroundColor: '#ECEBFF',
              }}
            >
              {t('servicePlan.subscription.active-subscription')}
            </Typography>
          </Box>
        )}
        <Box sx={{ margin: '8px 0 24px 0' }}>{showPrice()}</Box>
        {/*  check if this plan is not subscripted (true) by user
                then show the subscription button */}
        {!isPlanSubscribed ? (
          <Box>
            <SubscribeButton />
          </Box>
        ) : (
          // show invoices and billing button if role is master to navigate to
          // billing detail
          <Box>
            {/* Remove monthly usage on SF-2113 */}
            {/* <Typography
              onClick={moveToMonthlyUsage}
              component={'div'}
              sx={{
                cursor: 'pointer',
                color: '#574EFA',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '20px',
                marginBottom: '1rem',
              }}
            >
              {t('servicePlan.subscription.monthly-usage')}
            </Typography> */}
            {showMasterMenu && (
              <Typography
                onClick={handleInvoices}
                component={'div'}
                sx={{
                  cursor: 'pointer',
                  color: '#574EFA',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  mt: '22px',
                }}
              >
                {t('servicePlan.subscription.invoices-and-billing')}
              </Typography>
            )}
          </Box>
        )}
      </StyledService>
      {/* these code below render base on plan type 
        if plan is enterprise then the information will be custom
        else show default value in response*/}
      <StyledItem>
        {isCustomized ? (
          <Typography>{t('servicePlan.subscription.supported')}</Typography>
        ) : (
          <Typography>{isCreateTeam}</Typography>
        )}
      </StyledItem>
      <StyledItem>
        {isCustomized ? (
          <Typography>{isCustom}</Typography>
        ) : (
          <Typography
            fontWeight={700}
          >{`${plan.cloudStorageSize}GB`}</Typography>
        )}
      </StyledItem>
      <StyledItem>
        {isCustomized ? (
          <Typography>{isCustom}</Typography>
        ) : (
          <Typography
            fontWeight={700}
          >{`${plan.wtrCapacitySize}GB`}</Typography>
        )}
      </StyledItem>
      <StyledItem>
        {isCustomized ? (
          <Typography>{isCustom}</Typography>
        ) : (
          <Typography
            fontWeight={700}
          >{`${plan.wtrCodeMinValue}-${plan.wtrCodeMaxValue}`}</Typography>
        )}
      </StyledItem>
      <StyledItem>
        {isCustomized ? (
          <Typography>{isCustom}</Typography>
        ) : (
          <Typography fontWeight={700}>
            {t('servicePlan.subscription.number-of-downloads', {
              number: plan.noOfDownloadsPerOrder ?? 0,
            })}
          </Typography>
        )}
      </StyledItem>
      <StyledItem>
        {isCustomized ? (
          <Typography>{isCustom}</Typography>
        ) : (
          <Typography>
            <b>
              {t('servicePlan.subscription.number-of-piracy-detection', {
                number: plan.noOfPdAllowed,
              })}
            </b>{' '}
            {isFree
              ? t('servicePlan.subscription.expert-detection')
              : t('servicePlan.subscription.1-expert-detection')}
          </Typography>
        )}
      </StyledItem>
      <StyledItem>
        {isFree && (
          <Typography>{t('servicePlan.subscription.not-supported')}</Typography>
        )}
        {isCustomized && (
          <Typography>
            {t('servicePlan.subscription.custom-pricing')}
          </Typography>
        )}
        {plan.cloudStorageAddOnSize > 0 && plan.cloudStorageAddOnPrice > 0 && (
          <Box sx={{ marginBottom: '1rem' }}>
            <Box sx={{ fontWeight: 700 }}>
              {t('servicePlan.subscription.cloud-storage')}
            </Box>
            <Box>
              {`${plan.cloudStorageAddOnSize}GB: $${plan.cloudStorageAddOnPrice}`}
            </Box>
          </Box>
        )}
        {plan.wtrCapacityAddOnSize > 0 && plan.wtrCapacityAddOnPrice > 0 && (
          <Box sx={{ marginBottom: '1rem' }}>
            <Box sx={{ fontWeight: 700 }}>
              {t('servicePlan.subscription.cloud-storage')}
            </Box>
            <Box>
              {`${plan.wtrCapacityAddOnSize}GB: $${plan.wtrCapacityAddOnPrice}`}
            </Box>
          </Box>
        )}
      </StyledItem>
    </Box>
  );
};

export default PlanView;
