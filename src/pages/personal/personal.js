import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { AtButton, AtListItem } from 'taro-ui'
// import { observer, inject } from '@tarojs/mobx'
// import qiniuUploader from '../../utils/qiniuUploader'
// import http  from '../../service/http'
import './personal.scss'
import Collect from '../components/collect'

// @inject('userStore')
// @observer
class Personal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      defaultAvatar:'http://steam.kaier001.com/defaultTX.png',
      userInfo:{}
    }
  }
  config = {
    navigationBarTitleText: '个人中心',
  }
  componentDidMount () {

  }
  componentDidShow() {
    this.setState({
      userInfo: Taro.getStorageSync('userInfo') 
    }) 
  }
  linkTofaceRecord = () =>{
    Taro.navigateTo({
      url: '/pages/faceRecord/faceRecord'
    })
  }
  linkToMyClock = () =>{
    Taro.navigateTo({
      url: '/pages/myClock/myClock'
    })
  }
  // hh = ()=>{
  //   Taro.showToast({
  //     title: '莫慌，正在开发中~~',
  //     icon: 'none',
  //     duration: 2000
  //   })
  // }
  //跳到授权页面
  linkToAuth = ()=>{
    Taro.navigateTo({
      url: '/pages/auth/auth'
    })
  }
  render () {
    const { defaultAvatar,userInfo } = this.state  
    let left
    if (userInfo) {
      left = (
        <View className='left'>
          <View className='nickName'>{userInfo.nickName}</View>
          <Text className='sign'>梦如南笙囚我终生。</Text>
        </View>
      )
    } else {
      left = (
        <View className='left' onClick={this.linkToAuth}>
          <View >请登录</View>
          <AtButton className='logo-btn' type='secondary' size='small'>点击登录，享受更多精彩信息</AtButton>
        </View>
      )
    }
    return (
      <View className='personal'>
        <View className='banner'>
          <View className='left'>
            {left}
          </View>
          <View className='right'>
            <Image src={userInfo ? userInfo.avatarUrl : defaultAvatar}></Image>
          </View>

        </View>
        <View className='main'>
          <Collect  onClick={this.linkTofaceRecord}>
            <AtListItem title='我的记录（未发布广场）' arrow='right' />
          </Collect>
          <Collect onClick={this.linkToMyClock}>
            <AtListItem  title='我的记录（已发布广场）' arrow='right' />
          </Collect>
        </View>
      </View>
    )
  }
}

export default Personal 
