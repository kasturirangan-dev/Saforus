import React, { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import { useSnapshot } from 'valtio';

import { useTranslation } from 'react-i18next';
import { BoUserRole } from '@web-workspace/saforus-bo/common/model';
import TooltipUserRole from './tooltip-user-role';
import BoAuthStore from '@web-workspace/shared/hooks/use-bo-auth';

const generateValueLabel = ({ value }: { value: string }) => {
  let valueStr = null;
  let backgroundColor = 'var(--neutral-300)';
  let color = 'var(--gray-700)';
  switch (value) {
    case BoUserRole.SUPER_ADMIN:
      color = 'var(--purple-600)';
      valueStr = 'boGnbmenu.role.super-admin';
      backgroundColor = 'var(--purple-50)';
      break;
    case BoUserRole.ADMIN_CS:
      valueStr = 'boGnbmenu.role.admin-cs';
      color = 'var(--green-600)';
      backgroundColor = 'var(--green-50)';
      break;
    case BoUserRole.ADMIN:
      valueStr = 'boGnbmenu.role.admin';
      break;
    default:
      valueStr = '';
      color = 'transparent';
      backgroundColor = 'transparent';
      break;
  }

  return {
    value: valueStr,
    color: color,
    backgroundColor: backgroundColor,
  };
};

const UserTypeLabel: React.FC = () => {
  const { userInfo, isLoggedIn } = useSnapshot(BoAuthStore);
  const [userLabel, setUserLabel] = useState({
    value: '',
    color: '',
    backgroundColor: '',
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (isLoggedIn) {
      const data = generateValueLabel({ value: userInfo?.role ?? '' });
      setUserLabel(data);
    }
  }, [isLoggedIn, userInfo]);

  if (userLabel?.value) {
    return (
      <TooltipUserRole title="UserRole">
        <Chip
          label={userLabel?.value ? `${t(userLabel?.value)}` : ''}
          sx={{
            background: userLabel?.backgroundColor
              ? userLabel?.backgroundColor
              : 'none',
            borderRadius: '5px',
            color: userLabel?.color ? userLabel?.color : 'none',
            fontWeight: '500',
            fontSize: '14px',
            alignItems: 'center',
            mb: '0.5rem',
          }}
        />
      </TooltipUserRole>
    );
  } else {
    return null;
  }
};

export default React.memo(UserTypeLabel);
