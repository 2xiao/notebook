<template>
  <div class="container">
    <div class="menu">
      <menus :menuname='menuname'></menus>
    </div>
    <div class="content-container">
      <item :menuname='menuname'></item>
    </div>
  </div>
</template>

<script>
import menus from './menu'
import item from './item'
export default {
  data () {
    return {
      menuname: 'wuxx1'
    }
  },
  components: {
    item,
    menus
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  position: absolute;
  top: 140px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
  text-align: center;
  text-align: left;
}
.menu {
  background: linear-gradient(to bottom, #e4e8e7, #b1b5b3 100%);
  flex: 0 0 80px;
  width: 80px;
}
.content-container {
  flex: 1
}
</style>
