<template>
  <NavBar></NavBar>
  <div class="box">
  <el-container>
    <el-aside width="228px">
      <div class="aside-div">
      <el-scrollbar>
        <div v-for="item in tabLists" :key="item">
          <div class="tabItem">
          <span>{{ item }}</span>
          <el-icon :size="14" color="#9c9ba6" class="tabIcon">
          <caret-right />
          </el-icon>
          </div>
        </div>
      </el-scrollbar>
      </div>
    </el-aside>
    <el-main style="padding-left: 0; padding-right: 0; padding-bottom: 0;">
      <el-carousel trigger="click" height="400px">
        <el-carousel-item v-for="item in images" :key="item.id">
          <el-image
              alt="无图片"
              :src="item.url"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>
  </div>

 <div class="foot-div">
   <el-tabs v-model="activeName" @tab-click="handleClick" class="deleteBorder">
     <el-tab-pane disabled="true">
       <template #label>
         <el-image :src="tab" style="width: 180px;vertical-align: middle"></el-image>
       </template>
     </el-tab-pane>
     <el-tab-pane label="推荐" name="first">
     </el-tab-pane>
     <el-tab-pane label="最新" name="second">
     </el-tab-pane>
     <el-tab-pane label="精品" name="third">
     </el-tab-pane>
     <Card :activeName='activeName'></Card>
   </el-tabs>
 </div>
  <FixedBottom></FixedBottom>
</template>

<script>
// @ is an alias to /src
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import { CaretRight } from '@element-plus/icons'
import FixedBottom from "../components/FixedBottom";

export default {
  name: 'Home',
  data() {
    return {
      activeName: 'first',
      tab: require('../assets/img/tab.png'),
      images: [
        {
          id: 1,
          url: require("../assets/img/1.jpg")
        },
        {
          id: 2,
          url: require("../assets/img/2.jpg")
        },
        {
          id: 3,
          url: require("../assets/img/3.jpg")
        }
      ],
      tabLists: [
          'Java', 'Python', 'C++', 'C', 'Django', 'Go',
        'Vue.js', 'React.jS', 'Node.js', 'JavaScript', 'TypeScript', 'jQuery']
    }
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.paneName
      console.log('--------tab-----------',this.activeName)
    },
  },
  components: {
    NavBar,
    CaretRight,
    Card,
    FixedBottom
  }
}
</script>
<style>
/*整体*/
.box{
  background-image: linear-gradient(#deedeb, #f0f6f6, #fafcfc, #ffffff);
  padding-top: 15px;
}
.el-container {
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow:0px 20px 20px -10px #575656;
}
/*侧栏tab标签*/
.aside-div {
  margin-top: 20px;
  height: 400px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-weight: 400;
  background: #39364d;
}
.tabItem {
  color: #fff;
  cursor: pointer;
  padding: 0 14px;
  line-height: 50px;
  width: 190px;
  font-size: 14px;
  height: 50px;
  transition: all .1s;
  position: relative;
}
.tabItem .tabIcon {
  position: absolute;
  right: 4px;
  top: 16px;
}
.tabItem:hover {
  background-color: rgba(156,152,152,0.2);
}
/*轮播图*/
.el-carousel {
  width: 940px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow-x: hidden;
  overflow-y: hidden;
}
.el-carousel__item .el-image {
   width: 100%;
   height: 100%;
 }
/*标签页*/
.foot-div {
  box-shadow:inset 2px 2px 5px #ebeef2;
  margin-top: 30px;
  padding-top: 30px;
  background-color: #f5f7fa;
}
.el-tabs {
  width: 92%;
  margin: 0 auto;
}
.el-tabs__active-bar {
  background-color: #e55f5f;
}
.el-tabs__item:hover {
  color: #E02020;
}
.el-tabs__item.is-active {
  color: #1c1f21;
  font-weight: bold;
}
.el-tabs {
  border: none;
}
.deleteBorder .el-tabs__nav-wrap::after{
  height: 0;
}
</style>