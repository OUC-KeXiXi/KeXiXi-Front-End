<template>
  <div class="logindialog">
    <!-- 注册对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="注册"
      :width="dialogWidth"
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
            <el-col :span="15">
              <el-input
                v-model="registerForm.verifycode"
                prefix-icon="el-icon-chat-square"
              />
            </el-col>
            <el-col :span="8.5">
              <el-button @click="getVerificationCode()">获取验证码</el-button>
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
          <el-button @click="changeDialogState(false)">转到登录</el-button>
          <el-button type="primary" @click="postRegister()">立即注册</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 登录对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="登录"
      :width="dialogWidth"
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
          <el-button @click="changeDialogState(true)">转到注册</el-button>
          <el-button type="primary" @click="postLogin()">立即登录</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import storage from "good-storage";
import { get_verification_code, login, register } from "../api/account.js";

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
      var regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!regex.test(value)) {
        callback(new Error("请输入有效的邮箱地址"));
      } else {
        callback();
      }
    };
    let validateLoginName = (rule, value, callback) => {
      let emailregex =
        /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      let nameregex = /^[a-zA-Z0-9_]+$/;
      if (emailregex.test(value) || nameregex.test(value)) {
        callback();
      } else {
        callback(new Error("用户名格式错误"));
      }
    };
    return {
      dialogVisible: false,
      dialogWidth:"35%",
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
          { validator: validateLoginName, trigger: "blur" },
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
        role: "0",
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
    //父组件调用子组件函数，打开对话框
    openDialog() {
      this.dialogVisible = true;
    },
    changeDialogState(register){
      this.$emit("changeState",register);
    },
    postLogin() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          login({
            username: this.loginForm.username,
            password: this.loginForm.password,
          })
            .then((response) => {
              console.log(response);
              if (response.data.code === 20000) {
                //成功并保存登录状态
                this.$message.success("登录成功！");
                // 设置本地 session 缓存
                storage.set("login", this.loginForm.username);
                this.dialogVisible = false;
                this.resetForm("loginForm");
                //给父组件返回信号
                this.$emit("onLogin");

              } else {
                this.$message.error("登录失败：" + response.data.msg);
              }
            })
            .catch((error) => {
              this.$message.error("请求时出错！");
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          this.$message.error("提交时出错！");
          return false;
        }
      });
    },
    getVerificationCode() {
      this.$refs["registerForm"].validateField("email", (error) => {
        if (!error) {
          get_verification_code({
            email: this.registerForm.email,
            check: true,
          })
            .then((response) => {
              console.log(response);
              if (response.data.code === 20000) {
                this.$message.success("验证码已发送到邮箱，请注意查收！");
              } else {
                this.$message.error(response.data.msg);
              }
            })
            .catch((error) => {
              this.$message.error("获取验证码时出错！");
              console.log(error);
            });
        } else {
          this.$message.error(error);
          return false;
        }
      });
    },
    postRegister() {
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          register({
            username: this.registerForm.username,
            email: this.registerForm.email,
            password: this.registerForm.password,
            verification_code: this.registerForm.verifycode,
            role: this.registerForm.role,
          })
            .then((response) => {
              console.log(response);
              if (response.data.code === 20000) {
                //成功
                this.$message.success("注册成功！");
                this.loginForm.username = this.registerForm.username;
                this.loginForm.password = this.registerForm.password;
                login({
                  username: this.loginForm.username,
                  password: this.loginForm.password,
                })
                  .then((response) => {
                    console.log(response);
                    if (response.data.code === 20000) {
                      //成功并保存登录状态
                      this.$message.success("登录成功！");
                      // 设置本地 session 缓存
                      storage.set("login", this.loginForm.username);
                      this.dialogVisible = false;
                      //给父组件返回信号
                      this.$emit("onLogin");
                    } else {
                      this.$message.error("登录失败：" + response.data.msg);
                      this.changeDialogState(false);
                    }
                    this.resetForm("registerForm");
                  })
                  .catch((error) => {
                    this.$message.error("请求时出错！");
                    console.log(error);
                    this.changeDialogState(false);
                    this.resetForm("registerForm");
                  });
              } else {
                this.$message.error("注册失败：" + response.data.msg);
              }
            })
            .catch((error) => {
              this.$message.error("请求时出错！");
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          this.$message.error("提交时出错！");
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
.dialog-footer > .el-button {
  margin: 0 2.5%;
}
.role-header {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}
</style>