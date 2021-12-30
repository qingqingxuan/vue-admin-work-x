interface Setting{
  projectName: string
  version: string,
  primaryColor: string,
  theme: string,
  layoutMode: string,
}

interface HeaderCellStyle {
  backgroundColor?: string,
  color: string
}

interface TableConfig {
  dataList: Array<any>;
  stripe: boolean,
  border: boolean,
  size: string,
  headerCellStyle: HeaderCellStyle,
  height: string | number,
  tableLoading: boolean
}

interface SelectOptionItem {
  label: string;
  value: any
}

interface TableSearchItem {
  name: string;
  label: string;
  value: any;
  type: string,
  placeholder?: string;
  selectOptions?: Array<SelectOptionItem>;
  associatedOption?: string;
  onChange?: (value: any, associationItem: string) => void;
  span?: number
}

interface FormItem extends TableSearchItem {
  validator?: (value: FormItem, associationItem?: FormItem) => boolean;
  hidden?: boolean;
  inputType?: string;
  maxLength?: number;
  rows?: number;
  disabled?: boolean,
  radioOptions?: Array<SelectOptionItem>,
  checkOptions?: Array<SelectOptionItem>,
  reset?: () => void
}

interface LikeSearchModel {
  conditionItems: Array<TableSearchItem> | null,
  extraParams?: (() => Record<string, any>) | Record<string, any>
}

interface TreeDataType {
  label: string,
  value: string | number,
  children?: TreeDataType[]
}