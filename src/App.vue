<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/todo"><div class="svgbtn todobtn"></div></router-link>
      </div>
      <div class="tab-item">
        <router-link to="/fit"><div class="svgbtn fitbtn"></div></router-link>
      </div>
      <div class="tab-item">
        <router-link to="/money"><div class="svgbtn moneybtn"></div></router-link>
      </div>
      <div class="tab-item">
        <router-link to="/me"><div class="svgbtn mebtn"></div></router-link>
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
.svgbtn {
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0 auto;
}
.todobtn{
  background: url("../static/icon/todo.svg") no-repeat center center;
}
.tab-item > a.router-link-active > .todobtn{
  background: url("../static/icon/todo-a.svg") no-repeat center center;
}
.fitbtn{
  background: url("../static/icon/fit.svg") no-repeat center center;
}
.tab-item > a.router-link-active > .fitbtn{
  background: url("../static/icon/fit-a.svg") no-repeat center center;
}
.moneybtn{
  background: url("../static/icon/money.svg") no-repeat center center;
}
.tab-item > a.router-link-active > .moneybtn{
  background: url("../static/icon/money-a.svg") no-repeat center center;
}
.mebtn{
  background: url("../static/icon/me.svg") no-repeat center center;
}
.tab-item > a.router-link-active > .mebtn{
  background: url("../static/icon/me-a.svg") no-repeat center center;
}
.tab-item {
  flex: 1;
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
