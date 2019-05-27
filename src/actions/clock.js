
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

