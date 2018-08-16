import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import defaulted from '@/components/default'
import mobile from '@/components/mobile'
import mobileInfo from '@/components/mobileInfo'
import personal_work from '@/components/personal_work.vue'
import natural_risk from '@/components/natural_risk/natural_risk.vue'
import pro_info from '@/components/natural_risk/pro_info.vue'
import new_task from '@/components/natural_risk/new_task.vue'
import natural_index from '@/components/natural_risk/natural_index.vue'
import natural_result from '@/components/natural_risk/natural_result.vue'
import partin_task from '@/components/natural_risk/partin_task.vue'
import SED_index from '@/components/subjective-evaluation-design/SED-index'
import SED_table from '@/components/subjective-evaluation-design/SED-table'
import SED_tableOver from '@/components/subjective-evaluation-design/SED-tableOver'
import SED_LaunchAssessment from '@/components/subjective-evaluation-design/SED-LaunchAssessment'
import SED_pgzEntry from '@/components/subjective-evaluation-design/SED-pgzEntry.vue'
import SED_pgzEntryFlameout from '@/components/subjective-evaluation-design/SED-pgzEntryFlameout.vue'
import SED_zzzEntry from '@/components/subjective-evaluation-design/SED-zzzEntry.vue'
import SED_zzzEntryFlameout from '@/components/subjective-evaluation-design/SED-zzzEntryFlameout.vue'
import SED_ViewResult from '@/components/subjective-evaluation-design/SED-ViewResult.vue'
import SED_ViewResultNormal from '@/components/subjective-evaluation-design/SED-ViewResultNormal.vue'
import vecp_system from '@/components/vecp_system/vecp_system.vue'
import carpet_temperature from '@/components/carpet_temperature/carpet_temperature'
import part_temperature from '@/components/part_temperature/part_temperature'
import calculat_manage from '@/components/calculat_manage/calculat_manage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
     {
      path: '/plat',
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
			path: '/calculat_manage',
			name: 'calculat_manage',
			component: calculat_manage,
		},
    {
      path: '/mobileInfo',
      name: 'mobileInfo',
      component: mobileInfo
    },
    {
      path: '/SED_index',
      name: 'SED_index',
      component: SED_index
    },
    {
      path: '/SED_table',
      name: 'SED_table',
      component: SED_table
    },{
      path: '/SED_tableOver',
      name: 'SED_tableOver',
      component: SED_tableOver
    },
    {
      path: '/SED_result/:id',
      name: 'SED_ViewResult',
      component: SED_ViewResult
    },
		{
			path: '/SED_resultNormal/:id',
			name: 'SED_ViewResultNormal',
			component: SED_ViewResultNormal
		},
    {
      path: '/SED_LaunchAssessment',
      name: 'SED_LaunchAssessment',
      component: SED_LaunchAssessment
    },
		{
			path: '/SED_pgzEntry/:id',
			name: 'SED_pgzEntry',
			component: SED_pgzEntry
		},
		{
			path: '/SED_pgzEntryFlameout/:id',
			name: 'SED_pgzEntryFlameout',
			component: SED_pgzEntryFlameout
		},
		{
			path: '/SED_zzzEntry/:id',
			name: 'SED_zzzEntry',
			component: SED_zzzEntry
		},
		{
			path: '/SED_zzzEntryFlameout/:id',
			name: 'SED_zzzEntryFlameout',
			component: SED_zzzEntryFlameout
		},
		{
			path: '/personal_work',
			name: 'personal_work',
			component: personal_work
		},
		{
			path: '/natural_risk',
			name: 'natural_risk',
			component: natural_risk
		},
		{
			path: '/new_task',
			name: 'new_task',
			component: new_task
		},
		{
			path: '/partin_task/:id',
			name: 'partin_task',
			component: partin_task
		},
		{
			path: '/natural_result/:id',
			name: 'natural_result',
			component: natural_result
		},
		{
			path: '/natural_index',
			name: 'natural_index',
			component: natural_index
		},
		{
			path: '/pro_info/:id',
			name: 'pro_info',
			component: pro_info
		},
		{
			path: '/vecp_system',
			name: 'vecp_system',
			component: vecp_system,
		},
		{
			path: '/carpet_temperature',
			name: 'carpet_temperature',
			component: carpet_temperature,
		},
		{
			path: '/part_temperature',
			name: 'part_temperature',
			component: part_temperature,
		},
  ]
})
