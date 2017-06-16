import Vue from 'vue'
import Router from 'vue-router'
import todo from 'components/todo/todo'
import fit from 'components/fit/fit'
import money from 'components/money/money'
import weibo from 'components/weibo/weibo'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      component: todo
    },
    { path: '/fit', component: fit },
    { path: '/money', component: money },
    { path: '/weibo', component: weibo }
  ]
})

