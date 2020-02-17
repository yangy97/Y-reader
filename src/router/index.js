import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: resolve => require(['@/components/Home/Home'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
	 {
	      path: '/search',
	      component: resolve => require(['@/components/Search/search-detail'], resolve),
	    },
    {
      path: '/sort',
      component: resolve => require(['@/components/sort/sort'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/read/:id/',
      name: 'read',
      component: resolve => require(['@/components/Read/read'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/rank',
      component: resolve => require(['@/components/rank/rank'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
   
    {
      path: '/featured',
      component: resolve => require(['@/components/Featured/featured'], resolve),
      children: [
        {
          path: '/booklist-deatil/:id',
          component: resolve => require(['@/comm/booklist-detail'], resolve),
        }
      ],
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/sortdeatil/detail',
      component: resolve => require(['@/components/sort/detailSort'], resolve),
    },
    {
      path: '/rank/:id',
      component: resolve => require(['@/components/rank/detailRank'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
   
    {
      path: '/bookshelf',
      component: resolve => require(['@/components/BookShelf/bookshelf'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/book/:id',
      component: resolve => require(['@/components/BookDetail/book-detail'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    }
  ],
  linkActiveClass: 'mui-active'
})
