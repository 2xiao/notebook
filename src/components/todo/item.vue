<template>
  <div id="content-container">
    <h1>{{ msg }}</h1>
    <input v-model="newItem" v-on:keyup.enter="addNew">
    <button>click</button>
    <div menus>
    <div v-for="menu in menus">
      <ul v-if="menu.isActive === true" items>
        <li v-for="item in items" v-if="menu.menuname === item.menu" v-bind:class="{finished: item.isFinished}" v-on:click = "changeFinish(item)">
        {{item.label}}
        </li>
      </ul>
    </div>
    </div>

  </div>
</template>

<script>
import Store from '@/localstorage'
export default {
  props: {
    menuname: {
      type: String
    }
  },
  data () {
    return {
      msg: 'What to do today?',
      items: Store.fetch('todo') || [],
      menus: Store.fetch('menu') || [],
      newItem: ''
    }
  },
  watch: {
    items: {
      handler: function (items) {
        Store.save('todo', items)
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
        menu: this.menuname,
        isFinished: false,
        label: this.newItem
      })
      this.newItem = ''
    }
  },
  created () {
    console.log(this.menus[0].menuname)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-container {
  flex: 1
}
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
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
