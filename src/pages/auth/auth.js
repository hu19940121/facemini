import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import { urlEncode } from '../../utils/util'
import http  from '../../service/http'
import './index.scss'
import kobe from './images/kobe.png'

@inject('userStore')
@observer
class Auth extends Component {
  config = {
    navigationBarTitleText: '授权',
  }
  componentDidMount () {

  }
  //获取授权上一个页面
  getPrevPage(){
    let pages = Taro.getCurrentPages()
    let filterdPages =  pages.filter(page=>{
      return page.route !== "pages/auth/auth"
    })
    if (filterdPages.length > 0 ) { 
      const paramsStr = urlEncode(filterdPages[0].options).slice(1) // 构建页面所需参数
      let prevUrl =   `/${filterdPages[0].route}?${paramsStr}`
      return prevUrl
    }
    return ''
  }
  getUserInfo = () => {
    const { userStore } = this.props
    userStore.getUserInfo().then(()=>{
      let prevPage = this.getPrevPage()      
      if (prevPage) {
        Taro.reLaunch({
          url:prevPage
        })
      } 
    })
  }
  onGetUserInfo = (userInfo) => {
    if (userInfo.detail.userInfo) {//同意
      Taro.login().then(res=>{
        let params = {
          code: res.code,
          signature:userInfo.currentTarget.signature,
          encryptedData: userInfo.currentTarget.encryptedData,
          iv:userInfo.currentTarget.iv,
        }
        http.post('api/v1/xcxLogin',params).then(result=>{
          Taro.setStorageSync('sessionkey', result.data)
          this.getUserInfo()
        })
      })
    }
  }

  render () {
    return (
      <View className='auth'>
        <Image src={kobe}  mode='aspectFit' />
        <AtButton className='logo-btn' openType='getUserInfo' onGetUserInfo={this.onGetUserInfo}>确认授权</AtButton>
      </View>
    )
  }
}

export default Auth 
