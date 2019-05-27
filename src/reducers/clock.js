
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
      console.log('action.payload',action.payload);
        
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
    default:
      return state
  }
}