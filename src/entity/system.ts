/**
 * 用户列表对象模型
 */
interface UserModelType {
  id: number;
  avatar?: string;
  mobile: string;
  email: string;
  gender: number;
  departmentName?: string;
  departmentId: number | string;
  roleName?: string;
  roleId: number | string;
  status: number;
  nickName: string;
  password: string;
}

/**
 * 角色列表对象模型
 */
interface RoleModelType {
  id: number;
  name: string;
  roleCode: string;
  description: string;
  createTime: string;
}

/**
 * 部门列表对象模型
 */
interface DepartmentModelType {
  id: number;
  parentId: number;
  name: string;
  depCode: string;
  order: number;
  status: number;
  children: Array<DepartmentModelType>;
}

/**
 * 菜单列表对象模型
 */
interface MenuModelType {
  menuUrl: string;
  menuName: string;
  icon: string;
  tip: string | number;
  parentPath: string;
  children: MenuModelType[];
  isSelect: boolean;
}
