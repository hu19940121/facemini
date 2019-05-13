import { SET_QINIU_TOKEN } from '../constants/common'

const INITIAL_STATE = {
  imgBucketUrl:'',
  imgToken:'',
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_QINIU_TOKEN:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}