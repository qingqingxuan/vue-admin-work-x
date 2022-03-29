<template>
  <div class="main-container">
    <div>
      <el-card
        :body-style="{padding: 0}"
        shadow="hover"
      >
        <div class="flex justify-between padding-sm">
          <el-link :underline="false">添加学校</el-link>
          <el-button
            size="default"
            type="primary"
          >立即添加</el-button>
        </div>
      </el-card>
    </div>
    <div class="content-wrapper margin-top">
      <el-card
        :body-style="{padding: 0}"
        shadow="hover"
      >
        <div class="flex justify-between padding-sm solid-bottom">
          <el-link :underline="false">基本信息</el-link>
        </div>
        <el-form
          v-model="baseInfoModel"
          label-width="80px"
          class="form-wrapper"
          size="default"
          label-position="right"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="学校名称">
                <el-input
                  v-model="baseInfoModel.name"
                  placeholder="请输入学校名称"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="在线状态">
                <el-radio-group v-model="baseInfoModel.isOnLine">
                  <el-radio :label="0">线下</el-radio>
                  <el-radio :label="1">线上</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="加盟方式">
                <el-radio-group
                  v-model="baseInfoModel.joinType"
                  size="default"
                >
                  <el-radio-button label="普通" />
                  <el-radio-button label="独家" />
                  <el-radio-button label="代理" />
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="学校地址">
                <el-input
                  v-model="baseInfoModel.address"
                  placeholder="请输入学校地址"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="学校备注">
                <el-input
                  v-model="baseInfoModel.remark"
                  placeholder="请输入学校备注"
                  type="textarea"
                  :rows="3"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card
        :body-style="{padding: 0}"
        class="margin-top-xs"
      >
        <div class="flex justify-between padding-sm solid-bottom">
          <el-link :underline="false">其它信息</el-link>
        </div>
        <el-form
          v-model="baseInfoModel"
          label-width="80px"
          class="form-wrapper"
          size="default"
          label-position="right"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="管理员">
                <el-select
                  v-model="baseInfoModel.manager"
                  style="width: 100%"
                  placeholder="请选择一个学校管理员"
                >
                  <el-option
                    v-for="item of managerList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="学生数量">
                <el-input-number
                  v-model="baseInfoModel.studentNum"
                  size="default"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="到期时间">
                <el-date-picker
                  v-model="baseInfoModel.endTime"
                  type="date"
                  style="width: 100%"
                  placeholder="请选择到期日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card
        :body-style="{padding: 0}"
        class="margin-top"
      >
        <div class="flex justify-end padding-sm">
          <el-button
            size="default"
            type="primary"
          >立即添加</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const managerList = reactive([
  {
    id: 1,
    name: "王冬",
  },
  {
    id: 2,
    name: "陈新宇",
  },
  {
    id: 3,
    name: "刘琪",
  },
]);
const baseInfoModel = reactive({
  name: "",
  isOnLine: 0,
  joinType: "普通",
  address: "",
  remark: "",
  manager: "",
  studentNum: 100,
  endTime: "",
});
</script>

<style lang="scss" scoped>
.content-wrapper {
  overflow-y: auto;
  @media screen and (max-width: 768px) {
    .form-wrapper {
      margin-top: 2%;
      width: 98%;
      padding-left: 4%;
    }
  }
  @media screen and (min-width: 768px) {
    .form-wrapper {
      margin-top: 2%;
      width: 50%;
      padding-left: 4%;
    }
  }
}
</style>
