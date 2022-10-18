<template>
  <el-card :body-style="{padding: '5px'}">
    <el-descriptions
      class="margin-top"
      title="订单信息"
      :column="3"
      border
    >
      <el-descriptions-item>
        <template #label>
          订单编号
        </template>
        jd123456789
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          下单时间
        </template>
        2021-01-01
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          送货方式
        </template>
        xx快递
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          承运人
        </template>
        123456快递
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          付款方式
        </template>
        在线支付
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          付款方式
        </template>
        在线支付
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          付款时间
        </template>
        2021-01-21 10:14:19
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          收货人
        </template>
        张三
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          地址
        </template>
        北京市xxxx路xxxx号
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      class="margin-top"
      title="客户信息"
      :column="3"
      border
    >
      <el-descriptions-item>
        <template #label>
          <i class="el-icon-user"></i>
          用户名
        </template>
        张三
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        18888888888
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <i class="el-icon-location-outline"></i>
          居住地
        </template>
        北京市
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <i class="el-icon-tickets"></i>
          备注
        </template>
        <el-tag
          size="small"
          type="danger"
        >VIP客户</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        北京市xxxx路xxxx号
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      class="margin-top"
      title="商品信息"
      :column="3"
      border
    >
      <el-descriptions-item label="商品名">iPhone12Plus</el-descriptions-item>
      <el-descriptions-item label="商品编号">g41263486417863</el-descriptions-item>
      <el-descriptions-item label="产地">苏州市</el-descriptions-item>
      <el-descriptions-item label="商品图片">
        <el-image
          style="width: 40px"
          :src="require('@/assets/images/2.jpeg')"
        ></el-image>
      </el-descriptions-item>
      <el-descriptions-item label="商品规格">颜色：红色；大小：xxl；材质：金属</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Descriptions",
});
</script>
