<template>
  <div class="logindialog">
    <el-dialog title="登录" v-model="dialogVisible">

    </el-dialog>
  </div>
</template>


<script>

export default {
  name: 'LoginDialog',
  props: {
    is_register: Boolean,
  },
  data() {
    return {
      dialogVisible:true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../style/style.less';

</style>