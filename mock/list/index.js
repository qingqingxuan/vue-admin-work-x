import Mock, { Random } from "mockjs";
import { baseData } from "../base";
import {
  getDepartmentList,
  getTableList,
  getCardList,
  getCommentList,
  addDepartment,
  getRoleList,
} from "@/api/url";

const totalSize = 30;

function computePageSize(totalSize, page, pageSize) {
  return Math.abs(
    totalSize - pageSize * page >= 0 ? pageSize : totalSize - pageSize * page
  );
}

Mock.mock(RegExp(getDepartmentList), function ({ body }) {
  return Mock.mock({
    ...baseData,
    totalSize,
    data: [
      {
        id: 1,
        name: "总裁办",
        depCode: "dp_code_manager", // 0男 1女
        "order|+1": 1, // 0不是 1是
        createTime: Random.now("yyyy-MM-dd HH:mm:ss"),
        status: 1, // 0 禁用 1正常
      },
      {
        id: 2,
        name: "市场部",
        depCode: "dp_code_marketing", // 0男 1女
        "order|+1": 1, // 0不是 1是
        createTime: Random.now("yyyy-MM-dd HH:mm:ss"),
        status: 1, // 0 禁用 1正常,
        children: [
          {
            id: 3,
            name: "市场一部",
            depCode: "dp_code_marketing_1", // 0男 1女
            "order|+1": 1, // 0不是 1是
            createTime: Random.now("yyyy-MM-dd HH:mm:ss"),
            status: 1, // 0 禁用 1正常
          },
          {
            id: 4,
            name: "市场二部",
            depCode: "dp_code_marketing_2", // 0男 1女
            "order|+1": 1, // 0不是 1是
            createTime: Random.now("yyyy-MM-dd HH:mm:ss"),
            status: 1, // 0 禁用 1正常
          },
        ],
      },
      {
        id: 5,
        name: "技术部",
        depCode: "dp_code_technology", // 0男 1女
        "order|+1": 1, // 0不是 1是
        createTime: Random.now("yyyy-MM-dd HH:mm:ss"),
        status: 1, // 0 禁用 1正常
      },
      {
        id: 6,
        name: "销售部",
        depCode: "dp_code_sale", // 0男 1女
        "order|+1": 1, // 0不是 1是
        createTime: Random.now("yyyy-MM-dd HH:mm:ss"),
        status: 1, // 0 禁用 1正常
      },
    ],
  });
});

Mock.mock(RegExp(getRoleList), function () {
  return Mock.mock({
    ...baseData,
    data: [
      {
        id: 1,
        name: "超级管理员",
        roleCode: "ROLE_admin",
        description: "超级管理员",
        createTime: Random.now("yyyy-MM-dd HH:mm:ss"),
      },
      {
        id: 2,
        name: "编辑员",
        roleCode: "ROLE_editor",
        description: "编辑员",
        createTime: Random.now("yyyy-MM-dd HH:mm:ss"),
      },
    ],
  });
});

Mock.mock(RegExp(addDepartment), function () {
  return Mock.mock({ ...baseData, data: "" });
});

Mock.mock(RegExp(getTableList), function ({ body }) {
  const { page, pageSize = 10 } = JSON.parse(body);
  const size = computePageSize(totalSize, page, pageSize);
  return Mock.mock({
    ...baseData,
    totalSize,
    [`data|${size}`]: [
      {
        "id|+1": 1,
        nickName: function () {
          return Random.name();
        },
        avatar: "@/assets/img_avatar_01.jpeg",
        "gender|0-1": 0, // 0男 1女
        "vip|0-1": 0, // 0不是 1是
        address: function () {
          return Random.city(true);
        },
        lastLoginTime: Random.now("yyyy-MM-dd HH:mm:ss"),
        lastLoginIp: function () {
          return Random.ip();
        },
        "status|0-1": 1, // 0 禁用 1正常
      },
    ],
  });
});

Mock.mock(RegExp(getCardList), function ({ body }) {
  const { page, pageSize = 10 } = JSON.parse(body);
  const size = computePageSize(totalSize, page, pageSize);
  return Mock.mock({
    ...baseData,
    totalSize,
    [`data|${size}`]: [
      {
        id: function () {
          return Random.string(10);
        },
        image: Random.image("300x600", "#50B347", "#FFF", "vue-admin-work"),
        description: function () {
          return Random.csentence(50, 200);
        },
        "price|1000-9999.2": 100,
      },
    ],
  });
});

Mock.mock(RegExp(getCommentList), function ({ body }) {
  const { page, pageSize = 10 } = JSON.parse(body);
  const size = computePageSize(totalSize, page, pageSize);
  return Mock.mock({
    ...baseData,
    totalSize,
    [`data|${size}`]: [
      {
        id: function () {
          return Random.string(10);
        },
        avatar: Random.image("100x100", "#50B347", "#FFF", "vue-admin-work"),
        nickName: function () {
          return Random.cname();
        },
        content: function () {
          return Random.csentence(50, 200);
        },
        "rate|1-5": 5,
        "images|0-1": [
          Random.image("300x600", "#50B347", "#FFF", "vue"),
          Random.image("300x600", "#409EFF", "#FFF", "vue-admin-work"),
          Random.image("300x600", "#F56C6C", "#FFF", "前端"),
        ],
        "status|0-1": 1, // 对外展示状态 0 不展示，1 展示
      },
    ],
  });
});
