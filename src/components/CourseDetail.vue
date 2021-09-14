<template>
    <el-container>
        <el-header>
            <el-image 
                class="header-avatar" 
                :src="require('../assets/logo.png')"
                fit="contain">
            </el-image>
            <p class="header-title">商品详情页</p>
        </el-header>
        
        <!-- <el-aside>

        </el-aside> -->

        <el-main>
            <div class="detail-content">
            
            <div class="detail-top">
                <el-image 
                    class="detail-img" 
                    :src="require('../assets/class1.png')"
                    fit="contain">
                </el-image>
                <div class="detail-info">
                    <p>JAVA高效开发</p>
                    <p>发布者</p>
                    <div class="detail-add">
                        <el-button type="danger" icon="el-icon-plus" circle></el-button>
                    </div>
                </div>
            </div>
            <div class="detail-bottom">
                <p>Java是一门面向对象编程语言，不仅吸收了C++语言的各种优点，还摒弃了C++里难以理解的多继承、指针等概念，因此Java语言具有功能强大和简单易用两个特征。Java语言作为静态面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。</p>
            </div>
            </div>
        </el-main>

        <el-footer>
            <p>课夕夕小组</p>
        </el-footer>


    </el-container>
</template>

<script>
export default {
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="less">
@import '../style/style.less';

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
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

    .detail-top {
        
        display: flex;
        margin-bottom: 0;
        .detail-img {
            height: 20vh;
            width: 20vh;
        }
        .detail-info {
            display: static;
            margin-left: 1vh;
            flex: 2;
            .detail-add {
                text-align: right;
            }
        }
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

.el-aside{
    width: 20vw;
    color: red;
    height: 20vh;
}


</style>