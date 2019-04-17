import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { AtButton, AtListItem } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
// import qiniuUploader from '../../utils/qiniuUploader'
import http  from '../../service/http'
import './personal.scss'
import Collect from '../collect'

@inject('userStore')
@observer
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
  hh = ()=>{
    Taro.showToast({
      title: '莫慌，正在开发中~~',
      icon: 'none',
      duration: 2000
    })
  }
  getUserInfo = () => {
    const { userStore } = this.props
    userStore.getUserInfo().then(()=>{
      console.log('Taro.getStorageSync()',Taro.getStorageSync('userInfo'))
      this.setState({
        userInfo:Taro.getStorageSync('userInfo')
      })
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
    const { defaultAvatar,userInfo } = this.state  
    // const {userStore:{ userInfo }  } =  this.props
    let left
    if (userInfo) {
      left = (
        <View className='left'>
          <View className='nickName'>{userInfo.nickName}</View>
          <Text className='sign'>梦如南笙求我终生。</Text>
        </View>
      )
    } else {
      left = (
        <View className='left'>
          <View >请登录</View>
          <AtButton className='logo-btn' type='secondary' size='small' openType='getUserInfo' onGetUserInfo={this.onGetUserInfo}>点击登录，享受更多精彩信息</AtButton>
        </View>
      )
    }
    return (
      <View className='personal'>
        
        {/* <AtButton lang='zh_CN' type='primary' openType='getUserInfo' onGetUserInfo={this.onGetUserInfo}>登录</AtButton>
        <AtButton  type='secondary' onClick={this.getUserInfo}>获取用户信息</AtButton> */}
        <View className='banner'>
          <View className='left'>
            {left}
            {/* <View className='nickName'>梦如南笙</View>
            <Text className='sign'>梦如南笙求我终生。</Text> */}
          </View>
          <View className='right'>
            <Image src={userInfo ? userInfo.avatarUrl : defaultAvatar}></Image>
          </View>

        </View>
        <View className='main'>
          <Collect  onClick={this.hh}>
            <AtListItem title='我的记录' arrow='right' />
          </Collect>
          <Collect onClick={this.hh}>
            <AtListItem  title='我的颜值' arrow='right' />
          </Collect>
        </View>
      </View>
    )
  }
}

export default Personal 
