
const INITIAL_STATE = {
  allUserClockList:[],
  userClockList:[]
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'setAllUserClockList':      
      return {
        ...state,
        ...action.payload
      }
    case 'setUserClockList':        
      return {
        ...state,
        ...action.payload
      }
    case 'addUserClock':
      let copyList = JSON.parse(JSON.stringify(state.allUserClockList)) 
      copyList.unshift(action.payload.userClock)
      return {
        ...state,
        allUserClockList:copyList
      }
    case 'deleteUserClock':
      console.log('action.payload.id',action.payload.id);
      
      let deletedUserClockList = state.userClockList.filter((item)=>item.clock.id !== action.payload.id)
      let deletedAllUserClockList = state.allUserClockList.filter((item)=>item.clock.id !== action.payload.id)
      return {
        ...state,
        allUserClockList:deletedAllUserClockList,
        userClockList:deletedUserClockList
      }
    default:
      return state
  }
}