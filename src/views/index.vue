<template>
  <div class="tiantong">
    <header>
      <div class="logo-title">TianTong音乐后台管理系统</div>
      <div class="user-wrap">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-avatar size="small" src="../../static/images/account.png"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-apple" command="1">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <div class="wrap">
      <div class="menu">
        <el-menu
          style="width:100%; margin-top: 20px;"
          :default-active="activeTab"
          router
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="home">
            <i class="el-icon-s-data"></i>
            <span slot="title">我的桌面</span>
          </el-menu-item>
           <el-menu-item index="recommend">
            <i class="el-icon-ice-tea"></i>
            <span slot="title">推荐管理</span>
          </el-menu-item>
          <el-menu-item index="user">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="examine">
            <i class="el-icon-cpu"></i>
            <span slot="title">审核管理</span>
          </el-menu-item>
          <el-menu-item index="music">
            <i class="el-icon-sugar"></i>
            <span slot="title">音乐管理</span>
          </el-menu-item>
          <el-menu-item index="menu">
            <i class="el-icon-s-operation"></i>
            <span slot="title">菜单管理</span>
          </el-menu-item>
          <el-menu-item index="right">
            <i class="el-icon-ice-tea"></i>
            <span slot="title">权限管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <el-tabs  type="card" v-model="activeTab" closable @tab-click="tabClick" @tab-remove="removeTab">
          <el-tab-pane
            v-for="item in activeTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
          <router-view v-loading="loading"></router-view>
        </el-tabs>
        
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/utils"

export default {
  data(){
    return{
      activeTab: '',
      activeTabs: [],
      
    }
  },
  computed:{
    loading(){
      return this.$store.state.loading
    }
  },
  methods: {
    //标签点击
    tabClick(tab) {
      this.$router.push({name: tab.name });
    },
    
    //删除标签
    removeTab(targetName) {
      let tabs = this.activeTabs;
      let activeName = this.activeTab;
      //当关闭的是当前激活的tab
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push({name: activeName });
            }
          }
        });
      }
      //关闭非激活页面
      this.activeTab = activeName;
      //不能关闭最后一个标签
      if (this.$route.name != targetName && this.activeTabs.length>1){
        this.activeTabs = tabs.filter(tab => tab.name !== targetName);
      }
      util.saveSession('activeTabs', this.activeTabs);
    },
    //增加标签
    addTab(name, title) {
      this.activeTabs.push({
        title:title,
        name: name,
      });
      this.activeTab = name;
    },

    //下拉菜单点击(点击用户头像的)
    handleCommand(command) {
      if(command == 1){
        let parames = {
          token: util.getSession('token')
        }
        this.$http.logout( parames )
        .then(({data}) => {
          if (data.code == 0){
            this.$myMsg.notify({content: '注销成功',type: 'success'});
            this.$router.replace({name: 'login'})
            util.removeSession("token");
            util.removeSession("activeTabs");
            util.removeSession("user");
          }
          else{
            this.$myMsg.notify({content: data.msg,type: 'error'})
          }  
        })
        .catch(err => {
          this.$myMsg.notify({content: err.message,type: 'error'})
        })
      }
    }
  },
  watch:{
    //通过监听路由来进行控制tab的增减
    $route(to) {
      let isHaveNameFlag = false; //如果数组有这个路径，则为true，没有就是false
      let activeIndex = 0;//激活tab的下标
      for(let i = 0; i < this.activeTabs.length; i ++){
        if(to.name == this.activeTabs[i].name){
          isHaveNameFlag = true
          activeIndex = i;
        }
      }
      
      if(isHaveNameFlag){//如果有这个路径，则激活当前tab
        this.activeTab = this.activeTabs[activeIndex].name
      }
      else{//如果没有这个路径。则新增一个tab并激活这个tab
        this.addTab(to.name, to.meta.title)
      }
      
    },
    activeTab(){
      util.saveSession('activeTabs', this.activeTabs);
    }
  }, 
  mounted(){
    //刷新时加载上次打开过的tab
    let actTabs = util.getSession('activeTabs');
    if(actTabs.length){
      this.activeTabs = actTabs;
    }else{
      this.activeTabs = [{
        title: '首页',
        name: 'home',
      }]
    }
    //激活当前路径的tab
    this.activeTab = this.$route.name;
  }
}
</script>

<style scoped>
@import '../../static/css/index.css';
</style>