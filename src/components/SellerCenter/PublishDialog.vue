<template>
  <el-dialog
    width="90%"
    top="5vh"
    :close-on-click-modal="false"
    v-model="publishDialogVisible"
    :title="formTitle"
    @open="onOpen"
  >
    <el-form
      :model="publishForm"
      ref="publishForm"
      status-icon
      hide-required-asterisk
      label-position="right"
      label-width="120px"
    >
      <el-form-item label="课程标题" prop="title">
        <el-input class="input_title" v-model="publishForm.title" maxlength="30" show-word-limit/>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-check-tag
          class="course_tag"
          :key="tag"
          @change="onChangeTag(!tag.checked, tag)"
          :checked="tag.checked"
          v-for="tag in taglist"
        >
          {{ tag.tag_name }}
        </el-check-tag>
        <span>（可多选）</span>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number
          v-model="publishForm.price"
          class="input_price"
          :precision="2"
          :step="0.01"
          step-strictly
          :controls="false"
          :min="0.01"
        />
        <span style="margin-left: 6px">元</span>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <div>
          <el-upload
            class="upload-demo"
            action="https://weparallelines.top/api/upload"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemoveFile"
            :on-exceed="handleExceed"
            :http-request="uploadImg"
            :multiple="false"
            :limit="1"
            :file-list="filelist"
            drag
          >
            <div
              v-if="this.publishForm.cover"
              class="el-upload-list__item-thumbnail"
            >
              <img
                class="el-upload-list__item-thumbnail"
                :src="'https://weparallelines.top' + this.publishForm.cover"
                alt=""
              />
              <el-button
                icon="el-icon-close"
                class="delete-button"
                @click="deleteImage()"
                type="info"
                circle
                size="mini"
              />
            </div>
            <div v-else>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </div>
            <template #tip>
              <span class="el-upload__tip">只能上传 jpg/png 文件</span>
            </template>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="课程内容" prop="content">
        <el-input type="textarea" :rows="15" v-model="publishForm.content" />
      </el-form-item>
      <div class="dialog-footer">
        <el-button @click="publishDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="publish()">发布</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { get_all_tags,create_new_course,edit_course } from "../../api/course.js";
import { img_upload } from "../../api/miscs.js";
export default {
  name: "PublishDialog",
  props: {
    course: Object,
  },
  data() {
    return {
      publishDialogVisible: false,
      formTitle: "发布商品",
      publishForm: {
        title: this.course.title,
        content: this.course.content,
        cover: this.course.cover,
        price: this.course.price,
        tags: this.course.tags,
      },
      priceStr: "",
      taglist: [],
      preview_img: [],
      filelist: [],
    };
  },
  created() {
    this.getAllTags();
  },
  methods: {
    openDialog() {
      this.publishDialogVisible = true;
    },
    onOpen(){
      let price = parseFloat(this.course.price);
      for(let i of this.taglist){
        i.checked=false;
        for(let j of this.course.tags){
          if(i.tag_id===j){
            i.checked=true;
            break;
          }
        }
      }
      this.publishForm= {
        title: this.course.title,
        content: this.course.content,
        cover: this.course.cover,
        price: price,
        tags: this.course.tags,
      };
    },
    getAllTags() {
      this.taglist = [];
      get_all_tags()
        .then((response) => {
          if (response.data.code === 20000) {
            for (var tag of response.data.data.tags) {
              let newtag = Object.assign({}, tag);
              newtag.checked = false;
              this.taglist.push(newtag);
            }
            console.log(this.taglist);
          } else {
            this.$message.error("获取标签失败：" + response.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("请求时出错！");
          console.log(error);
        });
    },
    onChangeTag(check, tag) {
      tag.checked = check;
      if(check){
        this.publishForm.tags.push(tag.tag_id);
      }
      else{
        var index = this.publishForm.tags.indexOf(tag.tag_id);
        this.publishForm.tags.splice(index, 1)
      }
    },
    uploadImg(file) {
      let form = new FormData();
      console.log(file.file);
      form.append("img", file.file);
      img_upload(form)
        .then((res) => {
          console.log(res);
          if (res.data.code === 20000) {
            this.publishForm.cover = res.data.data.path;
            console.log(this.publishForm.cover);
          } else {
            console.log("上传失败：" + res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleAvatarSuccess(res, file) {},
    handleExceed(files, fileList) {
      console.log(files, fileList);
      this.$message.error("只能上传一张图片！");
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG/JPEG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
    handlePreview(file) {},
    handleRemoveFile(file, fileList) {
      this.deleteImage();
    },
    deleteImage() {
      this.publishForm.cover = "";
      this.preview_img = [];
      this.filelist = [];
    },
    publish() {
      let floatnum = this.publishForm.price.toFixed(2);
      this.priceStr = floatnum.toString();
      if(this.course.new === false){
        this.editCourse();
      }
      else{
        this.createNewCourse();
      }
    },
    createNewCourse(){
      create_new_course({
        title: this.publishForm.title,
        content: this.publishForm.content,
        cover: this.publishForm.cover,
        price: this.priceStr,
        tags: this.publishForm.tags,
      })
        .then((response) => {
          console.log(response);
          if (response.data.code === 20000) {
            //成功
            this.$message.success("课程发布成功！");
            this.resetForm("publishForm");
            this.$router.go(0);
          } else {
            this.$message.error("发布失败：" + response.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("请求时出错！");
          console.log(error);
        });
    },
    editCourse(){
      edit_course({
        course_id: this.course.course_id,
        title: this.publishForm.title,
        content: this.publishForm.content,
        cover: this.publishForm.cover,
        price: this.priceStr,
        tags: this.publishForm.tags,
      })
        .then((response) => {
          console.log(response);
          if (response.data.code === 20000) {
            //成功
            this.$message.success("课程编辑成功！");
            this.resetForm("publishForm");
            this.$router.go(0);
          } else {
            this.$message.error("编辑失败：" + response.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("请求时出错！");
          console.log(error);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="less">
@import "../../style/style.less";
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
.dialog-footer > .el-button {
  margin: 0 1%;
}
.input_title {
  width: 40%;
}
.course_tag {
  margin-right: 4px;
}
.el-check-tag.is-checked {
  color: @primary-color;
  background-color: @secondary-color;
}
.input_price {
  width: 10%;
}
.el-upload__tip {
  margin-left: 6px;
}
.el-upload-list__item-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.delete-button {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0.7;
}
</style>