### 2022-10-14(2.3.1)

- 升级：`element-plus` 版本至 `2.2.18`

- 优化：适配 `pnpm` 管理工具

### 2022-9-20(2.3.0)

- 适配上下分栏布局

- 优化部分代码

### 2022-9-8(2.2.4)

- 升级：`element-plus` 版本至 `2.2.17`

### 2022-8-8(2.2.3)

- 升级：`element-plus` 版本至 `2.2.15`

### 2022-5-8(2.2.2)

- 升级：`element-plus` 版本至 `2.1.11`

- 新增：新增 `FormItemRender` 功能，通过 `render` 可以方便自定义 `form` 表单项

- 优化：优化 `views/system` 下面的功能，添加 `类型`

- 优化：优化 `README.md` 文档

### 2022-4-25(2.2.1)

- 升级：`element-plus` 版本至 `2.1.8`

- 重要升级：`v-permission` 指令源码文件 由原来的 `js` 转成 `ts` 写法

- 升级：在路由中添加 `isSingle` 属性，可以方便配置只有一个子路由时

- 升级：支持 `post` `get` 请求方法的 `泛型`，如：

  ```ts
  // 定义数据类型
  interface RoleModelType {
    id: number;
    name: string;
    roleCode: string;
    description: string;
    createTime: string;
  }
  const {
    handleSuccess,
    dataList,
    tableLoading,
    tableConfig,
  }: IDataTable<RoleModelType> = useDataTable();

  function doRefresh() {
    post<Array<RoleModelType>>({
      url: getRoleList,
      data: {},
    })
      .then((res) => {
        handleSuccess(res);
      })
      .catch(console.log);
  }
  ```

function doRefresh() {
post<Array<RoleModelType>>({
url: getRoleList,
data: {},
})
.then((res) => {
handleSuccess(res);
})
.catch(console.log);
}

```

### 2022-3-31(2.2.0)

- 重要升级：全面移除本地 `mock` 功能，采用线上真实的接口数据。但本地 `mock` 数据会保留

- 修复：`IconSelector`组件点击不出现的 `bug`

- 调整：调整项目中所有的 `form` 元素尺寸为由原来的 `small` 改为 `default`

- 调整：修改 `ElTag` `type` 为默认

### 2022-3-29(2.1.7)

- 升级：升级 `ElementPlus`版本为 `2.1.7`

- 修复：`menu` 在横向模式下拉子菜单列表 `hover` 是深色的 bug

- 调整：修改 `menu` 中默认的图标为 `Operation`

- 优化：`table` 高度计算流程

- 调整：`把tableHeader` 合并到 `tableBody` 中

- 调整：调整项目中所有的 `form` 元素尺寸为由原来的 `small` 改为 `default`

### 2022-3-17(2.1.6)

- 修改：`layout 模式 为 ttb `在 非 `pc` 下头部显示空的 bug

### 2022-3-15(2.1.5)

- 升级：升级 `ElementPlus`版本为 `2.0.5`

- 修复：修复 `TreeSelect` 因升级 `Element-Plus` 带来而不能出现选项的 bug

- 修复：修复 `tabbar` 中 404 页面，显示为 空 的 bug

- 移除：移除 `Tabbar` 中 `show-humburger` 的 属性

- 优化：`BaseForm`组件中，在没有设置 `span`的情况下，不能占满全部一行的问题

- 升级：移除 `Dialog`组件中自定义指令实现拖拽的功能，使用 `el-dialog` 自带的 `draggable` 属性

- 修改：移除 `el-button`、`el-tag` 等组件中 `size="mini"`，改成 `size="small"`

### 2022-2-10(2.1.4)

- 升级：升级 `ElementPlus` 组件库到正式版： `2.0.1`

- 升级：升级重新设计 `在上下布局模式下` 菜单栏显示到最顶端

### 2022-1-15(2.1.3)

- 修复：修复在 `role.vue` 分配菜单权限的逻辑问题，`tree`组件使用的 bug

- 修复：修复在 点击`刷新`按钮 刷新页面的时候，会在 `tabbar` 上添加一条空的记录

- 修复：在带有模糊搜索的时候，点击分页 不会带着模糊搜索条件的 bug

### 2022-1-10(2.1.2)

- 优化：在`src/utils/router.ts` 文件中 使用 `pinia` 获取用户信息

- 修复：在侧边栏分栏的模式下 切换 `tabbar `时，`Menu` 不选中的 bug

- 修复：`表单页面` 中某些页面中 `表单项` 不能输入的 bug

### 2022-1-7(2.1.1)

- 新增：`pinia` 第三方依赖

- 移除：`vuex` 第三方依赖

- 移除：`layoutStore` 中 关于用户信息的逻辑代码，保证用户信息唯一入口是: `pinia` 的 `useUserStore`

- 升级：`vue` 版本到 `3.2.25`

- 升级：`typescript` 版本到 `4.4.4`

### 2021-12-31(2.1.0)

- 优化了 `系统管理` 下面的所有的功能

- 优化显示 `table` 表格页面

- 新增：新增 `IconSelector.vue` 组件

- 新增：新增 `TreeSelector.vue` 组件

- 新增：新增 `table` 中 `useHeight` 功能

### 2021-12-29(2.0.0-alpha.5)

- 修复：修复 `路由` 地址相同，参数不一样时，参数覆盖的 bug

- 升级：`side` 背景颜色和前景颜色优化，柔和化

- 优化：`role.vue` 菜单编辑功能

### 2021-12-20(2.0.0-alpha.4)

- 修复：修复 `路由` 地址相同，参数不一样时，参数覆盖的 bug

- 升级：`side` 背景颜色和前景颜色优化，柔和化

- 优化：`role.vue` 菜单编辑功能

### 2021-12-16(2.0.0-alpha.3)

- 升级：升级 `Element Plus` 版本到 `1.2.0-beta.6`，具体的升级信息请参考 `Element Plus` 官网

- 修复：`src/views/form/advance-form.vue` 引用 失败的 bug

- 修复：`src/components/table/TableFooter.vue` 分页功能，在点击左右切换时，页码不改变的 bug

### 2021-11-29(2.0.0-alpha.2)

- 修复：当路由参数携带 query 参数的时候，点击 tabbar 会重复出现 并且 参数会丢失的 bug

### 2021-11-23(2.0.0-alpha.1)

- 重要升级：把 vaw-layouts-x 项目合并到 Vue Admin Work X 中
- 重要升级：基本上组件都由 Vue3 重写，Javascript 代码更换成 Typescript 代码
- 重要升级：重写部分组件样式，重构 LayoutStore 功能

### 2021-11-17(2.0.0)

- 重要升级：把 vaw-layouts-x 项目合并到 Vue Admin Work X 中
```
