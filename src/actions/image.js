import {
  SET_IMAGE,
} from '../constants/image'

// eslint-disable-next-line import/prefer-default-export
export const onSetImage = (image) => {  
  return {
    type: SET_IMAGE,
    payload:{
      image
    }
  }
}
