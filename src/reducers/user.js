import { 
  SET_USER_INFO ,
  SET_USER_FACE_RECORD,
  DELETE_RECORD_IMG_BY_ID,
  SET_ALL_USER_FACE_RECORD,
  SET_RECORD_OPEN_STATUS,
} from '../constants/user'

const INITIAL_STATE = {
  userInfo:{},
  userFaceRecord: [],
  allUserFaceRecord:[]
}

export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        ...action.payload
      }
    case SET_USER_FACE_RECORD:
      return {
        ...state,
        ...action.payload
      }
    case SET_ALL_USER_FACE_RECORD:
      return {
        ...state,
        ...action.payload
      }
    case DELETE_RECORD_IMG_BY_ID:
      let copyList = JSON.parse(JSON.stringify(state.userFaceRecord))
      let handleList = copyList.map(item=>{
        let imageInfos = item.data.filter(res=>{
          return res.id !== action.payload.imageId
        })
        item.data = imageInfos
        return item
      })    
      return {
        ...state,
        userFaceRecord:handleList
      }
    case SET_RECORD_OPEN_STATUS:
      let copyUserFaceRecord = JSON.parse(JSON.stringify(state.userFaceRecord))
      copyUserFaceRecord.map(item=>{
        item.data.map(image=>{
          if (image.id === action.payload.imageId) {
            image.is_open = action.payload.openStatus            
          }
        })
      })
      return {
        ...state,
        userFaceRecord:copyUserFaceRecord
      }
    default:
      return state
  }
}