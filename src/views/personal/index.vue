<template>
  <div class="main-container">
    <div class="box-wrapper">
      <div class="flex">
        <el-card
          class="box-card personal-box"
          :body-style="{ padding: '10px' }"
        >
          <div class="info-wrapper">
            <div class="avatar-wrapper">
              <div
                class="avatar"
                :class="{ 'avatar-touch': touched, 'avatar-end': uploaded }"
                @mouseenter="avatarTouchStart"
              >
                <img :src="avatar" />
              </div>
              <div
                class="camera-layer flex justify-center align-center"
                @click="uploadAvatar"
              >
                <i class="el-icon-camera-solid text-white text-sl"></i>
              </div>
            </div>
            <div class="text-xl">
              {{ nickName }}
            </div>
            <div class="des-wrapper">
              <i class="el-icon-edit"></i>
              冰冻三尺，非一日之寒，成大事者不拘小节。
            </div>
            <div class="text-wrapper">
              <div class="label">昵称：</div>
              <div class="value">蝴蝶飞呀飞</div>
            </div>
            <div class="text-wrapper">
              <div class="label">性别：</div>
              <div class="value">男</div>
            </div>
            <div class="text-wrapper">
              <div class="label">生日：</div>
              <div class="value">2021-1-1</div>
            </div>
            <div class="text-wrapper">
              <div class="label">部门：</div>
              <div class="value">研发部</div>
            </div>
            <div>
              <el-tag
                effect="dark"
                size="small"
              >技术控</el-tag>
              <el-tag
                effect="dark"
                size="small"
              >爱学习</el-tag>
              <el-tag
                effect="dark"
                size="small"
              >大嘴巴</el-tag>
              <el-tag
                effect="dark"
                size="small"
              >宅男</el-tag>
              <el-tag
                type="info"
                effect="dark"
                size="small"
              >嘚嘚没完</el-tag>
              <el-tag
                type="info"
                effect="dark"
                size="small"
              >UP主</el-tag>
              <el-tag
                type="info"
                effect="dark"
                size="small"
              >手机控</el-tag>
            </div>
          </div>
        </el-card>
        <el-card
          class="box-card wating-box flex-sub margin-left"
          :body-style="{ padding: '10px' }"
        >
          <template #header>
            <div class="flex justify-between align-center">
              <span class="text-sm">待办事项</span>
            </div>
          </template>
          <div
            v-for="(item, index) of watingJobs"
            :key="index"
            class="flex wating-item"
          >
            <div class="flex-sub">
              {{ item.title }}
            </div>
            <div style="width: 40px">
              <el-tag
                :type="item.status === 0 ? 'danger' : 'success'"
                size="small"
              >
                {{ item.status === 0 ? "未完成" : "已完成" }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </div>
      <div class="margin-top">
        <el-card
          class="box-card flex-sub"
          :body-style="{ padding: '10px' }"
        >
          <template #header>
            <div class="flex justify-between align-center">
              <span class="text-sm">消息中心</span>
              <el-button
                style="padding: 3px 0"
                type="text"
              >查看更多
                <i class="el-icon-d-arrow-right"></i>
              </el-button>
            </div>
          </template>
          <div
            v-for="(item, index) of messages"
            :key="index"
            class="message-wrapper flex align-center"
          >
            <div
              class="notify"
              :class="{
                'bg-red': item.status === 0,
                'bg-green': item.status === 1,
              }"
            ></div>
            <div class="flex-sub margin-left">
              <div class="message-title">
                {{ item.title }}
              </div>
              <div class="content">
                {{ item.content }}
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useUserStore from "@/store/modules/user";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Personal",
  setup() {
    const touched = ref(false);
    const uploaded = ref(false);
    const avatarTouchStart = () => {
      touched.value = true;
    };
    const uploadAvatar = () => {
      uploaded.value = true;
      setTimeout(() => {
        touched.value = false;
        uploaded.value = false;
      }, 1000);
    };
    const userStore = useUserStore();
    return {
      touched,
      uploaded,
      messages: [
        {
          title: "【总经理通知】",
          content:
            "明天【下午】有【不拘一格】课程直播，公司尝试全新直播模式，其中会直播各个部门员工的工作常态，需要全体家人的配合与支持。具体要求如下：1.、办公桌上只允许放：电脑、水杯、笔记本、笔、电话2.、座椅后背不允许挂衣服，全部放到厨子里3、直播期间，全员上身着工装外套4、直播期间请勿随意走动，文明用语，若进入直播镜头请微笑示意课程直播不仅是介绍课程，更重要的是向客户展示优行教育！[嘿哈][嘿哈][嘿哈]",
          status: 0, // 0未读 1已读
        },
        {
          title: "重要通知：今天要加班，一堆bug等着修改，请全体家人们注意",
          content:
            "为了配合市场家人们努力开单，从今天开始，技术部及教研老师们要努力加班，全力配合市场的家人们多多开单。谢谢大家的支持与配合。",
          status: 0, // 0未读 1已读
        },
        {
          title: "重要通知：今天要加班，一堆bug等着修改，请全体家人们注意",
          content:
            "为了配合市场家人们努力开单，从今天开始，技术部及教研老师们要努力加班，全力配合市场的家人们多多开单。谢谢大家的支持与配合。",
          status: 1, // 0未读 1已读
        },
        {
          title: "重要通知：今天要加班，一堆bug等着修改，请全体家人们注意",
          content:
            "为了配合市场家人们努力开单，从今天开始，技术部及教研老师们要努力加班，全力配合市场的家人们多多开单。谢谢大家的支持与配合。",
          status: 1, // 0未读 1已读
        },
        {
          title: "重要通知：今天要加班，一堆bug等着修改，请全体家人们注意",
          content:
            "为了配合市场家人们努力开单，从今天开始，技术部及教研老师们要努力加班，全力配合市场的家人们多多开单。谢谢大家的支持与配合。",
          status: 1, // 0未读 1已读
        },
      ],
      watingJobs: [
        {
          title: "和朋友同事一起玩王者，吃鸡",
          status: 0, // 0未完成，1已完成
        },
        {
          title: "下班写今日总结",
          status: 1, // 0未完成，1已完成
        },
        {
          title: "中午打卡，吃饭，下去买一瓶快乐水",
          status: 0, // 0未完成，1已完成
        },
        {
          title: "给项目经理演示项目成果，汇报项目进度，查看同事新提交的bug",
          status: 1, // 0未完成，1已完成
        },
        {
          title: "上班打卡",
          status: 0, // 0未完成，1已完成
        },
        {
          title: "和朋友同事一起玩王者，吃鸡",
          status: 0, // 0未完成，1已完成
        },
        {
          title: "下班写今日总结",
          status: 1, // 0未完成，1已完成
        },
        {
          title: "中午打卡，吃饭，下去买一瓶快乐水",
          status: 0, // 0未完成，1已完成
        },
        {
          title: "给项目经理演示项目成果，汇报项目进度，查看同事新提交的bug",
          status: 1, // 0未完成，1已完成
        },
        {
          title: "上班打卡",
          status: 0, // 0未完成，1已完成
        },
      ],
      avatar: userStore.avatar,
      nickName: userStore.nickName,
      avatarTouchStart,
      uploadAvatar,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-tag--dark + .el-tag--dark {
  margin-left: 10px;
  margin-top: 10px;
}
.box-wrapper {
  .personal-box {
    width: 30%;
    .info-wrapper {
      text-align: center;
      .avatar-wrapper {
        display: inline-block;
        width: 6rem;
        height: 6rem;
        margin-top: 20px;
        position: relative;
        .avatar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform-origin: bottom;
          transform: rotate(0deg);
          z-index: 1;
          transition: all 0.5s ease-in-out;
          & > img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid rgb(245, 241, 7);
          }
        }
        .avatar-touch {
          transform: rotate(180deg);
        }
        .avatar-end {
          transform: rotate(0deg);
        }
        .camera-layer {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
        }
      }
      .des-wrapper {
        width: 70%;
        margin: 0 auto;
        font-size: 14px;
        padding: 15px;
      }
      .text-wrapper {
        font-size: 0.8rem;
        margin-top: 10px;
        width: 50%;
        margin: 0 auto;
        .label {
          display: inline-block;
          width: 40%;
          text-align: right;
        }
        .value {
          display: inline-block;
          width: 60%;
          text-align: left;
        }
      }
      .text-wrapper + .text-wrapper {
        margin-top: 15px;
      }
    }
  }
  .message-wrapper {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 10px;
    .notify {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .message-title {
      font-size: 1rem;
    }
    .content {
      font-size: 0.8rem;
      margin-top: 10px;
      line-height: 1rem;
    }
  }
  .message-wrapper + .message-wrapper {
    margin-top: 10px;
  }
  .wating-box {
    width: 30%;
    .wating-item {
      padding: 10px;
      border-bottom: 1px solid #f5f5f5;
    }
  }
}
</style>
