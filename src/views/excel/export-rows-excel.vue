<template>
  <div class="main-container">
    <TableHeader>
      <template v-slot:right>
        <el-button
          type="primary"
          size="small"
          @click="exportExcel"
        >导出选中的Excel
        </el-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template #default>
        <el-table
          ref="table"
          :data="dataList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="45"
          />
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

<script lang="ts" setup>
import { getTableList } from "@/api/url";
import { showErrorMessage } from "@/components/types";
import { useDataTable, usePost } from "@/hooks";
import { onMounted, ref } from "vue";
import XLSX from "xlsx";

const post = usePost();
const { handleSuccess, dataList, selectRows, handleSelectionChange } =
  useDataTable();
const tableBody = ref();

function doRefresh() {
  post({
    url: getTableList,
    data: {
      page: 1,
      pageSize: 20,
    },
  })
    .then(handleSuccess)
    .catch(console.log);
}
function exportExcel() {
  console.log(selectRows);
  if (selectRows.length === 0) {
    showErrorMessage("请先选择要导出的条目");
    return;
  }
  const data = selectRows.map((it: any) => {
    return [
      it.nickName,
      it.gender === 0 ? "男" : "女",
      it.address,
      it.lastLoginTime,
      it.lastLoginIp,
    ];
  });
  data.unshift(["昵称", "性别", "地址", "上次登录时间", "上次登录IP"]);
  const workSheet = XLSX.utils.aoa_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "数据报表");
  XLSX.writeFile(workBook, "tale-list.xlsx");
}
onMounted(doRefresh);
</script>

<style lang="scss" scoped>
.table-container {
  bottom: 0;
}
</style>
