<template>
  <div class="menu" style="height: 100%">
    <div class="m-wrap">
      <div class="m-head">
        <el-radio v-model="formSearch.state" @change="stateChange" label="1">已启用</el-radio>
        <el-radio v-model="formSearch.state" @change="stateChange" label="0">已禁用</el-radio>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="diaMenu = true">增加</el-button>
        <el-button type="primary" icon="el-icon-remove-outline" @click="enableMenus" >{{formSearch.state==0?'启用':'禁用'}}</el-button>
      </div>
      <el-divider></el-divider>
      <div class="m-body">
        <el-table :data="tableData" tooltip-effect="dark"  @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="菜单id" ></el-table-column>
          <el-table-column prop="name" label="菜单名" ></el-table-column>
          <el-table-column prop="code" label="code" ></el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
                <span v-if="scope.row.state == 1">已启用</span>
                <span v-if="scope.row.state == 0">已禁用</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="openEditMenu(scope.row)">编辑</el-button>
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
      <el-dialog :title="isEdit?'编辑菜单':'新增菜单'" :visible.sync="diaMenu" :before-close="closeDia">
        <el-form :model="formMenu">
          <el-form-item label="菜单名:">
            <el-input size="small" v-model="formMenu.name"></el-input>
          </el-form-item>   
          <el-form-item label="code">
            <el-input size="small" v-model="formMenu.code"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDia">取 消</el-button>
          <el-button size="small" type="primary" @click="addMenu" v-show="!isEdit">确 定</el-button>
          <el-button size="small" type="primary" @click="editMenu" v-show="isEdit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //表单
      formSearch:{ //查询
        state: '1'
      },
      formMenu:{//新增&菜单
        name: '',
        code: ''
      },
      isEdit: false,//true编辑菜单，false新增菜单
      //表格
      tableData:[],
      pageInfo:{
        current: 1,
        pageSize: 10,
      },
      total: 0,
      multipleSelection: [],//选择的数据
      //弹框
      diaMenu: false,//新增菜单
    }
  },
  mounted(){
    this.getMenuList();
  },
  methods: {
    //获取菜单列表
    getMenuList(){
      let parames = {
        ...this.formSearch,
        ...this.pageInfo
      }
      this.$http.getMenuList( parames ).then(({data}) => {
        if (data.code == 0){
          this.tableData = data.data.records;
          this.total = data.data.total
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        }  
      })
    },

    //新增菜单
    addMenu(){
      let parames = {
        ...this.formMenu,
      }
      this.$store.state.isFullLoading = true;//启用全屏遮罩
      this.$http.addMenu( parames ).then(({data}) => {
        this.closeDia();
        if (data.code == 0){
          this.$myMsg.notify({content: '新增菜单成功！', type: 'success'});
          this.getMenuList();
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        } 
      }).catch(err => {
          console.log("不会执行！")
          this.closeDia();
      })
    },

    //编辑菜单
    editMenu(){
      let parames = {
        ...this.formMenu,
      }
      this.$store.state.isFullLoading = true;//启用全屏遮罩
      this.$http.editMenu( parames ).then(({data}) => {
        this.closeDia();
        if (data.code == 0){
          this.$myMsg.notify({content: '修改菜单成功！', type: 'success'});
          this.getMenuList();
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        } 
      }).catch(err => {
          console.log("不会执行！")
          this.closeDia();
      })
    },

    //停启用菜单
    enableMenus(){
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
        content: `是否${this.formSearch.state == 0?'启用':'停用'}这些菜单！`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.enableMenu( parames ).then(({data}) => {
            if (data.code == 0){
              this.$myMsg.notify({ content: `${this.formSearch.state == 0?'启用':'停用'}这些菜单成功！`, type: 'success'});
              this.getMenuList();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
        }
      })
    }, 

    //打开编辑菜单窗口
    openEditMenu(val){
      this.formMenu = val;
      this.isEdit = true;
      this.diaMenu = true;
    },

    //关闭弹框
    closeDia(){
      this.diaMenu = false;
      this.clearParames();
    },

    //清空参数
    clearParames(){
      this.formMenu = {
        name: '',
        code: ''
      }
      this.isEdit = false;
    },

    //改变状态触发
    stateChange(){
      this.getMenuList();
    },

     //选中的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //分页
    handleCurrentChange(val) {
      this.pageInfo.current = val;
      this.getMenuList();
    },

   
  },
}
</script>
