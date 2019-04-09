import Taro from '@tarojs/taro'

const token = ''
// const base = "http://192.168.1.104:8080/";
const base = "https://www.kaier001.com/";
//拦截器配置
const interceptor = function (chain) {
  const requestParams = chain.requestParams
  // const { method, data, url } = requestParams
  // console.log(`http ${method || 'GET'} --> ${url} data: `, data)
  return chain.proceed(requestParams)
    .then(res => {
      if (res.data.code === 0) {
        // console.log(`http <-- ${url} result:`, res)
        return res.data
      }
    })
}
Taro.addInterceptor(interceptor)
export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    const option = {
      // isShowLoading: false,
      // loadingText: '正在加载',
      url: base + url,
      data: data,
      method: method,
      header: { 'content-type': contentType, 'token': token }
    }
    return Taro.request(option)
  },
  get(url, data = '') {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post(url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  }
}