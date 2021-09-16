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

//发布新课程
export function create_new_course(data) {
  return axios({
    url: "/api/course/create_new_course",
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

//修改课程
export function edit_course(data) {
  return axios({
    url: "/api/course/edit_course",
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

//上架课程
export function publish_course(data) {
  return axios({
    url: "/api/course/publish_course",
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

//下架课程
export function unpublish_course(data) {
  return axios({
    url: "/api/course/unpublish_course",
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

//删除课程
export function delete_course(data) {
  return axios({
    url: "/api/course/delete_course",
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

//获取我售卖的课程
export function get_my_courses_list() {
  return axios({
    url: "/api/course/get_my_courses_list",
    method: 'get',
  })
}

//获取课程快照列表
export function get_course_snapshot_list(data) {
  return axios({
    url: "/api/course/get_my_courses_list?course_id=" + data,
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
}