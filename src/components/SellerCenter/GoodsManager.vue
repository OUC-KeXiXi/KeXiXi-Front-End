<template>
  <div class="goodsmanager">
    <el-tabs v-model="activeName" type="card" @tab-click="handleSwitchTab">
      <el-tab-pane label="已发布商品" name="first">
        <el-card class="tab-card">
          <GoodsList :published="true"/>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="商品草稿箱" name="second">
        <el-card class="tab-card">
          <GoodsList :published="false"/>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import GoodsList from "../SellerCenter/GoodsList.vue"
export default {
  name: "GoodsManager",
  components:{
    GoodsList
  },
  data() {
    return {
      activeName: "first",
    };
  },
  created() {},
  methods: {
    handleSwitchTab(tab, event) {
      console.log(tab, event);
    },
    toPublish(){

    }
  },
};
</script>

<style scoped lang="less">
@import "../../style/style.less";

</style>