export default {
  getAsyncScript (url) {
    return new Promise(function (resolve, reject) {
      var jsonp = document.createElement('script')
      jsonp.type = 'text/javascript'
      jsonp.src = url
      var asyncScript = document.getElementsByTagName('body')[0].appendChild(jsonp)
      asyncScript.onload = function () {
        resolve()
      }
    })
  },
  getJSON (url) {
    var promise = new Promise(function (resolve, reject) {
      var client = new XMLHttpRequest()
      client.open('GET', url)
      client.onreadystatechange = handler
      client.responseType = 'json'
      client.setRequestHeader('Accept', 'application/json')
      client.send()
      function handler () {
        if (this.readyState !== 4) {
          return
        }
        if (this.status === 200) {
          resolve(this.response)
        } else {
          reject(new Error(this.statusText))
        }
      }
    })
    return promise
  }
}
