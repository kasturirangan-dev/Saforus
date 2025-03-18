import { PurpleLoadingButton as LoadingButton } from '@web-workspace/shared/components/widgets/loading-button';

function ActionButton(props: any) {
  return (
    <LoadingButton
      fullWidth
      sx={{ height: 46 }}
      loadingPosition="start"
      {...props}
    />
  );
}

export default ActionButton;
