import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 用户管理api
const api = {
  //获取用户类型列表
  getUserList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "account/getAccountList",
    isOriginalGET: true,
    params: data
  }), 
  //停启用用户
  enableAccount: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/batchEditAccount",
    params: data
  }),
}

export default api