import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import MyAccountStore, {
  CompanyInformationType,
  getFieldRegisterCompanyInfo,
  QUERY_KEY,
} from '@web-workspace/saforus/components/user-info/my-account/data';
import { Backdrop, Box, CircularProgress, styled } from '@mui/material';
import React, { useEffect } from 'react';
import ActionsButtons from './views/actions-buttons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { formFields, validationSchema } from './data';
import InputToggle from '@web-workspace/shared/components/widgets/input-toggle';
import { useMutation, useQueryClient } from 'react-query';

const FormContainer = styled('form')`
  width: 50%;
  position: relative;
`;

export function CompanyInformation() {
  const { t } = useTranslation();
  const { companyInformation, updateCompanyInformation } =
    useSnapshot(MyAccountStore);
  const [isEdit, setIsEdit] = React.useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (data: CompanyInformationType) => {
      const result = await updateCompanyInformation(data);
      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
      onSettled: () => {
        setIsEdit(false);
      },
    }
  );

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    getValues,
    setValue,
    trigger,
  } = useForm<CompanyInformationType>({
    defaultValues: {},
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async () => {
    const isFormValid = await trigger();

    if (isFormValid) {
      const formData = getValues();
      mutation.mutate(formData);

      if (mutation.error) {
        console.error(mutation.error);
      }
    }
  };

  const renderCustomFormControl = (fieldName: string, isEditing: boolean) => {
    return null;
  };

  useEffect(() => {
    Object.entries(companyInformation).forEach(([key, value]) => {
      setValue(key as keyof CompanyInformationType, value);
    });
  }, [companyInformation]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="50%"
      >
        {/* <Typography variant="h4" sx={{ marginBottom: 0, marginTop: '0.5rem' }}>
          {t('myaccount.company-information.title')}
        </Typography> */}
        <ActionsButtons
          isEdit={isEdit}
          onEdit={() => setIsEdit((edit) => !edit)}
          onCancel={() => setIsEdit(false)}
          onSubmit={onSubmit}
          loading={mutation.isLoading}
        />
      </Box>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field) => {
          const customFormControl = renderCustomFormControl(field.name, isEdit);

          return (
            <InputToggle
              key={field.name}
              {...getFieldRegisterCompanyInfo(register, field.name)}
              value={companyInformation[field.name]}
              errorMessage={errors[field.name]?.message}
              label={t(field.label)}
              labelStyle={{ minWidth: 230 }}
              controlCss={{ background: 'var(--base-white)' }}
              disableActions={true}
              editModeFromParent={isEdit}
            />
          );
        })}
        <Backdrop
          open={mutation.isLoading}
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
      </FormContainer>
    </>
  );
}

export default CompanyInformation;
