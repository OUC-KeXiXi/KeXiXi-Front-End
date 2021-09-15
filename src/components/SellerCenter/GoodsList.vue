<template>
  <div class="goodslist">
    <el-card class="publish-card">
      <el-button type="primary" @click="toPublishNew()">发布商品</el-button>
      <p class="publish-text">点击发布新的课程商品\(￣︶￣*\)</p>
    </el-card>
    <el-card class="goods-card">ddd</el-card>
    <el-card class="goods-card">ddd</el-card>
    <el-pagination
      class="list-pagination"
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="listLength"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
  <PublishDialog ref="PublishDialog" :course="selectedCourse"/>
</template>
<script>
import PublishDialog from "../SellerCenter/PublishDialog.vue"
export default {
  name: "GoodsList",
  components:{
    PublishDialog,
  },
  props: {
    published: Boolean,
  },
  data() {
    return {
      selectedCourse:{},
      list: [],
      listLength: 100,
      currentPage:1,
    };
  },
  created() {},
  methods: {
    getMyGoodsList() {

    },
    handleCurrentChange(val) {
      this.currentPage=val;
      console.log(`当前页: ${val}`)
    },
    toPublishNew(){
      this.selectedCourse={
        title:"",
        content:"",
        cover:"",
        price:"",
        tags:[],
      };
      this.$refs.PublishDialog.openDialog();
    },
  },
};
</script>

<style scoped lang="less">
@import "../../style/style.less";
.publish-card{
  margin-top: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
}

.publish-text{
  color: gray;
  margin-bottom: 0;
}

.list-pagination{
  text-align: center;
}

.goods-card{
  margin: 20px 0;
  height: 150px;
}
</style>