<img src="http://qingqingxuan.gitee.io/img/logo.png" align="center" style="zoom: 50%"/>

<h1 align = "center">Vue Admin Work X</h1>

## 重要升级

经过一段时间的升级改造，全新 Vue Admin Work X 测试版终于和大家见面了，此次升级改造可以说是非常大的，对整体的框架做了调整。

之前的 VueAdminWorkX 做为 Vue2 到 Vue3 的过渡版本，因此保留了大量的 Vue2 的写法和大量的 Javascript 的语法，随着 Vue3 的不断完善，对 Typescript 的支持也日益强大，所以此次升级，把 Vue2 的写法基本上都转成了 Vue3 的写法，有大量的`setup` 和 `setup`语法糖语法，尽情享受 Vue3 带来的便捷吧，原来的 Javascript 代码也基本转成了 Typescript 语法。

同时，也为了更好适配到真实的项目，删除了很多不太实用的功能，一定程度上减少了包的体积和后期维护的成本。

此次升级目前保留在 `layout` 分支上，在 clone 代码的时候，一定要选对分支。`master`分支会在一段时间之后彻底被废弃。

`git clone -b layout https://github.com/qingqingxuan/vue-admin-work-x.git`

tip: 本次升级也升级了 Element Plus 版本，由于 Elment Plus 版本和之前的差别比较大，可能在某些情况下会有 bug，如遇到请提交一个 issue，再次感谢大家的支持

## 简介：

Vue Admin Work X，是 Vue Admini Work 系列中基于 Vue3 开发的中后台框架，全面的系统配置，优质模板，常用组件，真正一站式开箱即用 采用时下比较流行的 Vue3 UI 库--Element Plus

使用了当今流行的技术框架： `Vue3 + Webpack + Typescript + Element Plus`

## 项目地址：

- [🎉 官网地址](http://qingqingxuan.gitee.io/work-p-site)
- [🎉Vue Admin Work X **gitee** 演示地址](http://qingqingxuan.gitee.io/vue-admin-work-x)

## Vue Admin Work 授权客服

| <img src="http://qingqingxuan.gitee.io/img/weixin-custom.jpeg" style="zoom:20%;" /> |
| :---------------------------------------------------------------------------------: |

## vue-admin-work 前端讨论群及 QQ 客服

| <img src="http://qingqingxuan.gitee.io/img/qq-custom.png" style="zoom:20%;" /> | <img src="http://qingqingxuan.gitee.io/img/qq-vip-group.png" style="zoom:20%;" /> |
| :----------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |

## 关注微信公众号 `知码前端` 方便以后更新、升级

<img src="http://qingqingxuan.gitee.io/img/wx-service.jpg" align="center"/>

## 适合人群

- 正在以及想使用 vue/element plus 开发，最好是有一定的编程知识，或者原来只从事切图写静态页的人想提高自己的前端能力。
- 熟悉 Vue.js 技术栈，使用它开发过几个实际项目。
- 对原理技术感兴趣，想进阶和提升的同学。

## 下载&安装

```shell
# 克隆项目，如果github打开速度比较慢，可以使用gitee地址
git clone -b layout https://github.com/qingqingxuan/vue-admin-work-x.git
# or
git clone -b layout https://github.com/qingqingxuan/vue-admin-work-x.git

# 进入项目目录
cd vue-admin-work-x
# 安装依赖
npm install
# 本地开发 启动项目
npm run dev
```

## 特别感谢

| **🚀 [vue3.x](https://cn.vuejs.org/)**                     |
| ---------------------------------------------------------- |
| **[🚀 element-plus]([网站快速成型工具)**                   |
| **[🚀 vue-router-next](https://next.router.vuejs.org/)**   |
| **[🚀 vuex-next](https://next.vuex.vuejs.org/)**           |
| **[🚀 axios](http://www.axios-js.com/)**                   |
| **[🚀 mockjs](http://mockjs.com/)**                        |
| **[🚀 echarts](https://echarts.apache.org/zh/index.html)** |

## 优势及注意事项

```tex
vue-admin-work 有如下优势:
1. 支持前端控制路由权限和后端控制路由模式
2. 支持 mock ，完全独立于后台
3. 提供了非常多的 mxin 代码块，方便集成各种功能
4. 内置了大量常用的组件，比如，上传，消息提示等
5. 支持多主题、多布局切换
使用注意事项:
1. 项目默认使用使用vscode工具进行开发，也是唯一推荐的开发工具
2. 项目默认eslint校验规范
3. 项目仅供个人或者团队学习商用。
```

## 效果图

| <img src="http://qingqingxuan.gitee.io/img/demo-x-1.png" style="zoom:20%;" /> | <img src="http://qingqingxuan.gitee.io/img/demo-x-2.jpg" style="zoom:20%;" />        |
| :---------------------------------------------------------------------------: | ------------------------------------------------------------------------------------ |
| <img src="http://qingqingxuan.gitee.io/img/demo-x-3.png" style="zoom:20%;" /> | <img src="http://qingqingxuan.gitee.io/img/demo-x-4.png" style="zoom:20%;" />        |
| <img src="http://qingqingxuan.gitee.io/img/demo-x-5.png" style="zoom:20%;" /> | <img src="http://qingqingxuan.gitee.io/img/demo-x-6.png" style="zoom:20%;" />        |
| <img src="http://qingqingxuan.gitee.io/img/demo-x-7.png" style="zoom:20%;" /> | <img src="http://qingqingxuan.gitee.io/img/project-image-8.png" style="zoom:20%;" /> |

## 捐赠

本项目是开源项目，开源不易，还请各们小主赏杯咖啡，以更好的维护此项目。您的支持是我们前进的最大动力。

| <img src="http://qingqingxuan.gitee.io/img/wx-donation.jpg" style="zoom:20%;" /> | <img src="http://qingqingxuan.gitee.io/img/ali-donation.jpg" style="zoom:20%;" /> |
| :------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
