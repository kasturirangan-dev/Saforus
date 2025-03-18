import type { ComponentType } from 'react';
import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import { dialogMappings, DialogMappingsType } from './dialog-mapping';

export type DialogStoreType = {
  isOpen: boolean;
  DialogComponent: ComponentType<any> | null;
  dialogProps: Record<string, unknown>;
  openDialog: <K extends keyof DialogMappingsType>(params: {
    name: K;
    props?: Omit<Parameters<DialogMappingsType[K]>[0], 'onClose'>;
  }) => void;
  closeDialog: () => void;
};

const initialState: DialogStoreType = {
  isOpen: false,
  DialogComponent: null,
  dialogProps: {},
  openDialog: async ({ name, props }) => {
    try {
      const importDialog = dialogMappings[name];
      if (importDialog) {
        const module = await importDialog();
        DialogStore.isOpen = true;
        DialogStore.dialogProps = {
          onClose: () => DialogStore.closeDialog(),
          ...props,
        };
        DialogStore.DialogComponent = module.default;
      } else {
        console.error(`Dialog not found: ${name}`);
      }
    } catch (error) {
      console.error(`Failed to load dialog: ${name}`, error);
    }
  },
  closeDialog: () => {
    DialogStore.isOpen = false;
  },
};

const DialogStore = proxy<DialogStoreType>({ ...initialState });

const resetState = () => {
  DialogStore.isOpen = false;
  DialogStore.DialogComponent = null;
  DialogStore.dialogProps = {};
};

devtools(DialogStore, { name: 'DIALOG_STORE' });

export default DialogStore;
