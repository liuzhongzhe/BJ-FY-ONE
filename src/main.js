import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'  
import '../node_modules/element-ui/lib/theme-chalk/index.css' 
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import echarts from 'echarts'
import iView from 'iview'
import 'iview/dist/styles/iview.css'    // 使用 CSS
Vue.use(iView)
Vue.prototype.$echarts = echarts 
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
