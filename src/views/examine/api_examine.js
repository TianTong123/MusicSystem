import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 审核api
const api = {
  // //获取作品列表
  // getWorkList: data => req({
  //   baseUrl: baseUrl,
  //   method: "post",
  //   url: "commodity",
  //   params: data
  // }), 
  // //作品通不通过审核
  // passWork: data => req({
  //   baseUrl: baseUrl,
  //   method: "post",
  //   url: "commodity",
  //   params: data
  // }), 
  // //获取歌手列表
  // getSingerList: data => req({
  //   baseUrl: baseUrl,
  //   method: "get",
  //   url: "songer/getSingerList",
  //   isOriginalGET: true,
  //   params: data
  // }), 
  // //歌手通不通过审核
  // passSinger: data => req({
  //   baseUrl: baseUrl,
  //   method: "post",
  //   url: "commodity",
  //   params: data
  // }),
}

export default api