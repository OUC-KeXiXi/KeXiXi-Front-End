import axios from 'axios'

//获取快照详情
export function get_snapshot_detail(data){
    return axios({
      url: '/api/course/get_snapshot_detail?snapshot_id=' + data,
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
}