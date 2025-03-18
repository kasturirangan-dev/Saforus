import { Box, SxProps, Typography } from '@mui/material';
import { PATTERN } from '@web-workspace/api-console/constants/validation';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PasswordRequirementsProps {
  sx?: SxProps;
  password?: string;
  error?: boolean;
}

interface RequirementItemProps {
  isValid: boolean;
  text: string;
}

const PasswordRequirements = ({
  sx,
  password,
  error,
}: PasswordRequirementsProps) => {
  const { t } = useTranslation();
  const [validLength, setValidLength] = useState(false);
  const [validUpLowercase, setValidUpLowercase] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validSpecial, setValidSpecial] = useState(false);

  useEffect(() => {
    if (isNotEmpty(password) && password) {
      setValidLength(password?.length >= 8);
      setValidUpLowercase(PATTERN.UP_LOWER_CASE_LEAST.test(password));
      setValidNumber(PATTERN.NUMBER_LEAST.test(password));
      setValidSpecial(PATTERN.SYMBOL_LEAST.test(password));
    } else {
      setValidLength(false);
      setValidUpLowercase(false);
      setValidNumber(false);
      setValidSpecial(false);
    }
  }, [password]);

  const RequirementItem = ({ isValid, text }: RequirementItemProps) => {
    const iconColor = isValid ? 'var(--green-600)' : 'var(--gray-25)';
    const color = isValid ? 'var(--green-600)' : 'var(--gray-700)';

    return (
      <Box display="flex" alignItems="center" gap={1}>
        <Icon name="check" size={20} color={iconColor} />
        <Typography variant="body2" fontWeight={500} color={color}>
          {text}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      borderRadius={'6px'}
      padding={'0.9375rem 1rem'}
      sx={{
        ...sx,
        backgroundColor: 'var(--blue-25)',
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Icon name="information" size={20} color={'var(--gray-50)'} />
        <Typography
          variant={'subtitle2'}
          fontWeight={600}
          color={'var(--gray-700)'}
        >
          {t('common.password-requirements.title')}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" flexDirection="column" gap={2}>
          <RequirementItem
            isValid={validLength}
            text={t('common.password-requirements.8-characters')}
          />
          <RequirementItem
            isValid={validNumber}
            text={t('common.password-requirements.1-number')}
          />
          <RequirementItem
            isValid={validUpLowercase}
            text={t('common.password-requirements.1-uppercase')}
          />
          <RequirementItem
            isValid={validSpecial}
            text={t('common.password-requirements.1-symbol')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PasswordRequirements;
