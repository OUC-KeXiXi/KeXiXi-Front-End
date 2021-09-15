<template>
  <el-dialog v-model="publishDialogVisible" :title="formTitle">
    <el-form
      :model="publishForm"
      ref="publishForm"
      :rules="publishRules"
      status-icon
      hide-required-asterisk
      label-position="right"
      label-width="100px"
    >
      <el-form-item label="用户名/邮箱" prop="title">
        <el-input v-model="publishForm.title" />
      </el-form-item>
      <el-form-item label="密码" prop="content">
        <el-input v-model="publishForm.content" />
      </el-form-item>
      <div class="dialog-footer">
        <el-button @click="publishDialogVisible = false">取消</el-button>
        <el-button type="primary">发布</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "PublishDialog",
  props: {
    course: Object,
  },
  data() {
    return {
      publishDialogVisible: false,
      formTitle:"发布商品",
      publishForm: {
        title: this.course.title,
        content: this.course.content,
        cover: this.course.cover,
        price: this.course.price,
        tags: this.course.tags,
      },
      publishrules: {},
    };
  },
  created() {},
  methods: {
    openDialog() {
      this.publishDialogVisible = true;
    },
  },
};
</script>

<style scoped lang="less">
@import "../../style/style.less";
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
.dialog-footer > .el-button {
  margin: 0 1%;
}

</style>