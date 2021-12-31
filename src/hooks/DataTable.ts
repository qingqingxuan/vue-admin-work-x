import { useLayoutStore } from "@/layouts";
import { reactive, ref, shallowReactive, unref } from "vue";

export default function (): Record<string, any> {
  const dataList = shallowReactive([]) as Array<any>;
  const selectRows = ref<Array<any>>([]);
  const layoutStore = useLayoutStore()
  const tableConfig = reactive({
    stripe: true,
    border: false,
    size: 'small',
    headerCellStyle: {
      color: '#333'
    },
    height: '100%'
  });
  const tableLoading = ref(true);
  const handleSuccess = ({ data = [], totalSize = 10 }) => {
    dataList.length = 0
    dataList.push(...data)
    tableLoading.value = false
    return Promise.resolve({ data, totalSize })
  }
  const handleSelectionChange = (tempSelectRows: Array<any>) => {
    selectRows.value = tempSelectRows
  }
  const pageChanged = () => {
    doRefresh()
  }
  const doRefresh = () => {
    throw new Error('you must overwrite `doRefresh` function in `component`')
  }
  return {
    dataList,
    selectRows,
    tableConfig,
    tableLoading,
    handleSuccess,
    handleSelectionChange,
    doRefresh,
  }
}
