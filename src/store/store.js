import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      userName: "",
      account: "",
      uid: "",
      id: "",
    },//当前登陆人信息
    token: "",
    loading: false,//局部loading
    isFullLoading: false,//true显示全屏loading，false显示局部loading
  },

  mutations: {
    
  }
});
  
export default store;