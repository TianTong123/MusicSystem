import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 音乐管理api
const api = {
  //获取用户类型列表
  getMusicList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "music/getMusicList",
    isOriginalGET: true,
    params: data
  }), 
  //停启用音乐
  enableMusic: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "music/batchEditMusic",
    params: data
  }),
}

export default api