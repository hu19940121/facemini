import { SET_IMAGE } from '../constants/image'

const INITIAL_STATE = {
  image:'',
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_IMAGE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}