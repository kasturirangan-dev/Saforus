import { DeleteTeam } from "./utils";

export interface DeleteTeamDialogViewProps  {
    onClose: () => void,
    onSubmit: (data: any) => void,
    register: UseFormRegister<DeleteTeam>,
    errors: FieldErrors<DeleteTeam>,
    handleSubmit: UseFormHandleSubmit<DeleteTeam>
};