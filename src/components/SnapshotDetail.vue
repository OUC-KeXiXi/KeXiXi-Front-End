<template>
    <div>
        <NavBar/>
        <div class="detail"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="detail-content">
                <div class="detail-top">
                    <el-image 
                        class="detail-cover" 
                        :src="detail.cover"
                        fit="contain">
                    </el-image>
                    <div class="detail-info">
                        <p class="detail-title">{{detail.title}}</p>
                        <div class="tags">
                            <el-tag class="tag" v-for="tag in detail.tags" :key="tag.tag_id">{{tag.tag_name}}</el-tag>
                        </div>
                        <p class="detail-seller el-icon-s-shop">作者：{{detail.seller_name}}</p>
                        <div class="detail-buy">
                            <p class="detail-price">￥{{detail.price}}</p>
                            <p class="detail-sales">已售：{{detail.sales}}</p>
                            <div class="detail-add">
                                <el-button type="info" icon="el-icon-plus" round @click="cart_denied()">快照不可购买</el-button>
                            </div>
                            <div class="detail-cart">
                                <router-link to="/cart"><el-button type="warning" icon="el-icon-shopping-cart-2" round> 购物车</el-button></router-link>
                                <router-link to="/order" class="detail-order"><el-button type="primary" icon="el-icon-goods" round> 下单</el-button></router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="detail-line"/>
                <div class="detail-bottom">
                    <p>{{detail.content}}</p>
                </div>
            </div>
        </div>
        <FixedBottom></FixedBottom>
    </div>
</template>

<script>
import { get_snapshot_detail } from "../api/snapshot.js";
import FixedBottom from "@/components/FixedBottom";
import NavBar from "@/components/NavBar";

export default {
    created() {
        this.course_id = this.$route.query.snapshot_id || 1
        let that = this;
        get_snapshot_detail(this.course_id).then((res) => {
            console.log(res)
            if (res.data.code === 20000) {
                that.$data.detail = res.data.data
                that.$data.loading = false
            } else {
                that.$message.error(res.data.msg)
            }
        }).catch((err) => {
            that.$message.error(err)
        })
    },
    data() {
        return {
            detail: null,
            loading: true,
        }
    },
    methods: {
        cart_denied() {
            this.$message.error("快照不可购买")
        },
    },
    components: {
        NavBar,
        FixedBottom
    }
}
</script>

<style scoped lang="less">
@import '../style/style.less';

p {
    margin-block-start: 0.3em;
    margin-block-end: 0.5em;
}

.detail {
    padding: 3vh 15vw;
    background-color: GhostWhite;
}

.detail-content {
    padding: 1vh 5vw;
    min-height: 75vh;
    background-color: white;
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
            margin-left: 1.5vw;
            flex: 2;
            .detail-title {
                font-size: x-large;
            }
            .tags {
                display: flex;
                .tag {
                    margin: 0 5px;
                }
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
                .detail-cart {
                    padding: 5px;
                    .detail-order {
                        margin-left: 5px;
                    }
                }
            }
        }
    }

    .detail-line {
        width: 100%;
        color: dimgray;
        margin-top: 2vh;
    }
}

</style>