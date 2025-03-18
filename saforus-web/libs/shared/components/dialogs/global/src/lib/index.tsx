import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import dialogStore from '@web-workspace/shared/components/dialogs/store';
import LoadingIndicator from '@web-workspace/shared/components/widgets/loading-indicator';

const GlobalDialog = () => {
  const { isOpen, DialogComponent, dialogProps } = useSnapshot(dialogStore);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        dialogStore.closeDialog();
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [isOpen]);

  if (!isOpen || !DialogComponent) return null;

  const Component = DialogComponent as React.ComponentType<any>;

  return (
    <React.Suspense fallback={<LoadingIndicator />}>
      <Component {...dialogProps} />
    </React.Suspense>
  );
};

export default GlobalDialog;
