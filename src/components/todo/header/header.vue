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

export default {
  created () {
    this.time = new Date()
    this.month = ['January', 'February', 'March', 'April ', 'May', 'June', 'Jul', 'August', 'September', 'October', 'November ', 'December']
    this.aweek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let self = this
    this.$axios.get('http://ip.chinaz.com/getip.aspx').then((obj) => {
      self.arr.city = obj.data.split('\'')[3].split(' ')[0]
      this.$axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + self.arr.city).then((obj) => {
        self.arr.weat = obj.data.data.forecast[0].type
        self.arr.temp = obj.data.data.wendu
      })
    })
  },
  data () {
    return {
      remoteIp: {'ret': 1},
      arr: {
        city: '',
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
  width: 55%;
  padding-top: 20px;
  padding-left: 10px;
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
  margin-right: 10px;
  width: 35%;
  max-width: 200px;
}
.more-weather{
  position: absolute;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
