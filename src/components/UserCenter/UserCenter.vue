<template>
  <Nav></Nav>
            <el-container class="el_inner_container">
                <!-- 侧边栏区域 -->
                <el-aside width=200px>
                    <el-menu
                    text-color="color: #1c1f21;"
                    active-text-color="#ffd04b"
                    :default-active="this.$router.path"
                    :router="true">
                        <div class='avatar_section' @click="avatarDiagVisible = true">
                            <div class="avatar_section1"><el-avatar :size="180" :src="squareUrl" :fit="fit"></el-avatar></div>
                        </div>
                        <div style="padding-top:20px"></div>
                        <el-menu-item index="UserMessage"><i class="el-icon-user"></i><span class='span'>个人信息修改</span></el-menu-item>
                        <el-menu-item index="PurchasedCourses"><i class="el-icon-s-order"></i><span class='span'>已购买课程</span></el-menu-item>
                    </el-menu>
                </el-aside>
                <!-- 页面主体显示区域 -->
                <el-main style="overflow-y: scroll"><router-view></router-view></el-main>
            </el-container>
  <FixedBottom></FixedBottom>
</template>

<script>
import axios from 'axios'
import Nav from "../NavBar.vue"
import FixedBottom from "../FixedBottom";

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
        FixedBottom
  },
}
</script>

<style scoped>
.el_inner_container{
  padding: 30px;
}

.span{
    font-size:20px;
}

.el-main{
    overflow: hidden;
}

.avatar_section{
    width: 100%;
    height: 700%;
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
