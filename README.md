# OUC-KeXiXi-Front-End

这是中国海洋大学2021年夏季学期软件工程综合实践中课夕夕项目的前端代码仓库

## 项目技术栈

Vue + ElementUI

## 安装依赖项
```
npm install
```

### 编译测试版本
```
npm run serve
```

### 编译打包版本
```
npm run build
```
打包后的目录为./dist

## 项目组织

所有页面的相关代码写在 src 文件夹下

- api: 前端接口函数
- assets: 放图片，字体之类的
- components: 前端组件
- router: 项目路由
- store: vuex相关，暂且不管
- utils: 组件 js，遵循 Vue 全局组件的写法，可以方便 api 内的函数调用
- views: 前端页面的代码

## 指南

### 跨域问题

要求后端和前端同时支持跨域

后端支持：
- 增加配置跨域 Options 请求的配置
```json
access-control-allow-credentials: true
access-control-allow-methods: GET, POST, OPTIONS, DELETE
access-control-allow-origin: xxxx  // 允许的域名
access-control-allow-headers: DNT, X-Mx-ReqToken,Keep-Alive, User-Agent,X-Requested-With // 允许的 header 类型
```


- SameSite 属性（可选）
```
Chrome 51 开始，浏览器的 Cookie 新增加了一个SameSite属性，用来防止 CSRF 攻击和用户追踪。

SameSite 有3个值
1.Strict
Strict最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。
换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。
比如，当前网页有一个 GitHub 链接，用户点击跳转就不会带有 GitHub 的 Cookie，跳转过去总是未登陆状态。
2.Lax
规则稍稍放宽，大多数情况（AJAX，POST，Image，iframe）也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。
3.None
Chrome 计划将 Lax 变为默认设置。这时，网站可以选择显式关闭 SameSite 属性，将其设为None。
不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

```
前端支持：

```json
// main.js
// 设置 axios 支持跨域
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

// vue.config.js
// 设置代理
// /api/login -> https://weparallelines.top/api/login
proxyTable: {
      '/api': {  // 拦截所有api里面url中以/api开头的接口
        target: 'https://example.com',  // 代理目标的域名
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '/api'  // 重写以/api开头的这个部分为/api, 相当于不起作用, 但需要用的时候就在这里改
        }
      }
}
```

### Vue-Cli的测试与打包配置
版本为对应Vue3的Vue-Cli4，配置文件位置为./vue.config.js

以下两个网站可作为配置参考：
- https://cli.vuejs.org/zh/config/#vue-config-js
- https://github.com/staven630/vue-cli4-config

### 接口编写规范

前端接口api参考，写在api文件夹对应模块的js文件里（除了test.js）
```js
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
```

这些函数返回结果都是promise，需要在页面中编写.then(成功处理)以及.catch()(失败处理)

后续处理别写这儿，写在需要页面的methods里

使用例：
```vue
methods: {
  changeNickname(){
    post_test({
      nickname: this.nametoChange
    }).then((response) => {
      if (response.data.code === 20000) {
        //结果返回的状态码正常
        dosomething();
      }
      else {
        //根据其他状态码处理错误
        notifyerror();
      }
    }).catch((error) => {
      //无请求返回时的异常处理
      this.$message.error('请求时出错！');
      console.log(error);
    })
  }
}
```