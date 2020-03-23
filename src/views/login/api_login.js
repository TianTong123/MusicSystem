import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 登录api
const api = {
  login: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/login",
    params: data
  }), 
  //注销
  logout: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/logout",
    params: data
  }), 
}

export default api