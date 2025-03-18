import styled from '@emotion/styled';
import {
  Box,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
} from '@mui/material';
import { useSnapshot } from 'valtio';
import { MultiDrmCreateOrderStore } from '@web-workspace/saforus/components/multi-drm/create-order/data';
import CreateOrderStepsComponent from '@web-workspace/saforus/components/multi-drm/create-order/configs';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function MultiDrmCreateOrderStepper() {
  const { currentStep } = useSnapshot(MultiDrmCreateOrderStore);

  useEffect(() => {
    // scroll here
  }, [currentStep]);

  const CustomisedConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: 'var(--purple-300)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: 'var(--purple-300)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      position: 'absolute',
      height: '0px',
      left: '0px',
      right: '-0.33px',
      top: 'calc(50 % - 0px / 2)',
      border: '2px dashed #DAE0E6',
    },
  }));

  const steps = Object.keys(CreateOrderStepsComponent);
  const activeStep = steps.indexOf(currentStep);
  const { t } = useTranslation();
  const getColor = (index: number) => {
    const defaultColor = 'var(--gray-50)';
    const activeColor = 'var(--purple-600)';
    const completedColor = 'var(--base-white)';
    if (index > activeStep) {
      return defaultColor;
    } else if (index === activeStep) {
      return activeColor;
    } else {
      return completedColor;
    }
  };

  return (
    <Box
      id={'stepper'}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        gap: '1.5rem',
        background: 'var(--base-white)',
        border: '1px solid var(--neutral-750)',
        borderRadius: '0.5rem',
      }}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomisedConnector />}
      >
        {Object.values(CreateOrderStepsComponent).map((element, index) => {
          const { icon: IconComponent } = element;
          return (
            <Step
              key={element.label}
              sx={{
                '.MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
                  marginTop: '0.5rem',
                  fontWeight: '600',
                },
                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                  {
                    color: 'var(--purple-600)', // Just text label (COMPLETED)
                  },
                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                  {
                    color: 'var(--purple-600)', // Just text label (ACTIVE)
                  },
              }}
            >
              <StepLabel
                icon={
                  <Box
                    sx={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '0px',
                      width: '2rem',
                      height: '2rem',
                      background:
                        activeStep > index
                          ? 'var(--purple-600)'
                          : 'var(--base-white)',
                      border:
                        activeStep >= index
                          ? '1px solid var(--purple-600)'
                          : '1px solid var( --neutral-750)',
                      borderRadius: '20px',
                      flex: 'none',
                      order: 0,
                      flexGrow: 0,
                    }}
                  >
                    <IconComponent fill={getColor(index)} />
                  </Box>
                }
              >
                {t(element.label)}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}

export default MultiDrmCreateOrderStepper;
