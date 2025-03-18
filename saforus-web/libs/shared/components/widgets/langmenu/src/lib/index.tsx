import { useSearchParams } from 'react-router-dom';
import { styled, Menu, MenuItem, Fade, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';

import Icon from '@web-workspace/shared/components/widgets/icon';
import { ILanguage } from './interface';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import i18next from 'i18next';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';

export const langs: ILanguage[] = [
  {
    key: 'en-US',
    title: 'English',
    code: 'en',
  },
  {
    key: 'ko-KR',
    title: '한국어',
    code: 'ko',
  },
];

const CustomButton = styled(MuiButton)<ButtonProps>(({ theme }) => ({
  width: '110px',
  height: '36px',
  borderRadius: '30px',
  boxShadow: `var(--shadow-xsm)`,
  alignItems: 'center',
  justifyContent: 'flex-start',

  color: 'var(--gray-50)',
  textTransform: 'none',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '-0.1px',

  backgroundColor:
    theme.palette.mode === 'light' ? 'var(--base-white)' : 'var(--gray-600)',
  border: `1px solid ${
    theme.palette.mode === 'light' ? '#DAE0E6' : 'var(--gray-600)'
  }`,

  '&:hover': {
    backgroundColor: 'var(--neutral-400)',
    border: `1px solid ${
      theme.palette.mode === 'light' ? '#DAE0E6' : 'var(--neutral-700)'
    }`,
  },

  '& .MuiButton-startIcon': {
    marginLeft: '0px',
    marginRight: '6px',
  },
  '& .MuiButton-endIcon': {
    marginLeft: '6px',
    marginRight: '0px',
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: '14px',
    border: '1px solid var(--neutral-750)',
    boxShadow: 'var(--shadow-lg)',
    borderRadius: '5px',
  },
  '& .MuiList-root': {
    padding: '4px 0px',
  },
  '& .MuiMenuItem-root': {
    width: '110px',
    height: '40px',
    justifyContent: 'space-between',
    gap: '6px',

    color:
      theme.palette.mode === 'light' ? 'var(--gray-700)' : 'var(--neutral-200)',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '-0.1px',

    '&.selected': {
      backgroundColor: 'var(--purple-50)',
    },
  },
}));

const SESSION_STORAGE_LANG = getEnvVar('VITE_SESSION_STORAGE_LANG') || '';

const LanguageMenu = ({
  type = 'default',
}: {
  type?: 'default' | 'dropdown';
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsAsObject = Object.fromEntries([...searchParams]);

  const [language, setLanguage] = React.useState<ILanguage>(langs[0]);
  const [anchorLangEl, setAnchorLangEl] = React.useState<null | HTMLElement>(
    null
  );

  function changeLanguage(lang: string) {
    i18next.changeLanguage(lang);
  }

  useEffect(() => {
    let langParam = paramsAsObject?.lang ?? '';
    langParam = langParam.toLowerCase();
    const langCodes = ['en', 'ko'];

    if (isNotEmpty(langParam) && langCodes.includes(langParam)) {
      localStorage.setItem(SESSION_STORAGE_LANG, langParam);
      const lang: ILanguage =
        langs.find((e) => e.code === langParam) ?? langs[0];
      if (langParam !== language?.code) {
        setLanguage(lang);
      }

      const currentLang = i18next.language;
      if (langParam !== currentLang) {
        setTimeout(() => {
          changeLanguage(langParam);
        }, 500);
      }
      return;
    }

    const langStr = localStorage.getItem(SESSION_STORAGE_LANG);
    let langCode: string = langs[0].code;
    if (langStr === null) {
      localStorage.setItem(SESSION_STORAGE_LANG, langCode);
    } else {
      langCode = langStr;
    }
    const lang: ILanguage = langs.find((e) => e.code === langCode) ?? langs[0];
    if (
      langCode !== null &&
      (i18next.language !== langCode || langCode !== language?.code)
    ) {
      changeLanguage(langCode);
      setLanguage(lang);
    }
  }, []);

  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorLangEl !== event.currentTarget) {
      setAnchorLangEl(event.currentTarget);
    }
  };

  const openLang = Boolean(anchorLangEl);
  const handleLangClose = () => {
    setAnchorLangEl(null);
  };

  const handleChangeLang = (lang: ILanguage) => {
    const param = searchParams.get('lang');
    if (param) {
      searchParams.delete('lang');
      setSearchParams(searchParams);
    }

    setAnchorLangEl(null);
    if (lang.code !== language.code) {
      localStorage.setItem(SESSION_STORAGE_LANG, lang?.code);
      setLanguage(lang);
      changeLanguage(lang?.code);
    }
  };

  const buttonProps =
    type === 'default'
      ? {
          startIcon: <Icon size={16} name="translate" color="var(--gray-50)" />,
        }
      : {
          endIcon: (
            <Icon
              size={16}
              name={openLang ? 'chevron_up' : 'chevron_down'}
              color="var(--gray-25)"
            />
          ),
          sx: {
            width: 'auto',
            borderRadius: '100px',
            boxShadow: 'none',
            border: 'none',

            color: 'var(--gray-700)',
            fontWeight: '400',

            '&:hover': {
              border: 'none',
              backgroundColor: 'var(--neutral-500)',
            },
            '&.active': {
              backgroundColor: 'var(--neutral-100)',
            },
          },
        };

  return (
    <>
      <CustomButton
        id="lang-button"
        variant="outlined"
        className={openLang ? 'active' : ''}
        aria-controls={openLang ? 'fade-menu-langs' : undefined}
        aria-haspopup="true"
        aria-expanded={openLang ? 'true' : undefined}
        onClick={handleLangClick}
        {...buttonProps}
      >
        {language?.title}
      </CustomButton>
      <StyledMenu
        id="fade-menu-langs"
        MenuListProps={{
          'aria-labelledby': 'lang-button',
        }}
        anchorEl={anchorLangEl}
        open={Boolean(anchorLangEl)}
        onClose={handleLangClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {langs.map((langItem) => (
          <MenuItem
            key={langItem.key}
            onClick={() => handleChangeLang(langItem)}
            className={langItem.code === language.code ? 'selected' : ''}
          >
            {langItem.title}
            {langItem.code === language.code && (
              <Icon size={16} name="check" color="var(--purple-300)" />
            )}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default React.memo(LanguageMenu);
