import axios from 'axios'

//获取课程详情
export function get_course_detail(data){
  return axios({
    url: '/api/course/get_course_detail?course_id=' + data,
    method: 'get',
    headers: {'Content-Type': 'application/json'},
  })
}


//获取所有课程标签
export function get_all_tags() {
  return axios({
    url: '/api/course/get_all_tags',
    method: 'get',
  })
}