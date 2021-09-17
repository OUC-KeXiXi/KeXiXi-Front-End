<template>
  <NavBar></NavBar>
  <div class="box">
  <el-container class="container">
    <el-aside width="228px">
      <div class="aside-div">
      <el-scrollbar>
        <div v-for="item in tabLists" :key="item">
          <div class="tabItem" @click="gotoTagSearch(item.tag_id)">
          <span>{{ item.tag_name }}</span>
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
import "../assets/css/home.css";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import { CaretRight } from '@element-plus/icons'
import FixedBottom from "../components/FixedBottom";
import {get_all_tags} from "../api/course";
import router from "../router";

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
      tabLists: []
    }
  },
  created() {
    get_all_tags().then((res=>{
      console.log("==================tag===============",res.data.data.tags);
      this.tabLists = res.data.data.tags;
    }))
  },
  methods: {
    gotoTagSearch(event) {
      console.log("===================tagID=================", event);
      router.push({
        path: '/Font',
        query: {tag_id: event}
      })
    },
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
.container {
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
</style>