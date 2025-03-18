import * as yup from 'yup';

export const deleteTeamValidationSchema = yup
  .object({
    isConfirmDownload: yup.bool().oneOf([true], 'delete-team.dialog.confirm-required'),
    isConfirmUnderstood: yup.bool().oneOf([true], 'delete-team.dialog.confirm-required'),
  })

export type DeleteTeam = yup.InferType<typeof deleteTeamValidationSchema>;
