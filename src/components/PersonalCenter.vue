<template>
    <div class='personal_center'>
        <div class='personal_header'>
            <div class='header_part1'></div>
            <div class='header_part2'>
                <el-menu mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                    <el-menu-item index="1">处理中心</el-menu-item>
                    <el-menu-item index="2">消息中心</el-menu-item>
                </el-menu>
            </div>
            <div class='header_part3'></div>
            <div class='header_part4'></div>
        </div>

        <div class='personal_body'></div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.personal_center{
    background-color:white;
    height:100%;
    width:100%;

    position:absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.personal_header{
    background-color:#0d5756;
    height:10%
}

.header_part1{
    height:100%;
    width:15%;
    float:left
    }

.header_part2{
    background-color:pink;
    height:50%;
    width:30%;
    float:left
}

.el-menu{
    height:100%;
    top:50
}

.personal_body{
    background-color:#a6dbe1;
    height:90%;
    width:70%;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
</style>
