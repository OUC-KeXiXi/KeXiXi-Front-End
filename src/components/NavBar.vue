<template>
  <el-affix :offset="0">

    <el-menu  :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              background-color="#f5f5f5"
              @select="handleSelect">

         <div style="width: 25%;">
           <el-menu-item index="1">
             <el-image :src="logo" class="logo" @click="gotoHome">
             </el-image>
           </el-menu-item>
         </div>

          <div style="width: 40%;">
          <el-menu-item index="2" v-if="role != 1">
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
                 <el-button type="text" class="btn1" @click="gotoCenter">
                   <el-icon style="vertical-align: middle;" :size="18" class="icon1"><user /></el-icon>
                   <span style="vertical-align: middle;"> 个人中心 </span>
                 </el-button>
               </el-menu-item>
               <el-menu-item index="3-2">
                 <el-button type="text" class="btn1" @click="logout()">
                   <el-icon style="vertical-align: middle;" :size="18" class="icon1"><switch-button /></el-icon>
                   <span style="vertical-align: middle;"> 退出登录 </span>
                 </el-button>
               </el-menu-item>
             </el-sub-menu>
             <el-menu-item index="4" style="float:right;">
               <el-button type="text" class="btn"  @click="gotoCenter">个人中心</el-button>
             </el-menu-item>
           </div>

           <div v-else style="float: right;">
             <el-menu-item index="5" style="float:right;">
               <el-button type="text" class="btn" @click="openDialog(true)">
                 <el-icon style="vertical-align: middle;" :size="18" class="icon"><user /></el-icon>
                 <span style="vertical-align: middle;"> 注册 </span>
               </el-button>
             </el-menu-item>
             <el-menu-item index="6" style="float:right;">
               <el-button type="text" class="btn" @click="openDialog(false)">
                 <el-icon style="vertical-align: middle;" :size="18" class="icon"><user-filled /></el-icon>
                 <span style="vertical-align: middle;"> 登录 </span>
               </el-button>
             </el-menu-item>
           </div>

           <div style="float: right;">
             <el-menu-item index="7" v-if="role != 1" style="float: right;" >
               <el-button type="text" class="btn">
                 <el-icon style="vertical-align: middle;" :size="18" class="icon"><shopping-cart /></el-icon>
                 <span style="vertical-align: middle;" > 购物车 </span>
               </el-button>
             </el-menu-item>
           </div>
         </div>
    </el-menu>
  </el-affix>
  <LoginDialog @changeState="changeState" @onLogin="onLogin" ref="LoginDialog" :is_register="is_register" />
</template>

<script>
import "../assets/css/el-menu.css"
import { UserFilled, User, ShoppingCart, SwitchButton } from '@element-plus/icons'
import LoginDialog from "../components/LoginDialog.vue";
import {get_status, logout,get_storage_user_data} from "../api/account.js"
import storage from "good-storage";
import router from "../router/index.js";

export default {
  name: "NavBar",
  data() {
    return {
      is_register: false,// 用来判断登录注册弹框
      isLogin: false, //  用来判断用户状态
      isShow: false,
      role: 0, // buyer:0   seller:1
      activeIndex: "/home",
      input2: '',
      logo: require('../assets/img/logo.png'),
      defaultAvatar: '',
    };
  },
  created() {
    this.checkLogin()
  },
  methods: {
    gotoCenter() {
      router.push('/sellercenter')
    },
    gotoHome() {
      router.push('/')
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout(){
      logout().then((response)=>{
        if (response.data.code === 20000){
          //成功
          // 清空本地缓存
          storage.clear();
          this.$message.success('注销成功！');
          this.isLogin = false;
          this.role = 0;
        }
        else {
          this.$message.error('注销失败：'+response.data.msg);
          storage.clear();
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

    checkLogin() {
      get_storage_user_data().then((res=>{
        console.log('========userdata===========', res);
        if(res.username == '' && res.email == '') {
          get_status().then((response)=>{
            // console.log(response);
            if(response.data.code===20000){
              //TODO 判断
              console.log('```````````数据ALL``````````````',response.data.data);
              this.defaultAvatar = 'https://weparallelines.top'+ response.data.data.avatar;
              this.role = response.data.data.role;
              this.isLogin = response.data.data.login;
              console.log('`````````````头像````````````',this.defaultAvatar);
            }
            else{
              //TODO 请求到了但未成功
            }
          }).catch((error) => {
            this.$message.error("请求时出错！");
            console.log(error);
          });
        }else {
          this.defaultAvatar = res.avatar;
          this.role = res.role;
          this.isLogin = true;  //这里需要待定
        }
      }))
    },
    onLogin(){
      this.checkLogin()
    },
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