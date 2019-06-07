
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
      let deletedUserClockList = state.userClockList.filter((item)=>item.clock.id !== action.payload.id)
      let deletedAllUserClockList = state.allUserClockList.filter((item)=>item.clock.id !== action.payload.id)
      return {
        ...state,
        allUserClockList:deletedAllUserClockList,
        userClockList:deletedUserClockList
      }
    case 'setClockListPraiseStatus':
      console.log('action.payload.clockId',action.payload.clockId);
      let copyList2 = JSON.parse(JSON.stringify(state.allUserClockList))
      copyList2.map(item=>{
        if (item.clock.id === action.payload.clockId) {
          item.isPraise = 1
          ++item.clock.praise_num
        }
      })
      return {
        ...state,
        allUserClockList:copyList2,
      }
    default:
      return state
  }
}