import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import { observer, inject } from '@tarojs/mobx'
// import qiniuUploader from '../../utils/qiniuUploader'
// import http  from '../../service/http'
// import './index.scss'

// @inject('counterStore','commonStore','imageStore')
@observer
class Personal extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  config = {
    navigationBarTitleText: '个人中心',
  }
  componentDidMount () { 
  }
  onGetUserInfo = (userInfo) => {
    console.log('userInfo',userInfo);
    if (userInfo.detail.userInfo) {//同意
      Taro.login().then(res=>{
        console.log('res',res);
      })
    }
  }
  render () {
    return (
      <View className='personal'>
        <AtButton  type='primary' openType='getUserInfo' onGetUserInfo={this.onGetUserInfo}>获取用户信息</AtButton>
      </View>
    )
  }
}

export default Personal 
