<template>
    <div id="app">
        <NavBar></NavBar>
        <el-container style="height: 870px">
            <el-main style="">
                <div id="center-main" style="margin-left: 0%;" align="left">
                    <el-container style="background-color: #ffffff;">
                        <el-header style="background-color: #f2f4f6;width: 100%; height: 130px; margin-top: -1.2%;">
                            <div style="margin-top: 0px; margin-left: 0%;" align="left">
                                <p>
                                    <img src="../assets/img/logo.png" style="margin-left : 0px; width: 100px; height: 40px; vertical-align: -10px">
                                    <b style="font-size: 30px;">课夕夕</b>
                                    <span style="font-size: 10px; vertical-align: 3px; color:rgb(89, 103, 134)">网课的圣地</span>
                                    <el-input style="margin-left: 780px; width: 350px" placeholder="请输入关键字..."
                                            class="search-input"
                                            @keyup.enter.native="gotoSearch1"
                                            v-model="inputValue">
                                            <template #append><div @click="gotoSearch()">搜索</div></template>
                                    </el-input>
                                </p>
                            </div>
<!--                            <div style="margin-top: -30px; margin-left: -13.5%;">
                                <b style="margin-left: -835px; font-size: medium; padding-right: 10px">分类:</b>
                                    <el-button @click="changeBtn1()" :type="!showmode1 ? 'text' : 'grey'" plain style="color: black;"><span style="font-size: small; ">不限</span></el-button>
                                    <el-button @click="changeBtn2()" :type="!showmode2 ? 'text' : 'grey'" plain style="color: black"><span style="font-size: small;">前端</span></el-button>
                                    <el-button @click="changeBtn3()" :type="!showmode3 ? 'text' : 'grey'" plain style="color: black"><span style="font-size: small; ">后端</span></el-button>
                                    <el-button @click="changeBtn4()" :type="!showmode4 ? 'text' : 'grey'" plain style="color: black"><span style="font-size: small; ">Vue</span></el-button>
                                    <el-button @click="changeBtn5()" :type="!showmode5 ? 'text' : 'grey'" plain style="color: black"><span style="font-size: small; ">Django</span></el-button>
                                    <el-button @click="changeBtn6()" :type="!showmode6 ? 'text' : 'grey'" plain style="color: black"><span style="font-size: small;">SpringBoot</span></el-button>
                            </div>-->
                        </el-header>
                        <el-main style="background-color: #ffffff; margin-left: 0%; height: 900px">
                          <div style="text-align: left; margin-left: -20px; margin-top: -10px;">
                              <el-button @click="changeTag1()" :type="!showtag1 ? 'text' : 'grey'" size="mini" style="color: black; margin-left: 20px;"><span style="font-size: small;">最新</span></el-button>
                              <el-button @click="changeTag2()" :type="!showtag2 ? 'text' : 'grey'" size="mini" style="color: black"><span style="font-size: small;">销量</span></el-button>
                              <el-button @click="changeTag3()" :type="!showtag3 ? 'text' : 'grey'" size="mini" style="color: black"><span style="font-size: small;">置顶</span></el-button>
                          </div>
                            <div v-if="lessons.length > 0" style="margin-top: 10px; margin-left: 0px">
                              <el-row :gutter="20">
                              <template v-for="item in lessons.slice(0 + (currentPage - 1) * 15, 5 + (currentPage - 1) * 15)" :key="item.course_id" >
                              <el-col :span="4.9">
                                <el-card :body-style="{ padding: '0px' }" shadow="hover" style="height: 250px; width: 262px;">
                                <router-link :to="{path: '/CourseDetail', query:{course_id: item.id}}">  
                                  <img :src="item.img" class="image" style="height: 144px; width: 262px">
                                 </router-link>
                                  <div style="text-align: left; margin-left: 5px; margin-top: 3px; line-height: 15px; width: 250px;">
                                              <span style="font-size: small;">{{item.title}}</span>
                                </div>
                                            <div style="text-align: left; margin-left: 7px; margin-top: 23px; width: 250px; height: 10px;">
                                              <span style="font-size: small">{{item.sales}}人报名</span>
                                            </div>
                                            <div class="bottom" style="margin-left: 5px; margin-top: 13px; width: 245px; height: 10px;">
                                              <span style="color: red">￥{{item.price}}</span>
                                              <el-button type="text" class="button" style="color: red; margin-top: -2px;">
                                                <i class="el-icon-shopping-cart-2"></i><span @click="addShopping(item.id)">加购物车</span>
                                              </el-button>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </template>    
                            </el-row>
                        </div>
                        
                        <div v-if="lessons.length > 5" style="margin-top: 20px; margin-left: 0px">
                              <el-row :gutter="20">
                              <template v-for="item in lessons.slice(5 + (currentPage - 1) * 15, 10 + (currentPage - 1) * 15)" :key="item.course_id">
                              <el-col :span="4.9">
                                <el-card :body-style="{ padding: '0px' }" shadow="hover" style="height: 250px; width: 262px;">
                                   <router-link :to="{path: '/CourseDetail', query:{course_id: item.id}}">  
                                  <img :src="item.img" class="image" style="height: 144px; width: 262px">
                                 </router-link>
                                  <div style="text-align: left; margin-left: 5px; margin-top: 3px; line-height: 15px; width: 250px;">
                                              <span style="font-size: small">{{item.title}}</span>
                                </div>
                                            <div style="text-align: left; margin-left: 7px; margin-top: 20px; width: 250px; height: 10px;">
                                              <span style="font-size: small">{{item.sales}}人报名</span>
                                            </div>
                                            <div class="bottom" style="margin-left: 5px; margin-top: 15px; width: 245px; height: 10px;">
                                              <span style="color: red">￥<b>{{item.price}}</b></span>
                                              <el-button type="text" class="button" style="color: red; margin-top: -2px;">
                                                <i class="el-icon-shopping-cart-2"></i><span @click="addShopping(item.id)">加购物车</span>
                                              </el-button>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </template>    
                            </el-row>
                        </div>

                        <div v-if="lessons.length > 10" style="margin-top: 20px; margin-left: 0px">
                              <el-row :gutter="20">
                              <template v-for="item in lessons.slice(10 + (currentPage - 1) * 15, 15 + (currentPage - 1) * 15)" :key="item.course_id">
                              <el-col :span="4.9">
                                <el-card :body-style="{ padding: '0px' }" shadow="hover" style="height: 250px; width: 262px;">
                                  <router-link :to="{path: '/CourseDetail', query:{course_id: item.id}}">  
                                  <img :src="item.img" class="image" style="height: 144px; width: 262px">
                                 </router-link>
                                  <div style="text-align: left; margin-left: 5px; margin-top: 3px; line-height: 15px; width: 250px;">
                                              <span style="font-size: small">{{item.title}}</span>
                                </div>
                                            <div style="text-align: left; margin-left: 7px; margin-top: 20px; width: 250px; height: 10px;">
                                              <span style="font-size: small">{{item.sales}}人报名</span>
                                            </div>
                                            <div class="bottom" style="margin-left: 5px; margin-top: 15px; width: 245px; height: 10px;">
                                              <span style="color: red">￥{{item.price}}</span>
                                              <el-button type="text" class="button" style="color: red; margin-top: -2px;">
                                                <i class="el-icon-shopping-cart-2"></i><span @click="addShopping(item.id)">加购物车</span>
                                              </el-button>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </template>    
                            </el-row>
                        </div>
                        </el-main>
                    </el-container>
                </div>
                <div class="block" style="margin-top: 30px; height: 50px;">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      v-model:currentPage="currentPage"
                      :page-size="100"
                      layout="prev, pager, next, jumper"
                      :total="1000"
                      style="padding-bottom: -100px;"
                    >
                    </el-pagination>
                </div>
                <Bottom style="line-height: 15px; height: 130px"></Bottom>
            </el-main>
        </el-container>
        
    </div>
