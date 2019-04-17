import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import http  from '../service/http'

const userStore = observable({
  // userInfo:Taro.getStorageSync('userInfo') || null,
  // setUserInfo(userInfo) {
  //   Taro.setStorageSync('userInfo',userInfo) 
  //   this.userInfo = userInfo
  // },
  async getUserInfo() {
    return new Promise(async (resolve,reject)=>{
      let res = await http.get('api/v1/getUserInfo')
      Taro.setStorageSync('userInfo',res.data) 
      resolve(res.data)
    })
    // return  res.data
    // this.setUserInfo(res.data)
  }
})
export default userStore