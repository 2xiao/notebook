<template>
  <div class="header">
    <div class="weather">
      <span class="city">{{weatherData.city}}</span>
      <span class="temp">{{weatherData.temp1}}~{{weatherData.temp2}}</span>
      <span class="weat">{{weatherData.WD}}{{weatherData.weather}}</span>
      <img width="20" height="20" :src="'http://m.weather.com.cn/img/'+weatherData.img1">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weatherData: {
      type: Object
    }
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
</style>
