<template>
  <div class="logindialog">
    <!-- 注册对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="注册"
      width="30%"
      center
      :close-on-click-modal="false"
      v-if="is_register"
    >
      <el-form
        :model="registerForm"
        ref="registerForm"
        :rules="registerRules"
        status-icon
        hide-required-asterisk
        label-position="right"
        label-width="100px"
      >
        <div class="role-header">
          <el-radio-group v-model="registerForm.role">
            <el-radio-button label="0">我是买家</el-radio-button>
            <el-radio-button label="1">我是卖家</el-radio-button>
          </el-radio-group>
        </div>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="registerForm.username"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="registerForm.email"
            prefix-icon="el-icon-message"
          />
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="verifycode">
          <el-row justify="space-between">
            <el-col :span="14">
              <el-input
                v-model="registerForm.verifycode"
                prefix-icon="el-icon-chat-square"
              />
            </el-col>
            <el-col :span="8.5">
              <el-button>获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            prefix-icon="el-icon-lock"
            show-password
          />
        </el-form-item>
        <div class="dialog-footer">
          <el-button @click="is_register = false">转到登录</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >立即注册</el-button
          >
        </div>
      </el-form>
    </el-dialog>

    <!-- 登录对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="登录"
      width="30%"
      center
      :close-on-click-modal="false"
      v-else
    >
      <el-form
        :model="loginForm"
        ref="loginForm"
        :rules="loginRules"
        status-icon
        hide-required-asterisk
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="用户名/邮箱" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            show-password
          />
        </el-form-item>
        <div class="dialog-footer">
          <el-button @click="is_register = true">转到注册</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >立即登录</el-button
          >
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "LoginDialog",
  props: {
    is_register: Boolean,
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value)) {
        callback(new Error("密码中必须包含数字和字母！"));
      } else {
        callback();
      }
    };
    let validateName = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        callback(new Error("用户名只能包含数字、字母和下划线"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      var regex = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
      if (!regex.test(value)) {
        callback(new Error("请输入有效的邮箱地址"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: true,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 30,
            message: "长度在 4 到 30 个字符",
            trigger: "blur",
          },
          { validator: validateName, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
      },
      registerForm: {
        username: "",
        email: "",
        verifycode: "",
        password: "",
        role: 0,
      },
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 30,
            message: "长度在 4 到 30 个字符",
            trigger: "blur",
          },
          { validator: validateName, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
        verifycode: [
          { required: true, message: "请输入邮箱验证码", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../style/style.less";
.dialog-footer {
  display: flex;
  justify-content: center;
}
.dialog-footer>.el-button {
  margin: 0 2.5%;
}
.role-header{
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}

</style>