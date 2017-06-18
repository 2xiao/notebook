<template>
  <div class="container">
    <div class="chart">
        <div id="myChart" style="width: 100%; height:100%;"></div>
    </div>
    <div>
      <div @click="showDetail" class="add-btn">
        <i>+</i>
      </div>
      <div class="title">
        <div class="subTitle">记录一下今天的体重吧</div>
        <div class="bigTitle">自律给我自由</div>
      </div>
    </div>
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-main">
        <input class="calendarBtn" readonly="readonly" size="11" type="text" v-model="calendar.items.text" @click.stop="open($event)" placeholder="请选择日期…" />
        <Calendar :show="calendar.show" :type="calendar.items.type" :value="calendar.items.value"
            :begin="calendar.items.begin" @cancel="dateCancel" @ok="dateOk" :end="calendar.items.end" :sep="calendar.items.sep"
            :single="calendar.items.single" :rangeValue='calendar.items.rangeValue' :autoclose='calendar.items.autoclose'>
        </Calendar>
        <span class="weightShow">{{newWeight}}</span><span class="weightKg">&nbsp;kg</span>
        <i class="detail-add" @click="addWeight">+</i>
      </div>
      <div class="detail-input">
        <div class="detail-line">
          <button @click="demo(1,1)">1</button>
          <button @click="demo(1,2)">2</button>
          <button @click="demo(1,3)">3</button>
        </div>
        <div class="detail-line">
          <button @click="demo(1,4)">4</button>
          <button @click="demo(1,5)">5</button>
          <button @click="demo(1,6)">6</button>
        </div>
        <div class="detail-line">
          <button @click="demo(1,7)">7</button>
          <button @click="demo(1,8)">8</button>
          <button @click="demo(1,9)">9</button>
        </div>
        <div class="detail-line">
          <button @click="demo(2,null)">C</button>
          <button @click="demo(1,0)">0</button>
          <button @click="demo(3,null)">.</button>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close">×</i>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '@/localstorage'
