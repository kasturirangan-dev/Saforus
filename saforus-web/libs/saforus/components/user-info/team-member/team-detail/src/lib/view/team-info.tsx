import { useMemo, useState } from 'react';
import { Box, Card, styled, Typography } from '@mui/material';
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import dialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { useTranslation } from 'react-i18next';
import InputToggle from '@web-workspace/shared/components/widgets/input-toggle';
import AuthStore, { Team } from '@web-workspace/shared/hooks/use-auth';
import { useSnapshot } from 'valtio';
import { UserTeamStore } from '@web-workspace/saforus/components/user-info/team-member/data';
import { UserRole } from '@web-workspace/saforus/common/model';
import AutocompleteToggle from '@web-workspace/shared/components/widgets/autocomplete-toggle';

const FormContainer = styled('form')`
  width: 100%;
`;

export interface TeamInfoProps {
  team?: Team;
  handleSubmit: UseFormHandleSubmit<Team>;
  onSubmit: (data: Team) => Promise<void>;
  register: UseFormRegister<Team>;
  onFieldSubmit: (field: keyof Team) => Promise<boolean>;
  setValue: UseFormSetValue<Team>;
  errors: FieldErrors<Team>;
  onDelete: () => void;
  control: Control<Team>;
  getValues: UseFormGetValues<Team>;
}

const TeamInfoView = ({
  team,
  handleSubmit,
  onSubmit,
  register,
  onFieldSubmit,
  setValue,
  errors,
  onDelete,
  control,
  getValues,
}: TeamInfoProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const { userInfo } = useSnapshot(AuthStore);
  const { teamDetailList = [] } = userInfo || {};

  const teamOwnerId = useMemo(() => {
    if (!teamDetailList || !teamDetailList.length) {
      return null;
    }
    const teamDefault = teamDetailList.filter((team) => !team.isDefaultTeam);

    return teamDefault.length && teamDefault[0].teamOwnerId;
  }, [teamDetailList]);

  const { memberOptions } = useSnapshot(UserTeamStore);
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        background: '#FFFFFF',
        borderRadius: '8px',
        flex: 'none',
        order: 0,
        padding: '1.5rem',
      }}
    >
      <Typography variant="h6" color={'var(--gray-900)'}>
        {t('team-detail.team-overview')}
      </Typography>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: { sm: '100%', lg: '70%', xl: '50%' },
            mt: '1rem',
          }}
        >
          <InputToggle
            value={team?.name}
            label={`${t('team-detail.name')}*`}
            labelStyle={{ minWidth: 230, color: 'var(--gray-700)' }}
            valueCss={{
              color: 'var(--gray-300)',
              maxWidth: '70%',
              wordWrap: 'break-word',
              whiteSpace: 'normal',
            }}
            {...register('name')}
            submitValue={async () => {
              return await onFieldSubmit('name');
            }}
            canEdit
            canCopy={false}
            disableActions={!(AuthStore.userInfo?.role === UserRole.TEAM_OWNER)}
            errorMessage={errors?.name?.message}
          />
          {team?.teamOwnerId && (
            <AutocompleteToggle
              {...register('teamOwnerId')}
              value={teamOwnerId?.toString()}
              labelStyle={{ minWidth: 230, color: 'var(--gray-700)' }}
              options={memberOptions}
              label={`${t('team-detail.owner')}*`}
              canCopy={false}
              disableActions={
                !(AuthStore.userInfo?.role === UserRole.TEAM_OWNER)
              }
              valueCss={{ color: 'var(--gray-300)' }}
              onChange={(event: any, option: any) => {
                if (option.value !== team?.teamOwnerId) {
                  dialogStore.openDialog({
                    name: DialogType.ChangeTeamOwner,
                    props: {
                      value: option?.value,
                      label: option?.label,
                      onChange: async () => {
                        setValue('teamOwnerId', option?.value);
                        return await onFieldSubmit('teamOwnerId');
                      },
                      onCancel: () => {
                        setValue('teamOwnerId', team?.teamOwnerId);
                      },
                    },
                  });
                  return true;
                }
              }}
              getOptionDisabled={(option: any) =>
                option.value === teamOwnerId?.toString()
              }
              renderOption={(props: any, option: any) => (
                <Box {...props}>
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {option.label}
                  </Typography>
                </Box>
              )}
            />
          )}
          <InputToggle
            value={team?.description}
            {...register('description')}
            submitValue={async () => {
              return await onFieldSubmit('description');
            }}
            rows={4}
            sx={{ height: 'auto' }}
            multiline
            label={`${t('team-detail.description')}`}
            labelStyle={{ minWidth: 230, color: 'var(--gray-700)' }}
            valueCss={{
              color: 'var(--gray-300)',
              width: '85%',
              maxWidth: '70%',
              wordWrap: 'break-word',
              whiteSpace: 'normal',
            }}
            canEdit
            canCopy={false}
            disableActions={!(AuthStore.userInfo?.role === UserRole.TEAM_OWNER)}
            errorMessage={errors?.description?.message}
            containerCss={{ height: 'auto' }}
            controlCss={{ height: 'auto' }}
          />
          <InputToggle
            value={team?.company ?? '--'}
            label={`${t('team-detail.company-name')}*`}
            labelStyle={{ minWidth: 230, color: 'var(--gray-700)' }}
            canEdit={false}
            canCopy={true}
            valueCss={{ color: 'var(--gray-300)' }}
          />
          <InputToggle
            value={`${team?.companyUrl ?? '--'}`}
            label={`${t('team-detail.company-url')}`}
            labelStyle={{ minWidth: 230, color: 'var(--gray-700)' }}
            canEdit={false}
            canCopy={true}
            valueCss={{ color: 'var(--gray-300)' }}
          />
          <InputToggle
            value={`${team?.country ?? '--'}`}
            label={`${t('team-detail.country')}*`}
            labelStyle={{ minWidth: 230, color: 'var(--gray-700)' }}
            disableActions={true}
            valueCss={{ color: 'var(--gray-300)' }}
          />
        </Box>
      </FormContainer>
    </Card>
  );
};

export default TeamInfoView;
