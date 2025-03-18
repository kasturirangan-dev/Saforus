import { useState } from 'react';
import {
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  styled,
  Grid,
  FormControl,
  Alert,
  FormHelperText,
  Checkbox,
} from '@mui/material';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import Icon from '@web-workspace/shared/components/widgets/icon';
import MuiButton from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { Link, useNavigate } from 'react-router-dom';
import RightArrow from '../assets/right-arrow.svg';
import WarningIcon from '../assets/warning.svg';
import FileIcon from '../assets/file.svg';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';
import Input from '@web-workspace/shared/components/widgets/input';
import { Controller } from 'react-hook-form';
import { useCreateInquiryData } from '../data';
import CommonStore from '@web-workspace/saforus/common/data';
import FileUpload from '@web-workspace/shared/components/widgets/file-upload';
import Button from '@web-workspace/shared/components/widgets/button';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { formatBytes } from '@web-workspace/saforus/common/utils';
import { TOption } from '@web-workspace/saforus/common/model';

const StyledLink = styled(MuiLink)(({ theme }) => ({
  color:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
  textDecorationColor:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
  textUnderlineOffset: '4px',
  fontSize: '14px',
  fontWeight: '500',
  paddingLeft: '0.1rem',
  lineHeight: '20px',
  letterSpacing: '-0.1px',
}));

const StyledAlert = styled(Alert)`
  background: #f9f8fb;
  border: 1.5px solid #648ef7;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.04);
  border-radius: 5px;
  padding: 13px 24px;

  & .MuiAlert-message {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 0;
    overflow: hidden;
  }

  & .MuiAlert-icon {
    padding: 0;
    margin-right: 1rem;
  }
`;

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  fontSize: 30,
  fontWeight: '600',
  lineHeight: '30px',
  textTransform: 'none',
  color: '#EFEFF1',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const CustomLabel = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '-0.1px',
  marginBottom: '6px',
  transition: theme.transitions.create(['color']),
  '&.Mui-disabled': {
    borderColor: 'var(--neutral-700)',
  },
  '&.Mui-focused': {
    borderColor: 'var(--purple-600)',
  },
}));