</template>

<script>

import storage from "good-storage";
import NavBar from '../components/NavBar.vue'
import { get_verification_code, login, register } from "../api/account.js";
import { get_course_detail } from "../api/course.js";
import { add_course, delete_course, get_my_cart } from "../api/cart.js"
import axios from 'axios'
import Bottom from "../components/FixedBottom.vue"

export default {
        name:"Font",
        data(){
            return{
                lessons:[],
                cinfo:[],
                info:null,
                inputValue: null,
                num:0 ,
                content: null,
                currentPage: 1,
                showmode1: true,
                showmode2: false,
                showmode3: false,
                showmode4: false,
                showmode5: false,
                showmode6: false,
                showtag1: true,
                showtag2: false,
                showtag3: false,
                tagOne: 0,
                tagTwo: 0,
            }
        },
        methods: {
            gotoSearch() {  // 控制按钮 
                this.lessons.splice(0, this.lessons.length);
                this.content = this.inputValue;
                console.log(this.content);
                if (this.content != null) {
                    console.log('我在if');
                    console.log('input是' + this.inputValue)
                    this.searchTwo();
                } else{
                    console.log('我在else');
                    this.searchOne();
                }
                this.inputValue = null;
            },
            searchOne() {
                if (this.tagTwo == 0) {
                    let t = this;
                axios
                .get('/api/course/get_latest_courses_list')
                .then(response => {
                console.log(response);
                t.info = response.data.data.courses;
                console.log(response);
                for(let i = 0; i < response.data.data.courses.length; i++){
                    axios.get('/api/course/get_course_detail',{
                        params: {
                            course_id: response.data.data.courses[i].course_id
                        }
                    }).then(res => {//接口返回数据  
                        //console.log(params.data.data);
                        console.log(res);
                        var d = res.data.data;
                        console.log("d是" + d + "tag的长度是" + d.tags.length);
                        if (this.tagOne == 0) {
                            var temp = {
                                    id: d.course_id,
                                    img: 'https://weparallelines.top' + d.cover,
                                    title: d.title,
                                    price: d.price,
                                    sales: d.sales,
                                };
                                t.lessons.push(temp);
                        } else if (d.tags.length != 0){
                            
                                for (let j = 0; j < d.tags.length; j++) {
                                if (d.tags[j].tag_id == this.tagOne) {
                                var temp = {
                                    id: d.course_id,
                                    img: 'https://weparallelines.top' + d.cover,
                                    title: d.title,
                                    price: d.price,
                                    sales: d.sales,
                                };
                                t.lessons.push(temp);
                                break;
                            }
                        }
                            
                        } 
                        
                    })
                }
            })
            .catch(function(error){
                console.log(error);
            });
            };

            if (this.tagTwo == 1) {
                    let t = this;
                axios
                .get('/api/course/get_hottest_courses_list')
                .then(response => {
                console.log(response);
                t.info = response.data.data.courses;
                console.log(response);
                for(let i = 0; i < response.data.data.courses.length; i++){
                    axios.get('/api/course/get_course_detail',{
                        params: {
                            course_id: response.data.data.courses[i].course_id
                        }
                    }).then(res => {//接口返回数据  
                        //console.log(params.data.data);
                        console.log(res);
                        var d = res.data.data;
                        console.log("d是" + d + "tag的长度是" + d.tags.length);
                        if (this.tagOne == 0) {
                            var temp = {
                                    id: d.course_id,
                                    img: 'https://weparallelines.top' + d.cover,
                                    title: d.title,
                                    price: d.price,
                                    sales: d.sales,
                                };
                                t.lessons.push(temp);
                        } else if (d.tags.length != 0){
                            
                                for (let j = 0; j < d.tags.length; j++) {
                                if (d.tags[j].tag_id == this.tagOne) {
                                var temp = {
                                    id: d.course_id,
                                    img: 'https://weparallelines.top' + d.cover,
                                    title: d.title,
                                    price: d.price,
                                    sales: d.sales,
                                };
                                t.lessons.push(temp);
                                break;
                            }
                        }
                            
                        } 
                        
                    })
                }
            })
            .catch(function(error){
                console.log(error);
            });
            };

            if (this.tagTwo == 2) {
                    let t = this;
                axios
                .get('/api/course/get_pinned_courses_list')
                .then(response => {
                console.log(response);
                t.info = response.data.data.courses;
                console.log(response);
                for(let i = 0; i < response.data.data.courses.length; i++){
                    axios.get('/api/course/get_course_detail',{
                        params: {
                            course_id: response.data.data.courses[i].course_id
                        }
                    }).then(res => {//接口返回数据  
                        //console.log(params.data.data);
                        console.log(res);
                        var d = res.data.data;
                        console.log("d是" + d + "tag的长度是" + d.tags.length);
                        if (this.tagOne == 0) {
                            var temp = {
                                    id: d.course_id,
                                    img: 'https://weparallelines.top' + d.cover,
                                    title: d.title,
                                    price: d.price,
                                    sales: d.sales,
                                };
                                t.lessons.push(temp);
                        } else if (d.tags.length != 0){
                            
                                for (let j = 0; j < d.tags.length; j++) {
                                if (d.tags[j].tag_id == this.tagOne) {
                                var temp = {
                                    id: d.course_id,
                                    img: 'https://weparallelines.top' + d.cover,
                                    title: d.title,
                                    price: d.price,
                                    sales: d.sales,
                                };
                                t.lessons.push(temp);
                                break;
                            }
                        }
                            
                        } 
                        
                    })
                }
            })
            .catch(function(error){
                console.log(error);
            });
            }
            },

            searchTwo() {
                let t = this;
                console.log(this.tagOne);
               /* if (this.tagOne == 0) {*/
                    var data = {content: this.content};
                /*} else{
                    var data = {content: this.content,
                                tag_id: this.tagOne};
                }*/
                var dinfo = axios({
                    url: "/api/course/search",
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    data,
                }).then(res => {
                    console.log(res);
                    var d = res.data.data;
                    for (let i = 0; i < d.courses.length; i++) {
                        console.log(d.courses[i].course_id + 'tag是' + this.tagOne);
                        if (this.tagOne == 0) {
                            var temp = {
                                id: d.courses[i].course_id,
                                img: 'https://weparallelines.top' + d.courses[i].cover,
                                title: d.courses[i].title,
                                price: d.courses[i].price,
                                sales: d.courses[i].sales,
                            };
                            t.lessons.push(temp);
                            continue;
                        } else if (d.courses[i].tags.length != 0){
                                console.log("我的长度是" + d.courses[i].tags.length);
                                for (let j = 0; j < d.courses[i].tags.length; j++) {
                                    if (d.courses[i].tags[j].tag_id == this.tagOne) {
                                        var temp = {
                                            id: d.courses[i].course_id,
                                            img: 'https://weparallelines.top' + d.courses[i].cover,
                                            title: d.courses[i].title,
                                            price: d.courses[i].price,
                                            sales: d.courses[i].sales,
                                        };
                                        t.lessons.push(temp);
                                        break;
                                }
                            }
                        } 
                    }
                })
            },

            changeBtn1() {
                this.lessons.splice(0, this.lessons.length);
                this.showmode1 = true;
                this.showmode2 = false;
                this.showmode3 = false;
                this.showmode4 = false;
                this.showmode5 = false;
                this.showmode6 = false;  
                this.tagOne = 0;
                console.log("content是" + this.content);

                if (this.content != null) {
                    console.log("content不为null" + this.content)
                    this.searchTwo();
                } else{
                    console.log("content为null")
                    this.searchOne();
                }
            },

            changeBtn2() {
                this.lessons.splice(0, this.lessons.length);
                console.log(this.content);
                this.showmode2 = true;
                this.showmode1 = false;
                this.showmode3 = false;
                this.showmode4 = false;
                this.showmode5 = false;
                this.showmode6 = false;  
                this.tagOne = 1;
                if (this.content != null) {
                     console.log("content不为null")
                    this.searchTwo();
                } else{
                    console.log("content为null")
                    this.searchOne();
                }
            },

            changeBtn3() {
                this.lessons.splice(0, this.lessons.length);
                this.showmode3 = true;
                this.showmode2 = false;
                this.showmode1 = false;
                this.showmode4 = false;
                this.showmode5 = false;
                this.showmode6 = false;  
                this.tagOne = 2;
                if (this.content != null) {
                    this.searchTwo();
                } else{
                    this.searchOne();
                }
            },

            changeBtn4() {
                this.lessons.splice(0, this.lessons.length);
                this.showmode4 = true;
                this.showmode2 = false;
                this.showmode3 = false;
                this.showmode1 = false;
                this.showmode5 = false;
                this.showmode6 = false;  
                this.tagOne = 3;
                if (this.content != null) {
                    this.searchTwo();
                } else{
                    this.searchOne();
                }
            },

            changeBtn5() {
                this.lessons.splice(0, this.lessons.length);
                this.showmode5 = true;
                this.showmode2 = false;
                this.showmode3 = false;
                this.showmode4 = false;
                this.showmode1 = false;
                this.showmode6 = false;  
                this.tagOne = 4;
                if (this.content != null) {
                    this.searchTwo();
                } else{
                    this.searchOne();
                }
            },

            changeBtn6() {
                this.lessons.splice(0, this.lessons.length);
                this.showmode6 = true;
                this.showmode2 = false;
                this.showmode3 = false;
                this.showmode4 = false;
                this.showmode1 = false;
                this.showmode5 = false;  
                this.tagOne = 5;
                if (this.content != null) {
                    this.searchTwo();
                } else{
                    this.searchOne();
                }
            },

            changeTag1() {
                this.lessons.splice(0, this.lessons.length);
                this.showtag1 = true;
                this.showtag2 = false;
                this.showtag3 = false;
                this.tagTwo = 0;
                if (this.content != null) {
                    this.searchTwo();
                } else{
                    this.searchOne();
                }
            },

            changeTag2() {
                this.lessons.splice(0, this.lessons.length);
                this.showtag2 = true;
                this.showtag1 = false;
                this.showtag3 = false;
                this.tagTwo = 1;
                if (this.content != null) {
                    this.searchTwo();
                } else{
                    this.searchOne();
                }
            },

            changeTag3() {
                this.lessons.splice(0, this.lessons.length);
                this.showtag3 = true;
                this.showtag2 = false;
                this.showtag1 = false;
                this.tagTwo = 2;
                if (this.content != null) {
                    this.searchTwo();
                } else {
                    console.log("我是else")
                    this.searchOne();
                }
            },

            addShopping(val) {
                 add_course(val).then((res) => {
                console.log(res)
                if (res.data.code === 20000) {
                    this.$data.added = true
                    this.$message.success("添加成功！");
                } else {
                    this.$message.error(res.data.msg);
                }
                }).catch((err) => {
                this.$message.error(err)
            })

            },

            handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
                },
                handleCurrentChange(val) {
                    console.log(`当前页: ${val}`)
                },
            },
            components: {
                NavBar,
                Bottom,
            },
        mounted () {
            let detailArr = this.$route.query.content;
            let t = this;
            this.content = detailArr;
            var data = {content: detailArr};
            console.log(data.content);
            if (data.content  != null) {
                console.log(data);
                var dinfo = axios({
                    url: "/api/course/search",
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    data,
                }).then(res => {
                    console.log(res);
                    var d = res.data.data;
                    for (let i = 0; i < d.courses.length; i++) {
                        console.log(d.courses.length);
                        var temp = {
                            id: d.courses[i].course_id,
                            img: 'https://weparallelines.top' + d.courses[i].cover,
                            title: d.courses[i].title,
                            price: d.courses[i].price,
                            sales: d.courses[i].sales,
                        };
                        t.lessons.push(temp);
                    }
                })
            }
            else {
            axios
            .get('/api/course/get_latest_courses_list')
            .then(response => {
                t.info = response.data.data.courses;
            for(let i = 0; i < response.data.data.courses.length; i++){
                axios.get('/api/course/get_course_detail',{
                    params: {
                        course_id: response.data.data.courses[i].course_id
                    }
                }).then(res => {//接口返回数据  
                        //console.log(params.data.data);
                        var d = res.data.data;
                        var temp = {
                            id: d.course_id,
                            img: 'https://weparallelines.top' + d.cover,
                            title: d.title,
                            price: d.price,
                            sales: d.sales,
                        };
                        t.lessons.push(temp)
                    })
                }
            })
            .catch(function(error){
                console.log(error);
            });
            };
    }
}
</script>

<style lang="less" scoped>
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
            
            text-align: center;
            line-height: 0px;
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
        .text {
            font-size: 14px;
        }
            .item {
            padding: 18px 0;
            }
            .box-card {
            width: 480px;
            }
        .bottom {
            margin-top: 0px;
            line-height: 12px;
            display: flex;
            justify-content: space-between;
            align-items: right;
        }
        .button {
            padding: 0;
            min-height: auto;
        }
        
        .image {
            width: 210px;
            height: 120px;
            display: block;
        }  
</style>