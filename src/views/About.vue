//测试用页面，随便在这里写东西，进度到了随时会删



<template>
  <Nav/>
  <div class="about">
    <div class="router">
      <router-link to="/sellercenter">卖家中心</router-link>
    </div>
    <el-button type="primary" @click="openDialog(false)">登录</el-button>
    <el-button type="primary" @click="openDialog(true)">注册</el-button>
    <el-button type="primary" @click="getStatusTest()">获取登录状态</el-button>
    <el-button type="primary" @click="logout()">注销</el-button>
    <LoginDialog @changeState="changeState" ref="LoginDialog" :is_register="is_register" />
  </div>
  <Bottom/>
</template>

<script>
import LoginDialog from "../components/LoginDialog.vue";
import storage from "good-storage";
import { get_status,logout } from "../api/account.js";
import Nav from "../components/NavBar.vue"
import Bottom from "../components/FixedBottom.vue"

export default {
  name: "About",
  components: {
    LoginDialog,
    Nav,Bottom
  },
  data() {
    return {
      is_register: false,
    };
  },
  methods: {
    //测试用，别完全复制
    getStatusTest() {
      get_status()
        .then((response) => {
          console.log(response);
          if (response.data.code === 20000) {
            this.$message.success("获取成功，在console里查看");
          } else {
            this.$message.error("获取失败：" + response.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("请求时出错！");
          console.log(error);
        });
    },
    logout(){
      logout().then((response)=>{
        if (response.data.code === 20000){
          //成功
          // 清空本地缓存
          storage.clear();
          this.$message.success('注销成功！');
        }
        else {
          this.$message.error('注销失败：'+response.data.msg);
        }
      }).catch((error)=>{
        this.$message.error('请求时出错！');
        console.log(error);
      })
    },
    openDialog(register) {
      this.is_register = register;
      this.$refs.LoginDialog.openDialog();
    },
    changeState(register){
      this.is_register=register;
    },
  },
};
</script>

<style scoped lang="less">
@import "../style/style.less";
</style>