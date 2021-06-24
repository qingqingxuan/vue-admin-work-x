<template>
  <div class="main-container">
    <div
      class="flex justify-center align-center"
      style="height: 100%"
    >
      <el-button
        type="primary"
        size="small"
        @click="$refs.dialog.show()"
      >打开拖拽对话框</el-button>
    </div>
    <Dialog
      ref="dialog"
      title="这是一个可以拖拽的对话框"
    >
      <template #content>
        <div class="text-center text-bold text-lg">《酬乐天咏老见示》唐·刘禹锡</div>
        <div class="text-center margin-top">人谁不顾老，老去有谁怜。</div>
        <div class="text-center margin-top">身瘦带频减，发稀冠自偏。</div>
        <div class="text-center margin-top">废书缘惜眼，多灸为随年。</div>
        <div class="text-center margin-top">经事还谙事，阅人如阅川。</div>
        <div class="text-center margin-top">细思皆幸矣，下此便翛然。</div>
        <div class="text-center margin-top">莫道桑榆晚，为霞尚满天。</div>
      </template>
    </Dialog>
  </div>
</template>

<script>
export default {
  name: "DialogDraggable",
};
</script>

