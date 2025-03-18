import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Badge,
  styled,
  Stack,
  ButtonBase,
} from '@mui/material';
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar';
import { CSSProperties } from 'react';
import { isEmpty } from 'lodash-es';

export interface CustomAvatarProps extends AvatarProps {
  name?: string;
  nameStyle?: CSSProperties;
  jobTitle?: string;
  jobTitleStyle?: CSSProperties;
  size?: number;
  badgeSize?: number;
  statusColor?: string | undefined;
  avatarStyle?: CSSProperties;
  style?: CSSProperties;
  avatarUrl?: string;
  avatarIcon?: Jsx.Element;
  showName?: boolean;
  showStatus?: boolean;
  disabled?: boolean;
  onClick?: (params: any) => any;
  onAvatarClick?: (params: any) => any;
}

const StyledAvatar = styled(MuiAvatar)(({ theme }) => ({
  '&.Mui-disabled': {
    background: 'var(--neutral-700)',
  },
}));

const AvatarBox = styled(ButtonBase)(({ theme }) => ({
  borderRadius: '50%',
  '&.Mui-disabled': {
    background: 'var(--neutral-700)',
  },
}));

const UserInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const Circle = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: 'var(--blue-600)',
  border: '2px solid var(--base-white)',
}));

const AvatarStack = styled(Stack)(({ theme }) => ({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '22px',
  letterSpacing: '-0.1px',
  color:
    theme.palette.mode === 'light' ? 'var(--gray-600)' : 'var(--neutral-600)',
  textOverflow: 'ellipsis',
}));

export function Avatar(props: CustomAvatarProps) {
  const {
    style,
    name,
    nameStyle,
    jobTitle,
    jobTitleStyle,
    showStatus = true,
    showName,
    avatarUrl,
    avatarIcon,
    size = 48,
    badgeSize = 16,
    statusColor = 'var(--blue-600)',
    avatarStyle,
    onClick,
    onAvatarClick,
    disabled,
    ...otherProps
  } = props;

  const [cusName, setCusName] = useState('');

  useEffect(() => {
    if (!isEmpty(name) && name?.length > 20) {
      setCusName(name?.substring(0, 20) + '...');
    } else {
      setCusName(name ?? '');
    }
  }, [name]);

  return (
    <AvatarStack style={style} onClick={onClick}>
      <React.Fragment>
        {showStatus && (
          <AvatarBox onClick={onAvatarClick} disabled={disabled}>
            <Badge
              overlap="circular"
              sx={{ color: `${statusColor}` }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Circle
                  sx={{
                    width: badgeSize,
                    height: badgeSize,
                    backgroundColor: statusColor,
                  }}
                />
              }
            >
              <StyledAvatar
                style={avatarStyle}
                alt={name}
                src={avatarUrl}
                {...otherProps}
                sx={{ width: size, height: size }}
              >
                {avatarIcon}
              </StyledAvatar>
            </Badge>
          </AvatarBox>
        )}
        {showStatus || (
          <AvatarBox onClick={onClick} disabled={disabled}>
            <StyledAvatar
              style={avatarStyle}
              alt={name}
              src={avatarUrl}
              {...otherProps}
              sx={{ width: size, height: size }}
            >
              {avatarIcon}
            </StyledAvatar>
          </AvatarBox>
        )}
        {showName && (
          <UserInfoBox>
            {name && (
              <Text noWrap style={nameStyle}>
                {cusName}
              </Text>
            )}
            {jobTitle && (
              <Text style={jobTitleStyle} sx={{ color: 'var(--gray-50)' }}>
                {jobTitle}
              </Text>
            )}
          </UserInfoBox>
        )}
      </React.Fragment>
    </AvatarStack>
  );
}

export default Avatar;
