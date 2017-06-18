<template>
  <div class="container">
    <div v-show="!detailshow" class="row">
      <!-- <div class="title leftTitle"><span>当月收入</span><br>{{totalEraning}}.00</div> -->
      <div @click="showChart3" class="rowItem earning-btn">支出状况</div>
      <div @click="showChart2" class="rowItem expense-btn">收入状况</div>
      <div @click="showChart" class="rowItem total-btn">收支汇总</div>
      <div @click="showDetail" class="add-btn"></div>
      <!-- <div class="title rightTitle"><span>当月支出</span><br>{{totalExpense}}.00</div>   -->     
    </div>
    <div v-show="detailshow" class="detail" transition="fade">
      <div class="tab">
        <div class="tab-item icon">
          <i @click="hideDetail">×</i>
        </div>
        <div class="tab-item tab-expense">
          <router-link to="/money/expense">支出</router-link>
        </div>
        <div class="tab-item tab-earning">
          <router-link to="/money/earning">收入</router-link>
        </div>
        <div class="tab-item icon">
          <i @click="">+</i>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
      <div class="detail-input">
        <div class="top-line">
          <button class="calendarBtn" @click.stop="open($event)">{{calendar.items.value}}</button>
          <button class="newMoney">¥&nbsp;&nbsp;{{newMoney}}</button>
        </div>
        <div class="detail-line">
          <button @click="keyBroad(1,1)">1</button>
          <button @click="keyBroad(1,2)">2</button>
          <button @click="keyBroad(1,3)">3</button>
        </div>
        <div class="detail-line">
          <button @click="keyBroad(1,4)">4</button>
          <button @click="keyBroad(1,5)">5</button>
          <button @click="keyBroad(1,6)">6</button>
        </div>
        <div class="detail-line">
          <button @click="keyBroad(1,7)">7</button>
          <button @click="keyBroad(1,8)">8</button>
          <button @click="keyBroad(1,9)">9</button>
        </div>
        <div class="detail-line">
          <button @click="keyBroad(2,null)" style="font-size: 20px;">清零</button>
          <button @click="keyBroad(1,0)">0</button>
          <button @click="keyBroad(3,null)">.</button>
        </div>
      </div>
      <Calendar :show="calendar.show" :type="calendar.items.type" :value="calendar.items.value" :begin="calendar.items.begin" @cancel="dateCancel" @ok="dateOk" :end="calendar.items.end" :sep="calendar.items.sep" :single="calendar.items.single" :rangeValue='calendar.items.rangeValue' :autoclose='calendar.items.autoclose'>
      </Calendar>
    </div>
    <div class="chart" v-show="chartshow && !detailshow">
      <div id="myChart"></div>  
    </div>
    <div class="chart" v-show="chart2show && !detailshow">
      <div id="myChart2"></div>  
    </div>
    <div class="chart" v-show="chart3show && !detailshow">
      <div id="myChart3"></div>  
    </div>
  </div>
</template>

