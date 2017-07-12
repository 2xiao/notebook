<template>  
  <div class="container">
    <v-header></v-header>
    <div class="input">
      <input autofocus type="text" @keydown.enter.prevent="handleSubmit"
      id="todo-input" placeholder="What to do today ?"
      v-model="value">
      <div v-if="value.length > 0" @click="handleSubmit" class="add-btn">
        <i>+</i>
      </div>
    </div>
    <div id="todos-list">
      <ul>
        <li v-for="todo in todos" v-bind:key="todo" class="todo">
        <!-- container for the completed button -->
          <div :class="['check-circle', {'check-circle-active': todo.done}]" @click="handleDone(todo)">
          <div class="circle">
            <div :class="['checkmark', {'checkmark-active': todo.done}]">&#10003;</div>
          </div>            
          <div :class="['text', {'text-done': todo.done}]">
            {{todo.value}}
          </div>                
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import header from 'components/todo/header/header'
import Store from '@/localstorage'
import Po from '@/proif'

export default {
  data () {
    return {
      value: '',
      todos: Store.fetch('notebook-todo') || []
    }
  },

  components: {
    'v-header': header
  },

  watch: {
    todos: {
      handler: function (todos) {
        Store.save('notebook-todo', todos)
      },
      deep: true
    }
  },

  methods: {
    handleSubmit () {
      this.todos.unshift({
        done: false,
        value: this.value.trim()
      })
      Po.proif.if1(this.todos.length > 1, console.log('TODO条数大于1'))
      // if (this.todos.length > 15) {
      //   this.todos.pop()
      // }
      this.value = ''
    },
    handleDone (todo) {
      todo.done = !todo.done
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  color: black;
  width: 100%;
  overflow: hidden;
  position:absolute;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, #6ca6c3 0%,#b5e2ec 100%);
}
#todo-header {
  font-size: 3em;
  color: rgba(255,255,255, 1);
  padding-top: 3px;
  font-weight: 100;
}
.input{
  display: flex;
}
#todo-input {
  width: 75%;
  margin:0px 15px 20px 10%;
  outline:none;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(255,255,255, 0.6);
  height: 40px;
  color: white;
  text-align: center;
  font-size: 1.5em;
  font-family: 'aileronthin';
}
#todo-input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: rgba(255,255,255, 0.4);
}
#todo-input::-moz-placeholder { /* Firefox 19+ */
  color: rgba(255,255,255, 0.4);
}
#todo-input:-ms-input-placeholder { /* IE 10+ */
  color: rgba(255,255,255, 0.4);
}
#todo-input:-moz-placeholder { /* Firefox 18- */
  color: rgba(255,255,255, 0.4);
}
.add-btn {
  margin-top: 25px;
  font-style: normal; 
  width: 25px;
  height: 25px;
  color:rgba(0, 111, 111, 0.5);
  background: rgba(255,255,255, 0.6);
  text-align: center;
  font-family: 'Times New Roman';
  line-height: 25px; 
  font-size: 2em;
  font-weight: bolder;
  border-radius: 15px 15px;
}

#todos-list ul {
  display: block;
  list-style-type: none;
  padding: 0px;
}
#todo-item {
  padding: 24px 24px 24px 75px;
  background: white;
  border-radius: 3px;
  font-family: 'aileronthin';
  font-size: 1.5em;
  margin: 12px 0px;
}
.todo {
  /*margin-top: 24px;*/
  padding: 0, 24px;
  border-radius: 3px;
  font-family: 'aileronthin';
  font-size: 1.3em;
  margin: 12px 10px 0 10px;
  border-radius: 20px 20px 20px 20px;
  word-wrap: break-word;
  width: 100%;
}
.check-circle {
  display: flex;
}
.circle{
  padding-left:10%;
  margin: 0 auot;
  width: 20%;
}
.checkmark {
  border: 1px solid rgba(255 ,255 ,255, 0.4);
  width: 30px;
  height: 30px;
  border-radius: 20px 20px 20px 20px;
  font-size: 0.9em;
  color: rgba(0,0,0,0);
}

.checkmark-active {
  border-color: #0276b1;
  color: #0276b1;
}
.text {
  width: 70%;
  text-align: left;
  color: white;
}
.text-done {
  color: #0276b1;
  text-decoration: line-through;
}
</style>
