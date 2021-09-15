<template>
  <el-affix :offset="0">

    <el-menu  :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              background-color="#f5f5f5"
              @select="handleSelect">

         <div style="width: 25%;">
           <el-menu-item index="1" route="home">
             <el-image :src="logo" class="logo">
             </el-image>
           </el-menu-item>
         </div>

          <div style="width: 40%;">
          <el-menu-item index="2" v-if="role == 'buyer'">
            <div>
              <el-input placeholder="请输入关键字..."
                        class="search-input"
                        v-model="input2">
                <template #append>搜索</template>
              </el-input>
            </div>
          </el-menu-item>
          </div>

         <div style="width: 30%;">

           <div v-if="isLogin" style="float: right;">
             <el-sub-menu index="3" style="float:right;">
               <template #title>
                 <el-avatar :size="40" :src="defaultAvatar" fit="contain"></el-avatar>
               </template>
               <el-menu-item index="3-1">
                 <el-button type="text" class="btn1">
                   <el-icon style="vertical-align: middle;" :size="18" class="icon1"><user /></el-icon>
                   <span style="vertical-align: middle;"> 个人中心 </span>
                 </el-button>
               </el-menu-item>
               <el-menu-item index="3-2">
                 <el-button type="text" class="btn1">
                   <el-icon style="vertical-align: middle;" :size="18" class="icon1"><switch-button /></el-icon>
                   <span style="vertical-align: middle;"> 退出登录 </span>
                 </el-button>
               </el-menu-item>
             </el-sub-menu>
             <el-menu-item index="4" style="float:right;">
               <el-button type="text" class="btn">个人中心</el-button>
             </el-menu-item>
           </div>

           <div v-else style="float: right;">
             <el-menu-item index="5" style="float:right;">
               <el-button type="text" class="btn" @click="Register">
                 <el-icon style="vertical-align: middle;" :size="18" class="icon"><user /></el-icon>
                 <span style="vertical-align: middle;"> 注册 </span>
               </el-button>
             </el-menu-item>
             <el-menu-item index="6" style="float:right;">
               <el-button type="text" class="btn" @click="Login">
                 <el-icon style="vertical-align: middle;" :size="18" class="icon"><user-filled /></el-icon>
                 <span style="vertical-align: middle;"> 登录 </span>
               </el-button>
             </el-menu-item>
           </div>

           <div style="float: right;">
             <el-menu-item index="7" v-if="role == 'buyer'" style="float: right;">
               <el-button type="text" class="btn">
                 <el-icon style="vertical-align: middle;" :size="18" class="icon"><shopping-cart /></el-icon>
                 <span style="vertical-align: middle;" > 购物车 </span>
               </el-button>
             </el-menu-item>
           </div>
         </div>
    </el-menu>

  </el-affix>

  <div v-if="isShow">
    <LoginDialog  ref="LoginDialog" :dialog="login_dialog"/>
  </div>
</template>

<script>
import "../assets/css/el-menu.css"
import { UserFilled, User, ShoppingCart, SwitchButton } from '@element-plus/icons'
import LoginDialog from "../components/LoginDialog.vue";

export default {
  name: "NavBar",
  data() {
    return {
      isLogin: false, // true
      isShow: false,
      role: 'buyer', // seller
      activeIndex: "/home",
      input2: '',
      logo: require('../assets/img/logo.png'),
      defaultAvatar: require('../assets/img/avatar_default.png'),
      login_dialog:{
        is_register:false,
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    openDialog(is_register){
      this.login_dialog.is_register=is_register;
      this.$refs.LoginDialog.openDialog();
    },
    Register() {
      this.openDialog(true);
      console.log('注册------------');
    },
    Login() {
      console.log('登录------------');
    }
  },
  components: {
    UserFilled,
    User,
    ShoppingCart,
    SwitchButton,
    LoginDialog,
  }
}
</script>

<style scoped>
.el-menu {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 120px;
  background-size: contain;
}
.search-input {
  width: 420px;
}
.btn {
  color: #1c1f21;
  font-weight: bold;
  padding: 5px;
}
.btn:hover {
  background-color: #e7e6e6;
  padding: 5px;
  color: #1c1f21;
  font-weight: bold;
}
.icon {
  color: #1c1f21;
}
</style>