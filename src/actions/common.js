import {
  SET_QINIU_TOKEN,
} from '../constants/common'
import http  from '../service/http'

export const setQiniuToken = ({imgBucketUrl,imgToken}) => {
  return {
    type: SET_QINIU_TOKEN,
    payload:{
      imgBucketUrl,
      imgToken
    }
  }
}

//异步的 action
export  function onGetQiniuToken  () {
  return async dispatch => {
    let res = await http.get('api/v1/getQiniuToken')
    let imgBucketUrl = res.data.url
    let imgToken = res.data.token
    dispatch(setQiniuToken({imgBucketUrl,imgToken}))
  }
}
// 异步的 action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }
