import { Table } from 'element-plus/lib/el-table/src/table.type';
import { computed, defineComponent, reactive, watch } from 'vue';
import { Vue } from 'vue-class-component';

// import { RefreshActionMixin } from './ActionMixin.js'
// const pageEvents = {
//   setTotalSize(size: number) {
//     this.pageModel.totalSize = size
//   }
// }

// export const PageModelMixin = {
//   mixins: [RefreshActionMixin],
//   data() {
//     return {
//       pageModel: {
//         currentPage: 1,
//         pageSize: 10,
//         totalSize: 0
//       }
//     }
//   },
//   methods: {
//     pageSizeChanged(pageSize) {
//       this.pageModel.pageSize = pageSize
//       this.pageModel.currentPage = 1
//       this.publishEvent('pageChanged', this.pageModel)
//     },
//     currentChanged(currentPage) {
//       this.pageModel.currentPage = currentPage
//       this.publishEvent('pageChanged', this.pageModel)
//     },
//     withPageInfoData(otherParams = {}) {
//       return {
//         ...otherParams,
//         page: this.pageModel.currentPage,
//         pageSize: this.pageModel.pageSize
//       }
//     }
//   },
//   created() {
//     this.registeEvent(pageEvents)
//   }
// }

// const tableEvents = {
//   pageChanged() {
//     this.doRefresh()
//   }
// }

interface HeaderCellStyle {
  backgroundColor? :string,
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

export default defineComponent({
  data() {
    return {
      dataList: [],
      tableConfig: {
        stripe: this.$layoutStore.state.theme !== 'dark',
        border: this.$layoutStore.state.theme !== 'dark',
        size: 'small',
        headerCellStyle: this.$layoutStore.state.theme === 'dark' ? {
          color: '#ffffff'
        } : {
          backgroundColor: 'rgb(255, 255, 255)',
          color: '#333333'
        },
        height: '100%'
      } as TableConfig,
      tableLoading: false
    }
  },
  mounted() {
    this.$emitter.on('tableHeightChanged', () => {
      this.tableConfig.height = this.$refs.tableBody ? (this.$refs.tableBody as Vue).$el.offsetHeight - 10 - 2 : '100%'
    })
  },
  methods: {
    // handleSuccess({ data = [], totalSize = 10 }) {
    //   this.publishEvent('setTotalSize', totalSize)
    //   this.dataList = data
    // }
  },
  created() {
    // this.registeEvent(tableEvents)
  }
})

// export const useTableConfig = function (): any {
//   const layouStore = useLayoutStore()
//   const isDark = layouStore.state.theme === 'dark'
//   const tableConfig: TableConfig = {
//     dataList: [],
//     stripe: isDark,
//     border: isDark,
//     size: 'small',
//     headerCellStyle: isDark ? {
//       color: '#ffffff'
//     }: {
//       backgroundColor: 'rgb(255, 255, 255)',
//       color: '#333333'
//     },
//     height: '100%',
//     tableLoading: false
//   }
//   return {
//     tableConfig
//   }
// }
