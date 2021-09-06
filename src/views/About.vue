//测试用页面，随便在这里写东西，进度到了随时会删



<template>
  <div class="about">
    <LoginDialog :is_register="true"/>
  </div>
</template>

<script>

import LoginDialog from '../components/LoginDialog.vue'

export default {
  name: "About",
  components:{
    LoginDialog
  },
};
</script>

<style scoped lang="less">
@import '../style/style.less';

</style>