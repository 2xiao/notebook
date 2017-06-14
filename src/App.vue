<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/">Todo</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/fit">Fit</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/money">Money</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/pro">Pro</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import header from 'components/header/header'
  export default {
    name: 'app',
    components: {
      'v-header': header
    }
  }
</script>

<style scoped>
html, body, #app {
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.tab {
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.tab:after {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  content: ' ';
}
.tab-item {
  flex: 1;
  text-align: center;
}
.tab-item > a {
  font-size: 0.9em;
  line-height: 10px;
  color: #071710;
  font-weight: normal;
}
.tab-item > a.router-link-exact-active {
  color: #017d30;
  font-weight: bold;
}
.content {
  overflow-y: auto;
  overflow-x: hidden;
  position:absolute;
  top: 140px;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, #6ca6c3 0%,#b5e2ec 100%);
}
</style>
