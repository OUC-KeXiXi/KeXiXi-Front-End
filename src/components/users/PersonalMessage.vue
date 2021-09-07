<template>
    <div class='mai'>
        <div class='picture'>
            <div class="block"><el-avatar shape="square" :size="470" :src="squareUrl" :fit="fit"></el-avatar></div>
        </div>
        <div class='message'>
            <el-card>
            <div class='massage_card'>
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="昵称">
                <el-input v-model="formLabelAlign.nickname"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password"></el-input>
                </el-form-item>
                </el-form>
            </div>
            </el-card>
        </div>
        <div class='choices'>
            <el-button type="primary" icon="eli-icon-delete"
            size="medium" @click="showEditDialog()">
                <span class='buttonSpan'>修改信息</span>
            </el-button>
        </div>

        <el-dialog
        title="用户信息修改"
        :visible.sync="editDialogVisible"
        width="50%">
            <el-form :model="editForm" :rules="elitFormRules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="昵称" prop="name">
                <el-input></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                <el-input></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',

      fit: 'cover',

      squareUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',

      formLabelAlign: {
        nickname: '',
        password: ''
      },

      editDialogVisible: false,

      editForm: {},

      editFormRules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    showEditDialog () {
      this.editDialogVisible = true
    }
  }
}
</script>

<style scoped>
.mai{
    background-color:#EBF4FA;
    height:100%;
    width:35%;

    position:absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.picture{
    height:40%;
}

.block{
    margin-left:25%
}

.message{
    background-color:#F0FFFF;
    height:40%;
}

.el-card{
    box-shadow:0 1px rgba(0, 0, 0, 0.15) !important;
    height:100%
}

.choice{
    position:absolute;
    height:20%;
}

.el-button{
    padding-left:40px;
    padding-right:40px;
    margin-left:70%;
    margin-top:5%
}

.buttonSpan{
    font-size:25px;
}
</style>
