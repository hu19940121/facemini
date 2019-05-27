import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { onGetUserInfo } from '../../actions/user'

import { urlEncode } from '../../utils/util'
import http  from '../../service/http'
import './index.scss'
import kobe from './images/kobe.png'

@connect(({ user }) => ({
  user,
}), (dispatch) => ({
  onGetUserInfo (callback) {
    dispatch(onGetUserInfo(callback))
  }
}))
class Auth extends Component {
  config = {
    navigationBarTitleText: '授权',
  }
  componentDidMount () {
    let pages = Taro.getCurrentPages()
    console.log('pages',pages);
    
  }
  //获取授权上一个页面
  getPrevPage(){
    let pages = Taro.getCurrentPages()
    let filterdPages =  pages.filter(page=>{
      return page.route !== "pages/auth/auth"
    })
    if (filterdPages.length > 0 ) { 
      const paramsStr = urlEncode(filterdPages[filterdPages.length - 1].options).slice(1) // 构建页面所需参数
      let prevUrl =   `/${filterdPages[filterdPages.length - 1].route}?${paramsStr}`
      return prevUrl
    }
    return ''
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
          this.props.onGetUserInfo(()=>{
            let prevPage = this.getPrevPage()                            
            if (prevPage) {
              Taro.reLaunch({
                url:prevPage
              })
            } 
          })
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
