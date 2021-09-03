// 这是前端接口api参考

import request from '../utils/request'
import axios from 'axios'

// post测试
export function post_test(data){
  return axios({
    url: "/api/test_post",
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

// 上传图片
export function img_upload(data){
  return axios({
    url: "/api/upload",
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

// get测试
export function get_test(id) {
  return axios({
    url: '/api/prediction/test_get',
    method: 'get',
    params: {
      id
    },
  })
}

// 这些函数返回结果都是promise，需要在页面中编写.then(成功处理)以及.catch()(失败处理)
// 后续处理别写这儿，写在需要页面的methods里
// 使用例：
// methods: {
//   changeNickname(){
//     post_test({
//       nickname: this.nametoChange
//     }).then((response) => {
//       if (response.data.code === 20000) {
//         结果返回的状态码正常
//         dosomething();
//       }
//       else {
//         根据其他状态码处理错误
//         notifyerror();
//       }
//     }).catch((error) => {
//       无请求返回时的异常处理
//       this.$message.error('请求时出错！');
//       console.log(error);
//     })
//   },
//   getNickname(){
//     get_test(this.username).then((response) => {
//       if (response.data.code === 20000) {
//         结果返回的状态码正常
//         dosomething();
//       }
//       else {
//         根据其他状态码处理错误
//         notifyerror();
//       }
//     }).catch((error) => {
//       无请求返回时的异常处理
//       this.$message.error('请求时出错！');
//       console.log(error);
//     })
//   }
// }