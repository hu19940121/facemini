// 把对象转换为url参数 eg {name:'xxx',age:13} 转换为 name=xxx&age=13
function urlEncode (param, key, encode) {
  console.log('进入')
  if (param == null) return ''
  var paramStr = ''
  var t = typeof (param)
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}

export default urlEncode