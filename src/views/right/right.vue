<template>
  <div class="right" style="height: 100%">
    <div class="m-wrap">
      <div class="m-body">
        <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="type" label="账号类型" >
            <template slot-scope="scope">
                <span v-if="scope.row.type == 1">歌手</span>
                <span v-if="scope.row.type == 0">用户</span>
            </template>
          </el-table-column>
          <el-table-column prop="menuList" label="菜单列表" >
            <template slot-scope="scope">
                <span class="green-color" v-for="(e, index) in scope.row.menuList" :key="index">{{scope.row.menuList[index].name}}、</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="openEditRight(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog title="编辑权限" :visible.sync="diaEditRight" :before-close="closeDia">
        <el-form :model="formRight">
          <el-form-item label="菜单名:">
            <el-select v-model="formRight.idList" style="width: 100%" multiple placeholder="请选择">
              <el-option
                v-for="(item) in options"
                :key="item.code"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>   
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDia">取 消</el-button>
          <el-button size="small" type="primary" @click="editRight">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      formRight:{//编辑权限
        type: '',
        idList: []
      },
      //表格
      tableData:[],
      options:[],//菜单列表
      //弹框
      diaEditRight: false,//新增菜单
    }
  },
  mounted(){
    this.getMenuList();
    this.getUserTypeList();
  },
  methods: {
    //获取菜单列表
    getMenuList(){
      let parames = {
        state: 1,
        current: 1,
        pageSize: 1000000,
      }
      this.$http.getMenuList( parames ).then(({data}) => {
        if (data.code == 0){
          this.options = data.data.records;
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        }  
      })
    },

    //获取用户类型列表
    getUserTypeList(){
      this.$http.getUserTypeList().then(({data}) => {
        if (data.code == 0){
          this.tableData = data.data;
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        }  
      })
    },

    //编辑权限
    editRight(){
      let parames = {
        ...this.formRight,
      }
      this.$store.state.isFullLoading = true;//启用全屏遮罩
      this.$http.editRight( parames ).then(({data}) => {
        this.closeDia();
        if (data.code == 0){
          this.$myMsg.notify({content: '修改权限成功！', type: 'success'});
          this.getUserTypeList();
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        } 
      }).catch(err => {
          console.log("不会执行！")
          this.closeDia();
      })
    },

    //打开编辑菜单窗口
    openEditRight(val){
      
      let { menuList, type } = val
      this.formRight = {
        idList: menuList.map(v=>v.id),
        type
      };
      console.log(this.formRight.idList)
      this.diaEditRight = true;
    },

    //关闭弹框
    closeDia(){
      this.diaEditRight = false;
      this.clearParames();
    },

    //清空参数
    clearParames(){
      this.formRight = {
        type: '',
        idList: []
      }
    },

    //分页
    handleCurrentChange(val) {
      this.pageInfo.current = val;
      this.getMenuList();
    },
  },
}
</script>
