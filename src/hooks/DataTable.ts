import { useLayoutStore } from "@/layouts";
import { ref, shallowReactive } from "vue";

export default function (): Record<string, any> {
  const dataList = shallowReactive([]) as Array<any>;
  const selectRows = shallowReactive([]) as Array<any>;
  const layoutStore = useLayoutStore()
  const tableConfig = {
    stripe: layoutStore.state.theme !== 'dark',
    border: false,
    size: 'small',
    headerCellStyle: layoutStore.state.theme === 'dark' ? {
      color: '#ffffff'
    } : {
      backgroundColor: 'rgb(255, 255, 255)',
      color: '#333333'
    },
    height: '100%'
  } as TableConfig;
  const tableLoading = ref(true);
  const handleSuccess = ({ data = [], totalSize = 10 }) => {
    dataList.length = 0
    dataList.push(...data)
    tableLoading.value = false
    return Promise.resolve({ data, totalSize })
  }
  const handleSelectionChange = (tempSelectRows: Array<any>) => {
    selectRows.length = 0
    selectRows.push(...tempSelectRows)
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
