<template>
  <div class="music" style="height: 100%">
    <div class="m-wrap">
      <div class="m-head">
        <div class="m-label">音乐名:</div><el-input v-model="formSearch.keyWord" placeholder="请输入内容" clearable  prefix-icon="el-icon-search"></el-input>
        <el-radio v-model="formSearch.state" @change="stateChange" label="1">已上架</el-radio>
        <el-radio v-model="formSearch.state" @change="stateChange" label="3">已下架</el-radio>
        <el-button type="primary" icon="el-icon-search" @click="getMusicList" >搜索</el-button>
        <el-button type="primary" icon="el-icon-remove-outline" @click="enableMusic" >{{formSearch.state==3?'启用':'禁用'}}</el-button>
      </div>
      <el-divider></el-divider>
      <div class="m-body">
        <el-table :data="tableData" tooltip-effect="dark"  @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="音乐名" ></el-table-column>
          <el-table-column prop="singer" label="歌手" ></el-table-column>
          <el-table-column prop="createDate" label="上传时间" ></el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
                <span v-if="scope.row.state == 1">上架</span>
                <span v-if="scope.row.state == 3">下架</span>
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
  methods: {
    //获取音乐列表
    getMusicList(){
      let parames = {
        ...this.formSearch,
        ...this.pageInfo
      }
      this.$http.getMusicList( parames ).then(({data}) => {
        if (data.code == 0){
          this.tableData = data.data.records;
          this.total = data.data.total
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        }  
      })
    },

    //停启用音乐
    enableMusic(){
      if(this.multipleSelection.length == 0){
        this.$myMsg.notify({ content: '请选择至少一条数据再进行该操作！', type: 'error'});
        return
      }
      let parames = {
        state: this.formSearch.state==1?3:1,
        idList: this.multipleSelection.map(v=>v.id),
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否${this.formSearch.state == 3?'启用':'停用'}这些音乐？`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.enableMusic( parames ).then(({data}) => {
            if (data.code == 0){
              this.$myMsg.notify({ content: `${this.formSearch.state == 3?'启用':'停用'}这些音乐成功！`, type: 'success'});
              this.getMusicList();
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
      this.getMusicList();
    },

     //选中的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //分页
    handleCurrentChange(val) {
      this.pageInfo.current = val;
    },
   
  },
}
</script>
