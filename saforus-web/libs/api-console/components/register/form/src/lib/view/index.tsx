import React, { useEffect, useMemo } from 'react';
import {
  Box,
  Checkbox,
  FormHelperText,
  IconButton,
  Link,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Input from '@web-workspace/shared/components/widgets/input';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';

import { RegisterProps } from '../interface';
import { useNavigate } from 'react-router-dom';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';
import { PasswordRequirements } from '@web-workspace/api-console/common/views';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import { API_ROUTES } from '@web-workspace/api-console/constants/routes';

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'var(--gray-25)',
  textDecorationColor: 'var(--gray-25)',
  textUnderlineOffset: pxToVw('4px'),
  fontSize: pxToVw('14px'),
  fontWeight: '500',
  paddingLeft: pxToVw('0.1rem'),
  lineHeight: pxToVw('20px'),
  letterSpacing: pxToVw('-0.1px'),
}));

const RegisterFormView = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  loading,
  setValue,
  watch,
  control,
  clearErrors,
}: RegisterProps) => {
  const [checkedAll, setCheckedAll] = React.useState(false);
  const [isMore14, setIsMore14] = React.useState(false);
  const [agreeCondition, setAgreementCondition] = React.useState(false);
  const [subscribedEmail, setSubscribedEmailUpdate] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRePassword, setShowRePassword] = React.useState(false);
  const [warningName, setWarningName] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseDownRePassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const setCheckedAllValue = () => {
    if (checkedAll) {
      setValue('isMore14', false);
      setIsMore14(false);
      setValue('agreementCondition', false);
      setAgreementCondition(false);
      setValue('hasSubscribedEmailUpdate', false);
      setSubscribedEmailUpdate(false);
    } else {
      setValue('isMore14', true);
      setIsMore14(true);
      clearErrors('isMore14'); // Clear errors for 'isMore14'

      setValue('agreementCondition', true);
      setAgreementCondition(true);
      clearErrors('agreementCondition'); // Clear errors for 'agreementCondition'

      setValue('hasSubscribedEmailUpdate', true);
      setSubscribedEmailUpdate(true);
      clearErrors('hasSubscribedEmailUpdate'); // Clear errors for 'hasSubscribedEmailUpdate'
    }
    setCheckedAll(!checkedAll);
  };

  useEffect(() => {
    setCheckedAll(isMore14 && agreeCondition && subscribedEmail);
  }, [isMore14, agreeCondition, subscribedEmail]);

  useEffect(() => {
    setWarningName(watch('accountName')?.length > 20);
  }, [watch('accountName')]);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const formValues = watch();
  const isFormValid = useMemo(() => {
    const requiredFieldsFilled =
      formValues.accountName &&
      formValues.email &&
      formValues.password &&
      formValues.confirmPassword &&
      formValues.phone;

    const noErrors = Object.keys(errors).length === 0;
    const allCheckboxesChecked = isMore14 && agreeCondition;

    return requiredFieldsFilled && noErrors && allCheckboxesChecked;
  }, [formValues, errors, isMore14, agreeCondition]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        margin: 'auto auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component={'form'}
        sx={{
          width: { xs: '100%', sm: '80%', md: '60%' },
          padding: {
            xs: pxToVw(['0rem', '1rem']),
            sm: pxToVw(['0rem', '1.5rem']),
            md: '0',
          },
          mt: pxToVw('2rem'),
          mb: pxToVw('2rem'),
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant="h4"
            fontWeight={500}
            sx={{
              color: 'var(--gray-700)',
            }}
          >
            {t('page-register.join-us')}
          </Typography>

          <Input
            style={{ width: '100%', marginTop: pxToVw('2rem') }}
            label={`${t('apiRegister.form.your-name')}*`}
            placeholder={t('apiRegister.form.placeholder-yourname')}
            {...register('accountName')}
            errorMessage={
              errors.accountName?.message && t(`${errors.accountName?.message}`)
            }
            warningMessage={warningName ? t('error-message.long-name') : null}
          />

          <Input
            style={{ width: '100%', marginTop: pxToVw('0.5rem') }}
            label={`${t('apiRegister.form.email')}*`}
            placeholder={t('apiRegister.form.placeholder-email3')}
            {...register('email')}
            errorMessage={
              errors.email?.message && t(`${errors.email?.message}`)
            }
          />

          <Input
            style={{ width: '100%', marginTop: pxToVw('0.5rem') }}
            label={`${t('apiRegister.form.password')}*`}
            placeholder={t('apiRegister.form.placeholder-pass2')}
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            errorMessage={
              errors.password?.message && t(`${errors.password?.message}`)
            }
            showErrorMsg={true}
            icon={
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                sx={{
                  padding: pxToVw('8px'),
                  marginRight: pxToVw('-12px'),
                }}
              >
                {showPassword ? (
                  <Visibility sx={{ color: 'var(--gray-25)' }} />
                ) : (
                  <VisibilityOff sx={{ color: 'var(--gray-25)' }} />
                )}
              </IconButton>
            }
          />

          <PasswordRequirements
            sx={{ mt: pxToVw('1.5rem'), mb: pxToVw('1rem'), width: '100%' }}
            password={watch('password')}
            error={Boolean(errors.password?.message)}
          />

          <Input
            style={{ width: '100%', marginTop: pxToVw('0.5rem') }}
            label={`${t('apiRegister.form.confirm-pass')}*`}
            placeholder={t('apiRegister.form.placeholder-confirm-pass')}
            {...register('confirmPassword')}
            type={showRePassword ? 'text' : 'password'}
            errorMessage={
              errors.confirmPassword?.message &&
              t(`${errors.confirmPassword?.message}`)
            }
            icon={
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowRePassword}
                onMouseDown={handleMouseDownRePassword}
                edge="end"
              >
                {showRePassword ? (
                  <Visibility sx={{ color: 'var(--gray-25)' }} />
                ) : (
                  <VisibilityOff sx={{ color: 'var(--gray-25)' }} />
                )}
              </IconButton>
            }
          />

          <Input
            style={{ width: '100%', marginTop: pxToVw('0.5rem'), padding: '0' }}
            label={`${t('apiRegister.form.company-name')}`}
            placeholder={t('apiRegister.form.placeholder-companyname')}
            {...register('companyName')}
            errorMessage={
              errors.companyName?.message && t(`${errors.companyName?.message}`)
            }
          />

          <Input
            style={{ width: '100%', marginTop: pxToVw('0.5rem'), padding: '0' }}
            label={`${t('apiRegister.form.mobile-number')}*`}
            placeholder={t('apiRegister.form.placeholder-mobilenumber')}
            {...register('phone')}
            errorMessage={
              errors.phone?.message && t(`${errors.phone?.message}`)
            }
            maxLength={16}
            onInput={(e) => {
              let value = e.target.value.replace(/[^0-9+]/g, '');

              if (value.startsWith('+')) {
                value = '+' + value.slice(1, 16); // Keep '+' and limit digits to 15
              } else {
                value = value.slice(0, 15);
              }
              e.target.value = value;
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <Checkbox
              onClick={() => setCheckedAllValue()}
              checked={checkedAll}
              icon={<Icon name="square_uncheck" size={pxToVw(20)} />}
              checkedIcon={<Icon name="square_checked" size={pxToVw(20)} />}
              sx={{
                color:
                  theme.palette.mode === 'light'
                    ? 'var(--neutral-700)'
                    : 'var(--gray-300)',
                '&.Mui-checked': {
                  color: 'var(--blue-500)',
                },
              }}
            />
            <Typography
              variant="body2"
              color={'var(--gray-700)'}
              fontWeight={500}
              sx={{ mt: pxToVw('0.5rem') }}
            >
              {t('apiRegister.form.agree-all')}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
              ml: pxToVw('2rem'),
            }}
          >
            <Checkbox
              onClick={() => {
                setIsMore14((value) => !value);
              }}
              checked={isMore14}
              icon={<Icon name="square_uncheck" size={pxToVw(20)} />}
              checkedIcon={<Icon name="square_checked" size={pxToVw(20)} />}
              sx={{
                color: errors.agreementCondition?.message
                  ? 'var(--red-600)'
                  : theme.palette.mode === 'light'
                  ? 'var(--neutral-700)'
                  : 'var(--gray-300)',
                '&.Mui-checked': {
                  color: 'var(--blue-500)',
                },
              }}
              {...register('isMore14')}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                pt: pxToVw('0.3rem'),
              }}
            >
              <Typography
                variant="body2"
                color={'var(--gray-25)'}
                fontWeight={500}
              >
                {t('apiRegister.form.more-14')}
              </Typography>
              <FormHelperText
                sx={{
                  width: '100%',
                  fontSize: pxToVw('14px'),
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: pxToVw('20px'),
                  letterSpacing: pxToVw('-0.1px'),
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'var(--red-600)',
                }}
              >
                {errors.isMore14?.message
                  ? t(`${errors.isMore14?.message}`)
                  : ' '}
              </FormHelperText>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
              ml: pxToVw('2rem'),
            }}
          >
            <Checkbox
              onClick={() => {
                setAgreementCondition((value) => !value);
              }}
              checked={agreeCondition}
              icon={<Icon name="square_uncheck" size={pxToVw(20)} />}
              checkedIcon={<Icon name="square_checked" size={pxToVw(20)} />}
              sx={{
                color: errors.agreementCondition?.message
                  ? 'var(--red-600)'
                  : theme.palette.mode === 'light'
                  ? 'var(--neutral-700)'
                  : 'var(--gray-300)',
                '&.Mui-checked': {
                  color: 'var(--blue-500)',
                },
              }}
              {...register('agreementCondition')}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                pt: pxToVw('0.3rem'),
              }}
            >
              {i18next.language === 'en' && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={'var(--gray-25)'}
                  >
                    {`[Required] Agree to `}
                    <StyledLink
                      href={getEnvVar('VITE_TERMS_URL')}
                      target="_blank"
                      underline="always"
                    >
                      {t('apiRegister.form.agree-condition')}
                    </StyledLink>
                    {` & `}
                    <StyledLink
                      href={getEnvVar('VITE_PRIVACY_URL')}
                      target="_blank"
                      rel="noopener"
                      underline="always"
                    >
                      {t('apiRegister.form.agree-policy')}
                    </StyledLink>
                  </Typography>
                </Box>
              )}
              {i18next.language === 'ko' && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={'var(--gray-25)'}
                  >
                    {`[필수] `}
                    <StyledLink
                      href={getEnvVar('VITE_TERMS_KO_URL')}
                      target="_blank"
                      underline="always"
                    >
                      {t('apiRegister.form.agree-condition')}
                    </StyledLink>
                    {' 및 '}
                    <StyledLink
                      href={getEnvVar('VITE_PRIVACY_KO_URL')}
                      target="_blank"
                      rel="noopener"
                      underline="always"
                    >
                      {t('apiRegister.form.agree-policy')}
                    </StyledLink>
                    {` 동의`}
                  </Typography>
                </Box>
              )}
              <FormHelperText
                sx={{
                  width: '100%',
                  fontSize: pxToVw('14px'),
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: pxToVw('20px'),
                  letterSpacing: pxToVw('-0.1px'),
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'var(--red-600)',
                }}
              >
                {errors.agreementCondition?.message
                  ? t(`${errors.agreementCondition?.message}`)
                  : ' '}
              </FormHelperText>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
              ml: pxToVw('2rem'),
            }}
          >
            <Checkbox
              onClick={() => {
                setSubscribedEmailUpdate(!subscribedEmail);
              }}
              checked={subscribedEmail}
              icon={<Icon name="square_uncheck" size={pxToVw(20)} />}
              checkedIcon={<Icon name="square_checked" size={pxToVw(20)} />}
              sx={{
                color: errors.hasSubscribedEmailUpdate?.message
                  ? 'var(--red-600)'
                  : theme.palette.mode === 'light'
                  ? 'var(--neutral-700)'
                  : 'var(--gray-300)',
                '&.Mui-checked': {
                  color: 'var(--blue-500)',
                },
              }}
              {...register('hasSubscribedEmailUpdate')}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                pt: pxToVw('0.3rem'),
              }}
            >
              <Typography
                variant="body2"
                fontWeight={500}
                color={'var(--gray-25)'}
              >
                {t('apiRegister.form.consent-email')}
              </Typography>
            </Box>
          </Box>

          <LoadingButton
            fullWidth
            sx={{
              width: '100%',
              paddingTop: pxToVw('0.75rem'),
              paddingBottom: pxToVw('0.75rem'),
              marginTop: pxToVw('1rem'),
            }}
            disabled={!isFormValid}
            loading={loading}
            type="submit"
          >
            {t('button.sign-up')}
          </LoadingButton>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'self-start',
              width: '100%',
              marginTop: pxToVw('1rem'),
            }}
          >
            <Typography
              sx={{
                color: 'var(--gray-50)',
                fontSize: pxToVw('1rem'),
                fontWeight: '400',
                lineHeight: pxToVw('24px'),
                letterSpacing: pxToVw('-0.1px'),
              }}
            >
              {t('apiRegister.form.has-account')}
            </Typography>
            <Link
              onClick={() => {
                navigate(API_ROUTES.LOGIN.path);
              }}
              underline="hover"
              target="_self"
              rel="noopener"
              sx={{
                fontSize: pxToVw('15px'),
                color: 'var(--purple-500)',
                fontWeight: '600',
                lineHeight: pxToVw('22px'),
                letterSpacing: pxToVw('-0.1px'),
                marginLeft: pxToVw('1rem'),
                textUnderlineOffset: pxToVw('4px'),
                cursor: 'pointer',
              }}
            >
              {t('button.log-in')}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(RegisterFormView);
