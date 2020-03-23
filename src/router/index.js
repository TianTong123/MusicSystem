import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/login") //主页
    },
    {
      path: "/tiantong",
      name: "tiantong",
      redirect: "/home",
      component: () => import("@/views"), //框
      children: [
        {
          path: "home",
          name: "home",
          meta:{
            title: '我的桌面',
          },
          component: () => import("@/views/home/home"), //主页
        },
        {//用户管理
          path: "user",
          name: "user",
          meta:{
            title: '用户管理',
          },
          component: () => import("@/views/user/user"), 
        },
        {//音乐管理
          path: "music",
          name: "music",
          meta:{
            title: '音乐管理',
          },
          component: () => import("@/views/music/music"), 
        },
        { //菜单管理
          path: "menu",
          name: "menu",
          meta:{
            title: '菜单管理',
          },
          component: () => import("@/views/menu/menu"),
        },
        { //审核管理
          path: "examine",
          name: "examine",
          meta:{
            title: '审核管理',
          },
          component: () => import("@/views/examine/examine"), 
        },
        { //权限管理
          path: "right",
          name: "right",
          meta:{
            title: '权限管理',
          },
          component: () => import("@/views/right/right"), 
        },
        { //推荐管理
          path: "recommend",
          name: "recommend",
          meta:{
            title: '推荐管理',
          },
          component: () => import("@/views/recommend/recommend"), 
        },
      ]
    },
  ]
})
