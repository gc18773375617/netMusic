import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import hot from '@/components/hot'
import sea from '@/components/search'
import song from '@/components/song'
import artist from '@/components/artist'
import mv from '@/components/mv'
import gd from '@/components/gd'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
			meta:{index:1}
    },
		{
			path:'/login',
			name:'login',
			component:login,
			meta:{index:4}
		},
		{
			path:'/hot',
			name:'hot',
			component:hot,
			meta:{index:2}
		},
		{
			path:'/sea',
			name:'sea',
			component:sea,
			meta:{index:3}
		},
		{
			path:'/song',
			name:'song',
			component:song,
			meta:{index:77}
		},
		{
			path:'/artist',
			name:'artist',
			component:artist,
			meta:{index:78}
		},
		{
			path:'/mv',
			name:'mv',
			component:mv,
			meta:{index:79}
		},
		{
			path:'/gd',
			name:'gd',
			component:gd,
			meta:{index:79}
		}
  ]
})
