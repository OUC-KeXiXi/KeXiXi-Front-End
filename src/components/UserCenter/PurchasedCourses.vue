<template>
    <div class="main">
        <el-table
        :data="tableData"
        style="width: 100%; height:100%;"
        :default-sort = "{prop: 'order_id', order: 'descending'}"
        @row-click="routerLink">
            <el-table-column
            prop="snapshot_url"
            label="图标"
            width="180">
              <template v-slot="scope">
                <img :src="scope.row.snapshot_url" alt="" width="180" height="90">
              </template>
            </el-table-column>
            <!-- <el-avatar shape="square" :size="100" :fit="fit" :src="snapshot_url"></el-avatar> -->
            <el-table-column
            prop="course_name"
            label="名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="course_message"
            label="信息">
            </el-table-column>
            <el-table-column
            prop="create_time"
            label="创建时间">
            </el-table-column>
            <el-table-column
            prop="order_id"
            label="订单号"
            sortable='custom'>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      // fit: 'cover',
      tableData: [
      ]
    }
  },
  methods: {
    routerLink (val) {
      console.log(val.order_id)
      this.$router.push({ path: "/OrderDetail", query: {id: val.order_id} });
    },
    showMyCourses () {
      axios.get("/api/order/get_my_orders").then(res => {
        // console.log(res.data.data.orders_id.length);
        for(var i = 0; i < res.data.data.orders_id.length; i++)
        {
          axios.get("/api/order/get_order_detail", {
            params: {
              order_id: res.data.data.orders_id[i]
            }
          }).then( res_course => {
              var temp_data = {
                order_id: 1,
                snapshot_url: '',
                course_name: '',
                course_message: '',
                create_time: '' 
            };
            temp_data.create_time = res_course.data.data.create_time;
            // console.log(res_course.data.data.order_id);
            //获取订单号信息
            temp_data.order_id = res_course.data.data.order_id;
            axios.get("/api/course/get_snapshot_detail", {
              params: {
                snapshot_id: res_course.data.data.snapshots[0]
              }
            }).then( res_snapshot_id => {
              // console.log("===========")
              // console.log(res_course.data.data.snapshots[0])
              // console.log(res_snapshot_id.data.data)
              temp_data.course_name = res_snapshot_id.data.data.title;
              temp_data.snapshot_url = 'https://weparallelines.top' + res_snapshot_id.data.data.cover;
              // console.log('https://weparallelines.top' + res_snapshot_id.data.data.cover)
              axios.get("/api/course/get_course_detail", {
                params: {
                  course_id: res_snapshot_id.data.data.course_id
                }
              }).then( res_course_message =>{
                // console.log(res_course_message.data.data.content)
                temp_data.course_message = res_course_message.data.data.content;
                // console.log(temp_data)
                var _obj = JSON.stringify(temp_data)
                var objClone = JSON.parse(_obj)
                this.tableData.push(objClone)
                // console.log(objClone);
              })
            })
          })
        }
        // console.log(this.tableData)
      })
      // axios.get("/api/order/get_order_detail", {
      //   params: {
      //       order_id: 1 
      //   }
      // }).then( res => {
      //   console.log(res.data.data)
      // })
      // axios.get("/api/course/get_course_snapshot_list", {
      //   params: {
      //     course_id: 1
      //   }
      // }).then( res => {
      //   console.log(res.data.data)
      // })
      // axios.get("/api/course/get_snapshot_detail", {
      //   params: {
      //     snapshot_id: 1
      //   }
      // }).then( res => {
      //   console.log(res.data.data)
      // })
      // console.log()
      // console.log("----------------------------");
    }
  },
  created () {
      this.showMyCourses();
  }
  // mounted () {
  //   this.testFunction;
  // }
}
</script>

<style scoped lang="less">
.main{
  margin-left: 20px;
  margin-top: 10px;
  overflow: hidden;
  position: flex;
}
</style>
