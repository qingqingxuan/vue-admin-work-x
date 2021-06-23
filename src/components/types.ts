import Dialog from './common/Dialog.vue'
import BaseForm from './common/BaseForm.vue'
import TableHeader from './table/TableHeader.vue'
import TableFooter from './table/TableFooter.vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { MessageBoxData } from 'element-plus/lib/el-message-box/src/message-box.type';
import { TypedMessageParams } from 'element-plus/lib/el-message/src/types';

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

export function showConfirmBox(message:string, title = '提示'): Promise<MessageBoxData> {
  return ElMessageBox.confirm(message, title)
}

export function showSuccessMessage(message = ''): void {
  ElMessage.success({ message } as TypedMessageParams<'success'>)
}

export function showErrorMessage(message = ''): void {
  ElMessage.error({ message } as TypedMessageParams<'error'>)
}