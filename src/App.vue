<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/todo">事项</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/fit">体重</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/money">记账</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/pro">项目</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Weather from './getWeather'
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
  width: 100%;
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
  color: #42b983;
}
.tab-item > a.router-link-active{
  color: rgb(240, 20, 20)
}
</style>
