import Taro from '@tarojs/taro'

import {
  SET_USER_INFO,
  SET_USER_FACE_RECORD,
  DELETE_RECORD_IMG_BY_ID,
  SET_ALL_USER_FACE_RECORD,
  SET_RECORD_OPEN_STATUS,
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
export const setAllUserFaceRecord = ({allUserFaceRecord}) => {
  return {
    type: SET_ALL_USER_FACE_RECORD,
    payload:{
      allUserFaceRecord    
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
export const deleteRecordImageByIds = (ids) => {
  console.log('ssssssss',ids);
  
  return {
    type: 'deleteRecordImageByIds',
    payload:{
      ids
    }
  }
}
export const setRecordOpenStatus = ({imageId,openStatus}) => {
  return {
    type: SET_RECORD_OPEN_STATUS,
    payload:{
      imageId,
      openStatus
    }
  }
}
export const onSetImageIsCheckedById = ({id}) => {  
  return {
    type: 'onSetImageIsCheckedById',
    payload:{
      id
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

export  function onSetUserFaceRecord  (callback) { //用户下的颜值记录
  return async dispatch => {
    let res = await http.get('api/v1/getUserFaceRecord')
    dispatch(setUserFaceRecord({userFaceRecord:res.data || []}))
    callback && callback()
  }
}

export  function onGetAllUserFaceRecord  () { //所有用户的颜值记录 (查询用户设置为公开的)
  return async dispatch => {
    let res = await http.get('api/v1/getAllUserFaceRecord',{ isOpen: 1},false)
    dispatch(setAllUserFaceRecord({allUserFaceRecord:res.data || []}))
  }
}
export  function onDeleteRecordImageById (id,callback) {
  return async dispatch => {
    await http.get('api/v1/face/delete',{ id })
    dispatch(deleteRecordImageById({imageId:id}))
    callback && callback()
  }
}
export  function onDeleteRecordImageByIds (ids,callback) {
  return async (dispatch) => {
    await http.get('api/v1/face/deleteByIds',{ ids })
    dispatch(deleteRecordImageByIds(ids))
    callback && callback()
  }
}
export  function onSetRecordOpenStatus ({id,openStatus},callback) {
  return async dispatch => {
    await http.post('api/v1/face/setOpenStatus',{ id,openStatus })
    dispatch(setRecordOpenStatus({imageId:id,openStatus}))
    callback && callback()
  }
}

export  function onPublishWorks ({ids,content},callback) {
  return  async () => {
    console.log(ids,content);
    let res = await http.post('api/v1/clock/add',{ ids:JSON.stringify(ids),content })
    callback && callback(res)
  }
}
