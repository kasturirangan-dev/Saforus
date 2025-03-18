import React, { useMemo } from 'react';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { Trans, useTranslation } from 'react-i18next';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { UserTeamStore } from '@web-workspace/saforus/components/user-info/team-member/data';
import { useSnapshot } from 'valtio';
import logo from '../assets/logo.svg';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';

type ConfirmInvitationDialogViewProps = {
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
  loading: boolean;
};

const ConfirmInvitationDialogView: React.FC<
  ConfirmInvitationDialogViewProps
> = ({ onClose, onAccept, onDecline, loading }) => {
  const { t } = useTranslation();
  const { invitation } = useSnapshot(UserTeamStore);
  const [checkboxValue, setCheckboxValue] = React.useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(event.target.checked);
  };
  const termServiceLink = useMemo(() => {
    return i18next.language === 'ko'
      ? getEnvVar('VITE_TERMS_KO_URL')
      : getEnvVar('VITE_TERMS_URL');
  }, [i18next.language]);

  return (
    <Dialog
      PaperProps={{
        style: {
          width: '440px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '5px',
          border: '1px solid var(--natural-700)',
        },
      }}
      icon={
        <img
          src={logo}
          alt="SaForus Logo"
          title="Confirm Invitation"
          width="32"
          height="32"
          loading="lazy"
        />
      }
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      onClose={onClose}
      dialogContent={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Box textAlign={'center'}>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '28px',
                letterSpacing: '-0.02em',
              }}
            >
              {t('team-member.dialog.confirm-invitation-title')}
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '24px',
                whiteSpace: 'pre-line',
                marginTop: '0.5rem',
              }}
              color={'var(--gray-50)'}
            >
              {t('team-member.dialog.confirm-invitation-description', {
                team: invitation?.teamName,
              })}
            </Typography>
          </Box>
          <FormControlLabel
            label={
              <Trans
                i18nKey={'team-member.dialog.accept-policy-checkbox'}
                components={[
                  <Link
                    target="_blank"
                    href={termServiceLink}
                    color="inherit"
                  />,
                ]}
              ></Trans>
            }
            sx={{
              alignItems: 'flex-start',
              fontFamily: 'Inter',
              fontSize: '15px',
              lineHeight: '22px',
              color: 'var(--gray-50)',
            }}
            control={
              <Checkbox
                checked={checkboxValue}
                onChange={handleCheckboxChange}
                icon={<Icon name="square_uncheck" size={20} />}
                checkedIcon={<Icon name="square_checked" size={20} />}
                sx={{
                  marginTop: -1,
                }}
              />
            }
          />
          <Box>
            <LoadingButton
              fullWidth
              sx={{
                padding: '12px 18px',
                bgcolor: 'lightblue',
                color: 'var(--base-white)',
                '&.MuiButtonBase-root:hover': {
                  background: 'var(--main-brand-color3)',
                },
                background: 'var(--main-brand-color3)',
              }}
              disabled={!checkboxValue}
              onClick={onAccept}
              loading={loading}
            >
              {t('team-member.dialog.confirm-invitation-accept')}
            </LoadingButton>

            <LoadingButton
              fullWidth
              color="secondary"
              sx={{ padding: '12px 18px', marginTop: '12px' }}
              onClick={onDecline}
              loading={loading}
            >
              {t('team-member.dialog.confirm-invitation-decline')}
            </LoadingButton>
          </Box>
        </Box>
      }
      dialogCss={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        display: 'flex',
      }}
      contentCss={{ paddingBottom: '1.5rem' }}
    ></Dialog>
  );
};

export default ConfirmInvitationDialogView;
