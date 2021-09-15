import request from '../utils/request'
import axios from 'axios'

// 上传图片
export function img_upload(data){
  return axios({
    url: "/api/upload",
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}