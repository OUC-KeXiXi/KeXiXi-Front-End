<template>
    <div class="body">
        <el-container class='el_outer_container'>
            <!--头部区域../assets/logo.png-->
            <el-header style="height:10%; width:110%">
                <Nav></Nav>
            </el-header>
            <el-container class="el_inner_container">
                <!-- 侧边栏区域 -->
                <el-aside width=200px>
                    <el-menu
                    background-color="#306754"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :default-active="this.$router.path"
                    :router="true">
                        <div class='avatar_section' @click="avatarDiagVisible = true">
                            <div class="avatar_section1"><el-avatar :size="180" :src="squareUrl" :fit="fit"></el-avatar></div>
                        </div>
                        <div style="height:30px"></div>
                        <el-menu-item index="UserMessage"><i class="el-icon-user"></i><span class='span'>个人信息修改</span></el-menu-item>
                        <el-menu-item index="PurchasedCourses"><i class="el-icon-s-order"></i><span class='span'>已购买课程</span></el-menu-item>
                    </el-menu>
                </el-aside>
                <!-- 页面主体显示区域 -->
                <el-main style="overflow-y: scroll"><router-view></router-view></el-main>
            </el-container>
        </el-container>

        
    </div>
</template>

<script>
import axios from 'axios'
import Nav from "../NavBar.vue"
// import Bottom from "../FixedBottom.vue"

export default {
    data () {
        return {
            avatarDiagVisible: 'false',

            squareUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',

            fit: 'cover',

            imageUrl: '',

            uploadData: {
                img: ''
            }
        }
    },
    methods: {
        getMessage () {
            axios.get("/api/account/status").then(res => {
                this.imageUrl = 'https://weparallelines.top' + res.data.data.avatar;
                // console.log(this.imageUrl);
            })
        }
    },
    created () {
        this.getMessage();
    },
    components:{
        Nav,
        // Bottom,
  },
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

.el_inner_container{
    max-height: 700px;
    overflow: auto;
    margin-left: 30px;
    margin-right: 30px;
}

.el-header{
    padding-left:0;
}

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
    background-color: #e7e6e6;
}

.avatar_section1{
    width: 100%;
    border: none;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
}

.el-avatar{
    border: none;
    vertical-align: middle;
    margin-left:5px;
}
</style>
