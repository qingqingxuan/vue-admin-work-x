<template>
  <div class="main-container">
    <el-card :body-style="{padding: 0}">
      <template #header>
        <span type="text">通知提示</span>
      </template>
      <div class="padding">
        <el-button
          size="small"
          type="primary"
          plain
          @click="openNotify('primary')"
        >普通</el-button>
        <el-button
          size="small"
          type="success"
          plain
          @click="openNotify('success')"
        >成功</el-button>
        <el-button
          size="small"
          type="warning"
          plain
          @click="openNotify('warning')"
        >警告</el-button>
        <el-button
          size="small"
          type="danger"
          plain
          @click="openNotify('danger')"
        >错误</el-button>
        <el-button
          size="small"
          type="info"
          plain
          @click="openNotify('html')"
        >带有HTML片段</el-button>
      </div>
    </el-card>
    <el-card :body-style="{padding: 0}">
      <template #header>
        <span type="text">确认对话框</span>
      </template>
      <div class="padding">
        <el-button
          size="small"
          type="primary"
          plain
          @click="openConfirm('primary')"
        >普通</el-button>
        <el-button
          size="small"
          type="warning"
          plain
          @click="openConfirm('warning')"
        >确认</el-button>
        <el-button
          size="small"
          type="info"
          plain
          @click="openConfirm('html')"
        >带有HTML片段</el-button>
      </div>
    </el-card>
    <el-card :body-style="{padding: 0}">
      <template #header>
        <span type="text">消息提示</span>
      </template>
      <div class="padding">
        <el-button
          size="small"
          type="primary"
          plain
          @click="openMessage('primary')"
        >普通</el-button>
        <el-button
          size="small"
          type="success"
          plain
          @click="openMessage('success')"
        >成功</el-button>
        <el-button
          size="small"
          type="warning"
          plain
          @click="openMessage('warning')"
        >警告</el-button>
        <el-button
          size="small"
          type="danger"
          plain
          @click="openMessage('danger')"
        >错误</el-button>
        <el-button
          size="small"
          type="info"
          plain
          @click="openMessage('html')"
        >带有HTML片段</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tip",
  methods: {
    openNotify(type: string) {
      switch (type) {
        case "primary":
          (this as any).$notify({
            title: "提示",
            message: "用户名或者密码错误",
          });
          break;
        case "success":
          (this as any).$notify({
            title: "提示",
            message: "恭喜，登录成功",
            type: "success",
          });
          break;
        case "warning":
          (this as any).$notify({
            title: "提示",
            message: "确定要删除此选项吗？",
            type: "warning",
          });
          break;
        case "danger":
          (this as any).$notify({
            title: "提示",
            message: "操作失败，请检查请求参数",
            type: "error",
          });
          break;
        case "html":
          (this as any).$notify({
            title: "请根据以下步骤进行操作",
            dangerouslyUseHTMLString: true,
            message: `<ul>
            <li style="color: red">选择图片</li>
            <li style="font-weight: bold">上传图片</li>
            <li style="font-size: 20px">展示对应的图片</li>
            </ul>`,
          });
          break;
      }
    },
    openConfirm(type: string) {
      switch (type) {
        case "primary":
          (this as any).$alert("确定要退出当前系统吗？", "提示", {
            confirmButtonText: "确定",
            callback: (action: any) => {
              (this as any).$notify({
                title: "提示",
                message: "已退出当前系统",
                type: "success",
              });
            },
          });
          break;
        case "warning":
          (this as any)
            .$confirm("此操作将永久删除该文件, 是否继续?", "重要提示", {
              confirmButtonText: "删除",
              cancelButtonText: "再想想",
              type: "warning",
            })
            .then(() => {
              (this as any).$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch(() => {
              (this as any).$message({
                type: "info",
                message: "已取消删除",
              });
            });
          break;
        case "html":
          (this as any).$alert(
            `<ul>
            <li style="color: red">选择图片</li>
            <li style="font-weight: bold">上传图片</li>
            <li style="font-size: 20px">展示对应的图片</li>
            </ul>`,
            "请按以下步骤进行操作",
            {
              dangerouslyUseHTMLString: true,
            }
          );
          break;
      }
    },
    openMessage(type: string) {
      switch (type) {
        case "primary":
          (this as any).$message("您有10+条未读消息，请立即查看");
          break;
        case "success":
          (this as any).$message({
            message: "恭喜，登录成功",
            type: "success",
          });
          break;
        case "warning":
          (this as any).$message({
            message: "未选择任何要删除的条目",
            type: "warning",
          });
          break;
        case "danger":
          (this as any).$message({
            message: "操作失败，请检查请求参数",
            type: "error",
          });
          break;
        case "html":
          (this as any).$message({
            dangerouslyUseHTMLString: true,
            message: `<ul>
            <li style="color: red">选择图片</li>
            <li style="font-weight: bold">上传图片</li>
            <li style="font-size: 20px">展示对应的图片</li>
            </ul>`,
          });
          break;
      }
    },
  },
});
</script>

<style scoped>
.el-card + .el-card {
  margin-top: 10px;
}
</style>
