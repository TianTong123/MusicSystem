<template>
  <div class="account" style="height: 100%">
    <div class="m-wrap">
      <div class="m-head">
        <el-radio v-model="formSearch.state" label="1">已启用</el-radio>
        <el-radio v-model="formSearch.state" label="2">已禁用</el-radio>
        <el-button type="primary" icon="el-icon-search">增加</el-button>
        <el-button type="primary" icon="el-icon-remove-outline">停用</el-button>
      </div>
      <el-divider></el-divider>
      <div class="m-body">
        <el-table :data="tableData" tooltip-effect="dark"  @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column prop="id" label="菜单id" ></el-table-column>
          <el-table-column prop="name" label="菜单名" ></el-table-column>
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
              <el-button type="text" size="small" @click="openEditDia(scope.row.id)">编辑</el-button>
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
      //查询
      formSearch:{
        state: '1'
      },
      //表格
      tableData:[],
      pageInfo:{
        current: 1,
        pageSize: 10,
      },
      total: 0,
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
}
</script>
