<template>
  <div class="container">
    <div class="svg-line">
      <div class="btn">
        <div class="svgbtn gz"></div>
        <span>工资</span>
      </div>
      <div class="btn">
        <div class="svgbtn hb"></div>
        <span>红包</span>
      </div>
      <div class="btn">
        <div class="svgbtn jz"></div>
        <span>兼职</span>
      </div>
      <div class="btn">
        <div class="svgbtn jj"></div>
        <span>奖金</span>
      </div>
    </div>
    <div class="svg-line">
      <div class="btn">
        <div class="svgbtn tz"></div>
        <span>投资</span>
      </div>
      <div class="btn">
        <div class="svgbtn kl"></div>
        <span>啃老</span>
      </div>
      <div class="btn">
      </div>
      <div class="btn">
      </div>
    </div>
  </div>
</template>


<script>
export default {
  // props () {
  //   classify: {
  //     type: String,
  //     default: 'gz'
  //   },
  //   classifyArr: {
  //     type: Array,
  //     default: function () {
  //       return ['gz', 'gb', 'jz', 'jj', 'tz', 'kl']
  //     }
  //   },
  // },
  data () {
    return {
      msg: 'expense'
    }
  }
}
</script>

<style scoped>
.container {
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
  width: 20%;
  margin: 0 auto;
}
.svgbtn {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 0;
  margin: 0 auto;
}
.gz{
  background: url("../../../static/icon/gz.svg") no-repeat center center;
}
.hb{
  background: url("../../../static/icon/hb.svg") no-repeat center center;
}
.jz{
  background: url("../../../static/icon/jz.svg") no-repeat center center;
}
.jj{
  background: url("../../../static/icon/jj.svg") no-repeat center center;
}
.tz{
  background: url("../../../static/icon/tz.svg") no-repeat center center;
}
.kl{
  background: url("../../../static/icon/kl.svg") no-repeat center center;
}
</style>
