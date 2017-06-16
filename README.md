# notebook

A nootbook SPA by Vue, you can use it to build a todo list, record your weight and record your expenses and earnings, you can also manage project with it.

Have a try:  [http://xxwu.tech/notebook/](http://xxwu.tech/notebook/#/)

![](https://github.com/SmartDoubleXiao/notebook/blob/master/static/VueNotebook.jpg)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8000
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### 待解决的问题

- TODO 模块的左边栏和右内容版块
  - vuex状态管理
- 开支模块
- pro模块
- 微博登录

### 已解决的问题

- 天气API 

  - vue 跨域时数据接口返回的数据格式无法处理
  - 已解决，找了另一个天气API，使用jsonp取到天气数据
  - 要注意的地方：
    - 回调函数中this指向问题，返回数据时要更改
    - 跨域的方式
    - [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 只能在开发环境实现跨域，打包后就不可以了
    - axios是不错的选择

- 体重模块

  - calendar 实现日期选择，返回的日期的格式需要再处理一下，比如（YYYY-MM-DD）的日期和`getMonth()`得到的日期就存在1月~9月前有没有`0`的差别，这导致了在比较日期大小时无法正确排序

  - 将新增的数组数据push到总数组时，希望此时对总数组进行一次排序，这样在`echart`中显示的折线图才是时序正确的，我尝试过写一个针对数组子元素对象的第一个属性进行快速排序的算法，但是排序后再setOption echart 时，发现出现了一些bug, 我猜测应该是异步的问题。最后我发现只要在重新渲染echart的时候sort一下就可以了。。。

```
myChart.setOption({
	series: [{
		data: this.weight.sort()
	}]
})
```

  - 对echart 的各个参数的设置，这个需要查看官方的[配置文档](http://echarts.baidu.com/option.html#series-line.markPoint.label.normal.textStyle.color) , echart还是很强大的，只要你用得好。