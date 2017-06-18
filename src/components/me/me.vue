<template>
  <div class="container">
    <div class="picture">
      <img src="../../../static/avatar.jpg">
    </div> 
    <h1>{{name}}</h1>
    <h2>{{education}}&nbsp;&nbsp;&nbsp;&nbsp;{{career}}</h2>
    <div class="tab">
      <a class="tabItem github" href="https://github.com/smartdoublexiao" target="_blank"></a>
      <a class="tabItem blog" href="http://xxwu.tech" target="_blank"></a>
      <a class="tabItem weibo" href="http://weibo.com/wuxiaoxiao2011to2015" target="_blank"></a>
      <a class="tabItem zhihu" href="https://www.zhihu.com/people/wuxiaoxiaojs" target="_blank"></a>
      <a class="tabItem email" href="mailto:wuxiaoxiaojs@hotmail.com" target="_blank"></a>
    </div>
    <div class="footer">
      <span>&copy;&nbsp;2017 {{name}}. &nbsp;All Rights Reserved.</span>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      name: 'WuXiaoxiao',
      education: 'BUPT',
      career: 'FE'
    }
  }
}
</script>

Add "scoped" attribute to limit CSS to this component only
<style scoped>
.container {
  color: black;
  width: 100%; 
  height: 100%;
  background-color: #fff;
}
.picture img{
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin: 20% auto 20px auto;
}
h1 {
  color: rgba(49, 78, 95, .95);
  font-size: 2em;
}
h2 {
  color: rgba(49, 78, 95, .95);
  font-size: 1.5em;
}
.tab {
  display: flex;
  width: 100%;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 80px;
}
.tabItem {
  flex: 1;
  width: 50px;
  height: 50px;
  margin: 10px auto;
}
.github {
  background: url("../../../static/icon/github.svg")no-repeat center center; 
}
.blog {
  background: url("../../../static/icon/blog.svg")no-repeat center center; 
}
.weibo {
  background: url("../../../static/icon/weibo.svg")no-repeat center center; 
}
.zhihu {
  background: url("../../../static/icon/zhihu.svg")no-repeat center center; 
}
.email {
  background: url("../../../static/icon/email.svg")no-repeat center center; 
}
.github:hover {
  background: url("../../../static/icon/github-a.svg")no-repeat center center; 
}
.blog:hover {
  background: url("../../../static/icon/blog-a.svg")no-repeat center center; 
}
.weibo:hover {
  background: url("../../../static/icon/weibo-a.svg")no-repeat center center; 
}
.zhihu:hover {
  background: url("../../../static/icon/zhihu-a.svg")no-repeat center center; 
}
.email:hover {
  background: url("../../../static/icon/email-a.svg")no-repeat center center; 
}
.footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
}
</style>

