import Dialog from './common/Dialog.vue'
import BaseForm from './common/BaseForm.vue'
import TableHeader from './table/TableHeader.vue'
import TableFooter from './table/TableFooter.vue'
import { ElMessage, ElMessageBox, MessageBoxData } from 'element-plus';


export interface DialogConfig {
  beforeShowAction?: () => void;
  autoClose?: boolean;
  innerTitle?: string;
  showSubmitLoading?: boolean;
  validator?: () => boolean;
}

export type DialogType = InstanceType<typeof Dialog>;

export type BaseFormType = InstanceType<typeof BaseForm>;

export type TableHeader = InstanceType<typeof TableHeader>;

export type TableFooter = InstanceType<typeof TableFooter>;

export function showConfirmBox(message:string, title = '提示'): Promise<MessageBoxData> {
  return ElMessageBox.confirm(message, title)
}

export function showSuccessMessage(message = ''): void {
  ElMessage.success({ message })
}

export function showErrorMessage(message = ''): void {
  ElMessage.error({ message })
}