<script>
// import Store from '@/localstorage'
import Calendar from './calendar'
var myChart
var myChart2
var myChart3
var thisMonth = new Date().getMonth() >= 9 ? (new Date().getMonth() + 1).toString() : '0' + (new Date().getMonth() + 1)
var thisDay = new Date().getDate() >= 9 ? (new Date().getDate() + 1).toString() : '0' + (new Date().getDate() + 1)
export default {
  components: {
    Calendar
  },
  data () {
    return {
      totalEraning: 14,
      totalExpense: 20,
      detailshow: false,
      chartshow: false,
      chart2show: false,
      chart3show: true,
      newMoney: '',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['用餐', '服饰', '交通', '娱乐', '工资']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
          }
        ],
        series: [
          {
            name: '用餐',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [-320, -302, -301, -334, -390, -330, -320]
          },
          {
            name: '服饰',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [-120, -132, -101, -134, -90, -230, -210]
          },
          {
            name: '交通',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [-220, -182, -191, -234, -290, -330, -310]
          },
          {
            name: '娱乐',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [-150, -212, -201, -154, -190, -330, -410]
          },
          {
            name: '工资',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      option2: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['工资', '红包', '兼职', '奖金', '投资', '啃老']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              {value: 10, name: '工资'},
              {value: 5, name: '红包'},
              {value: 15, name: '兼职'},
              {value: 25, name: '奖金'},
              {value: 20, name: '投资'},
              {value: 35, name: '啃老'}
            ]
          }
        ]
      },
      option3: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['用餐', '交通', '服饰', '通讯', '娱乐', '学习', '医疗', '数码']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              {value: 10, name: '用餐'},
              {value: 5, name: '交通'},
              {value: 15, name: '服饰'},
              {value: 25, name: '通讯'},
              {value: 20, name: '娱乐'},
              {value: 35, name: '学习'},
              {value: 30, name: '医疗'},
              {value: 40, name: '数码'}
            ]
          }
        ]
      },
      earning: {
        items: {
          classify: 'gz',
          classifyArr: ['gz', 'gb', 'jz', 'jj', 'tz', 'kl']
        }
      },
      calendar: {
        show: false,
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
      }
    }
  },
  mounted () {
    myChart = this.$echarts.init(document.getElementById('myChart'))
    myChart.setOption(this.option)
    myChart2 = this.$echarts.init(document.getElementById('myChart2'))
    myChart2.setOption(this.option2)
    myChart3 = this.$echarts.init(document.getElementById('myChart3'))
    myChart3.setOption(this.option3)
  },
  methods: {
    showDetail () {
      this.detailshow = true
    },
    hideDetail () {
      this.detailshow = false
    },
    showChart () {
      this.chartshow = true
      this.chart2show = false
      this.chart3show = false
    },
    showChart2 () {
      this.chart2show = true
      this.chartshow = false
      this.chart3show = false
    },
    showChart3 () {
      this.chart3show = true
      this.chartshow = false
      this.chart2show = false
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
    keyBroad (tip, value) {
      if (tip === 1) {
        if ((value !== 0 || this.newMoney.length !== 0) && (this.newMoney.indexOf('.') !== this.newMoney.length - 3 || this.newMoney.indexOf('.') === -1) && this.newMoney.length < 7) {
          this.newMoney = this.newMoney + value.toString()
        }
      } else if (tip === 2) {
        this.newMoney = ''
      } else if (tip === 3) {
        if (this.newMoney.indexOf('.') === -1) {
          this.newMoney = this.newMoney + '.'
        }
      }
    },
    open (e, type) {
      // 设置类型
      this.calendar.show = true
    },
    dateCancel (obj) {
      this.calendar.show = obj.show
    },
    dateOk (obj) {
      this.calendar.items.text = obj.values[0]
      this.calendar.items.value = obj.values[0]
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
.row {
  position: relative;
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.rowItem {
  flex: 29%;
  font-size: 1em;
  font-weight: normal;
  color: #fff;
}
.rowItem:hover {
  color: #000;
}
.add-btn {
  flex: 13%;
  width: 50px;
  height: 50px;
  padding: 0;
  margin: 0 auto;
  background: url("../../../static/icon/plus.svg") no-repeat 50% center;
}
.title {
  font-style: normal; 
  text-align: left;
  width: 100px;
  color: #FFF;
  font-size: 28px;
  line-height: 28px;
}
.title span {
  color: #0276b1;
  font-size: 15px;
}
.leftTitle {
  float: left;
  text-align: left;
  margin-left: 5px;
}
.rightTitle {
  float: right;
  text-align: right;
  margin-right: 5px;
}
.chart {
  overflow: hidden;
  position: absolute;
  top: 65px;
  left: 0;
  right: 0;

}
#myChart, #myChart2, #myChart3 {
  width: 320px;
  height: 360px;
  margin:0 auto;
}
.detail {
  position: relative;
  background: #fff;
  width: 100%;
  overflow-x: hidden;
  min-height: 100%;
}
.detail-main {
  height: 100px;
  line-height: 100px;
  width: 100%;
}
.tab {
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.icon {
  margin: 0 10px;
  flex: 10%;
  color: rgba(69, 89, 99, 0.43);
  text-align: left;
  font-family: 'Times New Roman';
  font-size: 40px;
  font-weight: lighter;
}
.tab-expense {
  flex: 40%;
  text-align: right;
  padding-right: 23px;
}
.tab-earning {
  flex: 40%;
  text-align: left;
  padding-left: 23px;
}
.tab-item > a {
  font-size: 1em;
  line-height: 10px;
  color: #455963;
  font-weight: normal;
}
.tab-item > a.router-link-active {
  color: rgb(245, 180, 83);
  font-weight: normal;
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
  width: 100%;
  position: absolute;
  bottom: -0.1px;
  left: 0;
  right: 0;
}
.detail-line{
  width: 100%;
  display: flex;
}
.top-line {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(242, 242, 242, 0.48);
}
.top-line button {
  display: block;
  flex: 33.33%;
  height: 33px;
  padding: 5px;
  color: #455963;
  background-color: rgba(235, 235, 235, 0.48);
  font-weight: lighter;
  outline:none;
  border-style: none;
}
.newMoney {
  font-size: 20px;
  text-align: right;
  font-weight: normal;  
}
.detail-line button {
  display: block;
  flex: 33.33%;
  font-size: 26px;
  padding: 5px;
  color: #455963;
  background-color: rgba(235, 235, 235, 0.48);
  font-weight: lighter;
  outline:none;
  border:0.1px solid #fff;
}
.detail-line button:hover {
  background-color: rgba(235, 235, 235, 1);
}
.calendarBtn{
  font-size: 1em;
  background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==);
  background-repeat: no-repeat;
  background-position: 18px center;
}
</style>
