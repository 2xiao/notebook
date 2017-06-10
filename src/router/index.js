import Vue from 'vue'
import Router from 'vue-router'
import todo from 'components/todo/todo'
import list from 'components/todo/list'
import fit from 'components/fit/fit'
import money from 'components/money/money'
import pro from 'components/pro/pro'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/todo',
      component: todo,
      children: [{
        path: '/list/:id',
        component: list
      }]
    },
    { path: '/fit', component: fit },
    { path: '/money', component: money },
    { path: '/pro', component: pro }
  ]
})

