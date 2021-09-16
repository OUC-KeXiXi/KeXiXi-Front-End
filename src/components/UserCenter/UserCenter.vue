<template>
    <div class="body">
        <el-container class='el_outer_container'>
            <!--头部区域../assets/logo.png-->
            <el-header style="height:10%">
                <div class='header_div'>
                    <img src="../../assets/img/logo.png" alt="auto" style="height:50px; width:150px">
                    <span style="margin-left:15px">买家个人中心</span>
                </div>
                <el-button type="info">退出</el-button>
            </el-header>
            <el-container>
                <!-- 侧边栏区域 -->
                <el-aside width=200px>
                    <el-menu
                    background-color="#306754"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :default-active="this.$router.path"
                    :router="true">
                        <!-- <div>
                            <el-card>
                                <el-upload
                                    class="avatar-uploader"
                                    action="/api/upload"
                                    :data="uploadData"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :on-remove="handleRemove"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <span v-if="imageUrl" class="el-upload-action" @click.stop="handleRemove()">
                                        <i class="el-icon-delete"></i>
                                    </span>
                                    <i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
                                </el-upload>
                            </el-card>
                        </div> -->
                        <div class='avatar_section'>
                            <div class="avatar_section1"><el-avatar :size="180" :src="squareUrl" :fit="fit"></el-avatar></div>
                        </div>
                        <div style="height:30px"></div>
                        <el-menu-item index="UserMessage"><i class="el-icon-user"></i><span class='span'>个人信息修改</span></el-menu-item>
                        <el-menu-item index="PurchasedCourses"><i class="el-icon-s-order"></i><span class='span'>已购买课程</span></el-menu-item>
                    </el-menu>
                </el-aside>
                <!-- 页面主体显示区域 -->
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
// import request from '../utils/request'
import axios from 'axios'
export default {
    data () {
        return {
            squareUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',

            fit: 'cover',

            imageUrl: '',

            uploadData: {
                img: ''
            }
        }
    },
    methods: {
        // // 移除图片
        // handleRemove() {
        //     this.imageUrl = ''
        // },
        // // 上传成功回调
        // handleAvatarSuccess(res, file) {
        //     // this.imageUrl = res.data.img
        //     console.log(res);
        //     // console.log("------------");
        //     // console.log(file)
        // },
        // // 上传前格式和图片大小限制
        // beforeAvatarUpload(file) {
        //     const type = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
        //     const isLt2M = file.size / 1024 / 1024 < 2
        //     if (!type) {
        //         this.$message.error('图片格式不正确!(只能包含jpg，png，webp，JPEG)')
        //     }
        //     if (!isLt2M) {
        //         this.$message.error('上传图片大小不能超过 2MB!')
        //     }
        //     // this.uploadData.img = file.name;
        //     // console.log("-------------------");
        //     // console.log(file.name);
        //     axios({
        //         url: '/api/upload',
        //         method: 'post',
        //         img: file.name
        //     })
        //     return type && isLt2M
        // }
        getMessage () {
            axios.get("/api/account/status").then(res => {
                this.imageUrl = 'https://weparallelines.top' + res.data.data.avatar;
                // console.log(this.imageUrl);
            })
        }
    },
    created () {
        this.getMessage();
    }
}
</script>

<style scoped>
.body{
    height:100%;
}

.el_outer_container{
   position:absolute;
   left:0;
   right:0;
   top:0;
   bottom:0;
   overflow:hidden;
}

.el-header{
    background-color:#82dfdd;
    display:flex;
    justify-content:space-between;
    padding-left:0;
    align-items:center;
    color:white;
    font-size:30px;
}

.header_div{
    display:flex;
    align-items:center;
}

/* .el-menu-item{
    text-align: center;
} */

.span{
    font-size:20px;
}

.el-aside{
    background-color:#1e5005;
}

.el-main{
    background-color:#F0F8FF;
    overflow: hidden;
}

.avatar_section{
    width: 100%;
    height: 700%;
    background-color: lemonchiffon;
}

.avatar_section1{
    width: 100%;
    border: 1px solid #020202;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
}

.el-avatar{
    border: none;
    vertical-align: middle;
    margin-left:5px;
}

/* /////////////////// */
/* .avatar-uploader{
  width: 270PX;
  height: 270px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-size: 100% 100%;
  background-color: lightgoldenrodyellow;
}
.avatar-uploader-icon{
  font-size: 0;
  color: #fff;
  width: 270px;
  height: 270px;
  line-height: 270px;
  text-align: center;
}
.avatar-uploader-icon:hover{
  font-size: 28px;
  background-color: rgba(0, 0, 0, .3);
}
.avatar {
  position: relative;
  width: 270px;
  height: 270px;
  display: block;
  margin-left: 5px;
}
.el-upload-action {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0;
  color: rgb(211, 209, 209);
  text-align: center;
  line-height: 270px;

}
.el-upload-action:hover {
  font-size: 20px;
  background-color: #000;
  background-color: rgba(0, 0, 0, .3)
} */
</style>
