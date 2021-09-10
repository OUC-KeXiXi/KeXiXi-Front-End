//测试用页面，随便在这里写东西，进度到了随时会删



<template>
  <div class="about">
    <el-button type="primary" @click="openDialog(false)">打开登录窗口</el-button>
    <el-button type="primary" @click="openDialog(true)">打开注册窗口</el-button>
    <el-button type="primary" @click="getStatusTest()">获取登录状态</el-button>
    <LoginDialog ref="LoginDialog" :is_register="is_register" />
  </div>
</template>

<script>
import LoginDialog from "../components/LoginDialog.vue";
import { get_status } from "../api/account.js";

export default {
  name: "About",
  components: {
    LoginDialog,
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
    openDialog(register) {
      this.is_register = register;
      this.$refs.LoginDialog.openDialog();
    },
  },
};
</script>

<style scoped lang="less">
@import "../style/style.less";
</style>