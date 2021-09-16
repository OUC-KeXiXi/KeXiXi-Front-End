<template>
    <div id="app">
        <el-container style="height: 750px">
            <NavBar></NavBar>
            <el-main style="background-color: rgb(242, 244, 248);">
                <div id="mainPanel" style="width: 100%;">
                    <el-container style="width: 84%; margin-left: 8%;">
                        <el-header style="
                        background-color: rgba(0, 0, 0, 0); 
                        height: 100px;
                        line-height: 100px;
                        ">
                            <b style="
                            font-size: xx-large; 
                            font-weight: lighter; 
                            margin-right: 10px;
                            ">我的购物车</b>
                            <b style="
                            font-size: small; 
                            font-weight: lighter;
                            margin-right: 750px;
                            ">共{{lessons.length}}门，已选择{{choceNum}}门</b>
                            <a href="https://www.baidu.com/" style="font-weight: lighter;">我的历史订单</a>
                        </el-header>
                        <el-main style="
                        background-color: rgb(253, 253, 253); 
                        border-radius: 15px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                        ">
                        <div id="sub-header" align="left" style="margin-top: -50px; margin-left: 30px; height: 90px;">
                            <el-checkbox v-on:change="choceAllLesson" v-model="allSelect" label="全选" border></el-checkbox>
                            <b style="
                            font-size: medium;
                            font-weight: lighter; 
                            margin-left: 70px;
                            ">课程</b>
                            <b style="
                            font-size: medium; 
                            font-weight: lighter; 
                            margin-left: 560px;
                            padding-left: 20px;
                            ">金额</b>
                            <b style="
                            font-size: medium; 
                            font-weight: lighter; 
                            margin-left: 200px;
                            ">操作</b>
                        </div>
                        <el-divider></el-divider>
                        <p v-if="isShow" style="line-height: 40px; font-size: x-large; font-weight: lighter;">购物车里没有东西哦！</p>
                        <template v-for="(item, index) in lessons" :key="item.id">
                            <div id="lesson" class="flex" style="height: 80px; line-height: 20px; width:1100px">
                                <el-checkbox v-model="item.checked" :label="index+1" border
                                :checked="item.checked"></el-checkbox>
                                <a href="https://www.baidu.com/">
                                <img :src="item.img" style="margin-left: 80px; margin-right: 20px; height:90px; width:160px"/>
                                </a>
                                <a href="https://www.baidu.com/" style="width: 400px; text-align: left; margin-right: 20px;">{{item.title}}</a>
                                <b style="margin-right: 160px;width: 75px;">￥ {{item.price}}</b>
                                <el-button @click="deleteBtn(item.id)" icon="el-icon-delete" style="margin-left:10px; font-size: 15px;" circle></el-button>
                            </div>
                            <el-divider></el-divider>
                        </template>
                        </el-main>
                    </el-container>
                </div>
            </el-main>
            <el-footer style="
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            height: 80px;
            line-height: 80px;
            padding-left: 800px;
            ">
                <div class="flex" style="height: 80px; line-height: 20px; width:650px">
                <b style="font-weight: lighter;">总计金额：</b>
                <b style="color: red; font-size: large; margin-right: -30px;width: 150px;text-align: left;">￥ {{totalCount}}</b>
                <el-button @click="goToOrder" type="danger" size="large" style="
                background-color: red; 
                height: 50px; 
                width: 100px; 
                font-size: large;
                font-weight: lighter;
                ">购买</el-button>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>
<script>
import storage from "good-storage";
import NavBar from '../components/NavBar.vue'
import { get_verification_code, login, register } from "../api/account.js";
import axios from 'axios'

export default {
    name:"ShoppingCart",
    data(){
        return{
            allSelect:false,
            lessons:[],
            isShow:false,
            cinfo:[],
            info:null
        }
    },
    methods:{
        choceAllLesson(){
            if(this.allSelect == true){
                for(let i = 0; i < this.lessons.length; i++){
                    this.lessons[i].checked = true;
                }
            }else{
                for(let i = 0; i < this.lessons.length; i++){
                    this.lessons[i].checked = false;
                }
            }
        },
        deleteBtn(val){
            this.$confirm('此操作将会在购物车中删除该项，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                for(let i = 0; i < this.lessons.length; i++){
                    if(this.lessons[i].id==val){
                        this.lessons.splice(i, 1);
                        var data = {
                            course_id: parseInt(val)
                        };
                        var dinfo = axios({
                            url: "/api/cart/delete_course",
                            method: 'post',
                            headers: {'Content-Type': 'application/json'},
                            data
                        })
                        console.log(dinfo);
                    }
                }
            }).catch(() => {
                
            });
        },
        goToOrder(){
            var ids = [];
            for(let i = 0; i < this.lessons.length; i++){
                if(this.lessons[i].checked == true){
                    ids.push(this.lessons[i].id);
                }
            }
            if(ids.length != 0){
                this.$router.push({ path: "/OrderComfirm", query: {ids: ids} });
            }else{
                this.$alert('没有选中的商品', '警告', {
                    confirmButtonText: '确定',
                    callback: action => {

                    }
                });
            }
            
        }

    },
    computed:{
        totalCount(){
            var totalCount = 0;
            for(let i = 0; i < this.lessons.length; i++){
                if(this.lessons[i].checked == true){
                    totalCount += parseInt(this.lessons[i].price);
                }
            }
            return totalCount;
        },
        choceNum(){
            var num = 0;
            for(let i = 0; i < this.lessons.length; i++){
                if(this.lessons[i].checked == true)
                    num++;
            }
            return num;
        }
    },components: {
        NavBar
    },mounted () {
        /*login({
            username: "249606097",
            password: "liu123",
        })
        .then((response) => {
            console.log(response);
            if (response.data.code === 20000) {
            //成功并保存登录状态
            this.$message.success("登录成功！");
            // 设置本地 session 缓存
            storage.set("login", this.loginForm.username);
            //TODO 登录之后后续跳转处理

            } else {
            this.$message.error("登录失败：" + response.data.msg);
            }
        })
        .catch((error) => {
            console.log(error);
        });*/

        let t = this;
        axios
            .get('/api/cart/get_my_cart')
            .then(response => {
                t.info = response.data.data.courses;
                console.log(t.info);
                for(let i = 0; i < response.data.data.courses.length; i++){
                    axios.get('/api/course/get_course_detail',{
                        params: {
                            course_id: response.data.data.courses[i]
                        }
                    }).then(res => {//接口返回数据  
                        //console.log(params.data.data);
                        console.log(res);
                        var d = res.data.data;
                        var temp = {
                            id: d.course_id,
                            img: 'https://weparallelines.top' + d.cover,
                            title: d.title,
                            price: d.price,
                            checked: false
                        };
                        t.lessons.push(temp)
                    })
                }
            })
            .catch(function(error){
                console.log(error);
            });

        /*var data = {
            courses_id: 2
        };
        var or = axios({
            url: "/api/order/place_order",
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            data
        })
        console.log(or);*/
    }

}
</script>
<style>
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 0px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .el-header, .el-footer {
        background-color: #ffffff;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    body > .el-container {
        margin-bottom: 40px;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    } 

    a:link{
        color:#333;
        text-decoration:none;
    }
    a:visited{
        color:#333;
        text-decoration:none;
    }
    body{
        margin: 0;
        padding: 0;
        text-align: center;
    }
    .app{
        margin: 0 auto;
    }
    .flex{
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
</style>