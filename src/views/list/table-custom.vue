<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template v-slot:right>
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="onDeleteItem(null)"
        >删除
        </el-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template #tableConfig>
        <div class="flex justify-between padding">
          <el-link :underline="false">表格设置</el-link>
          <div>
            <span class="margin-right">
              <el-checkbox v-model="tableConfig.border">表格边框</el-checkbox>
            </span>
            <span class="margin-right">
              <el-checkbox v-model="tableConfig.stripe">斑马纹</el-checkbox>
            </span>
            <el-tooltip
              class="item"
              effect="dark"
              content="刷新页面"
              placement="top"
            >
              <el-button
                circle
                type="success"
                icon="el-icon-refresh"
                size="mini"
                @click="doRefresh"
              />
            </el-tooltip>
            <SortableTable
              class="margin-left"
              :table-props="tableProps"
              @update="onUpdateTable"
            />
          </div>
        </div>
      </template>
      <template #default>
        <el-table
          ref="table"
          v-loading="tableLoading"
          :data="dataList"
          :header-cell-style="tableConfig.headerCellStyle"
          :size="tableConfig.size"
          :stripe="tableConfig.stripe"
          :border="tableConfig.border"
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
            v-for="item of tableProps"
            :key="item.props"
            align="center"
            :prop="item.prop"
            :label="item.title"
          >
            <template #default="scope">
              <div
                v-if="item.prop === 'gender'"
                class="gender-container flex justify-center align-center"
              >
                <img
                  class="gender-icon"
                  :src="scope.row.gender === 0 ? require('@/assets/icon_sex_man.png') : require('@/assets/icon_sex_woman.png')"
                />
                <span>{{ scope.row.gender === 0 ? '男' : '女' }}</span>
              </div>
              <div
                v-else-if="item.prop === 'vip'"
                class="avatar-container"
              >
                <el-image
                  :src="require('@/assets/img_avatar_default.png')"
                  class="avatar"
                  :class="{'avatar-vip' : scope.row.vip === 1}"
                />
                <img
                  v-if="scope.row.vip === 1"
                  class="vip"
                  :src="require('@/assets/img_vip_icon.png')"
                />
              </div>
              <div v-else>{{ scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
          >
            <template v-slot="scope">
              <el-button
                type="text"
                @click="onDeleteItem(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
    <TableFooter ref="tableFooter" />
  </div>
</template>

<script lang="ts">
import TableMixin from "@/mixins/TableMixin";
import { defineComponent } from "@vue/runtime-core";
import { showConfirmBox, showErrorMessage } from "@/components/types";
export default defineComponent({
  name: "TableCustom",
  mixins: [TableMixin],
  data() {
    return {
      tableProps: [
        {
          title: "姓名",
          prop: "nickName",
          checked: true,
        },
        {
          title: "头像",
          prop: "vip",
          checked: true,
        },
        {
          title: "性别",
          prop: "gender",
          checked: true,
        },
        {
          title: "地址",
          prop: "address",
          checked: true,
        },
      ],
      userModel: {
        address: "",
        avatar: "",
        gender: 1,
        id: 1,
        lastLoginIp: "",
        lastLoginTime: "",
        nickName: "",
        status: 0,
        vip: 1,
      },
    };
  },
  mounted() {
    this.doRefresh();
  },
  methods: {
    doRefresh() {
      this.$post({
        url: this.$urlPath.getTableList,
        data: () => {
          return {
            ...this.getPageInfo(),
          };
        },
      })
        .then(this.handleSuccess)
        .catch(console.log);
    },
    onDeleteItem(item: any) {
      if (item) {
        showConfirmBox("是否要删除此数据，删除后不恢复？").then(() => {
          showConfirmBox("模拟删除成功，参数为：" + item.id);
        });
      } else {
        if (!this.$_.isEmpty(this.selectRows)) {
          showConfirmBox("是否要删除此数据项，删除后不恢复？").then(() => {
            showConfirmBox(
              "模拟删除成功，参数为：" +
                JSON.stringify({
                  ids: this.selectRows.map((it) => it.id).join(","),
                })
            );
          });
        } else {
          showErrorMessage("请选择要删除的数据项");
        }
      }
    },
    onUpdateTable(tableProps: Array<TablePropsType>) {
      this.tableProps = tableProps.filter((it: TablePropsType) => it.checked);
    },
  },
});
</script>

<style lang="scss" scoped>
.avatar-container {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  vertical-align: middle;
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .avatar-vip {
    border: 2px solid #cece1e;
  }
  .vip {
    position: absolute;
    top: 0;
    right: -9px;
    width: 15px;
    transform: rotate(60deg);
  }
}
.gender-container {
  .gender-icon {
    width: 20px;
  }
}
</style>
