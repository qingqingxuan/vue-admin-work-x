import { TinyEmitter } from 'tiny-emitter';
import { defineComponent, inject, onBeforeUnmount, onMounted, provide, reactive, ref } from 'vue';
import { Vue } from 'vue-class-component';

import TableHeader from '@/components/table/TableHeader.vue'
import TableFooter from "@/components/table/TableFooter.vue";
import { useLayoutStore } from 'vaw-layouts-x';

export interface PageModel {
  currentPage: number,
  pageSize: number,
  totalSize: number
}

export const PageModelMixin = defineComponent({
  inject: ['mEmit'],
  data() {
    return {
      pageModel: {
        currentPage: 1,
        pageSize: 10,
        totalSize: 0
      } as PageModel
    }
  },
  methods: {
    pageSizeChanged(pageSize: number) {
      this.pageModel.pageSize = pageSize
      this.pageModel.currentPage = 1
      this.mEmit?.emit('pageChanged', this.pageModel)
    },
    currentChanged(currentPage: number) {
      this.pageModel.currentPage = currentPage
      this.mEmit?.emit('pageChanged', this.pageModel)
    },
    withPageInfoData(otherParams = {}) {
      return {
        ...otherParams,
        page: this.pageModel.currentPage,
        pageSize: this.pageModel.pageSize
      }
    },
    setTotalSize(totalSize: number) {
      this.pageModel.totalSize = totalSize
    },
    refresh() {
      this.mEmit?.emit('pageChanged', this.pageModel)
    }
  },
  mounted() {
    this.mEmit?.on('setTotalSize', this.setTotalSize)
  },
  beforeUnmount() {
    this.mEmit?.off('setTotalSize', this.setTotalSize)
  }
})

export const PageModelSetup = function (): Record<string, any> {
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
  const setPageSize = (pageSize: number) => {
    pageModel.pageSize = pageSize
  }
  const refresh = () => {
    mEmit?.emit('pageChanged', pageModel)
  }
  onMounted(() => {
    mEmit?.on('setTotalSize', setTotalSize)
  })
  onBeforeUnmount(() => {
    mEmit?.off('setTotalSize', setTotalSize)
  })
  return {
    pageModel,
    pageSizeChanged,
    currentChanged,
    withPageInfoData,
    setTotalSize,
    setPageSize,
    refresh
  }
}

export const LikeSearchMixin = defineComponent({
  data() {
    return {
      likeSearchModel: { conditionItems: [] } as LikeSearchModel
    }
  },
  methods: {
    generatorSearchParams() {
      if (this.likeSearchModel.conditionItems && this.likeSearchModel.conditionItems.length > 0) {
        return this.likeSearchModel.conditionItems.reduce((pre: any, cur: any) => {
          pre[cur.name] = cur.value
          return pre
        }, {})
      }
      return {}
    },
    getSearchParams() {
      let searchParams = this.generatorSearchParams()
      if (typeof this.likeSearchModel.extraParams === 'function') {
        searchParams = Object.assign(searchParams, this.likeSearchModel.extraParams())
      } else if (typeof this.likeSearchModel.extraParams === 'object') {
        searchParams = Object.assign(searchParams, this.likeSearchModel.extraParams)
      }
      return searchParams
    },
    resetSearch() {
      this.likeSearchModel.conditionItems && this.likeSearchModel.conditionItems.forEach(it => { it.value = '' })
    },
    hasSearchParams() {
      return this.likeSearchModel.conditionItems?.some(it => it.value !== '')
    }
  }
})

export const LikeSearchSetup = function (): Record<string, any> {
  const likeSearchModel: LikeSearchModel = { conditionItems: null }
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
    return likeSearchModel.conditionItems?.some(it => it.value !== '')
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
      tableLoading: true,
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
      this.tableLoading = false
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

export const TableSetup = function (): Record<string, any> {
  const dataList = reactive([]) as Array<any>;
  let selectRows = reactive([]) as Array<any>;
  const layoutStore = useLayoutStore()
  const tableConfig = {
    stripe: layoutStore.state.theme !== 'dark',
    border: layoutStore.state.theme !== 'dark',
    size: 'small',
    headerCellStyle: layoutStore.state.theme === 'dark' ? {
      color: '#ffffff'
    } : {
      backgroundColor: 'rgb(255, 255, 255)',
      color: '#333333'
    },
    height: '100%'
  } as TableConfig;
  const tableLoading = false;
  const mEmit = new TinyEmitter();
  const tableHeader = ref<InstanceType<typeof TableHeader>>()
  const tableFooter = ref<InstanceType<typeof TableFooter>>()
  provide('mEmit', mEmit);
  onMounted(() => {
    mEmit.on('pageChanged', pageChanged)
  })
  onBeforeUnmount(() => {
    mEmit.off('pageChanged', pageChanged)
  })
  const handleSuccess = ({ data = [], totalSize = 10 }) => {
    mEmit.emit('setTotalSize', totalSize)
    dataList.splice(0, dataList.length)
    dataList.push(...data)
  }
  const handleSelectionChange = (tempSelectRows: Array<any>) => {
    selectRows = tempSelectRows
  }
  const pageChanged = () => {
    doRefresh()
  }
  const doRefresh = () => {
    throw new Error('you must overwrite `doRefresh` function in `component`')
  }
  const getTableHeader = () => {
    if (tableHeader.value) {
      return tableHeader.value
    }
    throw new Error('ref `tableHeader` does not exist on $refs, but please check set ref=`tableHeader` ')
  }
  const getTableFooter = () => {
    if (tableFooter.value) {
      return tableFooter.value
    }
    throw new Error('ref `tableFooter` does not exist on $refs, but please check set ref=`tableFooter` ')
  }
  const getPageInfo = () => {
    return getTableFooter()?.withPageInfoData()
  }
  return {
    dataList,
    selectRows,
    tableConfig,
    tableLoading,
    handleSuccess,
    handleSelectionChange,
    doRefresh,
    getTableHeader,
    getTableFooter,
    getPageInfo
  }
}
