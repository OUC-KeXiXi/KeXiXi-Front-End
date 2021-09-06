import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入axios跨域通信
import axios from 'axios'
import VueAxios from 'vue-axios'
import less from 'less'

//引入Elenent-UI
import ElementPlus from 'element-plus'
import '../src/style/element-variables.scss'
import '../src/style/style.less'

const app = createApp(App);

app.use(store); //使用Vuex
app.use(router); //使用Vue-router
app.use(ElementPlus); //使用Elenent-UI
app.use(VueAxios, axios);
app.use(less);

// 设置跨域问题
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.timeout = 10000;




//创建Vue应用
app.mount('#app')