<template>
    <el-container class='el_outer_container'>
        <!--头部区域../assets/logopl.png-->
        <el-header style="height:10%">
            <div class='header_div'>
                <img src="../assets/logopl.png" alt="auto">
                <span style="margin-left:15px">卖家个人中心</span>
            </div>
            <el-button type="info">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width=15%>
                <el-menu
                background-color="#306754"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true">
                    <el-menu-item :index="PersonalMessage"><span class='span'>个人信息修改</span></el-menu-item>
                    <el-menu-item :index="PurchasedCourse"><span class='span'>已购买课程</span></el-menu-item>
                </el-menu>
            </el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {}
</script>

<style scoped>

.el_outer_container{
    height:100%
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
