<template>
  <div class="container">
    <div class="row">
      <div @click="showDetail" class="add-btn">
        <i>+</i>
      </div>
    </div>
    <div class="chart">
        <div id="myChart" style="width: 100%; height:400px;"></div>
    </div>
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-main">
        <div class="name">记录体重：&nbsp;&nbsp;{{newWeight}} &nbsp;&nbsp;斤</div>
        <i class="detail-add" @click="hideDetail">+</i>
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
          <button @click="demo(2,null)"><</button>
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
export default {
  data () {
    return {
      msg: 'fit',
        // 初始化空对象
      chart: null,
      detailShow: false,
      newWeight: '',
      inputValue: 0,
      option: {
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          show: false,
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: [
          {
            name: '最高气温',
            type: 'line',
            data: [11, 11, 15, 13, 12, 13, 10],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      }
    }
  },
  mounted () {
    let myChart = this.$echarts.init(document.getElementById('myChart'))
    myChart.setOption(this.option)
  },
  watch: {
    newWeight: {
      handler: function (newWeight) {
      },
      deep: true
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
      this.newWeight = ''
    },
    demo (tip, value) {
      if (tip === 1) {
        if ((value !== 0 || this.newWeight.length !== 0) && this.newWeight.indexOf('.') !== this.newWeight.length - 4) {
          this.newWeight = this.newWeight + value.toString()
        }
      } else if (tip === 2) {
        this.newWeight = this.newWeight.slice(0, this.newWeight.length - 1)
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
  margin: 20px 15px 0 0;
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
.chart {
  overflow-x: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.detail {
  position: relative;
  color: #fff;
  background: rgba(7, 17, 27, 0.6);
  width: 100%;
  min-height: 6000px;
}
.detail-main {
  height: 100px;
  line-height: 100px;
  width: 100%;
}
.name {
  float: left;
  width: 80%;
  font-size: 20px;
  text-align: center;
}
.detail-add {
  position: absolute;
  top: 20px;
  right: 15px;
  font-style: normal; 
  width: 40px;
  height: 40px;
  color:rgba(7, 17, 27, 0.5);
  background: rgba(255,255,255, 0.8);
  font-family: 'Times New Roman';
  line-height: 40px; 
  font-size: 3em;
  font-weight: bolder;
  border-radius: 20px 20px;
}
.detail-input {
  width: 100%;
  height: 50%;
}
.detail-line{
  width: 100%;
  display: flex;
  justify-content: center;
}
button {
  float: left;
  display: block;
  flex: 33%;
  font-size: 26px;
  padding-top: 10px;
  color: rgba(255,255,255, 0.7);
}
button:hover {
  color: rgba(255,255,255, 1);
}
.detail-close {
  clear: both;
  font-size: 32px;
}
.icon-close {
  margin: 0 auto;
  margin-top: 20%;
  margin-left: 45%;
  float: left;
  font-style: normal; 
  width: 40px;
  height: 40px;
  color:rgba(7, 17, 27, 0.5);
  background: rgba(255,255,255, 0.8);
  text-align: center;
  font-family: 'Times New Roman';
  line-height: 40px; 
  font-size: 1.5em;
  font-weight: bolder;
  border-radius: 20px 20px;
}
</style>
