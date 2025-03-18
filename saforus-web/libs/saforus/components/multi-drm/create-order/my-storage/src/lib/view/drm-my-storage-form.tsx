import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  styled,
} from '@mui/material';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import Icon from '@web-workspace/shared/components/widgets/icon';
import Input from '@web-workspace/shared/components/widgets/input';
import InputButton from '@web-workspace/shared/components/widgets/input-button';
import InputToggle from '@web-workspace/shared/components/widgets/input-toggle';
import Tooltip from '@web-workspace/shared/components/widgets/tooltip';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import style from './index.module.scss';
import {
  IoType,
  Site,
  SiteStorage,
} from '@web-workspace/saforus/components/settings/sites/data';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { DrmStorage } from '@web-workspace/saforus/components/multi-drm/create-order/data';
import { IResponse } from '@web-workspace/saforus/common/model';
import { log } from 'console';

const CellView = styled(Box)(({ theme }) => ({
  width: '100%',
  flexGrow: 1,
}));

const RowView = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  width: '100%',
  flexDirection: 'row',
  gap: '1.5rem',
}));

interface MultiDrmMyStorageFormProps {
  sites: Site[];
  loadFiles: (value: string) => void;
  createFolder: (value: string) => void;
  filesResponse: IResponse;
}

export function MultiDrmMyStorageForm({
  sites,
  loadFiles,
  createFolder,
  filesResponse,
}: MultiDrmMyStorageFormProps) {
  const {
    formState: { errors },
    watch,
    setValue,
    register,
    control,
  } = useFormContext<DrmStorage>();
  const { t } = useTranslation();
  const [inputStorages, setInputStorages] = useState<SiteStorage[] | undefined>(
    []
  );
  const [outputStorages, setOutputStorages] = useState<
    SiteStorage[] | undefined
  >([]);

  useEffect(() => {
    const siteId = watch('siteId');
    let filterSite;
    if (siteId && !isEmpty(siteId)) {
      filterSite = sites?.find((site) => site.siteId === siteId);
    } else {
      filterSite = sites?.[0];
      const _siteId = filterSite?.siteId;
      if (_siteId && !isEmpty(_siteId)) {
        setValue('siteId', _siteId);
      }
    }

    const filterInputStorages = filterSite?.storages.filter(
      (e) => e.ioType === IoType.INPUT || e.ioType === IoType.BOTH
    );
    const filterOutputStorages = filterSite?.storages.filter(
      (e) => e.ioType === IoType.OUTPUT || e.ioType === IoType.BOTH
    );
    setInputStorages(filterInputStorages);
    setOutputStorages(filterOutputStorages);

    const inputStorageId = watch('inputStorageId') ?? '';
    const inputStorage = filterInputStorages?.find(
      (item) => item.id === parseInt(inputStorageId)
    );
    setValue('inputBucketName', inputStorage?.bucketName ?? '');
    setValue('inputCloudRegion', inputStorage?.serviceRegion.descEn ?? '');
    setValue('inputAccessKey', inputStorage?.accessKey ?? '');
    setValue('inputSecretKey', inputStorage?.secretKey ?? '');

    const outputStorageId = watch('outputStorageId') ?? '';
    const outStorage = filterOutputStorages?.find(
      (item) => item.id === parseInt(outputStorageId)
    );
    setValue('outputBucketName', outStorage?.bucketName ?? '');
    setValue('outputCloudRegion', outStorage?.serviceRegion.descEn ?? '');
    setValue('outputAccessKey', outStorage?.accessKey ?? '');
    setValue('outputSecretKey', outStorage?.secretKey ?? '');
  }, [sites]);

  const onSelectSiteChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const siteId = watch('siteId');
    if (siteId === value) return;

    const filterSite = sites?.find((item) => item.siteId === value);

    setValue('siteId', value);
    setValue('siteName', filterSite?.siteName ?? '');
    setValue('inputBucketName', '');
    setValue('outputBucketName', '');
    setValue('inputStorageId', '');
    setValue('outputStorageId', '');
    const filterStorages = sites?.find(
      (item) => item.siteId === value
    )?.storages;
    setInputStorages(
      filterStorages?.filter(
        (e) => e.ioType === IoType.INPUT || e.ioType === IoType.BOTH
      )
    );
    setOutputStorages(
      filterStorages?.filter(
        (e) => e.ioType === IoType.OUTPUT || e.ioType === IoType.BOTH
      )
    );
  };

  const onSelectInputStorage = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setValue('inputStorageId', value);
    const filterStorage = inputStorages?.find((e) => `${e.id}` === value);

    setValue('inputBucketName', filterStorage?.bucketName ?? '');
    setValue('inputPath', filterStorage?.storagePath ?? '');
    setValue('inputCloudRegion', filterStorage?.serviceRegion.descEn ?? '');
    setValue('inputAccessKey', filterStorage?.accessKey ?? '');
    setValue('inputSecretKey', filterStorage?.secretKey ?? '');
  };

  const onSelectOutputStorage = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setValue('outputStorageId', value);
    const filterStorage = outputStorages?.find((e) => e.id === parseInt(value));
    setValue('outputBucketName', filterStorage?.bucketName ?? '');
    const path = `${filterStorage?.storagePath ?? ''}saforus_output/`;
    setValue('outputPath', path);
    setValue('outputCloudRegion', filterStorage?.serviceRegion.descEn ?? '');
    setValue('outputAccessKey', filterStorage?.accessKey ?? '');
    setValue('outputSecretKey', filterStorage?.secretKey ?? '');
  };

  const customFormControl = (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Controller
        name={'siteId'}
        control={control}
        render={({ field }) => (
          <FormControl error={!!errors.siteId}>
            <Select
              fullWidth
              labelId="siteId"
              {...field}
              sx={{ width: '10vw', height: 40 }}
              onChange={onSelectSiteChange}
            >
              {sites.length > 0 &&
                sites?.map((site) => (
                  <MenuItem
                    key={site.siteId}
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    value={site.siteId}
                  >
                    {site.siteName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      />
      <Link
        className={style['link']}
        to={ROUTES.SETTINGS.SITES.path}
        target="_blank"
      >
        {t('page-watermarking.create.file-location-storage.see-details')}
      </Link>
    </Box>
  );

  return (
    <>
      <Typography color={'var(--gray-700)'} variant="h5" fontWeight={600}>
        {t('multiDrm.create-order.choose-storage.file-location')}
      </Typography>
      <Typography
        color={'var(--gray-50)'}
        variant={'body2'}
        sx={{
          marginTop: '0.5rem',
        }}
      >
        {t('multiDrm.create-order.choose-storage.file-location-description')}
      </Typography>
      <Box
        sx={{
          width: '100%',
          marginTop: '1.5rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            padding: '1.5rem',
            backgroundColor: '#F7F7F8',
          }}
        >
          <Typography
            fontSize={'20px'}
            fontWeight={600}
            color={'var(--gray-700)'}
            variant="subtitle1"
          >
            {/* Site and Credential */}
            {t('page-watermarking.create.site-credential')}
          </Typography>
          <Typography
            color={'var(--gray-50)'}
            variant={'body2'}
            sx={{
              marginTop: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            {t('page-watermarking.create.site-credential-description')}
          </Typography>
          {/* Site selection */}
          <RowView>
            <CellView>
              <InputToggle
                containerCss={{ width: '100%', overflow: 'hidden' }}
                key={'siteId'}
                {...register('siteId')}
                labelStyle={{ minWidth: '10vw' }}
                errorMessage={errors.siteId?.message}
                label={'Site Name*'}
                controlCss={{ background: 'var(--base-white)' }}
                disableActions={true}
                editModeFromParent={true}
                {...(customFormControl
                  ? { formControl: customFormControl }
                  : {})}
              />
            </CellView>
            <CellView />
          </RowView>
          {/* Input - output files */}
          <RowView sx={{ marginTop: '1.5rem' }}>
            {/* Cell input */}
            <CellView>
              <Typography
                fontSize={'20px'}
                fontWeight={600}
                color={'var(--gray-700)'}
                variant="subtitle1"
              >
                {t(
                  'page-watermarking.create.file-location-storage.input-files'
                )}
              </Typography>
              <Grid container spacing={0} direction="row">
                <Grid item xs={9}>
                  <Typography
                    color={'var(--gray-50)'}
                    variant={'body2'}
                    sx={{
                      marginTop: '0.5rem',
                    }}
                  >
                    {t(
                      'page-watermarking.create.file-location-storage.input-files-description'
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <Link
                      className={style['link']}
                      to={ROUTES.SETTINGS.SITES.path}
                      target="_blank"
                    >
                      {t(
                        'page-watermarking.create.file-location-storage.add-storage'
                      )}
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </CellView>
            {/* Cell output */}
            <CellView>
              <Typography
                fontSize={'20px'}
                fontWeight={600}
                color={'var(--gray-700)'}
                variant="subtitle1"
              >
                {t(
                  'page-watermarking.create.file-location-storage.output-files'
                )}
              </Typography>
              <Grid container spacing={0} direction="row">
                <Grid item xs={9}>
                  <Typography
                    color={'var(--gray-50)'}
                    variant={'body2'}
                    sx={{
                      marginTop: '0.5rem',
                    }}
                  >
                    {t(
                      'page-watermarking.create.file-location-storage.output-files-description'
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <Link
                      className={style['link']}
                      to={ROUTES.SETTINGS.SITES.path}
                      target="_blank"
                    >
                      {t(
                        'page-watermarking.create.file-location-storage.add-storage'
                      )}
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </CellView>
          </RowView>
          <RowView sx={{ marginTop: '1.5rem' }}>
            <CellView>
              <Controller
                name={'inputStorageId'}
                control={control}
                render={({ field }) => (
                  <FormControl
                    sx={{ width: '100%' }}
                    error={!!errors.inputStorageId}
                  >
                    <Typography variant="body2" color={'var(--gray-700)'}>
                      {`${t(
                        'page-watermarking.create.file-location-storage.input-storage'
                      )}*`}
                    </Typography>
                    <Select
                      fullWidth
                      labelId="inputStorageId"
                      {...field}
                      sx={{
                        height: 40,
                        marginTop: '0.5rem',
                        background: 'white',
                      }}
                      onChange={onSelectInputStorage}
                    >
                      {inputStorages?.map((store) => (
                        <MenuItem
                          key={`${store.id}${store.storageName}`}
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          value={`${store.id}`}
                        >
                          {store.storageName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </CellView>
            <CellView>
              <Controller
                name={'outputStorageId'}
                control={control}
                render={({ field }) => (
                  <FormControl
                    sx={{ width: '100%' }}
                    error={!!errors.outputStorageId}
                  >
                    <Typography variant="body2" color={'var(--gray-700)'}>
                      {`${t(
                        'page-watermarking.create.file-location-storage.output-storage'
                      )}*`}
                    </Typography>
                    <Select
                      fullWidth
                      labelId="outputStorageId"
                      // value={outputStorageId}
                      {...field}
                      sx={{
                        height: 40,
                        marginTop: '0.5rem',
                        background: 'white',
                      }}
                      onChange={onSelectOutputStorage}
                    >
                      {outputStorages?.map((store) => (
                        <MenuItem
                          key={`${store.id}+${store.storageName}`}
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          value={store.id}
                        >
                          {store.storageName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </CellView>
          </RowView>
          <RowView sx={{ marginTop: '1.5rem' }}>
            <CellView>
              <Input
                style={{ width: '100%' }}
                label={`${t(
                  'page-watermarking.create.file-location-storage.bucket-name'
                )}`}
                {...register('inputBucketName')}
                disabled
                type={'text'}
                icon={
                  <Icon
                    size={20}
                    name="information"
                    color={'var(--neutral-700)'}
                  />
                }
              />
            </CellView>
            <CellView>
              <Input
                style={{ width: '100%' }}
                label={`${t(
                  'page-watermarking.create.file-location-storage.bucket-name'
                )}`}
                {...register('outputBucketName')}
                disabled
                type={'text'}
                icon={
                  <Icon
                    size={20}
                    name="information"
                    color={
                      // errors.outputBucketName?.message
                      //   ? 'var(--red-600)'
                      //   : 'var(--neutral-700)'
                      'var(--neutral-700)'
                    }
                  />
                }
              />
            </CellView>
          </RowView>
          <RowView>
            <CellView>
              <Controller
                name={'inputPath'}
                control={control}
                render={({ field }) => (
                  <FormControl
                    sx={{ width: '100%' }}
                    error={!!errors.inputPath}
                  >
                    <InputButton
                      {...field}
                      fullWidth
                      style={{ width: '100%' }}
                      placeholder={'input'}
                      label={`${t(
                        'page-watermarking.create.file-location-storage.input-file-path'
                      )}*`}
                      inputStyle={{ marginTop: '0.5rem' }}
                      type={'text'}
                      errorMessage={
                        filesResponse.isSuccess === false &&
                        t('page-watermarking.create.message.load-files-failure')
                      }
                      icon={
                        <Tooltip
                          title={t('page-watermarking.tooltip.input-path')}
                          titleHeader={`${t(
                            'page-watermarking.tooltip.input-path'
                          )}`}
                          description={`${t(
                            'page-watermarking.tooltip.input-path-description'
                          )}`}
                        >
                          <Icon
                            size={20}
                            name="information"
                            color={
                              // errors.inputPath?.message
                              //   ? 'var(--red-600)'
                              //   : 'var(--gray-25)'
                              'var(--gray-25)'
                            }
                          />
                        </Tooltip>
                      }
                      btnTitle={`${t(
                        'page-watermarking.create.file-location-storage.load-files'
                      )}`}
                      buttonStyle={{
                        padding: '0 0.5rem',
                        width: '15vw',
                        height: '40px',
                        marginTop: '0.5rem',
                        fontSize: '14px',
                      }}
                      onSubmit={loadFiles}
                    />
                  </FormControl>
                )}
              />
            </CellView>
            <CellView>
              <Controller
                name={'outputPath'}
                control={control}
                render={({ field }) => (
                  <FormControl
                    sx={{ width: '100%' }}
                    error={!!errors.outputPath}
                  >
                    <InputButton
                      {...field}
                      disabledButton={
                        field.value === '' || watch('isCreatedFolder') === true
                      }
                      fullWidth
                      style={{ width: '100%' }}
                      inputStyle={{ marginTop: '0.5rem' }}
                      placeholder={'output/'}
                      label={`${t(
                        'page-watermarking.create.file-location-storage.output-file-path'
                      )}*`}
                      type={'text'}
                      errorMessage={
                        errors.outputPath?.message &&
                        t(errors.outputPath?.message)
                      }
                      icon={
                        <Tooltip
                          title={t('page-watermarking.tooltip.output-path')}
                          titleHeader={`${t(
                            'page-watermarking.tooltip.output-path'
                          )}`}
                          description={`${t(
                            'page-watermarking.tooltip.output-path-description'
                          )}`}
                        >
                          <Icon
                            size={20}
                            name="information"
                            color={
                              errors.outputPath?.message
                                ? 'var(--red-600)'
                                : 'var(--gray-25)'
                            }
                          />
                        </Tooltip>
                      }
                      btnTitle={`${t(
                        'page-watermarking.create.file-location-storage.create-folder'
                      )}`}
                      buttonStyle={{
                        padding: '0 0.5rem',
                        width: '10vw',
                        height: '40px',
                        marginTop: '0.5rem',
                        fontSize: '14px',
                      }}
                      onSubmit={createFolder}
                    />
                  </FormControl>
                )}
              />
            </CellView>
          </RowView>
        </Box>
      </Box>
    </>
  );
}

export default MultiDrmMyStorageForm;
