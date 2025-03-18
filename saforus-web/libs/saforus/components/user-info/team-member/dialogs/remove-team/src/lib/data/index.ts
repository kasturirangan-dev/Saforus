import { useSnapshot } from 'valtio';
import { useMutation } from 'react-query';
import { removeTeam, UserTeamStore } from '@web-workspace/saforus/components/user-info/team-member/data';
import { useForm } from 'react-hook-form';
import { DeleteTeam, deleteTeamValidationSchema } from './utils';
import { yupResolver } from '@hookform/resolvers/yup';

const useDeleteTeamData = ({ onClose }: { onClose: () => void }) => {
  const { team, destroyStore } = useSnapshot(UserTeamStore);

  const { mutate: onRemoveTeam, isLoading: loading, error } = useMutation(removeTeam, {
    onSuccess: () => {
      destroyStore();
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeleteTeam>({
    defaultValues: {
      isConfirmDownload: false,
      isConfirmUnderstood: false,
    },
    resolver: yupResolver(deleteTeamValidationSchema),
  });

  const onSubmit = () => {
    onRemoveTeam(team?.id);
    onClose();
  };




  return {
    onSubmit,
    register,
    handleSubmit,
    setValue,
    errors,
    error,
  };
};

export default useDeleteTeamData;
