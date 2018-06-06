import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import defaulted from '@/components/default'
import mobile from '@/components/mobile'
import mobileInfo from '@/components/mobileInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/default',
      name: 'defaulted',
      component: defaulted
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: mobile
    },
    {
      path: '/mobileInfo',
      name: 'mobileInfo',
      component: mobileInfo
    }
  ]
})
