import React, { useEffect } from 'react';
import useCreateApiKeyData from './data';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import CreateIcon from './assets/edit.svg';
import { useTranslation } from 'react-i18next';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  styled,
} from '@mui/material';
import { useSnapshot } from 'valtio';
import { Controller } from 'react-hook-form';
import Input from '@web-workspace/shared/components/widgets/input';
import { DateInput } from '@web-workspace/shared/components/widgets/date-picker';
import { addMinutes, subMinutes } from 'date-fns';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}));

const FormContainer = styled('form')``;
type CreateApiKeyDialogProps = {
  onClose: () => void;
};

const CreateApiKeyDialog: React.FC<CreateApiKeyDialogProps> = ({ onClose }) => {
  const {
    onSubmit,
    handleSubmit,
    errors,
    control,
    watch,
    loading,
    isValid,
    setValue,
  } = useCreateApiKeyData({
    onClose,
  });

  const { t } = useTranslation();
  const { tzDisplayOffset: tzOffset } = useSnapshot(CsApiAuthStore);
  const neverExpire = watch('neverExpire');

  useEffect(() => {
    if (neverExpire) {
      setValue('expiredAt', new Date());
    }
  }, [neverExpire]);

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '5px',
        },
      }}
      icon={<img src={CreateIcon} alt="Create Icon" />}
      onClose={onClose}
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      rightIconCss={{
        marginRight: '1rem',
        marginTop: '1rem',
      }}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {t('apiKeyManagement.button.discard')}
          </Button>
          <LoadingButton
            color="primary"
            onClick={handleSubmit(onSubmit)}
            fullWidth
            sx={{ height: 46 }}
            type="submit"
            loading={loading}
            disabled={!isValid}
          >
            {t('apiKeyManagement.button.create')}
          </LoadingButton>
        </>
      }
      dialogCss={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
      dialogContent={
        <BoxContainer>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              gap: '8px',
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              {t('apiKeyManagement.create.title')}
            </Typography>

            <Typography variant="body1" whiteSpace="pre-line">
              {t('apiKeyManagement.create.description')}
            </Typography>
          </Box>

          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  fullWidth
                  placeholder={`${t('apiKeyManagement.form.name-placeholder')}`}
                  style={{ color: 'var(--gray-700)' }}
                  label={`${t('apiKeyManagement.form.name')}`}
                  {...field}
                  errorMessage={
                    errors.name?.message && `${t(errors.name?.message)}`
                  }
                />
              )}
            />
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: 'var(--gray-700)',
                  marginBottom: '6px',
                }}
              >
                {t('apiKeyManagement.form.expriation')}
              </Typography>
              <Controller
                name="expiredAt"
                control={control}
                render={({ field }) => (
                  <DateInput
                    {...field}
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date as any)) {
                        // Ajust date to correct timezone
                        field.onChange(subMinutes(date, tzOffset));
                      } else {
                        field.onChange(null);
                      }
                    }}
                    value={
                      field.value && !neverExpire
                        ? // Ajust date to correct timezone
                          addMinutes(new Date(field.value), tzOffset)
                        : null
                    }
                    disabled={neverExpire}
                    inputStyle={{ width: '100%' }}
                    error={false}
                    placeholder={
                      neverExpire
                        ? `${t('apiKeyManagement.form.never-expire')}`
                        : undefined
                    }
                  />
                )}
              />
              <FormControlLabel
                label={
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 500,
                      color: 'var(--gray-700)',
                    }}
                  >
                    {t('apiKeyManagement.form.never-expire')}
                  </Typography>
                }
                control={
                  <Controller
                    name="neverExpire"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        icon={<Icon name="square_uncheck" size={20} />}
                        checkedIcon={<Icon name="square_checked" size={20} />}
                        sx={{
                          marginTop: -1,
                        }}
                      />
                    )}
                  />
                }
              />
            </Box>
          </FormContainer>
        </BoxContainer>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default CreateApiKeyDialog;
