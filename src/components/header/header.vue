<template>
  <div class="header">
    <div class="weather">
      <span class="city">{{weatherData.city}}</span>
      <span class="temp">{{weatherData.temp1}}~{{weatherData.temp2}}</span>
      <span class="weatherChi">{{weatherData.WD}}{{weatherData.weather}}</span>
      <img width="20" height="20" :src="'http://m.weather.com.cn/img/'+weatherData.img1">
    </div>
    <div class="date">
      <span>{{time.getFullYear()}}年{{time.getMonth()+1}}月{{time.getDate()}}日{{aweek[time.getDay()]}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weatherData: {
      type: Object
    }
  },
  created () {
    this.time = new Date()
    this.aweek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
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
