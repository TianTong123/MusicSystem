<template>
  <div class="home">
    <h1>TianTong音乐网站后台管理系统</h1>
  </div>
</template>

<script>
export default {
  data(){
    return {
      returnMsg: '',
      text: '',
      num: 0,
    }
  },
  methods:{
    test(){
      this.$store.state.isFullLoading = true;
      this.$http.test({test: this.text}).then(res => {
        this.returnMsg = res.data
      })
    },
    msg(){
      this.$http.test({test: this.text}).then(res => {
        this.returnMsg = res.data
      })
      // this.$myMsg.confirm({
      //   content: this.num,
      //   type: 'error',
      //   callback: ()=>{console.log("!!!!")}
      // });
    }
  }
}
</script>
