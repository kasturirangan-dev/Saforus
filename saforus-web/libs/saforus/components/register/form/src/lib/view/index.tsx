import React, { useEffect } from 'react';
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
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';

import { RegisterProps } from '../interface';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';
import SelectCountry from '@web-workspace/shared/components/widgets/select-country';
import { PasswordRequirements } from '@web-workspace/saforus/common/views';
import { Controller } from 'react-hook-form';
import { pxToVw } from '@web-workspace/saforus/common/utils';

const StyledLink = styled(Link)(({ theme }) => ({
  color:
    theme.palette.mode === 'light' ? 'var(--gray-25)' : 'var(--neutral-200)',
  textDecorationColor:
    theme.palette.mode === 'light' ? 'var(--gray-25)' : 'var(--neutral-200)',
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
  countries,
  setValue,
  getValues,
  watch,
  country,
  disabledCompany,
  disabledCountry,
  disabledEmail,
  control,
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
      setIsMore14(true);
      setValue('isMore14', true);
      setAgreementCondition(true);
      setValue('agreementCondition', true);
      setSubscribedEmailUpdate(true);
      setValue('hasSubscribedEmailUpdate', true);
    }
    setCheckedAll(!checkedAll);
  };

  useEffect(() => {
    setCheckedAll(isMore14 && agreeCondition && subscribedEmail);
  }, [isMore14, agreeCondition, subscribedEmail]);

  useEffect(() => {
    setWarningName(watch('name')?.length > 20);
  }, [watch('name')]);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

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
          padding: { xs: pxToVw(['0rem', '1rem']), sm: pxToVw(['0rem', '1.5rem']), md: '0' },
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
              color:
                theme.palette.mode === 'light'
                  ? 'var(--gray-700)'
                  : 'var(--neutral-200)',
            }}
          >
            {t('page-register.join-us')}
          </Typography>

          <Input
            style={{ width: '100%', marginTop: pxToVw('2rem') }}
            label={`${t('page-register.your-name')}*`}
            placeholder={t('page-register.placeholder-yourname')}
            {...register('name')}
            errorMessage={errors.name?.message && t(`${errors.name?.message}`)}
            warningMessage={warningName ? t('error-message.long-name') : null}
          />

          <Input
            style={{ width: '100%', marginTop: pxToVw('0.5rem') }}
            label={`${t('common.email-address')}*`}
            placeholder={t('page-register.placeholder-email3')}
            {...register('email')}
            disabled={disabledEmail}
            errorMessage={
              errors.email?.message && t(`${errors.email?.message}`)
            }
          />

          <Input
            style={{ width: '100%', marginTop: pxToVw('0.5rem') }}
            label={`${t('common.password')}*`}
            placeholder={t('page-register.placeholder-pass2')}
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            errorMessage={
              errors.password?.message && t(`${errors.password?.message}`)
            }
            showErrorMsg={false}
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
            label={`${t('page-register.confirm-pass')}*`}
            placeholder={t('page-register.placeholder-confirm-pass')}
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
            label={`${t('page-register.company-name')}*`}
            placeholder={t('page-register.placeholder-companyname')}
            {...register('company')}
            disabled={disabledCompany}
            errorMessage={
              errors.company?.message && t(`${errors.company?.message}`)
            }
          />

          {/* {disabledCountry && (
            <Input
              style={{ width: '100%', marginTop: pxToVw('0.5rem') }}
              label={`${t('page-register.country-of-incorporation')}*`}
              placeholder={`${t('page-register.placeholder-country')}`}
              disabled={disabledCountry}
              value={country?.label}
              errorMessage={
                errors.country?.message && t(`${errors.country?.message}`)
              }
            />
          )}
          {!disabledCountry && (
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <SelectCountry
                  {...field}
                  disabled={disabledCountry}
                  label={`${t('page-register.country-of-incorporation')}*`}
                  options={countries}
                  placeholder={t('page-register.placeholder-country')}
                  inputStyle={{
                    width: '100%',
                  }}
                  errorMessage={
                    errors.country?.message && t(`${errors.country?.message}`)
                  }
                  onChange={(event, newValue) => {
                    setValue('countryCode', newValue?.countryCode || '');
                    setValue('shortName', newValue?.shortName || '');
                    setValue('country', newValue?.country || '');
                  }}
                />
              )}
            />
          )}  */}

          <Input
            style={{ width: '100%', marginTop: pxToVw('0.5rem'), padding: '0' }}
            label={`${t('page-register.mobile-number')}*`}
            placeholder={t('page-register.placeholder-mobilenumber')}
            {...register('mobileNumber')}
            disabled={disabledCompany}
            errorMessage={
              errors.mobileNumber?.message &&
              t(`${errors.mobileNumber?.message}`)
            }
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
              {t('page-register.agree-all')}
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
                {t('page-register.more-14')}
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
                      {t('page-register.agree-condition')}
                    </StyledLink>
                    {` & `}
                    <StyledLink
                      href={getEnvVar('VITE_PRIVACY_URL')}
                      target="_blank"
                      rel="noopener"
                      underline="always"
                    >
                      {t('page-register.agree-policy')}
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
                      {t('page-register.agree-condition')}
                    </StyledLink>
                    {' 및 '}
                    <StyledLink
                      href={getEnvVar('VITE_PRIVACY_KO_URL')}
                      target="_blank"
                      rel="noopener"
                      underline="always"
                    >
                      {t('page-register.agree-policy')}
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
              sx={{ display: 'flex', flexDirection: 'column', pt: pxToVw('0.3rem') }}
            >
              <Typography
                variant="body2"
                fontWeight={500}
                color={'var(--gray-25)'}
              >
                {t('page-register.consent-email')}
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
              {t('page-register.has-account')}
            </Typography>
            <Link
              onClick={() => {
                navigate(ROUTES.LOGIN.path);
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
