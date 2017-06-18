<template>
  <div class="container">
    <div class="row">
      <h1 id="todo-header"> {{msg}} </h1>
    </div>      
  </div>
</template>


<script>
export default {
  data () {
    return {
      msg: 'me'
    }
  }
}
</script>

Add "scoped" attribute to limit CSS to this component only
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

</style>

