<template>
  <div id="menu">
    <div>{{ menuname }}</div>
    <div v-for="menu in menus" v-bind:class="{active: menu.isActive}" v-on:click = "active(menu)">
      {{menu.menuname}}
    </div>
    <input v-model="newMenu" v-on:keyup.enter="addNew">
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
      menus: Store.fetch('menu') || [],
      newMenu: ''
    }
  },
  watch: {
    menus: {
      handler: function (menus) {
        Store.save('menu', menus)
      },
      deep: true
    }
  },
  methods: {
    active: function (menu) {
      menu.isActive = !menu.isActive
    },
    addNew: function () {
      this.menus.push({
        menuname: this.newMenu,
        isActive: false
      })
      this.newMenu = ''
    }
  }
}

</script>
<style>
#menu {
  width: 80px;
}
.active {
  background-color: rgba(0, 259, 259, 0.8);
}
</style>
