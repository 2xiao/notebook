<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/">待办</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/fit">健康</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/money">账本</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/pro">项目</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Weather from 'components/header/getWeather'
  import header from 'components/header/header'
  export default {
    name: 'app',
    components: {
      'v-header': header
    },
    created () {
      Weather.getAsyncScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js').then(function () {
      })
    }
  }
</script>

<style>
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
  text-align: center
}
.tab-item > a {
  display: block;
  font-size: 14px;
  color: #071710;
}
.tab-item > a.router-link-active{
  color: #017d30;
}
.content {
  position:absolute;
  top: 140px;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(72, 157, 197, 0.57) 0%,#b5e2ec 100%);
}
</style>
