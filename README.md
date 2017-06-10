# notebook

> notebook app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 待解决的问题

- 天气API vue 跨域 jsonp 
  - 已解决
  - 要注意的地方：
    - 回调函数中this指向问题，返回数据时要更改
    - 跨域的方式
- TODO 模块的左边栏和右内容版块
  - vuex状态管理
- 微博登录