import axios from 'axios'

//获取我的购物车
export function get_my_cart(){
    return axios({
      url: '/api/cart/get_my_cart',
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
}

//添加课程至购物车
export function add_course(id){
  return axios({
    url: '/api/cart/add_course',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: {
        course_id: id
    }
  })
}

//删除课程从购物车
export function delete_course(id){
    return axios({
      url: '/api/cart/delete_course',
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: {
          course_id: id
      }
    })
}
