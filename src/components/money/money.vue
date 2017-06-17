<template>
  <div class="container">
    <Charge :detailshow="detailshow"></Charge>
    <div v-show="!detailshow" class="chart">
        <div id="myChart"></div>
        <div id="myChart2"></div>
    </div>
    <div v-show="!detailshow" class="row">
      <div class="title leftTitle"><span>当月收入</span><br>{{totalEraning}}.00</div>
      <div @click="showDetail" class="add-btn">
        <i>+</i>
      </div>
      <div class="title rightTitle"><span>当月支出</span><br>{{totalExpense}}.00</div>       
    </div>
  </div>
</template>

<script>
// import Store from '@/localstorage'
import Charge from './charge'
var myChart
var myChart2
export default {
  components: {
    Charge
  },
  data () {
    return {
      totalEraning: 14,
      totalExpense: 20,
      detailshow: false,
      detailclose: false,
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
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
            name: '搜索引擎',
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
        title: {
          text: '南丁格尔玫瑰图',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
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
              {value: 10, name: 'rose1'},
              {value: 5, name: 'rose2'},
              {value: 15, name: 'rose3'},
              {value: 25, name: 'rose4'},
              {value: 20, name: 'rose5'},
              {value: 35, name: 'rose6'},
              {value: 30, name: 'rose7'},
              {value: 40, name: 'rose8'}
            ]
          }
        ]
      }
    }
  },
  mounted () {
    myChart = this.$echarts.init(document.getElementById('myChart'))
    myChart.setOption(this.option)
    myChart2 = this.$echarts.init(document.getElementById('myChart2'))
    myChart2.setOption(this.option2)
  },
  methods: {
    showDetail () {
      this.detailshow = true
      console.log('show detail')
    },
    onResultChange (val) {
      this.detailshow = val
      console.log('onResultChange')
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
  float: left;
  position: absolute;
  top: 10px;
  left: 45%;
  right: 45%;
  font-style: normal; 
  width:50px;
  height:50px;
  color:rgba(0, 111, 111, 0.5);
  background: rgba(255,255,255, 0.6);
  text-align: center;
  font-family: 'Times New Roman';
  line-height:50px; 
  font-size: 4em;
  font-weight: bolder;
  border-radius: 25px 25px;
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
  width: 102%;
  height: 85%;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  top: 15%;
  left: 0;
  right: 0;
}
#myChart, #myChart2 {
  width: 90%;
  height: 97%;
  padding-bottom: 10px;
  margin:0 auto;
}
</style>
