<template>
  <div class="list-todos">
    <a class="list-todo list activeListClass" v-for="item in items"> 
      <span class="icon-lock" v-if="item.locked"></span> 
      <span class="count-list" v-if="item.count > 0">{{item.count}}</span>
      {{item.title}}
    </a>
    <a class=" link-list-new" >
      <span class="icon-plus">
      </span>
      新增
    </a>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        items: [{ title: '星期一', count: 1, locked: true }, // 菜单的模拟数据
          { title: '星期二', count: 2, locked: true },
          { title: '星期三', count: 3, locked: false
          }]
      }
    }
  }
</script>
<style>
.list-todos a{
  box-shadow: rgba(255,255,255,.15) 0 1px 0 0;
  display: block;
  line-height: 1.5em;
  padding: .75em 2.5em;
  position: relative;
  text-decoration: none;
  text-align: left;
  overflow-x:hidden;
}
.list-todos .link-list-new {
  text-align: left;
  cursor: pointer;
}
.list-todos .count-list {
  transition: all 200ms ease-in;
  background: rgba(255,255,255,.1);
  border-radius: 1em;
  float: right;
  font-size: .7rem;
  line-height: 1;
  margin-top: .25rem;
  margin-right: -1.5em;
  padding: .3em .5em;
}
.icon-lock, .icon-plus {
  float: left;
  margin-left: -1.5rem;
  margin-right: .5rem;
  margin-top: .1rem;
  width: 1em;
}
.icon-lock {
  margin-top: .2rem;
  opacity: .8;
}
.list-todo{
  color: rgba(0,255,255,.4);
}
.cordova &:hover {
  color: rgba(255,255,255,.4);
}
</style>
