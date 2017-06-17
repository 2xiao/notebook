import Vue from 'vue'
import Router from 'vue-router'
import todo from 'components/todo/todo'
import fit from 'components/fit/fit'
import money from 'components/money/money'
import weibo from 'components/weibo/weibo'
import earning from 'components/money/earning'
import expense from 'components/money/expense'
// import charge from 'components/money/charge'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/todo' },
    { path: '/todo', component: todo },
    { path: '/fit', component: fit },
    // { path: '/money', component: money },
    { path: '/weibo', component: weibo },
    { path: '/money',
      component: money,
      children: [{
        path: '/money',
        redirect: '/money/expense'
      },
      {
        path: 'expense',
        component: expense
      },
      {
        path: 'earning',
        component: earning
      }]
    }
  ]
})

