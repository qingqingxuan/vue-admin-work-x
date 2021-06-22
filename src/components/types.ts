import Dialog from './common/Dialog.vue'
import BaseForm from './common/BaseForm.vue'
import TableHeader from './table/TableHeader.vue'
import TableFooter from './table/TableFooter.vue'

export interface DialogConfig {
  beforeShowAction?: () => void;
  autoClose?: boolean;
  innerTitle?: string;
  showSubmitLoading?: boolean;
  validator?: () => boolean;
}

export type DialogType = InstanceType<typeof Dialog>;

export type BaseForm = InstanceType<typeof BaseForm>;

export type TableHeader = InstanceType<typeof TableHeader>;

export type TableFooter = InstanceType<typeof TableFooter>;
