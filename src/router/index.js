import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import xxx from '@/components/xxx'
import defaulted from '@/components/default'
import mobile from '@/components/mobile'
import mobileInfo from '@/components/mobileInfo'
import personal_work from '@/components/personal_work.vue'
import SED_index from '@/components/subjective-evaluation-design/SED-index'
import SED_table from '@/components/subjective-evaluation-design/SED-table'
import SED_LaunchAssessment from '@/components/subjective-evaluation-design/SED-LaunchAssessment'
import SED_pgzEntry from '@/components/subjective-evaluation-design/SED-pgzEntry.vue'
import SED_pgzEntryFlameout from '@/components/subjective-evaluation-design/SED-pgzEntryFlameout.vue'
import SED_zzzEntry from '@/components/subjective-evaluation-design/SED-zzzEntry.vue'
import SED_zzzEntryFlameout from '@/components/subjective-evaluation-design/SED-zzzEntryFlameout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SED_index',
      component: SED_index
    },
    {
      path: '/default',
      name: 'defaulted',
      component: defaulted
    },
    {
      path: '/xxx',
      name: 'xxx',
      component: xxx
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
    },
    {
      path: '/SED_LaunchAssessment',
      name: 'SED_LaunchAssessment',
      component: SED_LaunchAssessment
    },
		{
			path: '/SED_pgzEntry',
			name: 'SED_pgzEntry',
			component: SED_pgzEntry
		},
		{
			path: '/SED_pgzEntryFlameout',
			name: 'SED_pgzEntryFlameout',
			component: SED_pgzEntryFlameout
		},
		{
			path: '/SED_zzzEntry',
			name: 'SED_zzzEntry',
			component: SED_zzzEntry
		},
		{
			path: '/SED_zzzEntryFlameout',
			name: 'SED_zzzEntryFlameout',
			component: SED_zzzEntryFlameout
		},
		{
			path: '/personal_work',
			name: 'personal_work',
			component: personal_work
		}
  ]
})
