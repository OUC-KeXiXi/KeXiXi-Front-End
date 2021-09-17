<template>
    <div class="body">
        <div><span style="font-size:30px">个人信息</span></div>
        <hr/>

        <div style="height:30px"></div>

        <div class="main">
            <div>
                <div style="width:700px; float:left">
                    <el-form :label-position="labelPosition" label-width="80px">
                        <!-- <div class="size-icon"><i class="el-icon-dish" ></i></div> -->
                        <el-form-item label="昵称："><el-input v-model="userMessage.nickname">{{userMessage.nickname}}</el-input></el-form-item>
                    </el-form>
                </div>
                <div style="float:right"><el-button plain @click="resetNickname">昵称修改</el-button></div>
            </div>

            <div style="clear:both"></div>
            <hr/>

            <div >
                <div style="width:700px; float:left">
                    <el-form :label-position="labelPosition" label-width="80px">
                        <el-form-item label="邮箱："><el-input v-model="userMessage.email">{{userMessage.email}}</el-input></el-form-item>
                    </el-form>
                </div>
                <div style="float:right"><el-button plain @click="resetMail">邮箱修改</el-button></div>
            </div>

            <div style="clear:both"></div>
            <hr/>

            <div>
                <div style="width:700px; float:left">
                    <el-form :label-position="labelPosition" label-width="80px">
                        <el-form-item label="密码："><el-input v-model="userMessage.password" show-password></el-input></el-form-item>
                    </el-form>
                </div>
                <div style="float:right"><el-button plain @click="showEditDialog">密码修改</el-button></div>
            </div>

        </div>

        <el-dialog
        title="密码信息修改"
        v-model="editDialogVisible">
            <el-form :model="userMessage" :rules="elitFormRules" label-width="100px">
                <el-form-item label="新密码：" prop="password">
                    <el-input v-model="new_password" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="password">
                    <el-input v-model="conform_new_password" show-password></el-input>
                </el-form-item>
            </el-form>
            <span class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetPassword">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import axios from 'axios'

export default ({
    data () {
        return {
            labelPosition: 'left',

            editDialogVisible: false,

            userMessage: {
                nickname: '2324',
                email: '213242',
                password: ''
            },
            // new_nickname: '',
            // new_email: '',
            new_password: '',
            conform_new_password: '',
            editFormRules: {
                password: [
                    { required: true, message: '请输入新密码', trigger: "blur" },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: "blur"}
                ]
            },
            data: {}
        }
    },
    methods: {
        showEditDialog () {
            this.editDialogVisible = true;
        },
        resetPassword () {
            // axios.post("", {

            // })
            console.log("---------------------------------");
            console.log(this.new_password);
            console.log(this.conform_new_password)
            this.userMessage.password = this.conform_new_password;
            if(this.new_password != this.conform_new_password)
            {
                this.$message.error("两次输入不一致！");
                this.conform_new_password = '';
                return;
            }
            console.log("---------------------------------");
            this.new_password = '';
            this.editDialogVisible = false;
        },
        resetNickname () {
            //根据接口修改后台数据
            axios.post("/api/account/change_nickname", {
                nickname: this.userMessage.nickname
            })
            .then(function (response) {
                console.log(response);
            })
        },
        resetMail () {
            //根据接口修改后台数据
            console.log(this.userMessage.email);
            console.log(window.sessionStorage)
        },
        getMessage () {
            axios.get("/api/account/status").then(res => {
                // console.log(res.data.data);
                this.userMessage.nickname = res.data.data.nickname;
                this.userMessage.email = res.data.data.email;
                this.userMessage.password = res.data.data.password;
            })
        }
    },
    created () {
        this.getMessage();
    }
})
</script>

<style scoped lang="less">
.body{
    margin-left: 30px;
    margin-top: 30px;
}

.main{
    height: 100%;
    width: 70%;
    margin-left: 70px;
}

.size-icon{
  font-size: 50px;
}

.dialog-footer{
    display: flex;
    justify-content: flex-end;
}

.dialog-footer>.el-button {
  margin: 0 2.5%;
}
</style>
