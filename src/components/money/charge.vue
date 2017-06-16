<template>
	<div v-show="detailShow" class="detail" transition="fade">
    <div class="detail-main">
      <input class="calendarBtn" readonly="readonly" size="11" type="text" v-model="calendar.items.text" @click.stop="open($event)" placeholder="请选择日期…" />
      <Calendar :show="calendar.show" :type="calendar.items.type" :value="calendar.items.value" :x="calendar.x" :y="calendar.y"
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
</template>
<script>
import Calendar from './calendar'
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
      msg: 'fit',
      chart: null,
      detailShow: false,
      newWeight: '',
      inputValue: 0,
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
      }
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
    addWeight () {
      this.inputValue = parseFloat(this.newWeight)
      console.log(typeof this.calendar.items.value, this.calendar.items.value)
      if (isNaN(this.inputValue)) {
        this.detailShow = false
        this.newWeight = ''
      } else {
        this.weight.push([this.calendar.items.value, this.inputValue])
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
  }
}
</script>
<style scoped>
</style>
