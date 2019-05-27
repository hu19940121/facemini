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
  allUserFaceRecord:[],
  isEdit:false, //当前是否是编辑状态 （我的颜值记录）
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
    case 'setIsEdit':
      let { isEdit } = action.payload
      let setIsEditUserFaceRecord = JSON.parse(JSON.stringify(state.userFaceRecord))
      !isEdit && setIsEditUserFaceRecord.map(item=>{ //如果取消编辑状态 就全部取消选中
        item.data.map(image=>{
            image.isCheck =  false
        })
      })  
      return {
        ...state,
        userFaceRecord:setIsEditUserFaceRecord,
        isEdit:action.payload.isEdit
      }
    case 'onSetImageIsCheckedById': //根据id设置选中
      let copyUserFaceRecord2 = JSON.parse(JSON.stringify(state.userFaceRecord))
      copyUserFaceRecord2.map(item=>{
        item.data.map(image=>{
          if (image.id === action.payload.id) {
            image.isCheck = !image.isCheck
          }
        })
      })      
      return {
        ...state,
        userFaceRecord:copyUserFaceRecord2
      }
    case 'deleteRecordImageByIds':
      let deleteRecordImageByIdsUserFaceRecord = JSON.parse(JSON.stringify(state.userFaceRecord))
      deleteRecordImageByIdsUserFaceRecord.map(record=>{
        let ss = record.data.filter(image=>{
          return !action.payload.ids.includes(image.id)
        })        
        record.data = ss
      })      
      return {
        ...state,
        userFaceRecord:deleteRecordImageByIdsUserFaceRecord
      }
    default:
      return state
  }
}