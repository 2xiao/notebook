<template>
  <div id="app">
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
    <router-view></router-view>
  </div>
</template>

<script>
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
</style>