import Calendar from './calendar'
var myChart
var thisMonth = new Date().getMonth() >= 9 ? (new Date().getMonth() + 1).toString() : '0' + (new Date().getMonth() + 1)
var thisDay = new Date().getDate() >= 9 ? (new Date().getDate() + 1).toString() : '0' + (new Date().getDate() + 1)
export default {
  components: {
    Calendar
  },
  data () {
    return {
      detailShow: false,
      newWeight: '',
      inputValue: 0,
      weight: Store.fetch('notebook-fit') || [],
      calendar: {
        show: false,
        x: 0,
        y: 0,
        items: {
          type: 'date',
          begin: '2015/08/20',
          end: [new Date().getFullYear(), thisMonth, thisDay].join('/'),
          value: [new Date().getFullYear(), thisMonth, thisDay].join('/'),
          text: [new Date().getFullYear(), thisMonth, thisDay].join('/'),
          sep: '/',
          single: true,
          autoclose: true,
          weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      },
      option: {
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          show: false,
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          show: false,
          type: 'value',
          min: 'dataMin',
          max: 'dataMax',
          splitLine: {
            show: false
          }
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 100,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '100%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [{
          type: 'line',
          symbolSize: 10,
          hoverAnimation: true,
          data: this.weight,
          itemStyle: {
            normal: {
              color: 'rgba(27, 121, 169, 0.8)'
            }
          },
          lineStyle: {
            normal: {
              color: 'rgba(27, 121, 169, 0.8)',
              type: 'dotted',
              shadowColor: 'rgba(108, 166, 195, 0.5)',
              shadowBlur: 10
            }
          },
          markPoint: {
            symbol: 'pin',
            symbolSize: '60',
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ],
            label: {
              normal: {
                textStyle: {
                  color: '#FFF',
                  fontSize: '12',
                  fontWeight: 'bolder'
                },
                formatter: '{c}Kg'
              }
            }
          },
          markLine: {
            data: [
                {type: 'average', name: '平均值'}
            ],
            lineStyle: {
              normal: {
                color: '#efefef'
              }
            },
            label: {
              normal: {
                formatter: '{c}Kg',
                position: 'middle'
              }
            }
          }
        }]
      }
    }
  },
  mounted () {
    myChart = this.$echarts.init(document.getElementById('myChart'))
    myChart.setOption(this.option)
    myChart.setOption({
      series: [{
        data: this.weight
      }]
    })
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
      this.newWeight = ''
    },
    addWeight () {
      this.inputValue = parseFloat(this.newWeight)
      console.log(typeof this.calendar.items.value, this.calendar.items.value)
      if (isNaN(this.inputValue)) {
        this.detailShow = false
        this.newWeight = ''
      } else {
        this.weight.push([this.calendar.items.value, this.inputValue])
        myChart.setOption({
          series: [{
            data: this.weight.sort()
          }]
        })
        this.detailShow = false
        this.newWeight = ''
      }
    },
    demo (tip, value) {
      if (tip === 1) {
        if ((value !== 0 || this.newWeight.length !== 0) && this.newWeight.indexOf('.') !== this.newWeight.length - 4) {
          this.newWeight = this.newWeight + value.toString()
        }
      } else if (tip === 2) {
        this.newWeight = ''
      } else if (tip === 3) {
        if (this.newWeight.indexOf('.') === -1) {
          this.newWeight = this.newWeight + '.'
        }
      }
    },
    open (e, type) {
      // 设置类型
      this.calendar.show = true
      this.calendar.x = e.target.offsetLeft
      this.calendar.y = e.target.offsetTop + e.target.offsetHeight + 8
    },
    dateCancel (obj) {
      this.calendar.show = obj.show
    },
    dateOk (obj) {
      this.calendar.items.text = obj.values[0]
      this.calendar.items.value = obj.values[0]
    }
  },
  watch: {
    weight: {
      handler: function (weight) {
        Store.save('notebook-fit', weight)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.container {
  color: black;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
.add-btn {
  margin: 20px 20px 0 0;
  float: right;
  font-style: normal; 
  width: 40px;
  height: 40px;
  color:rgba(0, 111, 111, 0.5);
  background: rgba(255,255,255, 0.6);
  text-align: center;
  font-family: 'Times New Roman';
  line-height: 40px; 
  font-size: 3em;
  font-weight: bolder;
  border-radius: 20px 20px;
}
.title {
  margin: 10px 0 0 15px;
  float: left;
  font-style: normal; 
}
.bigTitle {
  color: #FFF;
  font-size: 31px;
  font-weight: bolder;
}
.subTitle {
  font-size: 18px;
  color: #0276b1;
}
.chart {
  width: 100%;
  height: 85%;
  overflow-x: hidden;
  position: absolute;
  top: 15%;
  left: 0;
  right: 0;
}
.detail {
  position: relative;
  color: #fff;
  background: rgba(49, 78, 95, .95);
  width: 100%;
  min-height: 6000px;
}
.detail-main {
  height: 100px;
  line-height: 100px;
  width: 100%;
}
.weightShow {
  position: absolute;
  top: 25px;
  left: 35%;
  width: 100px;
  height: 40px;
  font-size: 1.8em;
  text-align: center;
  color: #0276b1;
  padding-bottom: 28px;
  border-bottom: thick dotted #5e7a88;
}
.weightKg {
  position: absolute;
  top: 25px;
  left: 62%;
  height: 40px;
  font-size: 1.8em;
  text-align: center;
  color: #5e7a88;
}
.detail-add {
  position: absolute;
  top: 20px;
  right: 20px;
  font-style: normal; 
  width: 40px;
  height: 40px;
  color: rgba(49, 78, 95, .95);
  background: rgba(255,255,255, 0.8);
  font-family: 'Times New Roman';
  line-height: 40px; 
  font-size: 3em;
  font-weight: bolder;
  border-radius: 20px 20px;
}
.detail-input {
  width: 80%;
  margin: 0 auto;
}
.detail-line{
  width: 100%;
  display: flex;
  justify-content: center;
}
button {
  display: block;
  flex: 33%;
  font-size: 26px;
  padding-top: 10%;
  color: rgba(255,255,255, 1);
  background-color: transparent;
  border-style: none;
  outline:none;
}
button:hover {
  color: #0276b1;
}
.detail-close {
  clear: both;
  font-size: 32px;
}
.icon-close {
  margin: 0 auto;
  margin-top: 8%;
  margin-left: 44%;
  float: left;
  font-style: normal; 
  width: 40px;
  height: 40px;
  color: rgba(49, 78, 95, .95);
  background: rgba(255,255,255, 0.8);
  text-align: center;
  font-family: 'Times New Roman';
  line-height: 40px; 
  font-size: 1.5em;
  font-weight: bolder;
  border-radius: 20px 20px;
}
.calendarBtn{
  position: absolute;
  top: 8px;
  left: 12px;
  height: 40px;
  font-style: normal; 
  border-radius: 2px;
  padding:5px;
  font-size: 1.3em;
  background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==) no-repeat 8px 17px;
  padding-left: 35px;
  color: rgba(255,255,255, 1);
}
</style>
