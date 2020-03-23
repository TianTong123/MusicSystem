<template>
  <div class="recommend" style="height: 100%">
    <div class="m-wrap">
      <!-- 头 -->
      <div class="m-head">
        <div class="m-label">热门推荐</div>
        <el-button type="primary" icon="el-icon-plus" @click="openAddMusic(true)" >添加</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="getRecommend">刷新</el-button>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <div class="m-body">
        <el-table :data="recommendTableData" border stripe style="width: 100%">
          <el-table-column prop="name" label="音乐名" ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteRecommend(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 头 -->
      <div class="m-head">
        <div class="m-label">轮播图</div>
        <el-button type="primary" icon="el-icon-plus" @click="openAddMusic(false)" >添加</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="getSlide">刷新</el-button>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <div class="m-body">
        <el-table :data="slideTableData" border stripe style="width: 100%">
          <el-table-column prop="picUrl" label="图片" >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <img :src="`${$global.imgUrl+scope.row.picUrl}`" width="450px">            
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.picUrl }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteSlide(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog title="添加音乐" :visible="diaAddMusic" :before-close="closeDia">
        <div class="m-mini-head">
          <div class="m-label">音乐名:</div>
          <el-input v-model="formSearch.keyWord" placeholder="请输入内容" clearable  prefix-icon="el-icon-search"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="getMusicList" >搜索</el-button>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <div class="m-body">
          <el-table :data="musicTableData" border stripe style="width: 100%" height="163">
            <el-table-column prop="name" label="音乐名" ></el-table-column>
            <el-table-column prop="createDate" label="上传时间" ></el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" v-show="isRecommend" @click="addRecommend(scope.row.id)">添加到推荐</el-button>
                <el-button type="text" size="small" v-show="!isRecommend" @click="selectMusic = scope.row">添加到轮播图</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-show="!isRecommend" class="slide-wrap"><div class="m-label">选择歌曲:</div><span class="green-color">{{selectMusic.name}}</span></div>
        <div v-show="!isRecommend" class="slide-wrap">
          <div class="m-label">选择图片:</div>
          <el-upload
            class="avatar-uploader"
            :action="$global.imgUploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="formSlide.picUrl" :src="`${$global.imgUrl+formSlide.picUrl}`" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div slot="footer" v-show="!isRecommend" class="dialog-footer">
          <el-button size="small" @click="closeDia">取 消</el-button>
          <el-button size="small" type="primary" @click="addSlide">添加到轮播图</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      formSearch:{ //查询
        keyWord: '',
        state: '1'
      },
      formSlide:{
        picUrl: '',
        songId: ''
      },
      //表格
      musicTableData:[],//音乐表
      recommendTableData: [],//热门推荐
      slideTableData:[],//轮播图
      selectMusic: '',//选中的音乐
      //弹框
      diaAddMusic: false,//添加音乐
      //页面状态
      isRecommend: true,//true推荐， false轮播图

    }
  },
  mounted(){
    this.getRecommend();
    this.getSlide();
  },
  methods: {
    //获取音乐列表
    getMusicList(){
      let parames = {
        ...this.formSearch,
        current: 1,
        pageSize: 100000,
      }
      this.$store.state.isFullLoading = true;//全屏遮罩
      this.$http.getMusicList( parames ).then(({data}) => {
        if (data.code == 0){
          this.musicTableData= data.data.records;
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        }  
      })
    },

    //获取热门推荐
    getRecommend(){
      this.$http.getRecommendList().then(({data}) => {
        if (data.code == 0){
          this.recommendTableData= data.data;
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        }  
      })
    },

    //获取轮播图
    getSlide(){
      let parames = {
        ...this.formSearch,
        current: 1,
        pageSize: 100000,
      }
      this.$http.getSlideList( parames ).then(({data}) => {
        if (data.code == 0){
          this.slideTableData= data.data;
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        }  
      })
    },

    //删除热门推荐
    deleteRecommend(id){
      let parames = {
        id
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否删除该推荐！`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.deleteRecommend( parames ).then(({data}) => {
            if (data.code == 0){
              this.$myMsg.notify({ content: `删除成功！`, type: 'success'});
              this.getRecommend();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
        }
      })
    },

    //删除轮播图
    deleteSlide(id){
      let parames = {
        id
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否删除该轮播图？`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.deleteSlide( parames ).then(({data}) => {
            if (data.code == 0){
              this.$myMsg.notify({ content: `删除成功！`, type: 'success'});
              this.getSlide();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
        }
      })
    },

    //添加到热门推荐
    addRecommend(songId){
      let parames = {
        songId
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否添加这首音乐到热门推荐？`,
        cancelFlag: true,
        callback: ()=> {
          this.$store.state.isFullLoading = true;
          this.$http.addRecommend( parames ).then(({data}) => {
            if (data.code == 0){
              this.$myMsg.notify({ content: `添加成功！`, type: 'success'});
              this.getRecommend();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
        }
      })
    },

    //添加到轮播图
    addSlide(){
      this.formSlide.songId = this.selectMusic.id;
      let parames = {
        ...this.formSlide
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否添加这首音乐到轮播图？`,
        cancelFlag: true,
        callback: ()=> {
          this.$store.state.isFullLoading = true;
          this.$http.addSlide( parames ).then(({data}) => {
            if (data.code == 0){
              this.$myMsg.notify({ content: `添加成功！`, type: 'success'});
              this.getSlide();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
        }
      })
    },

    //打开添加音乐窗口
    openAddMusic(flag){
      this.diaAddMusic = true;
      this.isRecommend = flag;
    },

    //关闭弹框
    closeDia(){
      this.diaAddMusic = false;
      this.clearParame();
    },
    
     //清空参数
    clearParame(){
      this.selectMusic = "";
      this.musicTableData = [];
      this.formSlide = {
        picUrl: '',
        songerId: ''
      }
    },

    //上传图片
    handleAvatarSuccess(res, file) {
      this.formSlide.picUrl =`${res.data}`;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$myMsg.notify({
          type: 'error',
          content: '上传头像图片只能是 JPG 格式!',
        })
      }
      if (!isLt2M) {
        this.$myMsg.confirm({
          type: 'error',
          content: '上传头像图片大小不能超过 10MB!',
        })
      }
      return isJPG && isLt2M;
    }
  },
}
</script>

<style>
.recommend .slide-wrap{
  margin-top: 20px;
  display: flex;
  width: 100%;
  
  justify-content: left;
}
.recommend .slide-wrap .m-label{
  display: inline-block;
  margin-right: 20px;
}
.recommend .slide-wrap .el-upload {
  width: 460px;
  height: 240px;
}
.recommend .slide-wrap .avatar-uploader-icon{
  line-height: 240px;
}
.recommend .slide-wrap .el-upload .avatar{
  position: absolute;
  left: 50%;
  height: 100%;
  width: auto;
  transform: translateX(-50%);
}
</style>