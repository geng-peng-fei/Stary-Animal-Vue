import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


import './assets/css/normalize.css'
import './assets/css/base.less'
// 导入字体图片样式
import './assets/font/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.axios = axios

Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')