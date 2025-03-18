import { useTranslation } from 'react-i18next';
import {
  CodeContent,
  CollapseSection,
  TransContent,
} from '@web-workspace/api-docs/components/guides/section';
import {
  Box,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import {
  StyledTable,
  StyledTableContainer,
  TableAlert,
  TableCodeContent,
} from './styled-table';
import Icon from '@web-workspace/shared/components/widgets/icon';
import ArrowRight from './assets/arrow-right.svg';
import { useLocation } from 'react-router-dom';
import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';

interface Property {
  type: string;
  note: string;
  link?: string;
  alert?: string;
  alertLink?: string;
}

export interface ApiDetail {
  url?: string;
  method?: string;
  header?: { [key: string]: string };
  pathVariables?: { [key: string]: Property };
  parameters?: { [key: string]: Property };
  body?: { [key: string]: Property };
}

const SpecificationTable = ({
  keySpec,
  type = 'request',
}: {
  keySpec: string;
  type?: 'request' | 'response';
}) => {
  const { t } = useTranslation();
  const { url, method, header, pathVariables, parameters, body } = t(keySpec, {
    returnObjects: true,
  }) as ApiDetail;

  const SingleValueRow = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => {
    return (
      <TableRow>
        <TableCell component="th" scope="row" width={120}>
          {label}
        </TableCell>
        <TableCell colSpan={3}>
          <TableCodeContent>{value}</TableCodeContent>
        </TableCell>
      </TableRow>
    );
  };

  const location = useLocation();
  const ApiLink = (link?: string) => {
    const quickStartPath = API_DOCS_ROUTES.API_INTEGRATION.QUICK_START.path;
    const linksMap: Record<string, string> = {
      '/csapi/watermarking#get-order-flow': `${quickStartPath}#watermarking-order`,
      '/csapi/detection#create-order-flow': `${quickStartPath}#detection-create`,
    };
    return link && location.pathname === quickStartPath && linksMap[link]
      ? linksMap[link]
      : link;
  };

  const PropertyRows = ({
    i18nKey,
    label,
    data,
  }: {
    i18nKey: string;
    label: string;
    data: { [key: string]: Property };
  }) => {
    return (
      <>
        <TableRow>
          <TableCell
            component="th"
            rowSpan={Object.keys(data).length + 1}
            width={120}
          >
            {label}
          </TableCell>
          <TableCell component="th" width={168}>
            {t('apiIntegration.api-spec.properties')}
          </TableCell>
          <TableCell component="th" width={98}>
            {t('apiIntegration.api-spec.type')}
          </TableCell>
          <TableCell component="th" width={408}>
            {t('apiIntegration.api-spec.note')}
          </TableCell>
        </TableRow>
        {Object.entries(data).map(([key, value], index) => (
          <TableRow key={key}>
            <TableCell>
              <TableCodeContent>{key.replace(/-/g, '.')}</TableCodeContent>
            </TableCell>
            <TableCell>{value.type}</TableCell>
            <TableCell>
              <TransContent
                i18nKey={`${i18nKey}.${key}.note`}
                link={ApiLink(value.link)}
              ></TransContent>
              {value.alert && (
                <TableAlert
                  severity="info"
                  icon={
                    <Icon
                      size={16}
                      name="information"
                      color={'var(--purple-600)'}
                    />
                  }
                >
                  <TransContent
                    i18nKey={`${i18nKey}.${key}.alert`}
                    link={ApiLink(value.alertLink)}
                  ></TransContent>
                </TableAlert>
              )}
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <>
      <Label
        label={t(`apiIntegration.api-spec.${type}`)}
        bgcolor={type === 'request' ? 'var(--orange-100)' : 'var(--green-100)'}
      />
      <StyledTableContainer>
        <StyledTable>
          <TableBody>
            {type === 'request' && (
              <>
                {url && (
                  <SingleValueRow
                    label={t('apiIntegration.api-spec.url')}
                    value={url}
                  />
                )}
                {method && (
                  <SingleValueRow
                    label={t('apiIntegration.api-spec.method')}
                    value={method}
                  />
                )}
                {header && (
                  <>
                    <TableRow>
                      <TableCell
                        component="th"
                        rowSpan={Object.keys(header).length + 1}
                        width={120}
                      >
                        {t('apiIntegration.api-spec.header')}
                      </TableCell>
                    </TableRow>
                    {Object.entries(header).map(([key, value], index) => (
                      <TableRow>
                        <TableCell colSpan={3}>
                          <CodeContent>{`${key}: ${value}`}</CodeContent>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
                {pathVariables && (
                  <PropertyRows
                    i18nKey={`${keySpec}.pathVariables`}
                    label={t('apiIntegration.api-spec.pathVariables')}
                    data={pathVariables}
                  />
                )}
                {parameters && (
                  <PropertyRows
                    i18nKey={`${keySpec}.parameters`}
                    label={t('apiIntegration.api-spec.parameters')}
                    data={parameters}
                  />
                )}
              </>
            )}
            {body && (
              <PropertyRows
                i18nKey={`${keySpec}.body`}
                label={t('apiIntegration.api-spec.body')}
                data={body}
              />
            )}

            {!body && type === 'response' && (
              <TableRow>
                <TableCell component="th" scope="row" width={120}>
                  {t('apiIntegration.api-spec.body')}
                </TableCell>
                <TableCell colSpan={3}>
                  {t('apiIntegration.api-spec.bodyNa')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '8px 12px',
  gap: '6px',
  width: 'fit-content',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  '&.MuiButton-containedPrimary': {
    background: 'var(--purple-400)',
  },
}));

const Label = ({ label, bgcolor }: { label: string; bgcolor: string }) => {
  return (
    <Typography
      variant="caption"
      fontFamily="Inter, Noto Sans KR"
      fontWeight={500}
      sx={{
        textTransform: 'uppercase',
        padding: '2px 8px',
        borderRadius: '5px',
        bgcolor,
        width: 'fit-content',
      }}
    >
      {label}
    </Typography>
  );
};

export const ApiSpecification = ({
  requestSpec,
  responseSpec,
  defaultExpand = false,
}: {
  requestSpec: string;
  responseSpec: string;
  defaultExpand?: boolean;
}) => {
  const { t } = useTranslation();
  const swaggerUrl = t(`${requestSpec}.swagger-url`);

  return (
    <CollapseSection
      label={t('apiIntegration.api-spec.title')}
      defaultExpand={defaultExpand}
      maxContent={692}
      cardAction={
        <StyledButton onClick={() => window.open(swaggerUrl, '_blank')}>
          {t('apiIntegration.api-spec.try-it')}
          <img src={ArrowRight} alt="back" />{' '}
        </StyledButton>
      }
    >
      <SpecificationTable keySpec={requestSpec} type="request" />
      <SpecificationTable keySpec={responseSpec} type="response" />
    </CollapseSection>
  );
};
