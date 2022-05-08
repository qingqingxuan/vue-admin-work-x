import { nextTick, reactive, Ref, ref } from "vue";
import useEmit from "./Emit";

export interface IDataTable<T = any> {
  dataList: Ref<T[] | undefined>;
  selectRows: Ref<T[] | undefined>;
  tableConfig: {
    stripe: boolean;
    border: boolean;
    size: string;
    headerCellStyle: any;
    height: number;
  };
  tableLoading: Ref<boolean>;
  handleSuccess: ({
    data,
    totalSize,
  }: {
    data: T[];
    totalSize?: number;
  }) => Promise<{ data: T[] }>;
  handleSelectionChange: (tempSelectRows: T[]) => void;
  [key: string]: any;
}

export default function <T = any>(): IDataTable<T> {
  const dataList = ref<T[]>();
  const selectRows = ref<T[]>();
  selectRows.value = [];
  const tableConfig = reactive({
    stripe: true,
    border: false,
    size: "default",
    headerCellStyle: {
      color: "#333",
    },
    height: 200,
  });
  const tableLoading = ref(true);
  const handleSuccess = ({
    data = [],
    totalSize = 10,
  }: {
    data: T[];
    totalSize?: number;
  }) => {
    dataList.value = data;
    tableLoading.value = false;
    return Promise.resolve({ data, totalSize });
  };
  const handleSelectionChange = (tempSelectRows: T[]) => {
    selectRows.value = tempSelectRows;
  };
  const pageChanged = () => {
    doRefresh();
  };
  const doRefresh = () => {
    throw new Error("you must overwrite `doRefresh` function in `component`");
  };
  const emitter = useEmit();
  function useHeight() {
    return new Promise((res) => {
      nextTick(() => {
        let height = 0;
        const mainEl = document.querySelector(".main-base-style");
        height = (mainEl?.clientHeight || 0) - 39;
        const footerEl = document.querySelector(".footer-wrapper");
        const tableHeaderEl = document.getElementById("tableHeaderContainer");
        const tableConigEl = document.getElementById("tableConfigContainer");
        const tableFooterEl = document.getElementById("tableFooterContainer");
        if (footerEl) {
          height = height - footerEl.clientHeight;
        }
        if (tableHeaderEl) {
          height = height - tableHeaderEl.clientHeight;
          let originHeight = tableHeaderEl.clientHeight;
          emitter?.on("table-collapse-transition", (newVal: boolean) => {
            setTimeout(() => {
              const diff = originHeight - tableHeaderEl.clientHeight;
              originHeight = tableHeaderEl.clientHeight;
              tableConfig.height = tableConfig.height + diff;
            }, 350);
          });
        }
        if (tableConigEl) {
          height = height - tableConigEl.clientHeight;
        }
        if (tableFooterEl) {
          height = height - tableFooterEl.clientHeight;
        }
        nextTick(() => {
          tableConfig.height = height;
        });
        res(height);
      });
    });
  }
  function offTableCollapseTransition() {
    emitter?.off("table-collapse-transition");
  }
  return {
    dataList,
    selectRows,
    tableConfig,
    tableLoading,
    handleSuccess,
    handleSelectionChange,
    offTableCollapseTransition,
    useHeight,
  };
}
