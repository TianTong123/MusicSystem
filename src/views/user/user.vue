<template>
  <div class="user" style="height: 100%">
    <div class="m-wrap">
      <div class="m-head">
        <div class="m-label">账号:</div><el-input v-model="formSearch.keyWord" placeholder="请输入账号" clearable  prefix-icon="el-icon-search"></el-input>
        <el-radio v-model="formSearch.state" @change="stateChange" label="0">已启用</el-radio>
        <el-radio v-model="formSearch.state" @change="stateChange" label="1">已停用</el-radio>
        <el-button type="primary" icon="el-icon-search" @click="getUserList" >搜索</el-button>
        <el-button type="primary" icon="el-icon-remove-outline" @click="enableUser" >{{formSearch.state==1?'启用':'禁用'}}</el-button>
      </div>
      <el-divider></el-divider>
      <div class="m-body">
        <el-table :data="tableData" tooltip-effect="dark" border stripe @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="account" label="账号" ></el-table-column>
          <el-table-column prop="accountName" label="账号名" ></el-table-column>
          <el-table-column prop="type" label="账号类型" >
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">歌手</span>
              <span v-if="scope.row.type == 0">用户</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
                <span v-if="scope.row.state == 0">已启用</span>
                <span v-if="scope.row.state == 1">已停用</span>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageInfo.current"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //表单
      formSearch:{ //查询
        keyWord: '',
        state: '1'
      },
      //表格
      tableData:[],
      pageInfo:{
        current: 1,
        pageSize: 10,
      },
      total: 0,
      multipleSelection: [],//选择的数据
    }
  },
  mounted(){
    this.getUserList();
  },
  methods: {
    //获取菜单列表
    getUserList(){
      let parames = {
        ...this.formSearch,
        ...this.pageInfo
      }
      this.$http.getUserList( parames ).then(({data}) => {
        if (data.code == 0){
          this.tableData = data.data.records;
          this.total = data.data.total
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        }  
      })
    },

    //停启用菜单
    enableUser(){
      if(this.multipleSelection.length == 0){
        this.$myMsg.notify({ content: '请选择至少一条数据再进行该操作！', type: 'error'});
        return
      }
      let parames = {
        state: this.formSearch.state==0?1:0,
        idList: this.multipleSelection.map(v=>v.id),
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否${this.formSearch.state == 1?'启用':'停用'}这些用户？`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.enableAccount( parames ).then(({data}) => {
            if (data.code == 0){
              this.$myMsg.notify({ content: `${this.formSearch.state == 1?'启用':'停用'}这些用户成功！`, type: 'success'});
              this.getUserList();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
        }
      })
    }, 

    //改变状态触发
    stateChange(){
      this.getUserList();
    },

     //选中的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //分页
    handleCurrentChange(val) {
      this.pageInfo.current = val;
      this.getUserList();
    },
   
  },
}
</script>
