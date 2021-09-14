<template>
  <el-row>
    <el-col
        :span="6"
        v-for="item in images"
        :key="item.id"
        :offset="index > 0 ? 8 : 0"
    >
      <el-card :body-style="{ padding: '0px' }">
        <el-image
            :src="item.url"
            class="image"
        />
        <div style="padding: 14px;">
          <span class="name">{{item.name}}</span>
          <div class="bottom">
            <p class="price">¥{{item.price}}</p>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      images: [
        {
          id: 1,
          name: 'Vue.js源码全方位深入解析，快人一步进名企',
          price: '134.00',
          url: require("../assets/img/1.jpg")
        },
        {
          id: 2,
          name: '晋级TypeScript高手，成为抢手的前端开发人才',
          price: '499.00',
          url: require("../assets/img/2.jpg")
        },
        {
          id: 3,
          name: 'React+TypeScript 最佳实践\n' +
              '仿 Jira 企业级项目',
          price: '388.00',
          url: require("../assets/img/3.jpg")
        },
        {
          id: 4,
          name: 'Spring Boot + Vue3 前后端分离\n' +
              '实战wiki知识库系统',
          price: '108.00',
          url: require("../assets/img/4.jpg")
        },
        {
          id: 5,
          name: 'Docker 系统性入门+进阶实践（2021最新版）',
          price: '699.00',
          url: require("../assets/img/1.jpg")
        },
        {
          id: 6,
          name: 'Docker 系统性入门+进阶实践（2021最新版）',
          price: '699.00',
          url: require("../assets/img/5.jpg")
        },
        {
          id: 7,
          name: 'Docker 系统性入门+进阶实践（2021最新版）',
          price: '699.00',
          url: require("../assets/img/3.jpg")
        },
        {
          id: 8,
          name: 'Docker 系统性入门+进阶实践（2021最新版）',
          price: '699.00',
          url: require("../assets/img/2.jpg")
        }
      ]
    }
  },
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
}
.image {
  width: 270px;
  height: 152px;
  display: block;
}
</style>