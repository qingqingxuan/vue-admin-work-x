<template>
  <div class="main-container">
    <TableHeader>
      <template v-slot:right>
        <el-button
          type="primary"
          size="mini"
          @click="exportExcel"
        >导出Excel
        </el-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template #default>
        <el-table
          ref="table"
          :data="dataList"
        >
          <el-table-column
            align="center"
            label="序号"
            width="80"
          >
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="名称"
            prop="nickName"
          />
          <el-table-column
            align="center"
            label="性别"
            prop="gender"
          >
            <template v-slot="scope">
              <span>{{ scope.row.gender === 0 ? '男' : '女' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="地址"
            prop="address"
          />
          <el-table-column
            align="center"
            label="上次登录时间"
            prop="lastLoginTime"
            width="160px"
          />
          <el-table-column
            align="center"
            label="上次登录IP"
            prop="lastLoginIp"
            width="130px"
          />
        </el-table>
      </template>
    </TableBody>
  </div>
</template>

<script>
import TableMixin from '@/mixins/TableMixin'
import { defineComponent } from '@vue/runtime-core'
import XLSX from 'xlsx'
export default defineComponent({
  name: 'ExportExcel',
  mixins: [TableMixin],
  mounted() {
    this.doRefresh()
  },
  methods: {
    doRefresh() {
      this.$post({
        url: this.$urlPath.getTableList,
        data: {
          page: 1,
          pageSize: 20
        }
      }).then(this.handleSuccess).catch(console.log)
    },
    exportExcel() {
      const workSheet = XLSX.utils.table_to_sheet(this.$refs.table.$el)
      const workBook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workBook, workSheet, '数据报表')
      XLSX.writeFile(workBook, 'tale-list.xlsx')
    }
  }
})
</script>

<style lang="scss" scoped>
.table-container {
  bottom: 0;
}
</style>
