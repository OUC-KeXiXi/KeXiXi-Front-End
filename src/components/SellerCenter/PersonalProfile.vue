<template>
  <div class="profile">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="我的资料" prop="key" width="100px" />
      <el-table-column label="" prop="value" />
      <el-table-column align="right" width="300px">
        <template #header>
          <el-button
            type="primary"
            size="medium"
            @click="avatarDialogVisible = true"
            >修改头像</el-button
          >
          <el-button
            type="primary"
            size="medium"
            @click="nicknameDialogVisible = true"
            >修改昵称</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="修改头像"
      v-model="avatarDialogVisible"
      :destroy-on-close="true"
      width="30%"
    >
      <div v-if="imageUrl">
        <div class="save-left">
          <el-image
            fit="cover"
            :src="'https://weparallelines.top' + imageUrl"
            :preview-src-list="preview_img"
            class="upload-image"
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
        <div class="save-right">
          <span class="save-text">这是您的新头像(^-^*)/</span>
          <el-button
            class="save-btn"
            type="primary"
            @click="changeAvatar()"
            :loading="btn_loading"
            >保存修改</el-button
          >
        </div>
      </div>
      <div v-else class="box-tip">
        <div class="up-img">
          <el-upload
            class="avatar-uploader"
            action="https://weparallelines.top/api/upload"
            :on-preview="handlePreview"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadImg"
          >
            <el-button type="primary" :loading="btn_loading"
              ><i class="el-icon-upload" />上传图片</el-button
            >
          </el-upload>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="修改昵称"
      v-model="nicknameDialogVisible"
      :destroy-on-close="true"
      width="30%"
    >
      <el-input
        placeholder="请输入要更改的昵称"
        v-model="nametoChange"
        maxlength="20"
      />
      <div style="text-align: right; margin: 20px 0 0">
        <el-button
          size="medium"
          type="text"
          @click="nicknameDialogVisible = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="medium"
          @click="changeNickname()"
          :loading="btn_loading"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>



<script>
import storage from "good-storage";
import {
  change_avatar,
  change_nickname,
  get_status,
  get_storage_user_data,
} from "../../api/account.js";
import { img_upload } from "../../api/miscs.js";

export default {
  name: "PersonalProfile",
  data() {
    return {
      avatarDialogVisible: false,
      nicknameDialogVisible: false,
      tableData: [], //key-value
      nametoChange: "",

      btn_loading: false,
      imageUrl: "",
      preview_img: [],
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      this.tableData = [];
      get_storage_user_data()
        .then((userdata) => {
          this.tableData.push({
            key: "用户名",
            value: userdata.username,
          });
          this.tableData.push({
            key: "昵称",
            value: userdata.nickname,
          });
          this.tableData.push({
            key: "邮箱",
            value: userdata.email,
          });
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    uploadImg(file) {
      let form = new FormData();
      console.log(file.file);
      form.append("img", file.file);
      img_upload(form)
        .then((res) => {
          console.log(res);
          if (res.data.code === 20000) {
            this.imageUrl = res.data.data.path;
            console.log(this.imageUrl);
          } else {
            console.log("上传失败：" + res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleAvatarSuccess(res, file) {},
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

    deleteImage: function () {
      this.imageUrl = "";
      this.preview_img = [];
    },

    changeAvatar() {
      this.btn_loading = true;
      change_avatar({
        path: this.imageUrl,
      })
        .then((response) => {
          if (response.data.code === 20000) {
            //成功
            this.$message.success("头像修改成功！");
            get_storage_user_data()
              .then((userdata) => {
                userdata.avatar = "https://weparallelines.top" + this.imageUrl;
                storage.set("user_data", userdata);
              })
              .catch((error) => {
                this.$message.error(error);
              });
            this.dialogVisible = false;
            this.btn_loading = false;
            this.$router.go(0);
          } else {
            this.$message.error("头像修改失败：" + response.data.msg);
            this.btn_loading = false;
          }
        })
        .catch((error) => {
          this.$message.error("请求时出错！");
          console.log(error);
          this.btn_loading = false;
        });
    },
    changeNickname() {
      this.btn_loading = true;
      if (
        typeof this.nametoChange == "undefined" ||
        this.nametoChange.match(/^\s*$/)
      ) {
        this.$message.error("无效的昵称！");
        this.btn_loading = false;
        return;
      }
      change_nickname({
        nickname: this.nametoChange,
      })
        .then((response) => {
          if (response.data.code === 20000) {
            //成功
            this.$message.success("昵称修改成功！");
            get_storage_user_data()
              .then((userdata) => {
                userdata.nickname = this.nametoChange;
                storage.set("user_data", userdata);
              })
              .catch((error) => {
                this.$message.error(error);
              });
            this.nicknameDialogVisible = false;
            this.btn_loading = false;
            this.$router.go(0);
          } else {
            this.$message.error("昵称修改失败：" + response.data.msg);
            this.btn_loading = false;
          }
        })
        .catch((error) => {
          this.$message.error("请求时出错！");
          console.log(error);
          this.btn_loading = false;
        });
    },
  },
};
</script>

<style scoped lang="less">
@import "../../style/style.less";
.my-label {
  width: 30%;
}
.my-content {
  width: 70%;
}

.save-left {
  /*margin-left: 15px;*/
  /*margin-top: 20px;*/
  margin: 0 auto;
  /*float: left;*/
  position: relative;
  background-color: @secondary-color;
  width: 160px;
  height: 160px;
  border-radius: 3px;
}
.upload-image {
  width: 160px;
  height: 160px;
  border-radius: 3px;
}
.delete-button {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0.7;
}
.save-right {
  margin: 10px auto 0;
  /*float: left;*/
  width: 200px;
  position: relative;
  text-align: center;
  justify-content: center;
}
.save-text {
  font-size: 15px;
  color: #aaa8a8;
  display: block;
}
.save-btn {
  margin-top: 20px;
}

.box-tip {
  /*margin-top: 20px;*/
  border: dashed 3px #e1e1e1;
  height: 160px;
  width: 98%;
  background-color: #fafafa;
}
.up-img {
  height: 35px;
  width: 110px;
  background-color: @primary-color;
  border-radius: 3px;
  margin: 0 auto;
  cursor: pointer;
}
.up-img {
  margin-top: 60px;
}
.tip1 {
  color: #f7f7f7;
  display: inline-block;
  line-height: 35px;
  vertical-align: middle;
  font-size: 15px;
}
.icon-img1 {
  line-height: 35px;
  vertical-align: middle;
  height: 16px;
  width: 16px;
  margin-right: 1px;
}

.name-btn {
  position: absolute;
  display: inline;
  padding: 0;
  top: 30%;
  left: 105%;
  color: #909399;
}
.change_name {
  min-height: auto;
  height: auto;
}
</style>