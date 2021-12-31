import { nextTick, reactive, ref, shallowReactive } from "vue";
import useEmit from "./Emit";

export default function (): Record<string, any> {
  const dataList = shallowReactive([]) as Array<any>;
  const selectRows = ref<Array<any>>([]);
  const tableConfig = reactive({
    stripe: true,
    border: false,
    size: 'small',
    headerCellStyle: {
      color: '#333'
    },
    height: 200
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
  const emitter = useEmit()
  function useHeight() {
     return new Promise((res) => {
      nextTick(() => {
        let height = 0
        const mainEl = document.querySelector('.main-base-style')
        height = (mainEl?.clientHeight || 0) - 47
        const footerEl = document.querySelector('.footer-wrapper')
        const tableHeaderEl = document.getElementById('tableHeaderContainer')
        const tableConigEl = document.getElementById('tableConfigContainer')
        const tableFooterEl = document.getElementById('tableFooterContainer')
        if (footerEl) {
          height = height -(footerEl.clientHeight)
        }
        if (tableHeaderEl) {
          height = height - (tableHeaderEl.clientHeight)
          let originHeight = tableHeaderEl.clientHeight
          emitter?.on('table-collapse-transition', (newVal: boolean) => {
            setTimeout(() => {
              const diff = originHeight - tableHeaderEl.clientHeight
              originHeight = tableHeaderEl.clientHeight
              tableConfig.height = tableConfig.height + diff
            }, 350)
          })
        }
        if (tableConigEl) {
          height = height - (tableConigEl.clientHeight)
        }
        if (tableFooterEl) {
          height = height - (tableFooterEl.clientHeight)
        }
        nextTick(() => {
          tableConfig.height = height
        })
        res(height)
      })
     })
  }
  function offTableCollapseTransition() {
    emitter?.off('table-collapse-transition')
  }
  return {
    dataList,
    selectRows,
    tableConfig,
    tableLoading,
    handleSuccess,
    handleSelectionChange,
    doRefresh,
    useHeight,
    offTableCollapseTransition
  }
}
