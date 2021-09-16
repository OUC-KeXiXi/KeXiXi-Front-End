<template>
    <div id="app">
        <el-container style="height: 750px">
            <NavBar></NavBar>
            <el-header style="background-color: rgb(205, 210, 224); margin-top:-60px"></el-header>
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
                            ">订单信息</b>
                        </el-header>
                        <el-main style="
                        background-color: rgb(253, 253, 253); 
                        border-radius: 15px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                        overflow-y:hidden;
                        ">
                        <div id="sub-header" align="left" style="margin-top: 20px;margin-bottom: -60px; margin-left: 30px; height: 90px;line-height: 30px;">
                            <i class="el-icon-goods"></i>
                            <b style="
                            font-size: medium;
                            font-weight: lighter; 
                            ">订单号：{{order_id}}</b>
                            <b style="
                            margin-left: 700px;
                            font-size: medium;
                            font-weight: lighter; 
                            ">订单时间：{{create_time}}</b>
                        </div>
                        <el-divider></el-divider>
                        <template v-for="(item, index) in lessons" :key="item.id">
                            <div id="lesson" class="flex" style="height: 80px; line-height: 20px; width:1100px">
                                <b style="margin-right: 50px;">{{index+1}}</b>
                                <img :src="item.img" style="margin-right: 30px; height:90px; width:160px"/>
                                <b style="width: 400px; text-align: left; margin-right: 260px; font-weight: lighter;">{{item.title}}</b>
                                <b style="width: 75px;">￥ {{item.price}}</b>
                            </div>
                            <el-divider></el-divider>
                        </template>
                        <div id="payment" align="left" style="margin-bottom: -60px; margin-left: 30px; height: 30px;line-height: 30px;">
                            <i class="el-icon-bank-card"></i>
                            <b style="
                            font-size: medium;
                            font-weight: lighter; 
                            ">支付信息</b>
                        </div>
                        <div style="margin-top: 20px;height:120px;">
                            <b style="margin-right:50px; font-weight:lighter;">支付方式：支付宝</b>
                            <b style="font-weight:lighter;">流水订单号：21092768653216865rxf214742</b>
                        </div>
                        <el-divider></el-divider>
                        <div align="right" style="margin-bottom: -80px; margin-right: -20px; height: 90px;line-height: 30px">
                            <i class="el-icon-warning" style="color: rgb(255, 153, 0);"></i>
                            <b style="margin-right: 550px; font-weight: lighter; color: rgb(255, 153, 0);">感谢您使用课夕夕，网课服务认准课夕夕！</b>
                            <b style="font-weight: lighter;">订单金额：</b>
                            <b style="color: red; font-size: x-large; width: 150px;text-align: left;margin-right: 50px;">￥ {{price}}.00</b>
                        </div>
                        <div align="right" style="height: 100px;margin-top: -100px;margin-bottom: 10px; margin-right: 30px;">
                            <el-button type="text">订单问题反馈</el-button>
                        </div>
                        </el-main>
                    </el-container>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import axios from 'axios'

export default {
    name:"OrderDetail",
    data(){
        return{
            lessons:[],
            isAli:true,
            isWe:false,
            isUnion:false,
            order_id:0,
            price:'',
            create_time:''
        }
    },
    methods:{
        deleteBtn(val){
            this.$confirm('此操作将会在订单中删除该项，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                for(let i = 0; i < this.lessons.length; i++){
                    if(this.lessons[i].id==val){
                        this.lessons.splice(i, 1);
                    }
                }
            }).catch(() => {
            });
        },
        alipay(){
            this.isAli=true;
            this.isUnion=false;
            this.isWe=false;
        },
        alipayCancel(){
            this.isAli=false;
        },
        wechatpay(){
            this.isWe=true;
            this.isAli=false;
            this.isUnion=false;
        },
        wechatpayCancel(){
            this.isWe=false;
        },
        unionpay(){
            this.isUnion=true;
            this.isWe=false;
            this.isAli=false;
        },
        unionpayCancel(){
            this.isUnion=false;
        },
        buy(){
            var ids = [];
            for(let i = 0; i < this.lessons.length; i++){
                ids.push(this.lessons[i].id);
            }
            console.log(ids);

            var data = {courses_id: ids}

            var dinfo = axios({
                url: "/api/order/place_order",
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                data
            })
            console.log(dinfo);    
            this.$alert('购买成功！', '恭喜', {
                confirmButtonText: '确定',
                callback: action => {
                    
                }
            });
        }
    },
    computed:{
        totalCount(){
            var totalCount = 0;
            for(let i = 0; i < this.lessons.length; i++){
                totalCount += parseInt(this.lessons[i].price);
            }
            return totalCount;
        },
        getCurrentTime() {
            //获取当前时间并打印
            var _this = this;
        　　let yy = new Date().getFullYear();
        　　let mm = new Date().getMonth()+1;
        　　let dd = new Date().getDate();
        　　_this.gettime = yy+'.'+mm+'.'+dd
            return _this.gettime;
        }
    }, mounted(){
        let detailArr = this.$route.query.id;
        let t = this;
        console.log(detailArr);
        axios.get('/api/order/get_order_detail',{
            params: {
                order_id: detailArr
            }
        }).then(res => {//接口返回数据  
            //console.log(params.data.data);
            console.log(res);
            t.create_time = res.data.data.create_time;
            t.order_id = res.data.data.order_id;
            t.price = res.data.data.price;
            var d = res.data.data.snapshots;
            //根据订单号查询课程信息
            for(let i = 0; i < d.length; i++){
                axios.get('/api/course/get_snapshot_detail', {
                    params: {
                        snapshot_id: d[i]
                    }
                }).then(response => {
                    console.log(response);
                    var temp = {
                        img: 'https://weparallelines.top' + response.data.data.cover,
                        price: response.data.data.price,
                        title: response.data.data.title
                    };
                    t.lessons.push(temp)
                })
            }
            
            
        })
    },components: {
        NavBar
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