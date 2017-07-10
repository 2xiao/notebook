<template>
  <div class="header">
    <div class="time">
      <span class="day">{{time.getDate()}}</span>
      <span class="week">{{aweek[time.getDay()]}}</span> 
      <span class="year">{{month[time.getMonth()]}},&nbsp;{{time.getFullYear()}}</span> 
    </div>
    <div class="content-wrapper"> 
      <v-weather :arr="arr"></v-weather>  
    </div>    
  </div>
</template>

<script>
import weather from 'components/todo/header/weather'
import Weather from 'components/todo/header/getWeather'
export default {
  created () {
    this.time = new Date()
    this.month = ['January', 'February', 'March', 'April ', 'May', 'June', 'Jul', 'August', 'September', 'October', 'November ', 'December']
    this.aweek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let self = this
    Weather.getJSON('http://wthrcdn.etouch.cn/weather_mini?city=北京').then(function (obj) {
      self.arr = {
        weat: obj.data.forecast[0].type,
        temp: obj.data.wendu
      }
    })
  },
  data () {
    return {
      remoteIp: {'ret': 1},
      city: '',
      arr: {
        weat: '晴',
        temp: 0
      }
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
  width: 100%;
  height: 100px;
}

.time {
  position: relative;
  float: left;
  width: 50%;
  padding-top: 20px;
  padding-left: 20px;
}

.time span {
  display: block;
  text-align: left;
}

.day {
  float: left;
  font-size: 4em;
  margin-right: 10px;
  margin-top: -12px;
}
.week {
  font-size: 1.3em;
  font-weight: 700;
  padding-bottom: 5px;
}

.content-wrapper {
  float: right;
  padding-right: 10px;
  width: 35%;
}
</style>
