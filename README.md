# notebook

A nootbook SPA by Vue, you can use it to build a todo list, record your weight and record your expenses and earnings, you can also manage project with it.

Have a try:  [http://xxwu.tech/notebook/](http://xxwu.tech/notebook/#/)

![](https://github.com/SmartDoubleXiao/notebook/blob/master/static/img/VueNotebook.jpg)

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

- 天气模块
  - 获取经纬度和城市
  - 重构天气模块
  - 增加更多选项！

- TODO 模块
  - 左边栏和右内容版块
  - vuex状态管理
  - 添加删除和编辑功能
  - 样式重构
  - 在安卓下布局没有处理好

- 体重模块
  - 输入数据的范围要有限制
  - 输入数字键盘和日期都要组件化复用
  - 添加隐私保护的手势锁

- 开支模块
  - 基本功能还没实现
  - echart样式优化
  - 数据存储

- me模块
  - 换种获取dom引用的方式

- 项目公用函数提取封装
- 公用组件的封装


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

  - 将新增的数组数据push到总数组时，希望此时对总数组进行一次排序，这样在`echarts`中显示的折线图才是时序正确的，我尝试过写一个针对数组子元素对象的第一个属性进行快速排序的算法，但是排序后再setOption echarts 时，发现出现了一些bug, 我猜测应该是异步的问题。最后我发现只要在重新渲染echart的时候sort一下就可以了。。。

  ```

  myChart.setOption({
    series: [{
      data: this.weight.sort()
    }]
  })
  ```

  - 对echarts 的各个参数的设置，这个需要查看官方的[配置文档](http://echarts.baidu.com/option.html#series-line.markPoint.label.normal.textStyle.color) , echarts还是很强大的，只要你用得好。

- 开支模块
  - vue router 嵌套路由，只需要去router的index文件中定义好children就可以了，但是以为一个页面嵌套了多层路由，所以需要使用vuex来管理状态，后续会学习并增加。
  - props单向数据流问题，因为单向数据流所以子组件无法更改父组件传入的值，但是看到网上很多人说有许多方法课实现双向绑定，我试了一下，没有成功。