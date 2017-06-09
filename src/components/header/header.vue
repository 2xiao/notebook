<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avater">
        <img :src="logo">
      </div>
      <div class="weather">
        <span class="city">{{weatherData.city}}</span>
        <span class="temp">{{weatherData.temp1}}~{{weatherData.temp2}}</span>
        <span class="weatherChi">{{weatherData.WD}}{{weatherData.weather}}</span>
        <div v-if= "time.getHours() > 20 || time.getHours() < 6">
          <img :src="'http://m.weather.com.cn/img/'+weatherData.img1">
        </div>
        <div v-else>
          <img :src="'http://m.weather.com.cn/img/'+weatherData.img2">
        </div>
        <span>{{time.getFullYear()}}年{{time.getMonth()+1}}月{{time.getDate()}}日{{aweek[time.getDay()]}}</span>
      </div>
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
    this.aweek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    this.$http.jsonp('https://api.weibo.com/2/statuses/public_timeline.json').then((weibo) => {
      weibo = weibo.body
      console.log(weibo)
    })
  },
  data () {
    return {
      logo: require('components/header/logo.png')
    }
  }
}
</script>

<style>
.header {
  position: relative;
  overflow: hidden;
  color: #fff;
  background: rgba(7, 17, 27, 0.5);
}
.content-wrapper {
  float: left;
  width: 100%;
}
.avater {
  padding-left: 10px;
}
.avater img {
  width: 40px;
  height: 40px;
}
.weather img {
  width: 20px;
  height: 20px;
}
</style>
