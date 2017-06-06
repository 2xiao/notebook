var _f = new Date().getHours() > 17 ? arr[2].slice(3) + '_0.png' : arr[2].slice(3) + '_1.png'
var img = '<img width="16px" height="16px" src="http://i2.sinaimg.cn/dy/main/weather/weatherplugin/wthIco/20_20/' + _f + '" />'
var tq = '今日天气 :　' + arr[0].slice(3) + ' ' + img + ' ' + arr[0].slice(3) + ' ' + arr[4].slice(3) + '℃～' + arr[5].slice(3) + '℃ ' + arr[8].slice(3) + arr[6].slice(3) + '级'
console.log(arr)
console.log(tq)

        response = response.split(';')[1]
        let cutIndex = response.indexOf('=') + 3
        response = response.slice(cutIndex, response.length - 2)
        let arr = response.split(',')
        let res = '{ "weather" : [' + ''
        console.log(res)
        var _f = new Date().getHours() > 17 ? arr[2].slice(3) + '_0.png' : arr[2].slice(3) + '_1.png'
        var img = '<img width="16px" height="16px" src="http://i2.sinaimg.cn/dy/main/weather/weatherplugin/wthIco/20_20/' + _f + '" />'
        var tq = '今日天气 :　' + arr[0].slice(3) + ' ' + img + ' ' + arr[0].slice(3) + ' ' + arr[4].slice(3) + '℃～' + arr[5].slice(3) + '℃ ' + arr[8].slice(3) + arr[6].slice(3) + '级'
        console.log(arr)
        console.log(tq)