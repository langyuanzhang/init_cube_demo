// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { createAPI } from 'cube-ui'
import SubscribeDialog from './components/subscribe-dialog'

createAPI(Vue, SubscribeDialog, [], true)

//api请求
import axios from 'axios'
import qs from 'qs'
Vue.prototype.axios = axios
Vue.prototype.qs = qs
//导入cube-ui前端框架
import Cube from 'cube-ui' // 一般直接放在这个位置
Vue.use(Cube)


Vue.config.productionTip = false

  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })

