<template>
    <div class="body">
        <div class="portrait">
            <div class="portraitBox">
                <el-avatar shape="square" :size="432.96" :src="squareUrl" :fit="fit"></el-avatar>
            </div>
        </div>
        <hr/>
        <div class="message">
            <div class="meaasgeBox">
                <el-card shadow="never">
                    <div class='massage_card'>
                        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                            <el-form-item label="昵称">
                                <el-input v-model="formLabelAlign.nickname"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="formLabelAlign.password" show-password></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </div>
        </div>
        <hr/>
        <div class="operation">
            <el-button type="primary" icon="eli-icon-delete" size="medium" @click="showEditDialog()">
                <span class='buttonSpan' style="font-size:20px">修改信息</span>
            </el-button>
        </div>

        <el-dialog
        title="用户信息修改"
        v-model="editDialogVisible">
            <el-form :model="editForm" :rules="elitFormRules" label-width="100px" ref="resetFormRef">
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="editForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="editForm.password" show-password></el-input>
                </el-form-item>
            </el-form>
            <span class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetUserMessage">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    data () {
        return {
            squareUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',

            fit: 'cover',

            labelPosition: 'top',

            formLabelAlign: {
                nickname: '',
                password: ''
            },

            editDialogVisible: false,

            editForm: {
                nickname: '',
                password: ''
            },

            editFormRules: {
                nickname: [
                    { required: true, message: '请输入新昵称', trigger: 'blur' },
                    { min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        showEditDialog () {
            this.editDialogVisible = true;
        },
        resetUserMessage () {
            // this.$refs.resetFormRef.validate((valid) => {
            //     console.log(valid);
            //     // this.changeNickname();
            //     // const { data: res } = this.$http.post("api/account/status", this.editForm);
            //     console.log(res);
            // })
            console.log(this.editForm.nickname + '----' + this.editForm.password);
            this.editDialogVisible = false;
        },
        // changeNickname(){
        //     post_test({
        //         nickname: this.editFormRules.nickname
        //     }).then((response) => {
        //         if (response.data.code === 20000) {
        //             // 结果返回的状态码正常
        //             // dosomething();
        //         }
        //         else {
        //             // 根据其他状态码处理错误
        //             notifyerror();
        //         }
        //     }).catch((error) => {
        //         // 无请求返回时的异常处理
        //         this.$message.error('请求时出错！');
        //         console.log(error);
        //     })
        // },
    }
}
</script>

<style scoped lang="less">
.body{
    height:100%;
    width:60%;
    background-color: white;
    border: 1px solid gray;

    // position:absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.portrait{
    height:40%;
    background-color: rgb(236, 224, 200);

    overflow: hidden;
    // background: url("squareUrl") no-repeat center;
    // background-size: cover;
    // background-attachment: fixed;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.portraitBox{
    height:432.96px;
    width:432.96px;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.message{
    height:30%;
}

.meaasgeBox{
    height:100%;
    width:70%;

    padding-top:3%;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.operation{
    height:20%;
    background-color: white;
}

.el-button{
    padding-left: 30px;
    padding-right: 30px;

    margin-left: 70%;
    margin-top:10%;
}

.dialog-footer{
    display: flex;
    justify-content: flex-end;
}

.dialog-footer>.el-button {
  margin: 0 2.5%;
}

.el-dialog{
    display: flex;
    flex-direction: column;
    margin:0 !important;
    // position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}
</style>
