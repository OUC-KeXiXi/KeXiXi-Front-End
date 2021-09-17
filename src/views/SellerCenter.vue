<template>
<Nav/>
<div class="sellercenter">
  <el-container>
    <el-aside>
      <div class="aside">
        <div class="avatar">
          <el-avatar :size="250" fit="contain" :src="avatarUrl" />
        </div>
        <div class="user-name">{{displayName}}</div>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          active-text-color="#fff"
          @select="handleSelect"
        >
          <el-menu-item index="1">
            <i class="el-icon-s-tools"></i>
            <template #title>个人信息</template>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-goods"></i>
            <template #title>商品管理</template>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main>
      <div class="main">
        <div class="profile" v-if="currentIndex === '1'">
          <Profile/>
        </div>
        <div class="goods-manager" v-if="currentIndex === '2'">
          <Goods/>
        </div>
      </div>
    </el-main>
  </el-container>
</div>
<Bottom/>
</template>


<script>
import { get_storage_user_data } from '../api/account.js';
import Profile from "../components/SellerCenter/PersonalProfile.vue"
import Goods from "../components/SellerCenter/GoodsManager.vue"
import Nav from "../components/NavBar.vue"
import Bottom from "../components/FixedBottom.vue"

export default {
  name: "SellerCenter",
  components:{
    Profile,
    Goods,
    Nav,
    Bottom,
  },
  props: {
    role: String,
  },
  data() {
    return {
      avatarUrl: "",
      displayName:" ",
      currentIndex: "1",
      infoloaded:false,
    };
  },
  created(){
    this.getUserInfo();
  },
  methods: {
    handleSelect(key) {
      this.currentIndex = key;
    },
    getUserInfo(){
      get_storage_user_data().then((userdata)=>{
        this.displayName=userdata.nickname;
        this.avatarUrl=userdata.avatar;
      }).catch((error)=>{
        this.$message.error(error);
      })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../style/style.less";
.sellercenter{
  padding: 30px;
}
.avatar {
  display: flex;
  justify-content: center;
  padding: 8%;
}
.el-menu-item.is-active {
  background-color: @primary-color;
}
.el-menu-item.is-active:hover{
  background-color: @primary-color !important;
}

.user-name {
  font-size: 28px;
  text-align: center;
  padding: 0 0 6%;
}
</style>