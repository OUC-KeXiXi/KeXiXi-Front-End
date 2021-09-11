<template>
    <div class="body">
        <el-container class='el_outer_container'>
            <!--头部区域../assets/logo.png-->
            <el-header style="height:10%">
                <div class='header_div'>
                    <img src="" alt="auto">
                    <span style="margin-left:15px">卖家个人中心</span>
                </div>
                <el-button type="info">退出</el-button>
            </el-header>
            <el-container>
                <!-- 侧边栏区域 -->
                <el-aside width=15%>
                    <el-menu
                    background-color="#306754"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :default-active="this.$router.path"
                    :router="true">
                        <el-menu-item index="UserMessage"><span class='span'>个人信息修改</span></el-menu-item>
                        <el-menu-item index="PurchasedCourses"><span class='span'>已购买课程</span></el-menu-item>
                    </el-menu>
                </el-aside>
                <!-- 页面主体显示区域 -->
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {}
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
    background-color:#0d5756;
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

.el-menu-item{
    height:100px
}

.span{
    font-size:25px;
}

.el-aside{
    background-color:#306754
}

.el-main{
    background-color:#F0F8FF
}
</style>
