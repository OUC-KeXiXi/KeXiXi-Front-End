import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入axios跨域通信
import axios from 'axios'
import VueAxios from 'vue-axios'

//引入Elenent-UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

app.use(store); //使用Vuex
app.use(router); //使用Vue-router
app.use(ElementPlus); //使用Elenent-UI
app.use(VueAxios, axios)

// 设置跨域问题
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.timeout = 10000;




//创建Vue应用
app.mount('#app')