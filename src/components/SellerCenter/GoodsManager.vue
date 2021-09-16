<template>
  <div class="goodsmanager">
    <el-tabs class="tab" v-model="activeName" type="card" @tab-click="handleSwitchTab">
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

<style lang="less">

.tab>div>div>div>div>.el-tabs__item.is-active {
    background-color: #0d5756;
    color: #fff;
}

.tab-card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding-top: 0px;
}

.tab-card>.el-card__body {
    padding-top: 0px;
}
</style>