export function CreateInquiryAuth() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { inquiryTypeList: categories } = useSnapshot(CommonStore);

  const [alertFile, setShowAlertFile] = useState(false);
  const [agree, setAgree] = useState(false);

  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    control,
    getValues,
    setValue,
    isLoading,
  } = useCreateInquiryData();

  const [files, setFiles] = useState<File[]>([]);

  const onFilesAdded = (acceptedFiles: File[]) => {
    setValue('files', acceptedFiles);
    setFiles(acceptedFiles);
  };

  const onHandleUploadFilesError = (result: boolean) => {
    setShowAlertFile(result);
  };

  const linkPrivacyPolicy = getEnvVar(
    i18next.language === 'en' ? 'VITE_PRIVACY_URL' : 'VITE_PRIVACY_KO_URL'
  );

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Backdrop
        open={isLoading}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          color: 'var(--main-brand)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <Typography variant="h5" color={'var(--gray-900)'}>
          {t('help.create-inquiry.title')}
        </Typography>
      </Box>
      <Typography
        sx={{ mt: '12px' }}
        variant="subtitle2"
        color={'var(--gray-50, #5F6D7E)'}
      >
        {t('help.create-inquiry.desc-1')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          backgroundColor: 'var(--base-white)',
          mt: '1.5rem',
          padding: '1.5rem',
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={12}
        >
          <Grid item xs={8}>
            <Box
              component={'form'}
              sx={{ width: '100%' }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl sx={{ width: '100%' }}>
                <Input
                  style={{ width: '100%' }}
                  label={`${t('help.create-inquiry.title-inquiry')}*`}
                  placeholder={`${t(
                    'help.create-inquiry.title-inquiry-placeholder'
                  )}`}
                  {...register('title')}
                  errorMessage={
                    errors.title?.message && `${t(`${errors.title?.message}`)}`
                  }
                />

                <Box
                  sx={{
                    width: '100%',
                    flexDirection: 'row',
                    display: 'flex',
                    gap: '1.5rem',
                  }}
                >
                  <Input
                    style={{ width: '100%' }}
                    label={`${t('common.email-address')}*`}
                    placeholder={`${t('page-register.placeholder-email3')}`}
                    {...register('email')}
                    disabled={true}
                    errorMessage={
                      errors.email?.message &&
                      `${t(`${errors.email?.message}`)}`
                    }
                  />
                  <Input
                    style={{ width: '100%' }}
                    fullWidth
                    label={`${t('help.create-inquiry.company')}*`}
                    {...register('company')}
                    disabled={true}
                    errorMessage={
                      errors.email?.message &&
                      `${t(`${errors.email?.message}`)}`
                    }
                  />
                </Box>
                {categories.length > 0 && (
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        title={`${t('help.my-inquiries.category')}`}
                        options={categories.filter((e) => e.value !== 'ALL')}
                        // sx={{ width: '100%' }}
                        placeholder={`${t(
                          'help.create-inquiry.category-placeholder'
                        )}`}
                        inputStyle={{
                          width: '100%',
                        }}
                        onChange={(event, newValue) =>
                          field.onChange(newValue?.value || '')
                        }
                        errorMessage={
                          errors.category?.message &&
                          `${t(`${errors.category?.message}`)}`
                        }
                      />
                    )}
                  />
                )}
                {/* <Controller
                  name={'category'}
                  control={control}
                  render={({ field }) => (
                    <FormControl error={!!errors[field.name]}>
                      <CustomLabel>
                        {t('help.create-inquiry.category')}
                      </CustomLabel>
                      <Select
                        {...field}
                        value={getValues('category')}
                        sx={{ width: '100%', height: 40 }}
                        onChange={(event: SelectChangeEvent) => {
                          // field.onChange(event.target.value || null);
                          setValue('category', event.target.value);
                        }}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            test
                          </Box>
                        )}
                        // renderValue={
                        //   isNotEmpty(getValues('category')) ? (
                        //     <Typography
                        //       variant="body1"
                        //       color={'var(--gray-50)'}
                        //     >
                        //       Answer
                        //     </Typography>
                        //   ) : undefined
                        // }
                      >
                        {categories?.map((el) => {
                          if (el.value === 'ALL') return null;

                          return (
                            <MenuItem key={el.value} value={el.value}>
                              {el.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText
                        sx={{
                          width: '100%',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          lineHeight: '20px',
                          letterSpacing: '-0.1px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: 'var(--red-600)',
                        }}
                      >
                        {errors.category?.message
                          ? t(`${errors.category?.message}`)
                          : ' '}
                      </FormHelperText>
                    </FormControl>
                  )}
                /> */}

                <Input
                  style={{ width: '100%', marginTop: '1.5rem' }}
                  inputStyle={{ height: 'auto' }}
                  multiline
                  rows={10}
                  label={`${t('help.create-inquiry.content')}*`}
                  placeholder={`${t(
                    'help.create-inquiry.content-placeholder'
                  )}`}
                  {...register('content')}
                  errorMessage={
                    errors.content?.message &&
                    `${t(`${errors.content?.message}`)}`
                  }
                />

                <Box sx={{ width: '100%', mt: '1.5rem' }}>
                  <FileUpload
                    onFilesAdded={onFilesAdded}
                    multiple={false}
                    maxSize={30 * 1024 * 1024}
                    onHandleError={onHandleUploadFilesError}
                  />
                </Box>

                {files.map((file, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '1rem',
                        borderRadius: '5px',
                        border: '1px solid var(--neutral-600, #EAEBF0)',
                        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.04)',
                        marginTop: '0.5rem',
                      }}
                    >
                      <img
                        src={FileIcon}
                        alt="file"
                        title="file"
                        width={48}
                        height={48}
                        loading="lazy"
                      />
                      <Box sx={{ ml: '1rem' }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={500}
                          color={'var(--gray-700, #272D37)'}
                        >
                          {file.name}
                        </Typography>
                        <Typography
                          color={'var(--gray-50, #5F6D7E)'}
                          variant="body2"
                        >
                          {formatBytes(file.size, 1)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}

                {alertFile && (
                  <StyledAlert
                    sx={{
                      marginTop: '1.5rem',
                      border: '1.5px solid #FEB8AE',
                      backgroundColor: 'var(--red-50)',
                    }}
                    severity="error"
                    icon={
                      <img
                        src={WarningIcon}
                        alt="Warning"
                        title="Warning"
                        width={20}
                        height={22}
                        loading="lazy"
                      />
                    }
                  >
                    {t('error-message.max-file-length')}
                  </StyledAlert>
                )}

                <Controller
                  name="share"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        mt: '1.5rem',
                      }}
                    >
                      <Checkbox
                        onClick={() => {
                          setValue('share', !field.value);
                        }}
                        icon={<Icon name="square_uncheck" size={20} />}
                        checkedIcon={<Icon name="square_checked" size={20} />}
                        sx={{
                          color: 'var(--neutral-700)',
                          '&.Mui-checked': {
                            color: 'var(--blue-500)',
                          },
                        }}
                        {...field}
                        checked={field.value}
                      />
                      <Box
                        onClick={() => {
                          setValue('share', !field.value);
                        }}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          color={'var(--gray-700)'}
                        >
                          {t('help.create-inquiry.share-with-team')}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    width: '100%',
                    mt: '1rem',
                  }}
                >
                  <Checkbox
                    onClick={() => {
                      setAgree((prevAgree) => {
                        setValue('agreement', !prevAgree);
                        return !prevAgree;
                      });
                    }}
                    checked={agree}
                    icon={<Icon name="square_uncheck" size={20} />}
                    checkedIcon={<Icon name="square_checked" size={20} />}
                    sx={{
                      color: errors.agreement?.message
                        ? 'var(--red-600)'
                        : 'var(--neutral-700)',
                      '&.Mui-checked': {
                        color: 'var(--blue-500)',
                      },
                    }}
                    {...register('agreement')}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      pt: '0.5rem',
                    }}
                  >
                    <StyledLink
                      href={linkPrivacyPolicy}
                      target="_blank"
                      rel="noopener"
                      underline="always"
                    >
                      {t('help.create-inquiry.agreement')}
                    </StyledLink>
                    <FormHelperText
                      sx={{
                        width: '100%',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '20px',
                        letterSpacing: '-0.1px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: 'var(--red-600)',
                      }}
                    >
                      {errors.agreement?.message
                        ? t(`${errors.agreement?.message}`)
                        : ' '}
                    </FormHelperText>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '0.5rem',
                    marginTop: '1.5rem',
                    width: '100%',
                  }}
                >
                  <Button
                    onClick={() => navigate(-1)}
                    fullWidth
                    color="secondary"
                    sx={{ height: 46 }}
                  >
                    {t('button.cancel')}
                  </Button>
                  <LoadingButton
                    fullWidth
                    sx={{ height: 46 }}
                    color="primary"
                    loading={isLoading}
                    type="submit"
                  >
                    {t('button.submit')}
                  </LoadingButton>
                </Box>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                width: '100%',
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={500}
                color={'var(--gray-900)'}
              >
                {t('help.create-inquiry.faq')}
              </Typography>
              <Typography
                mt={'1rem'}
                variant="subtitle2"
                color={'var(--gray-50)'}
              >
                {t('help.create-inquiry.faq-desc')}
              </Typography>

              <Link
                to={getEnvVar(
                  i18next.language === 'en' ? 'VITE_FAQ_URL' : 'VITE_FAQ_KO_URL'
                )}
                target="_blank"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  textDecoration: 'none',
                  marginTop: '0.5rem',
                }}
              >
                <Typography
                  variant={'body1'}
                  noWrap
                  color={'var(--purple-500)'}
                  sx={{ mr: '6px' }}
                >
                  {t('help.create-inquiry.read-more')}
                </Typography>
                <img
                  src={RightArrow}
                  width={20}
                  height={20}
                  alt="arrow-right"
                  loading="lazy"
                />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CreateInquiryAuth;
