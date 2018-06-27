import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
//传给服务端是个地址，这个url是带参数的，先把url拼好。通过data把url拼好。optioon是个参数，可以查那个git看用法
  return new Promise((resolve, reject) => {
  //resolve代表这个参数成功，reject则代表失败了。
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
