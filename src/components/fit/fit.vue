<template>
  <div class="container">
    <div class="row">
      <h1 id="todo-header"> {{msg}} </h1>
    </div>
    <div class="chart">
        <div id="myChart" style="width: 100%; height:400px;"></div>
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
      option: {
        title: {
          text: '未来一周气温变化',
          subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['最高气温']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
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
      },
      media: [
        {
          option: {
            legend: {
              right: 'center',
              bottom: 0,
              orient: 'horizontal'
            },
            series: [
              {
                radius: [20, '50%'],
                center: ['25%', '50%']
              },
              {
                radius: [30, '50%'],
                center: ['75%', '50%']
              }
            ]
          }
        },
        {
          query: {
            minAspectRatio: 1
          },
          option: {
            legend: {
              right: 'center',
              bottom: 0,
              orient: 'horizontal'
            },
            series: [
              {
                radius: [20, '50%'],
                center: ['25%', '50%']
              },
              {
                radius: [30, '50%'],
                center: ['75%', '50%']
              }
            ]
          }
        },
        {
          query: {
            maxAspectRatio: 1
          },
          option: {
            legend: {
              right: 'center',
              bottom: 0,
              orient: 'horizontal'
            },
            series: [
              {
                radius: [20, '50%'],
                center: ['50%', '30%']
              },
              {
                radius: [30, '50%'],
                center: ['50%', '70%']
              }
            ]
          }
        },
        {
          query: {
            maxWidth: 500
          },
          option: {
            legend: {
              right: 10,
              top: '15%',
              orient: 'vertical'
            },
            series: [
              {
                radius: [20, '50%'],
                center: ['50%', '30%']
              },
              {
                radius: [30, '50%'],
                center: ['50%', '75%']
              }
            ]
          }
        }
      ]
    }
  },
  mounted () {
    let myChart = this.$echarts.init(document.getElementById('myChart'))
    myChart.setOption(this.option)
  }
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  color: black;
  width: 100%; 
}
#todo-header {
  font-size: 3em;
  color: rgba(255,255,255, 1);
  padding-top: 3px;
  font-weight: 100;
}
.chart {
  overflow-x: hidden;
}
</style>
