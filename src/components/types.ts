export interface DialogConfig{
  beforeShowAction?: () => void;
  autoClose?: boolean;
  innerTitle?: string;
  showSubmitLoading?: boolean;
}