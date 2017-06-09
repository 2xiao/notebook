<template>
  <div class="todo">
    <h1>{{ msg }}</h1>
    <input v-model="newItem" v-on:keyup.enter="addNew">
    <button>click</button>
    <ul>
      <li v-for="item in items" v-bind:class="{finished: item.isFinished}" v-on:click = "changeFinish(item)">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>
<script>
import Store from '../../store'
export default {
  data () {
    return {
      msg: '一个用Vue写的To Do List',
      items: Store.fetch() || [],
      newItem: ''
    }
  },
  watch: {
    items: {
      handler: function (items) {
        Store.save(items)
      },
      deep: true
    }
  },
  methods: {
    changeFinish: function (item) {
      item.isFinished = !item.isFinished
    },
    addNew: function () {
      this.items.push({
        isFinished: false,
        label: this.newItem
      })
      this.newItem = ''
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.finished{
  text-decoration: line-through;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
/*  display: inline-block;
*/  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
