import axios from 'axios'

//获取课程详情
export function get_course_detail(data){
  return axios({
    url: '/api/course/get_course_detail?course_id=' + data,
    method: 'get',
    headers: {'Content-Type': 'application/json'},
  })
}