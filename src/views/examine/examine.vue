<template>
  <div class="examine" style="height: 100%">
    
    <div class="m-wrap"> 
      <el-tabs tab-position="left" style="height: 100%;">
        <el-tab-pane label="作品审核">
          <!-- 头 -->
          <div class="m-head">
            <div class="m-label">作品状态:</div>
            <el-select v-model="formWork.state" @change="workStateChange" placeholder="请选择">
              <el-option
                v-for="item in workOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="getWorkList" >搜索</el-button>
          </div>
          <!-- 分割线 -->
          <el-divider></el-divider>
          <!-- 表单 -->
          <div class="m-body">
            <el-table :data="workTableData" tyle="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" label="音乐名" ></el-table-column>
              <el-table-column prop="singer" label="歌手" ></el-table-column>
              <el-table-column prop="createDate" label="上传时间" ></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="passWork(scope.row.id)">通过</el-button>
                  <el-button type="text" size="small" @click="openWorkDia(scope.row.id)">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
    
            <!-- 分页 -->
            <el-pagination
              @current-change="workHandleCurrentChange"
              :current-page="workPageInfo.current"
              :page-size="workPageInfo.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="workTotal">
            </el-pagination>
          </div> 
        </el-tab-pane>
        <el-tab-pane label="歌手审核">
          <!-- 头 -->
          <div class="m-head">
            <div class="m-label">歌手状态:</div>
            <el-select v-model="formSinger.state" @change="singerStateChange" placeholder="请选择">
              <el-option
                v-for="item in singerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- 分割线 -->
          <el-divider></el-divider>
          <!-- 表单 -->
          <div class="m-body">
            <el-table :data="singerTableData" tyle="width: 100%">
              <el-table-column prop="account" label="歌手账号" width="300"></el-table-column>
              <el-table-column prop="accountName" label="歌手名字" sortable width="180"></el-table-column>
              <el-table-column prop="saleCost" label="现价" sortable width="180"></el-table-column>
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="passSinger(scope.row)">通过</el-button>
                  <el-button type="text" size="small" @click="openSingerDia(scope.row.id)">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
    
            <!-- 分页 -->
            <el-pagination
              @current-change="singerHandleCurrentChange"
              :current-page="singerPageInfo.current"
              :page-size="singerPageInfo.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="singerTotal">
            </el-pagination>
          </div> 
        </el-tab-pane>
      </el-tabs>
      
      <!-- 作品弹框 -->
      <el-dialog title="理由" :visible.sync="diaWork">
        <el-form :model="formWorkRemark">
            <el-form-item label="退回理由:">
              <el-input size="small" v-model="formWorkRemark.commodityName"></el-input>
            </el-form-item>    
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDia">取 消</el-button>
          <el-button size="small" type="primary" @click="passWork">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 歌手弹框 -->
      <el-dialog title="理由" :visible.sync="diaSinger">
        <el-form :model="formSingerRemark">
            <el-form-item label="退回理由:">
              <el-input size="small" v-model="formSingerRemark.commodityName"></el-input>
            </el-form-item>    
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDia">取 消</el-button>
          <el-button size="small" type="primary" @click="passSinger">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import util from "@/util/utils";

export default {
  data(){
    return{
      //查询
      formWork:{//作品
        state: 0,
      },
      formSinger:{//歌手
        state: 0,
      },
      //选项
      workOptions: [{value: 0, label: '待审核'}, {value: 1, label: '审核通过',}],//作品
      singerOptions: [{value: 0, label: '待审核'}, {value: 1, label: '审核通过',}],//歌手
      //表格
      workTableData:[],
      singerTableData:[],
      workPageInfo:{
        current: 1,
        pageSize: 10,
        
      },
      singerPageInfo:{
        current: 1,
        pageSize: 10,
        
      },
      workTotal: 0,
      singerTotal: 0,
      //弹框表单
      formWorkRemark:{
        remark: '',
      },
      formSingerRemark:{
        remark: "",
      },
      //弹框
      diaWork: false,
      diaSinger: false,
    }
  },
  mounted(){
    this.getSingerList()
  },
  methods:{
    
    //获取作品列表
    getWorkList(){
      let parames = {
        ...this.formWork,
        ...this.workPageInfo
      }
      this.$http.getMusicList( parames ).then(({data}) => {
        if (data.code == 0){
          this.workTableData = data.data.records;
          this.workTotal = data.data.total
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        }  
      })
    },

    //获取歌手列表
    getSingerList(){
      let parames = {
        ...this.formSinger,
        ...this.singerPageInfo
      }
      this.$http.getSingerList( parames ).then(({data}) => {
        if (data.code == 0){
          this.singerTableData = data.data.records;
          this.singerTotal = data.data.total
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        }  
      })
    },

    //通过作品
    passWork(val){
      let parames = {
        state: 1,
        idList: [val],
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否通过？`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.enableMusic( parames ).then(({data}) => {
            if (data.code == 0){
              this.$myMsg.notify({ content: `已通过！`, type: 'success'});
              this.getWorkList();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
        }
      })
    },
    
    //是否通过歌手
    passSinger(){

    },
    
    //作品状态切换
    workStateChange(){
      this.getWorkList();
    },

    //歌手状态切换
    singerStateChange(){
      this.getSingerList();
    },

    //打开作品退回窗口
    openWorkDia(val){

    },

    //打开歌手退回窗口
    openSingerDia(val){

    },

    //作品分页
    workHandleCurrentChange(val) {
      this.workPageInfo.current = val;
      this.getMenuList();
    },

    //歌手分页
    singerHandleCurrentChange(val) {
      this.workPageInfo.current = val;
      this.getMenuList();
    },

    //关闭弹框
    closeDia(){
      this.diaWork = false;
      this.diaSinger = false;
      this.clearParames();
    },

    //清空参数
    clearParames(){
      this.formWorkRemark = {
        remark: '',
      }
      this.formSingerRemark = {
        remark: '',
      }
    }
  }
}
</script>

<style>
.examine .el-tabs__item{
	background-color: unset;
}
	
.examine .el-tabs__content {
	position: absolute;
  top: unset;
  bottom: unset;
  left: 95px;
	right: unset;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
}
.examine .suppelier-num{
	line-height: 40px;
}
.examine .table-wrap{
	position: relative;
	width: 100%;
	height: 235px;
	
}
.examine .table-wrap .m-agTable{
	height: 200px;
}

</style>