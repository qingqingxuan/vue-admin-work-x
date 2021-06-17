import { TinyEmitter } from 'tiny-emitter';
import { defineComponent, inject, onBeforeMount, onMounted, reactive } from 'vue';
import { Vue } from 'vue-class-component';

import TableHeader from '@/components/table/TableHeader.vue'
import TableFooter from "@/components/table/TableFooter.vue";

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

interface SelectOptionItem{
  label: string;
  value: any
}

export interface TableSearchItem {
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


export interface LikeSearchModel{
  conditionItems: Array<TableSearchItem>,
  extraParams?: (() => Record<string, any>) |  Record<string, any>
}

export const PageModelMixin = function(): Record<string, any> {
  const mEmit = inject<TinyEmitter>('mEmit') 
  const pageModel = reactive({
    currentPage: 1,
    pageSize: 10,
    totalSize: 0
  })
  const pageSizeChanged = (pageSize: number) => {
    pageModel.pageSize = pageSize
    pageModel.currentPage = 1
    mEmit?.emit('pageChanged', pageModel)
  }
  const currentChanged = (currentPage: number) => {
    pageModel.currentPage = currentPage
    mEmit?.emit('pageChanged', pageModel)
  }
  const withPageInfoData = (otherParams = {}) => {
    return {
      ...otherParams,
      page: pageModel.currentPage,
      pageSize: pageModel.pageSize
    }
  }
  const setTotalSize = (totalSize: number) => {
    pageModel.totalSize = totalSize
  }
  const refresh =() => {
    mEmit?.emit('pageChanged', pageModel)
  }
  onMounted(() => {
    mEmit?.on('setTotalSize', setTotalSize)
  })
  onBeforeMount(() => {
    mEmit?.off('setTotalSize', setTotalSize)
  })
  return {
    pageModel,
    pageSizeChanged,
    currentChanged,
    withPageInfoData,
    setTotalSize,
    refresh
  }
}

export const LikeSearchMixin = function() : Record<string, any> {
  const likeSearchModel: LikeSearchModel = { conditionItems: [] }
  const generatorSearchParams = () => {
    if (likeSearchModel.conditionItems && likeSearchModel.conditionItems.length > 0) {
      return likeSearchModel.conditionItems.reduce((pre: any, cur: any) => {
        pre[cur.name] = cur.value
        return pre
      }, {})
    }
    return {}
  }
  const getSearchParams = () => {
    let searchParams = generatorSearchParams()
    if (typeof likeSearchModel.extraParams === 'function') {
      searchParams = Object.assign(searchParams, likeSearchModel.extraParams())
    } else if (typeof likeSearchModel.extraParams === 'object') {
      searchParams = Object.assign(searchParams, likeSearchModel.extraParams)
    }
    return searchParams
  }
  const resetSearch = () => {
    likeSearchModel.conditionItems && likeSearchModel.conditionItems.forEach(it => { it.value = '' })
  }
  const hasSearchParams = () => {
    return likeSearchModel.conditionItems.some(it => it.value !== '')
  }
  
  return {
    likeSearchModel,
    getSearchParams,
    resetSearch,
    hasSearchParams
  }
}


export default defineComponent({
  data() {
    return {
      dataList: [] as Array<any>,
      selectRows: [] as Array<any>,
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
      tableLoading: false,
      mEmit: new TinyEmitter()
    }
  },
  provide() {
    return {
      mEmit: this.mEmit,
    };
  },
  mounted() {
    this.mEmit.on('tableHeightChanged', this.tableHeightChanged)
    this.mEmit.on('pageChanged', this.pageChanged)
  },
  beforeUnmount() {
    this.mEmit.off('tableHeightChanged', this.tableHeightChanged)
    this.mEmit.off('pageChanged', this.pageChanged)
  },
  methods: {
    tableHeightChanged() {
      this.tableConfig.height = this.$refs.tableBody ? (this.$refs.tableBody as Vue).$el.offsetHeight - 10 - 2 : '100%'
    },
    handleSuccess({ data = [], totalSize = 10 }) {
      this.mEmit.emit('setTotalSize', totalSize)
      this.dataList = data
    },
    handleSelectionChange(selectRows: Array<any>) {
      this.selectRows = selectRows
    },
    pageChanged() {
      this.doRefresh()
    },
    doRefresh(): never {
      throw new Error('you must overwrite `doRefresh` function in `component`')
    },
    getTableHeader() {
      if (this.$refs.tableHeader) {
        return (this.$refs.tableHeader as typeof TableHeader)
      }
      throw new Error('ref `tableHeader` does not exist on $refs, but please check set ref=`tableHeader` ')
    },
    getTableFooter() {
      if (this.$refs.tableFooter) {
        return (this.$refs.tableFooter as typeof TableFooter)
      }
      throw new Error('ref `tableFooter` does not exist on $refs, but please check set ref=`tableFooter` ')
    },
    getPageInfo() {
      return this.getTableFooter().withPageInfoData()
    }
  }
})
