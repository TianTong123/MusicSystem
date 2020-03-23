import {req}  from "@/server/req";
let baseUrl = 'devUrl';

// 推荐管理api
const api = {
  //获取热门推荐
  getRecommendList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "song-recommend-table/getSingerList",
    isOriginalGET: true,
    params: data
  }), 
  //删除热门推荐
  deleteRecommend: data => req({
    baseUrl: baseUrl,
    method: "delete",
    url: "song-recommend-table/removeRecommendMusic",
    params: data
  }), 
  //添加到热门推荐
  addRecommend: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "song-recommend-table/addRecommendMusic",
    params: data
  }), 
  //获取轮播图
  getSlideList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "slide-img/getSlideImgList",
    isOriginalGET: true,
    params: data
  }), 
  //删除轮播图
  deleteSlide: data => req({
    baseUrl: baseUrl,
    method: "delete",
    url: "slide-img/deleteSlideImg",
    params: data
  }), 
  //添加到轮播图
  addSlide: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "slide-img/addSlideImg",
    params: data
  }),
}

export default api