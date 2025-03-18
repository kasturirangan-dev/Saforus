import React from 'react';
import { Box, styled, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiButton from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import Input from '@web-workspace/shared/components/widgets/input';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import style from './index.module.scss';
import { ResetPasswordProps } from '../interface';
import Icon from '@web-workspace/shared/components/widgets/icon';

const Text = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
  fontSize: '36px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '44px',
  letterSpacing: '-0.02em',
  textAlign: 'center',
}));

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  fontSize: 15,
  fontWeight: '600',
  lineHeight: '22px',
  textTransform: 'none',
  color: 'var(--purple-500)',
}));

const ResetPasswordFormView = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  loading,
}: ResetPasswordProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box component={'form'} width="424px">
      <Box display="flex" flexDirection="column" gap={6}>
        <Box display="flex" flexDirection="column" gap={2} marginBottom={2}>
          <Text>{t('page-reset.reset-password')}</Text>
          <Text
            sx={{
              fontSize: '1.125rem',
              lineHeight: '1.625rem',
              color:
                theme.palette.mode === 'light'
                  ? 'var(--gray-50)'
                  : 'var(--neutral-800)',
              letterSpacing: '-0.1px',
              fontWeight: '400',
            }}
          >
            {t('page-reset.reset-pass-description')}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Input
            label={`${t('common.email-address')}*`}
            placeholder={t('common.placeholder-email2')}
            className={style.input}
            {...register('email')}
            errorMessage={
              errors.email?.message && t(`${errors.email?.message}`)
            }
            icon={
              <Icon
                size={20}
                name="mail"
                color={
                  theme.palette.mode === 'light'
                    ? 'var(--gray-50)'
                    : 'var(--neutral-800)'
                }
              />
            }
          />

          <LoadingButton
            sx={{
              width: '100%',
              paddingTop: ' 0.75rem',
              paddingBottom: '0.75rem',
            }}
            type="submit"
            loading={loading}
            onClick={handleSubmit(onSubmit)}
          >
            {t('page-reset.request-reset')}
          </LoadingButton>
        </Box>
        <StyledButton
          onClick={() => {
            navigate(ROUTES.LOGIN.path);
          }}
          variant={'text'}
          sx={{ color: 'var(--purple-400)' }}
        >
          <Icon
            iconStyle={{ marginRight: '6px' }}
            name="arrow_left"
            color={
              theme.palette.mode === 'light'
                ? 'var(--purple-400)'
                : 'var(--purple-400)'
            }
          />
          {t('page-reset.back-to-login')}
        </StyledButton>
      </Box>
    </Box>
  );
};

export default React.memo(ResetPasswordFormView);
