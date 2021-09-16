<template>
  <div class="goodslist">
    <div class="publish-button">
      <el-button type="primary" @click="toPublishNew()">发布商品</el-button>
    </div>
    <p class="publish-text">点击发布新的课程商品\(￣︶￣*\)</p>
    <el-card
      :key="course"
      v-for="course in currentlist"
      class="goods-card"
      body-style="height: 120px"
    >
      <el-row style="height: 100%">
        <el-col style="height: 100%" :span="6" class="col">
          <div class="cover"><img class="coverimg" :src="course.cover" /></div
        ></el-col>
        <el-col :span="8" class="title">
          <el-link @click="toCourse(course.course_id)">{{ course.title }}</el-link>
        </el-col>
        <el-col :span="9" class="buttons">
          <el-button v-if="published" type="primary" size="small" @click="unpublishCourse(course.course_id)">下架</el-button>
          <el-button v-else type="primary" size="small" @click="publishCourse(course.course_id)">上架</el-button>
          <el-button type="primary" size="small" @click="toEdit(course)">编辑</el-button>
          <el-button type="primary" size="small" @click="deleteCourse(course.course_id)">删除</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-pagination
      class="list-pagination"
      :page-size="pageSize"
      :pager-count="11"
      layout="prev, pager, next"
      :total="listLength"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      hide-on-single-page
    />
  </div>
  <PublishDialog ref="PublishDialog" :course="selectedCourse" />
</template>
<script>
import PublishDialog from "../SellerCenter/PublishDialog.vue";
import { get_my_courses_list,publish_course,unpublish_course,delete_course } from "../../api/course.js";
export default {
  name: "GoodsList",
  components: {
    PublishDialog,
  },
  props: {
    published: Boolean,
  },
  data() {
    return {
      selectedCourse: {
        new: true,
        course_id: "",
        title: "",
        content: "",
        cover: "",
        price: 0.01,
        tags: [],
      },
      list: [],
      currentlist: [],
      listLength: 1,
      pageSize: 20,
      currentPage: 1,
    };
  },

  created() {
    this.getMyGoodsList();
  },
  methods: {
    //获取售卖课程
    getMyGoodsList() {
      this.list = [];
      this.listLength = 1;
      get_my_courses_list()
        .then((response) => {
          if (response.data.code === 20000) {
            //成功
            this.listLength = response.data.data.courses.length;
            let newcourse = {};
            for (let course of response.data.data.courses) {
              if (course.published === this.published) {
                newcourse = Object.assign({}, course);
                this.list.push(newcourse);
              }
            }
            console.log(this.listLength, this.list);
            this.getCurrentList();
          } else {
            this.$message.error("课程获取失败：" + response.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("请求时出错！");
          console.log(error);
        });
    },
    //获取分页特定页内容
    getCurrentList() {
      let begin = this.pageSize * (this.currentPage - 1);
      let end = this.pageSize * this.currentPage;
      if (this.list.length < end) end = this.list.length;
      this.currentlist = [];
      for (let i = begin; i < end; i++) {
        this.currentlist.push(this.list[i]);
      }
      console.log(this.currentlist);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCurrentList();
    },
    //打开新建课程对话框
    toPublishNew() {
      this.selectedCourse = {
        new: true,
        course_id: "",
        title: "",
        content: "",
        cover: "",
        price: 0.01,
        tags: [],
      };
      this.$refs.PublishDialog.openDialog();
    },
    toCourse(course_id){
      this.$router.push({ path: "CourseDetail", query: { course_id: course_id } })
    },
    publishCourse(course_id){
      publish_course({
        course_id: course_id,
      })
        .then((response) => {
          console.log(response);
          if (response.data.code === 20000) {
            //成功
            this.$message.success("课程上架成功！");
            this.$router.go(0);
          } else {
            this.$message.error("课程上架失败：" + response.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("请求时出错！");
          console.log(error);
        });
    },
    unpublishCourse(course_id){
      unpublish_course({
        course_id: course_id,
      })
        .then((response) => {
          console.log(response);
          if (response.data.code === 20000) {
            //成功
            this.$message.success("课程下架成功！");
            this.$router.go(0);
          } else {
            this.$message.error("课程下架失败：" + response.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("请求时出错！");
          console.log(error);
        });
    },
    deleteCourse(course_id){
      delete_course({
        course_id: course_id,
      })
        .then((response) => {
          console.log(response);
          if (response.data.code === 20000) {
            //成功
            this.$message.success("课程删除成功！");
            this.$router.go(0);
          } else {
            this.$message.error("课程删除失败：" + response.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("请求时出错！");
          console.log(error);
        });
    },
    toEdit(course){
      let tagarr=[];
      for(let tag of course.tags){
        tagarr.push(tag.tag_id);
      }
      this.selectedCourse = {
        new: false,
        course_id: course.course_id,
        title: course.title,
        content: course.content,
        cover: course.cover,
        price: course.price,
        tags: tagarr,
      };
      console.log("aaa");
      console.log(course);
      console.log(this.selectedCourse);
      this.$refs.PublishDialog.openDialog();
    },
  },
};
</script>

<style scoped lang="less">
@import "../../style/style.less";
.publish-button {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
}

.publish-text {
  color: gray;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  text-align: center;
}

.list-pagination {
  text-align: center;
}

.goods-card {
  margin: 20px 0;
}
.col{
  display: flex;
  align-items: center;
}
.cover {
  width: 100%;
  height: 100%;
}
.coverimg {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}
.title {
  display: flex;
  align-items: center;
}
.buttons{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>