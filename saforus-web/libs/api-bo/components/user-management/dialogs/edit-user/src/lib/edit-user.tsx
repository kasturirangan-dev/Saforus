import React, { useMemo, useState } from 'react';
import useUserEditData from './data';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import EditIcon from './assets/edit.svg';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';
import {
  Avatar,
  Box,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import Icon from '@web-workspace/shared/components/widgets/icon';
import {
  TimeZones,
  UserDetails,
} from '@web-workspace/api-bo/components/user-management/data';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller } from 'react-hook-form';
import { formatDateWithLanguage, formatedTimezone, getLocalTimeZone } from '@web-workspace/shared/helpers/dates';
const BoxContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}));

const FormContainer = styled('form')``;

type EditUserDialogProps = {
  selectedUserData: UserDetails;
  onClose: () => void;
};

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  selectedUserData,
  onClose,
}) => {
  const { onSubmit, handleSubmit, errors, control, watch, loading } =
    useUserEditData({
      slectedUser: selectedUserData,
      onClose,
    });

  const [editingName, setEditingName] = useState(false);
  const [editingCompany, setEditingCompany] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const subscriptionModel = [
    { value: 'FREE', label: 'Free' },
    { value: 'BASIC', label: 'Basic' },
    { value: 'PROFESSIONAL', label: 'Professional' },
    { value: 'ENTERPRISE', label: 'Enterprise' }
  ];

  const currentTimezone = useMemo(() => {
    const { localTz } = getLocalTimeZone();
    const { timeZone } = formatedTimezone(localTz);
    const timeZoneObject = TimeZones.find((el) => el.value === timeZone);

    return timeZoneObject?.value;
  }, []);

  const formatedCreateDate = formatDateWithLanguage({
    date: selectedUserData?.createdAt,
    isDetail: true,
    withSlash: true,
    timezoneString: currentTimezone
  })


  return (
    <Dialog
      PaperProps={{
        style: {
          minWidth: '900px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '5px',
        },
      }}
      onClose={onClose}
      rightIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      rightIconCss={{
        marginRight: '1rem',
        marginTop: '1rem',
      }}
      footer={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            width: '100%'
          }}
        >
          <Button
            onClick={onClose}
            color="secondary"
            sx={{
              height: 46,
              width: 150
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            color="primary"
            onClick={handleSubmit(onSubmit)}
            type="submit"
            loading={loading}
            sx={{
              height: 46,
              width: 150,
              whiteSpace: 'nowrap'
            }}
          >
            Save Changes
          </LoadingButton>
        </Box>
      }
      dialogCss={{
        width: '100%',
        alignItems: 'center',
        margin: 'auto',
      }}
      dialogContent={
        <BoxContainer>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              gap: '8px',
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Edit Account
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent='center'
            gap="16px"
            paddingX={2}
          >
            <Box
              display="flex"
              alignItems="flex-end"
              gap={1}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  cursor: 'pointer',
                }}
                src={selectedUserData?.avatarUrl}
                imgProps={{ loading: 'lazy' }}
              >
                <Icon name={'avatar'} size={75} color="var(--base-white)" />
              </Avatar>
              <img
                style={{ cursor: 'pointer' }}
                src={EditIcon}
                alt="edit"
              />
            </Box>
          </Box>
          <Typography variant="subtitle1" fontWeight={600}>Account Information</Typography>

          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ width: 800, border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: 40, borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ width: '20%', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                  <Typography sx={{ fontWeight: '500', whiteSpace: 'nowrap', px: 2 }}>Name*</Typography>
                </Box>
                <Box sx={{ flexGrow: 1, position: 'relative', paddingX: 2 }}>
                  <Controller
                    name="accountName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        variant="standard"
                        style={{ color: 'var(--gray-700)', width: '100%' }}
                        {...field}
                        InputProps={{
                          disableUnderline: true,
                          readOnly: !editingName,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setEditingName(!editingName)}
                                edge="end"
                                size="small"
                                sx={{
                                  mr: -1,
                                  '&:hover': {
                                    backgroundColor: 'transparent'
                                  }
                                }}
                              >
                                <img
                                  src={EditIcon}
                                  alt="edit"
                                  style={{
                                    width: '20px',
                                    height: '20px'
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        value={field.value ? String(field.value) : undefined}
                      />
                    )}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', height: 40, borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ width: '20%', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                  <Typography sx={{ fontWeight: '500', whiteSpace: 'nowrap', px: 2 }}>Login Account*</Typography>
                </Box>
                <Box>
                  <TextField
                    variant="standard"
                    value={selectedUserData?.email}
                    sx={{ width: '165%', px: 2 }}
                    InputProps={{
                      disableUnderline: true,
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            variant="outlined"
                            sx={{
                              borderColor: '#DAE0E6',
                              color: 'rgb(52, 61, 72)',
                            }}
                          >
                            Change Password
                          </Button>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', height: 40, borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ width: '20%', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                  <Typography sx={{ fontWeight: '500', whiteSpace: 'nowrap', px: 2 }}>Account ID</Typography>
                </Box>
                <Box>
                  <TextField
                    variant="standard"
                    value={selectedUserData?.id}
                    InputProps={{
                      disableUnderline: true,
                      readOnly: true,
                    }}
                    sx={{ width: '200%', paddingX: 2, }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', height: 40, borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ width: '20%', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                  <Typography sx={{ fontWeight: '500', whiteSpace: 'nowrap', px: 2 }}>Company Name</Typography>
                </Box>
                <Box sx={{ flexGrow: 1, position: 'relative', paddingX: 2 }}>
                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        variant="standard"
                        style={{ color: 'var(--gray-700)', width: '100%' }}
                        {...field}
                        InputProps={{
                          disableUnderline: true,
                          readOnly: !editingCompany,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setEditingCompany(!editingCompany)}
                                edge="end"
                                size="small"
                                sx={{
                                  mr: -1,
                                  '&:hover': {
                                    backgroundColor: 'transparent'
                                  }
                                }}
                              >
                                <img
                                  src={EditIcon}
                                  alt="edit"
                                  style={{
                                    width: '20px',
                                    height: '20px'
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        value={field.value ? String(field.value) : undefined}
                      />
                    )}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', height: 40 }}>
                <Box sx={{ width: '20%', backgroundColor: '#f5f5f5', paddingY: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                  <Typography sx={{ fontWeight: '500', whiteSpace: 'nowrap', px: 2 }}>Created Date</Typography>
                </Box>
                <Box>
                  <TextField
                    variant="standard"
                    value={`${formatedCreateDate} (GMT${currentTimezone})`}
                    InputProps={{
                      disableUnderline: true,
                      readOnly: true,
                    }}
                    sx={{ width: '130%', paddingX: 2, }}
                  />
                </Box>
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'var(--gray-50)',
                mt: '1.5em',
              }}
            >
              Recent Session 16/04/2023 09:00 AM (GMT +9)
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'rgb(52, 61, 72)',
                fontWeight: 800,
                fontSize: '18px',
                marginBlock: 4
              }}
            >
              Service Plan
            </Typography>

            <Box sx={{ width: 800, border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: 40, borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ width: '20%', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                  <Typography sx={{ fontWeight: '500', whiteSpace: 'nowrap', px: 2 }}>Service Plan</Typography>
                </Box>
                <Box>
                  <TextField
                    variant="standard"
                    value={selectedUserData?.subscriptionTier}
                    InputProps={{
                      disableUnderline: true,
                      readOnly: true,
                    }}
                    sx={{ width: '130%', paddingX: 2, }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', height: 40, borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ width: '20%', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                  <Typography sx={{ fontWeight: '500', whiteSpace: 'nowrap', px: 2 }}>Description</Typography>
                </Box>
                <Box sx={{ flexGrow: 1, position: 'relative', paddingX: 2 }}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        variant="standard"
                        style={{ color: 'var(--gray-700)', width: '100%' }}
                        {...field}
                        InputProps={{
                          disableUnderline: true,
                          readOnly: editingDesc,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setEditingDesc(!editingDesc)}
                                edge="end"
                                size="small"
                                sx={{
                                  mr: -1,
                                  '&:hover': {
                                    backgroundColor: 'transparent'
                                  }
                                }}
                              >
                                <img
                                  src={EditIcon}
                                  alt="edit"
                                  style={{
                                    width: '20px',
                                    height: '20px'
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        value={field.value ? String(field.value) : undefined}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>

          </FormContainer>
        </BoxContainer >
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default EditUserDialog;
