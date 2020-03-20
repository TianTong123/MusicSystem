import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 权限api
const api = {
  //获取用户类型列表
  getUserTypeList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "menu/getUserMenu",
    isOriginalGET: true,
    params: data
  }), 
  //修改权限列表
  editRight: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "menu/addMenuToAccountType",
    params: data
  }),
}

export default api