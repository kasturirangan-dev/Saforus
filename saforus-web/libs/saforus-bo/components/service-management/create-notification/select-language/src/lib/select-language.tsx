import { Box, InputLabel, Menu, MenuItem, Typography } from '@mui/material';
import LanguageIcon from './assets/language.svg';
import ChevronDownIcon from './assets/chevronDown.svg';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import CreateNotificationStore, {
  NotificationLang,
} from '@web-workspace/saforus-bo/components/service-management/create-notification/data';
import Icon from '@web-workspace/shared/components/widgets/icon';

export function LangBanner() {
  const { formLanguage, setFormLanguage } = useSnapshot(
    CreateNotificationStore
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const langTextParam =
    formLanguage === NotificationLang.EN ? 'English' : 'Korean';

  const handleLanguageChange = (lang: NotificationLang) => {
    setFormLanguage(lang);
    handleClose();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '1rem 3.5rem',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--gray-400)',
        gap: '0.5rem',
      }}
    >
      <Box>
        <InputLabel
          color="primary"
          sx={{
            display: 'flex',
            borderRadius: '5px',
            bgcolor: 'var(--purple-50)',
            color: 'var(--purple-600)',
            padding: '2px 8px',
            fontSize: '0.8125rem',
            fontWeight: '500',
            lineHeight: '1.125rem',
            gap: '0.25rem',
            alignItems: 'center',
          }}
          onClick={handleClick}
        >
          <img
            src={LanguageIcon}
            alt="ChevronDownIcon"
            title="ChevronDownIcon"
            width={12}
            height={12}
            loading="lazy"
          />
          {formLanguage}
          <img
            src={ChevronDownIcon}
            alt="ChevronDownIcon"
            title="ChevronDownIcon"
            width={12}
            height={12}
            loading="lazy"
          />
        </InputLabel>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => handleLanguageChange(NotificationLang.EN)}
            sx={{ display: 'flex', gap: '0.5rem' }}
          >
            {'EN'}
            {formLanguage === NotificationLang.EN && (
              <Icon name="check" size={16} color={'var(--gray-50)'} />
            )}
          </MenuItem>
          <MenuItem
            onClick={() => handleLanguageChange(NotificationLang.KO)}
            sx={{ display: 'flex', gap: '0.5rem' }}
          >
            {'KO'}
            {formLanguage === NotificationLang.KO && (
              <Icon name="check" size={16} color={'var(--gray-50)'} />
            )}
          </MenuItem>
        </Menu>
      </Box>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: 'var(--base-white)',
        }}
      >
        Currently writing in {langTextParam} version.
      </Typography>
    </Box>
  );
}

export default LangBanner;
