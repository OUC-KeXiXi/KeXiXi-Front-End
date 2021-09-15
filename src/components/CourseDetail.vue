<template>
    <el-container>
        <el-header>
            <el-image
                class="header-avatar"
                :src="require('../assets/logo.jpg')"
                fit="contain">
            </el-image>
            <p class="header-title">商品详情页</p>
        </el-header>

        <el-main>
            <div class="detail-content">
                <div class="detail-top">
                    <el-image
                        class="detail-cover"
                        :src="detail.cover"
                        fit="contain">
                    </el-image>
                    <div class="detail-info">
                        <p class="detail-title">{{detail.title}}</p>
                        <p class="detail-seller">作者：{{detail.seller_name}}</p>
                        <div class="detail-buy">
                            <p class="detail-sales">已售：{{detail.sales}}</p>
                            <p class="detail-price">价格：￥{{detail.price}}</p>
                            <div class="detail-add">
                                <el-button v-if="!added" type="danger" icon="el-icon-plus" round @click="cart_add()">添加至购物车</el-button>
                                <el-button v-else type="success" icon="el-icon-check" round @click="cart_delete()">已在购物车中</el-button>
                            </div>
                        </div>

                    </div>
                </div>
                <hr class="detail-line"/>
                <div class="detail-bottom">
                    <p>{{detail.content}}</p>
                </div>
            </div>
        </el-main>

        <el-footer>
            <p>课夕夕小组</p>
        </el-footer>


    </el-container>
</template>

<script>
import { get_course_detail } from "../api/course.js";
import { add_course, delete_course, get_my_cart } from "../api/cart.js"

const default_detail = {
    "course_id": 1,
    "title": "SpringBoot+Vue3 项目实战，打造企业级在线办公系统",
    "seller_id": 5,
    "seller_name": "15563709699",
    "published": true,
    "tags": [
        {
            "tag_id": 1,
            "tag_name": "前端"
        },
        {
            "tag_id": 3,
            "tag_name": "Vue"
        },
        {
            "tag_id": 5,
            "tag_name": "SpringBoot"
        }
    ],
    "deleted": false,
    "sales": 0,
    "snapshot_id": 1,
    "content": "未来，在线协同办公将成为企业常态化的工作方式。本课程选用市面上少有的，界面美观，功能模块齐全的大型在线办公系统。项目采用了当下最流行的前后端分离架构及技术（ Java、SSM、Vue3.0 ），课程作为全面提升前后端技术水平的不二选择，也很适合作为简历的加分项。",
    "cover": "/media/20210914203304lg6ZwBrihE.png",
    "price": "358.0",
    "create_time": "2021-09-14 20:33:30"
}

export default {
    data() {
        this.course_id = this.$route.query.course_id || 1
        let that = this;
        get_course_detail(this.course_id).then((res) => {
            console.log(res)
            if (res.data.code === 20000) {
                that.$data.detail = res.data.data
            } else {

            }
        }).catch((err) => {
            alert(err)
        })

        get_my_cart().then((res) => {
            console.log(res)
            if (res.data.code === 20000) {
                let courses = res.data.data.courses
                courses.map((val) => {
                    if (that.course_id === val.toString()) {
                        that.$data.added = true
                    }
                })

            }
        }).catch((err) => {

        })

        return {
            detail: default_detail,
            added: false
        }
    },
    methods: {
        cart_add() {
            add_course(this.course_id).then((res) => {
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
        cart_delete() {
            delete_course(this.course_id).then((res) => {
                console.log(res)
                if (res.data.code === 20000) {
                    this.$data.added = false
                    this.$message.success("删除成功！");
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch((err) => {
                this.$message.error(err)
            })
        }
    }
}
</script>

<style scoped lang="less">
@import '../style/style.less';

p {
    margin-block-start: 0.3em;
    margin-block-end: 0.5em;
}

.el-container {
    margin: 0;
    padding: 0;
}

.el-header {
    background-color: @primary-color;
    height: 8vh;
    display: flex;
    align-items: center;
    .header-avatar {
        height: 5vh;
        width: 5vh;
    }
    .header-title {
        color: white;
    };
}

.el-main {
    padding: 2vh 15vw;
    background-color: GhostWhite;
}

.detail-content {
    padding: 1vh 5vw;
    min-height: 81vh;
    background-color: white;
    // background-color: @secondary-color;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

    .detail-top {

        display: flex;
        margin-bottom: 0;
        .detail-cover {
            height: 50vh;
            width: 40vw;
        }
        .detail-info {
            display: static;
            position: relative;
            margin-left: 1vh;
            flex: 2;
            .detail-title {
                font-size: x-large;
            }
            .detail-seller {
                color: blue;
                margin-bottom: 2vh;
            }

            .detail-buy {
                position: absolute;
                bottom: 0;
                right: 0;
                .detail-sales {
                    text-align: right;
                }
                .detail-price {
                    text-align: right;
                    color: red;
                }
                .detail-add {
                    text-align: right;
                }
            }
        }
    }

    .detail-line {
        width: 100%;
        color: dimgray;
        margin-top: 2vh;
    }

    .detail-bottom {
    }
}

.el-footer{
    background-color: @primary-color;
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>