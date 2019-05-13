import Taro from '@tarojs/taro'
// import { AtToast } from "taro-ui"
// const sessionkey = ''
const base = "http://192.168.1.106:8080/";
// const base = "http://192.168.1.101:8080/";
// const base = "https://www.kaier001.com/";
//拦截器配置
const interceptor = function (chain) {
  const requestParams = chain.requestParams  
  // eslint-disable-next-line no-undef
  requestParams.isLoading && wx.showLoading({
    title: '加载中...',
  })
  // const { method, data, url } = requestParams
  // console.log(`http ${method || 'GET'} --> ${url} data: `, data)
  return chain.proceed(requestParams).then(res => {
      // eslint-disable-next-line no-undef
      wx.hideLoading()
      if (res.data.code === 2) {
        Taro.removeStorageSync('sessionkey')
        Taro.removeStorageSync('userInfo')
        // eslint-disable-next-line no-undef
        Taro.navigateTo({
          url: '/pages/auth/auth'
        })
        return
      }
      if (res.data.code !== 0) {
        // eslint-disable-next-line no-undef
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (res.data.code === 0) {        
       // console.log(`http <-- ${url} result:`, res)
        return res.data
      }
    })
}
Taro.addInterceptor(interceptor)
export default {
  baseOptions(params, method = 'GET') {
    let { url, data ,isLoading} = params
    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    const sessionkey = Taro.getStorageSync('sessionkey')
    console.log('sessionkey',sessionkey);
    
    const option = {
      isLoading, //是否显示loading状态
      url: base + url,
      data: data,
      method: method,
      header: { 'content-type': contentType, 'sessionkey': sessionkey }
    }
    return Taro.request(option)
  },
  get(url, data = '',isLoading = true) {
    let option = { url, data,isLoading }
    return this.baseOptions(option)
  },
  post(url, data,isLoading = true,contentType) {
    let params = { url, data,isLoading, contentType }
    return this.baseOptions(params, 'POST')
  }
}