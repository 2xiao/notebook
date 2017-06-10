<template>
  <div id="container">
    <div id="menu">
    <v-menu></v-menu>
    </div>
    <div class="content-overlay"></div>
    <div id="content-container">
      <list></list>
    </div>
  </div>
</template>

<script>
import list from './list'
import menu from './menu'
export default {
  data () {
    return {
      todoId: ''
    }
  },
  components: {
    'v-menu': menu,
    list
  }
}
</script>

<style>

#container {
  display: flex;
  position: absolute;
  top: 140px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}
#menu {
  flex: 0 0 180px;
  width: 180px;
  background: #f3f5f7;
}
#content-container {
  flex: 1
}

</style>
