<template>
  <div class="contain">
    <div class="svg-line">
      <div class="btn">
        <div class="svgbtn food"></div>
        <span>用餐</span>
      </div>
      <div class="btn">
        <div class="svgbtn tran"></div>
        <span>交通</span>
      </div>
      <div class="btn">
        <div class="svgbtn clot"></div>
        <span>服饰</span>
      </div>
      <div class="btn">
        <div class="svgbtn comu"></div>
        <span>通讯</span>
      </div>
    </div>
    <div class="svg-line">
      <div class="btn">
        <div class="svgbtn enta"></div>
        <span>娱乐</span>
      </div>
      <div class="btn">
        <div class="svgbtn study"></div>
        <span>学习</span>
      </div>
      <div class="btn">
        <div class="svgbtn hosp"></div>
        <span>医疗</span>
      </div>
      <div class="btn">
        <div class="svgbtn tech"></div>
        <span>数码</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      msg: 'expense'
    }
  }
}
</script>

<style scoped>
.contain {
  background-color: white;
  color: #455963;
  font-size: .9em;
  width: 100%; 
}
.svg-line{
  width: 100%;
  display: flex;
  padding-top: 10px;
}
.btn {
  flex: 20%;
  margin: 0 auto;
}
.svgbtn {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 0;
  margin: 0 auto;
}
.food{
  background: url("../../../static/icon/food.svg") no-repeat center center;
}
.tran{
  background: url("../../../static/icon/tran.svg") no-repeat center center;
}
.clot{
  background: url("../../../static/icon/clot.svg") no-repeat center center;
}
.comu{
  background: url("../../../static/icon/comu.svg") no-repeat center center;
}
.enta{
  background: url("../../../static/icon/enta.svg") no-repeat center center;
}
.study{
  background: url("../../../static/icon/study.svg") no-repeat center center;
}
.hosp{
  background: url("../../../static/icon/hosp.svg") no-repeat center center;
}
.tech{
  background: url("../../../static/icon/tech.svg") no-repeat center center;
}
</style>
