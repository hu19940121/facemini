import Taro from '@tarojs/taro'

import {
  SET_USER_INFO,
  SET_USER_FACE_RECORD,
  DELETE_RECORD_IMG_BY_ID
} from '../constants/user'
import http  from '../service/http'

export const setUserInfo = ({userInfo}) => {
  return {
    type: SET_USER_INFO,
    payload:{
      userInfo    
    }
  }
}
export const setUserFaceRecord = ({userFaceRecord}) => {
  return {
    type: SET_USER_FACE_RECORD,
    payload:{
      userFaceRecord    
    }
  }
}

export const deleteRecordImageById = ({imageId}) => {
  return {
    type: DELETE_RECORD_IMG_BY_ID,
    payload:{
      imageId
    }
  }
}

export  function onGetUserInfo  (callback) {
  return async dispatch => {
    let res = await http.get('api/v1/getUserInfo')
    dispatch(setUserInfo({userInfo:res.data}))
    callback && callback()
    Taro.setStorageSync('userInfo',res.data)
  }
}

export  function onSetUserFaceRecord  () {
  return async dispatch => {
    let res = await http.get('api/v1/getUserFaceRecord')
    dispatch(setUserFaceRecord({userFaceRecord:res.data || []}))
  }
}
