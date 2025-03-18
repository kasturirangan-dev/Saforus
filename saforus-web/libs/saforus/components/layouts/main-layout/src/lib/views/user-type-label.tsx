import React, { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import { useSnapshot } from 'valtio';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useTranslation } from 'react-i18next';
import { UserRole } from '@web-workspace/saforus/common/model';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';
import TooltipUserRole from './tooltip-user-role';
import { pxToVw } from '@web-workspace/saforus/common/utils';

const generateValueLabel = ({ value }: { value: string }) => {
  let valueStr = null;
  let backgroundColor = 'var(--gray-700)';
  let color = 'var(--gray-700)';
  switch (value) {
    case UserRole.TEAM_EDITOR:
      color = 'var(--gray-700)';
      valueStr = 'team-member.role.member';
      backgroundColor = 'var(--neutral-300)';
      break;
    case UserRole.TEAM_VIEWER:
      valueStr = 'team-member.role.viewer';
      color = 'var(--gray-700)';
      backgroundColor = 'var(--neutral-300)';
      break;
    case UserRole.TEAM_OWNER:
      color = 'var(--purple-600)';
      valueStr = 'team-member.role.owner';
      backgroundColor = 'var(--purple-50)';
      break;
    default:
      valueStr = null;
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
  const { userInfo } = useSnapshot(AuthStore);
  const [userLabel, setUserLabel] = useState({
    value: '',
    color: '',
    backgroundColor: '',
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (isNotEmpty(userInfo?.role)) {
      const data = generateValueLabel({ value: userInfo?.role ?? '' });
      setUserLabel(data);
    }
  }, [userInfo?.role]);

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
            fontSize: pxToVw('13px'),
            height: pxToVw('22px'),
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
