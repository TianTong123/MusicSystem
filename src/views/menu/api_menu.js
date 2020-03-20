import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 菜单api
const api = {
  //获取菜单
  getMenuList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "menu/getMenuList",
    isOriginalGET: true,
    params: data
  }), 
  //停启用菜单
  enableMenu: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "menu/batchEditMenu",
    params: data
  }),
  //新增菜单
  addMenu: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "menu/addMenu",
    params: data
  }),
  //编辑菜单
  editMenu: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "menu/editMenu",
    params: data
  }),
}

export default api