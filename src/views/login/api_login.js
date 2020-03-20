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
}

export default api