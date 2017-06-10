<template>
  <div class="page lists-show"><!--最外层容器-->
    <nav><!--容器上半部分-->
      <div class="nav-group"> <!--移动端的菜单图标-->
        <a class="nav-item">
          <span class="icon-list-unordered">
          </span>
        </a>
      </div>
      <h1 class="title-page">
        <span class="title-wrapper">{{todo.title}}</span> <!-- 标题-->
        <span class="count-list">{{todo.count}}</span>
      </h1>
      <div class="nav-group right">
        <div class="options-web"> 
          <a class=" nav-item">
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <a class=" nav-item">
            <span class="icon-trash">
            </span>
          </a>
        </div>
      </div>
  
      <div class=" form todo-new input-symbol">
         <input type="text" v-model="text" placeholder='请输入'@keyup.enter="onAdd" :disabled="todo.locked" />
        <span class="icon-add"></span>
      </div>
    </nav>
    <div class="content-scrollable list-items">
      <div v-for="item in items">
       <item :item="item"></item>
      </div>
    </div>
  </div>
</template>
<script>
import item from './item'
export default {
  data () {
    return {
      todo: { // 详情内容
        title: '星期一',
        count: 12,
        locked: false
      },
      items: [ // 代办单项列表
        { checked: false, text: '新的一天', isDelete: false },
        { checked: false, text: '新的一天', isDelete: false },
        { checked: false, text: '新的一天', isDelete: false }
      ],
      text: ''
    }
  },
  methods: {
    onAdd () {
      this.items.push({
        checked: false, text: this.text, isDelete: false
      })
      this.text = ''
    }
  },
  components: {
    item
  }
}
</script>
<style>
</style>
