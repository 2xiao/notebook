<template>
  <div class="container">
    <div class="svg-line">
      <div class="btn">
        <div class="svgbtn"></div>
      </div>
      <div class="btn">
        <div class="svgbtn"></div>
      </div>
      <div class="btn">
        <div class="svgbtn"></div>
      </div>
      <div class="btn">
        <div class="svgbtn"></div>
      </div>
      <div class="btn">
        <div class="svgbtn"></div>
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
.container {
  color: black;
  width: 100%; 
}
.svg-line{
  width: 100%;
  display: flex;
/*  height: 50%;
*/}
.btn {
  flex: 20%;
  margin: 0 auto;
}
.svgbtn {
  width: 50px;
  height: 50px;
  border:1px solid #000;
  border-radius: 25px;
  background: url("tea.svg") no-repeat center center;
  padding: 0;
  margin: 0 auto;
}
</style>
