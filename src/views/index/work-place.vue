<template>
  <div class="main-container">
    <el-card :body-style="{ padding: '10px' }" shadow="hover">
      <div class="text-bold text-xl">工作台</div>
      <div v-if="!isMobileScreen" class="flex margin-top">
        <div class="avatar-wrapper">
          <img :src="avatar" />
        </div>
        <div class="flex-sub flex flex-direction justify-around margin-left">
          <div class="text-xl">
            早上好，Andy，青春只有一次，别让自己过得不精彩
          </div>
          <div class="text-grey text-sm">
            <i class="el-icon-heavy-rain"></i> 今日有小雨，出门别忘记带伞哦~
          </div>
        </div>
        <div
          class="flex flex-direction justify-around align-end item-action"
          @click="onTestClick('张三')"
        >
          <div class="text-gray">项目数</div>
          <div class="text-xl">12</div>
        </div>
        <div
          class="flex flex-direction justify-around align-end item-action"
          @click="onTestClick('李四')"
        >
          <div class="text-gray">待办项</div>
          <div class="text-xl">3/20</div>
        </div>
        <div class="flex flex-direction justify-around align-end item-action">
          <div class="text-gray">当前日期</div>
          <div class="text-xl">{{ currentDate }}</div>
        </div>
      </div>
      <div v-else>
        <div class="flex">
          <div class="avatar-wrapper margin-top">
            <img :src="avatar" />
          </div>
          <div class="flex-sub flex flex-direction justify-around margin-left">
            <div class="text-xl">
              早上好，Andy，青春只有一次，别让自己过得不精彩
            </div>
            <div class="text-grey text-sm">
              <i class="el-icon-heavy-rain"></i> 今日有小雨，出门别忘记带伞哦~
            </div>
          </div>
        </div>
        <div class="flex margin-top">
          <div class="flex-sub flex flex-direction align-center">
            <div class="text-gray">项目数</div>
            <div class="text-xl">12</div>
          </div>
          <div class="flex-sub flex flex-direction align-center">
            <div class="text-gray">待办项</div>
            <div class="text-xl">3/20</div>
          </div>
          <div class="flex-sub flex flex-direction align-center">
            <div class="text-gray">当前日期</div>
            <div class="text-xl">{{ currentDate }}</div>
          </div>
        </div>
      </div>
    </el-card>
    <div v-if="!isMobileScreen" class="flex margin-top-xs">
      <div style="flex: 3">
        <el-card :body-style="{ padding: '5px' }">
          <template #header>
            <div>
              <span class="text-bold text-sm">
                <i class="el-icon-menu text-blue"></i>
                我的课程
              </span>
            </div>
          </template>
          <el-row>
            <el-col v-for="(item, index) of dataItems" :key="index" :span="8">
              <ProjectItem :item="item" />
            </el-col>
          </el-row>
        </el-card>
        <el-card :body-style="{ padding: '5px' }" class="margin-top-xs">
          <template #header>
            <div>
              <span class="text-bold text-sm">
                <i class="el-icon-s-opportunity text-blue"></i>
                动态信息
              </span>
            </div>
          </template>
          <el-row v-for="(item, index) of trendsItems" :key="index">
            <TrendsItem :item="item">
              <template #title="{ title }">
                <div v-html="title"></div>
              </template>
            </TrendsItem>
          </el-row>
        </el-card>
      </div>
      <div style="flex: 2; margin-left: 5px">
        <el-card :body-style="{ padding: 0 }">
          <template #header>
            <div class="flex justify-between">
              <span class="text-bold text-sm">
                <i class="el-icon-s-order text-blue"></i>
                快捷操作
              </span>
            </div>
          </template>
          <el-row>
            <el-col v-for="(item, index) of fastActions" :key="index" :span="8">
              <div
                @click="fastActionClick(item)"
                class="
                  fast-item-wrapper
                  flex flex-direction
                  justify-center
                  align-center
                "
              >
                <div
                  :class="[item.icon, 'iconfont']"
                  :style="{ color: item.color, 'font-size': '20px' }"
                ></div>
                <div class="margin-top-xs">{{ item.title }}</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="margin-top-xs">
          <template #header>
            <div class="flex justify-between">
              <span class="text-bold text-sm">
                <i class="el-icon-s-order text-blue"></i>
                待办事项
              </span>
            </div>
          </template>
          <TodoItem
            v-for="(item, index) of tempWaitingItems"
            :key="index"
            :item="item"
          />
          <div v-if="isShowMore" class="text-center">
            <el-button type="text" @click="toggleMore"
              >{{ showWatingMode ? "收起更多" : "显示更多" }}
              <i
                class="el-icon-view"
                :class="[
                  showWatingMode ? 'el-icon-caret-top' : 'el-icon-caret-bottom',
                ]"
              >
              </i>
            </el-button>
          </div>
        </el-card>
      </div>
    </div>
    <div v-else class="margin-top-xs">
      <el-card shadow="never" :body-style="{ padding: '5px' }">
        <template #header>
          <div>
            <span class="text-bold text-sm">
              <i class="el-icon-menu text-blue"></i>
              我的课程
            </span>
          </div>
        </template>
        <el-row>
          <el-col v-for="(item, index) of dataItems" :key="index" :span="8">
            <ProjectItem :item="item" />
          </el-col>
        </el-row>
      </el-card>
      <el-card
        :body-style="{ padding: '5px' }"
        shadow="never"
        class="margin-top-xs"
      >
        <template #header>
          <div>
            <span class="text-bold text-sm">
              <i class="el-icon-s-opportunity text-blue"></i>
              动态信息
            </span>
          </div>
        </template>
        <el-row v-for="(item, index) of trendsItems" :key="index">
          <TrendsItem :item="item">
            <template #title="{ title }">
              <div v-html="title"></div>
            </template>
          </TrendsItem>
        </el-row>
      </el-card>
      <el-card
        shadow="never"
        :body-style="{ padding: 0 }"
        class="margin-top-xs"
      >
        <template #header>
          <div class="flex justify-between">
            <span class="text-bold text-sm">
              <i class="el-icon-s-order text-blue"></i>
              快捷操作
            </span>
          </div>
        </template>
        <el-row>
          <el-col v-for="(item, index) of fastActions" :key="index" :span="8">
            <div
              @click="fastActionClick(item)"
              class="
                fast-item-wrapper
                flex flex-direction
                justify-center
                align-center
              "
            >
              <div
                :class="[item.icon, 'iconfont']"
                :style="{ color: item.color, 'font-size': '20px' }"
              ></div>
              <div class="margin-top-xs">{{ item.title }}</div>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never" class="margin-top-xs">
        <template #header>
          <div class="flex justify-between">
            <span class="text-bold text-sm">
              <i class="el-icon-s-order text-blue"></i>
              待办事项
            </span>
          </div>
        </template>
        <TodoItem
          v-for="(item, index) of tempWaitingItems"
          :key="index"
          :item="item"
        />
        <div v-if="isShowMore" class="text-center">
          <el-button type="text" @click="toggleMore"
            >{{ showWatingMode ? "收起更多" : "显示更多" }}
            <i
              class="el-icon-view"
              :class="[
                showWatingMode ? 'el-icon-caret-top' : 'el-icon-caret-bottom',
              ]"
            >
            </i>
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import ProjectItem from "./components/ProjectItem.vue";
import TrendsItem from "./components/TrendsItem.vue";
import TodoItem from "./components/TodoItem.vue";
import HTML5_PATH from "@/assets/img_html5.jpeg";
import CSS_PATH from "@/assets/img_css.jpeg";
import JAVASCRIPT_PATH from "@/assets/img_javascript.jpeg";
import REACT_PATH from "@/assets/img_react.jpeg";
import VUE_PATH from "@/assets/img_vue.jpeg";
import ANGULAR_PATH from "@/assets/img_angular.jpeg";
import AVATAR_01 from "@/assets/img_avatar_01.jpeg";
import AVATAR_02 from "@/assets/img_avatar_02.jpeg";
import AVATAR_DEFAULT from "@/assets/img_avatar_default.png";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
} from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useLayoutStore } from "@/layouts/hooks";
import { random } from "lodash";
import useUserStore from "@/store/modules/user";
const COLORS = ["#67C23A", "#E6A23C", "#F56C6C", "#409EFF"];
const date = new Date();
export default defineComponent({
  name: "WorkPlace",
  components: {
    ProjectItem,
    TrendsItem,
    TodoItem,
  },
  setup() {
    const waitingItmes = [
      {
        content: "早上，中午，晚上上下班别忘记打卡",
        time: "04-05",
        bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      },
      {
        content: "给经理打印文件",
        time: "04-04",
        bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      },
      {
        content: "下班断电",
        time: "04-03",
        bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      },
      {
        content:
          "等到周末的时候和同事一起去逛街，买新衣服，买新手机，买包包，各种买买买",
        time: "04-02",
        bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      },
      {
        content: "新同事入职培训工作",
        time: "04-01",
        bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      },
      {
        content: "给领导安排机票，酒店住宿等问题",
        time: "03-31",
        bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      },
    ];
    const isShowMore = computed(() => {
      return waitingItmes.length > 4;
    });
    const isMobileScreen = computed(() => {
      return useLayoutStore().state.device === "mobile";
    });
    const userStore = useUserStore();
    const tempWaitingItems = reactive([] as Array<any>);
    const showWatingMode = ref(false);
    const toggleMore = () => {
      showWatingMode.value = !showWatingMode.value;
      tempWaitingItems.length = 0;
      if (showWatingMode.value) {
        tempWaitingItems.push(...waitingItmes);
      } else {
        tempWaitingItems.push(...waitingItmes.slice(0, 4));
      }
    };
    const router = useRouter();
    const fastActionClick = ({ path = "/" }) => {
      router.push(path);
    };
    onMounted(() => {
      tempWaitingItems.push(
        ...(waitingItmes.length > 4 ? waitingItmes.slice(0, 4) : waitingItmes)
      );
    });
    function onTestClick(name: string) {
      router.push({
        path: "/query/query",
        query: {
          name,
        },
      });
    }
    return {
      isShowMore,
      isMobileScreen,
      tempWaitingItems,
      avatar: userStore.avatar,
      onTestClick,
      currentDate:
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(),
      dataItems: [
        {
          title: "HTML5",
          imagePath: HTML5_PATH,
        },
        {
          title: "CSS3",
          imagePath: CSS_PATH,
        },
        {
          title: "JavaScript",
          imagePath: JAVASCRIPT_PATH,
        },
        {
          title: "React",
          imagePath: REACT_PATH,
        },
        {
          title: "Vue",
          imagePath: VUE_PATH,
        },
        {
          title: "Angular",
          imagePath: ANGULAR_PATH,
        },
      ],
      trendsItems: [
        {
          avatar: AVATAR_01,
          title:
            '<span><span class="margin-right text-blue">孙悟空</span>发表了一条动态<span class="margin-left text-blue">《看我七十二变》</span></span>',
        },
        {
          avatar: AVATAR_02,
          title:
            '<span><span class="margin-right text-blue">唐僧</span>赞了<span class="margin-left-sm text-blue">八戒</span><span class="margin-left text-blue">~今天晚上的猪头肉真香~</span></span>',
        },
        {
          avatar: AVATAR_01,
          title:
            '<span><span class="margin-right text-blue">孙悟空</span>发表了一条动态<span class="margin-left text-blue">《看我七十二变》</span></span>',
        },
        {
          avatar: AVATAR_02,
          title:
            '<span><span class="margin-right text-blue">唐僧</span>赞了<span class="margin-left-sm text-blue">八戒</span><span class="margin-left text-blue">~今天晚上的猪头肉真香~</span></span>',
        },
        {
          avatar: AVATAR_DEFAULT,
          title:
            '<span><span class="margin-right text-blue">我</span>提交了请假申请',
        },
      ],
      fastActions: [
        {
          title: "首页",
          icon: "icon-dashboard-fill",
          path: "/",
          color: COLORS[random(0, COLORS.length)],
        },
        {
          title: "系统管理",
          path: "/system/department",
          icon: "icon-setting-fill",
          color: COLORS[random(0, COLORS.length)],
        },
        {
          title: "列表",
          path: "/list/table-custom",
          icon: "icon-detail-fill",
          color: COLORS[random(0, COLORS.length)],
        },
        {
          title: "表单",
          path: "/form/base-form-view",
          icon: "icon-file-text-fill",
          color: COLORS[random(0, COLORS.length)],
        },
        {
          title: "多级菜单",
          path: "/next/menu2/menu-2-1/menu-2-1-1",
          icon: "icon-golden-fill",
          color: COLORS[random(0, COLORS.length)],
        },
        {
          title: "更多功能",
          path: "/other/qrcode",
          icon: "icon-appstore-fill",
          color: COLORS[random(0, COLORS.length)],
        },
      ],
      showWatingMode,
      fastActionClick,
      toggleMore,
    };
  },
});
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  width: 5rem;
  height: 5rem;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid yellowgreen;
  }
}
.item-action {
  position: relative;
  padding: 0 30px;
}
.item-action::after {
  position: absolute;
  top: 20%;
  right: 0;
  height: 60%;
  content: "";
  display: block;
  width: 1px;
  background-color: #e0e0e0;
}
div.item-action:last-child::after {
  width: 0;
}
.fast-item-wrapper {
  border-right: 1px solid #f7f7f7;
  border-bottom: 1px solid #f7f7f7;
  height: 80px;
}
.fast-item-wrapper:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px #ddd;
}
.el-link + .el-link {
  margin-bottom: 10px;
}
</style>
