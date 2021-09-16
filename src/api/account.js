import request from '../utils/request'
import axios from 'axios'
import storage from "good-storage";

//登录
export function login(data) {
  return axios({
    url: '/api/account/login',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 获取邮箱验证码
export function get_verification_code(data) {
  return axios({
    url: "/api/verification_code",
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

//注册
export function register(data) {
  return axios({
    url: '/api/account/register',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

//注销
export function logout() {
  return axios({
    url: '/api/account/logout',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  })
}

//获取状态
export function get_status() {
  return axios({
    url: '/api/account/status',
    method: 'get',
  })
}

//修改昵称（要求登录）
export function change_nickname(data) {
  return axios({
    url: '/api/account/change_nickname',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
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

//修改头像（要求登录）
export function change_avatar(data) {
  return axios({
    url: '/api/account/change_avatar',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

//拿缓存里的用户信息
export function get_storage_user_data() {
  return new Promise(function(resolve,reject){
    if (storage.has("user_data")) {
      let user_data = storage.get("user_data")
      if (typeof user_data.nickname == "undefined" || user_data.nickname === "") user_data.nickname = user_data.username;
      resolve(user_data);
    }
    else {
      let user_data = {
        username: "",
        nickname: "",
        avatar: "",
        email: "",
        role: "0",
      };
      get_status().then((response) => {
        if (response.data.code === 20000) {
          //成功
          if (response.data.data.login) {
            user_data = {
              username: response.data.data.username,
              nickname: response.data.data.nickname,
              avatar: 'https://weparallelines.top' + response.data.data.avatar,
              email: response.data.data.email,
              role: response.data.data.role,
            }
            if (typeof user_data.nickname == "undefined" || user_data.nickname === "") user_data.nickname = user_data.username;
            storage.set("user_data", user_data);
            resolve(user_data);
          }
          else {
            reject(response.data.ms);
          }
        }
        else {
          console.log('用户信息获取失败：' + response.data.msg);
          reject('用户信息获取失败：' + response.data.msg);
        }
      }).catch((error) => {
        console.log(error);
        reject(error)
      })
    }
  })
}
