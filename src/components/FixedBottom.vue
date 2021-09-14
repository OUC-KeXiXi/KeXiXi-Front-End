<template>
<div class="box">
  <div class="boxItem">
    <h5>关于我们</h5>
    <p>我们致力于提供一个高质量网课交易平台。</p>
    <p>追梦路上，课夕夕与你同行。</p>
    <h5>版权申明</h5>
    <p>本站资源均来源于发布者，版权归发布者所有。</p>
    <p>如侵犯您的权益，请及时联系我们处理。</p>
  </div>
  <div class="boxItem">
    <h5>联系方式</h5>
    <p>QQ群：515411823</p>
    <h5>广告合作</h5>
    <p>QQ群：515411823</p>
  </div>
  <div class="boxItem">
    <h5 style="margin: 0; text-align: center;">QQ群二维码</h5>
    <el-image :src="code" alt=""></el-image>
  </div>
</div>
</template>

<script>
export default {
  name: "FixedBottom",
  data() {
    return {
      code: require('../assets/img/code.png'),
    }
  }
}
</script>

<style scoped>
.box {
  display: flex;
  padding: 20px 0;
  background: #ddd;
  justify-content: center
}
.box h5 {
  margin: 10px 0 0 0;
}
.box p {
  margin: 0;
  font-size: 12px;
}
.boxItem {
  margin-right: 50px;
}
.boxItem .el-image {
  width: 120px;
  display: block;
}
</style>