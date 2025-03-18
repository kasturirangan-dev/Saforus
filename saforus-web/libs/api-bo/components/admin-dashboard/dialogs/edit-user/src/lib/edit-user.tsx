import React, { useState } from 'react';
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
  UserDetails,
} from '@web-workspace/api-bo/components/admin-dashboard/data';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller } from 'react-hook-form';

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

  const [defaultValue, setDefaultValue] = useState(selectedUserData?.roles[0]);
  const [editing, setEditing] = useState(true);
  const roleOptions = [
    { value: 'VIEWER', label: 'Viewer' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'SYS_ADMIN', label: 'Super Admin' }
  ];

  const handleRoleChange = (event, field) => {
    const value = event.target.value;
    setDefaultValue(value);
    field.onChange(value);
  };

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
                  <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Name*</Typography>
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
                          readOnly: editing,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setEditing(!editing)}
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
                  <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Login Account*</Typography>
                </Box>
                <Box>
                  <TextField
                    variant="standard"
                    value={selectedUserData?.email}
                    InputProps={{
                      disableUnderline: true,
                      readOnly: true,
                    }}
                    sx={{ width: '130%', paddingX: 2, }}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: '2em' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: 'var(--gray-700)',
                }}
              >
                Role*
              </Typography>
              <Controller
                name="roles"
                control={control}
                render={({ field }) => (
                  <Select
                    sx={{ height: '40px', width: '50%' }}
                    value={defaultValue}
                    onChange={(event) => handleRoleChange(event, field)}
                  >
                    {roleOptions.map((role) => (
                      <MenuItem key={role.value} value={role.value}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.roles && (
                <Typography variant="body2" color="error">
                  {errors.roles.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ mt: '1em' }}>
              <Button
                onClick={onClose}
                color="secondary"
                sx={{
                  mr: 2, height: 46, width: 150, '& .MuiButton-label': {
                    color: 'error.main'
                  }
                }}
              >
                <Typography color="error.main">
                  Delete Account
                </Typography>
              </Button>
              <Button
                onClick={onClose}
                color="secondary"
                sx={{ mr: 2, height: 46, width: 150 }}
              >
                Reset Password
              </Button>
            </Box>
          </FormContainer>
        </BoxContainer >
      }
      contentCss={{ paddingBottom: '1.5rem' }}
    />
  );
};

export default EditUserDialog;
