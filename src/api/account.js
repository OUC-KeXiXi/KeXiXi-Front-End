import request from '../utils/request'
import axios from 'axios'

//登录
export function login(data){
  return axios({
    url: '/api/account/login',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

// 获取邮箱验证码
export function get_verification_code(data){
  return axios({
    url: "/api/verification_code",
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//注册
export function register(data){
  return axios({
    url: '/api/account/register',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//注销
export function logout(){
  return axios({
    url: '/api/account/logout',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
  })
}

//获取状态
export function get_status(){
  return axios({
    url: '/api/account/status',
    method: 'get',
  })
}


//修改昵称（要求登录）
export function change_nickname(data){
  return axios({
    url: '/api/account/change_nickname',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//获取推荐课程列表
export function get_hottest_courses() {
  return axios({
    url: '/api/course/get_hottest_courses_list',
    method: 'get',
  })
}

//获取最新课程列表
export function get_latest_courses_list() {
  return axios({
    url: '/api/course/get_latest_courses_list',
    method: 'get'
  })
}

//获取精品课程列表
export function get_pinned_courses_list() {
  return axios({
    url: '/api/course/get_pinned_courses_list',
    method: 'get'
  })
}
