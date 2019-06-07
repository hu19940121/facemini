
import http  from '../service/http'

export const setAllUserClockList = (allUserClockList) => {
  return {
    type: 'setAllUserClockList',
    payload:{
      allUserClockList
    }
  }
}
export const onAddUserClock = (userClock) => {
  return {
    type: 'addUserClock',
    payload:{
      userClock
    }
  }
}

export const setUserClockList = (userClockList) => {
  return {
    type: 'setUserClockList',
    payload:{
      userClockList
    }
  }
}
export const deleteUserClock = (id) => {
  return {
    type: 'deleteUserClock',
    payload:{
      id
    }
  }
}
export const setClockListPraiseStatus = (clockId) => {
  return {
    type: 'setClockListPraiseStatus',
    payload:{
      clockId
    }
  }
}

//异步的 action
export  function onGetAllUserClocklist  () {
  return async dispatch => {
    let res = await http.get('api/v1/clock/allUserlist')    
    dispatch(setAllUserClockList(res.data))
  }
}

export  function onGetUserClocklist  () {
  return async dispatch => {
    let res = await http.get('api/v1/clock/getUserlist')    
    dispatch(setUserClockList(res.data))
  }
}

export  function onDeleteUserClock(id,callback) {  
  return async dispatch => {
    await http.get('api/v1/clock/delete',{id})
    dispatch(deleteUserClock(id))
    callback && callback()
  }
}

export  function onPraise(clockId,callback) {  
  return async dispatch => {
    const res = await http.post('api/v1/praise/praise',{clockId})
    if (res) {
      dispatch(setClockListPraiseStatus(clockId))
      callback && callback()
    }
  }
}


