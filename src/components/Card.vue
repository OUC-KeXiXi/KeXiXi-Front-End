<template>
  <el-row>
    <el-col
        :span="6"
        v-for="item in cardlists"
        :key="item.id"
        :offset="index > 0 ? 8 : 0"
    >
      <el-card :body-style="{ padding: '0px' }">
        <el-image
            :src="'https://weparallelines.top'+item.cover"
            class="image"
        />
        <div style="padding: 14px;">
          <span class="name">{{item.title}}</span>
          <div class="bottom">
            <p class="price">¥{{item.price}}</p>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {get_hottest_courses, get_latest_courses_list, get_pinned_courses_list} from "../api/account";

export default {
  name: "Card",
  data() {
    return {
      cardlists: []
    }
  },
  props: {
    'activeName': String
  },
  created() {
    get_hottest_courses().then((res)=>{
      this.cardlists = res.data.data.courses;
      console.log('--------初次加载111-----------',this.cardlists);
    })
  },
  updated() {
    this.getList();
  },
  methods: {
    getList(){
      if(this.activeName == 'first') {
        get_hottest_courses().then((res)=>{
          this.cardlists = res.data.data.courses;
          console.log('--------111-----------',this.cardlists);
        })
      }
      if(this.activeName == 'second') {
        get_latest_courses_list().then((res)=>{
          this.cardlists = res.data.data.courses;
          console.log('--------222-----------',this.cardlists);
        })
      }
      if(this.activeName == 'third') {
        get_pinned_courses_list().then((res=>{
          this.cardlists = res.data.data.courses;
          console.log('--------333-----------',this.cardlists);
        }))
      }
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 100px;
  width: 1152px;
  margin-left: auto;
  margin-right: auto;
}
.el-card {
  width: 270px;
  border-radius: 12px;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f5f7fa;
}
.el-card:hover {
  width: 270px;
  border-radius: 12px;
  margin-top: 12px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f5f7fa;
}
.price {
  font-size: 13px;
  color: #f01414;
  font-weight: bold;
}
.bottom {
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  color: #545C63;
  font-size: 14px;
  display: inline-block;
  height: 46px;
  line-height: 1.5rem;
  overflow: hidden;  /** 隐藏超出的内容 **/
  word-break: break-all;
  text-overflow: ellipsis; /** 多行 **/
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
}
.image {
  width: 270px;
  height: 152px;
  display: block;
}
</style>