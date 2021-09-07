<template>
    <div>
        <el-table
        :data="tableData"
        style="width: 100% height:100%">
            <el-table-column
            prop="url"
            label="图标"
            width="180">
                <el-avatar shape="square" :size="100" :fit="fit" :src="url"></el-avatar>
            </el-table-column>
            <el-table-column
            prop="name"
            label="名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="message"
            label="信息">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      fit: 'cover',
      tableData: [{
        url: '',
        name: 'course2',
        message: 'dwwcwefcwe'
      }, {
        url: '',
        name: 'course1',
        message: 'dwwcwefcwe'
      }
      ]
    }
  }
}
</script>

<style scoped>
</style>
