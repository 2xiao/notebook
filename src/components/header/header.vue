<template>
  <div class="header">
    <div class="time">
      <span><strong>{{time.getFullYear()}}年{{time.getMonth()+1}}月{{time.getDate()}}日</strong></span>
      <span>{{aweek[time.getDay()]}}</span> 
    </div>
    <div class="content-wrapper"> 
      <v-weather :arr="arr"></v-weather>  
    </div>    
  </div>
</template>

<script>
import weather from 'components/header/weather'
import Weather from '../../getWeather'
export default {
  created () {
    this.time = new Date()
    this.aweek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    var self = this
    Weather.getJSON('http://wthrcdn.etouch.cn/weather_mini?city=北京').then(function (obj) {
      self.arr = {
        weat: obj.data.forecast[0].type,
        temp: obj.data.wendu
      }
    })
  },
  data () {
    return {
      logo: require('components/header/logo.png'),
      arr: {}
    }
  },
  components: {
    'v-weather': weather
  }
}
</script>

<style>
.header {
  position: relative;
  overflow: hidden;
  color: #fff;
  background-image: url(./bg01.jpg);
  background-size: 100%, 100px;
  background-repeat: no-repeat;
  width: 100%;
  height: 100px;
}

.time {
  float: left;
  width: 60%;
  margin-top: 5px;
}

.time span {
  display: block;
  text-align: left;
  font-size: 20px;
  padding-top: 15px;
  padding-left: 20px;
}

.content-wrapper {
  float: right;
  width: 37%;
}
</style>
