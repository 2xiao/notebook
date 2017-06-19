import Vue from 'vue'
import Router from 'vue-router'
import todo from 'components/todo/todo'
import fit from 'components/fit/fit'
import money from 'components/money/money'
import me from 'components/me/me'
import earning from 'components/money/earning'
import expense from 'components/money/expense'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/todo' },
    { path: '/todo', component: todo },
    { path: '/fit', component: fit },
    { path: '/me', component: me },
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
