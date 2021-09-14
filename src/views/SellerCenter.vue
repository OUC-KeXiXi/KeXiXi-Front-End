<template>
  <el-container class="sellercenter">
    <el-aside>
      <div class="aside">
        <div class="avatar">
          <el-avatar :size="250" fit="contain" :src="avatarUrl"/>
        </div>
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
          <el-menu-item index="3">
            <i class="el-icon-s-order"></i>
            <template #title>订单管理</template>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main>
      <div class="main">
        <div class="profile" v-if="currentIndex === '1'">
          aaa
        </div>
        <div class="goods-manager" v-if="currentIndex === '2'">
          bbb
        </div>
        <div class="order-manager" v-if="currentIndex === '3'">
          ccc
        </div>
      </div>
    </el-main>
  </el-container>
</template>


<script>
import storage from "good-storage";

export default {
  name: "SellerCenter",
  props: {},
  data() {
    return {
      avatarUrl: "",
      currentIndex: "1",
    };
  },
  methods: {
    handleSelect(key) {
      this.currentIndex = key;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../style/style.less";

.avatar {
  display: flex;
  justify-content: center;
  padding: 8%;
}
.el-menu-item.is-active{
  background-color: @primary-color;
}
</style>