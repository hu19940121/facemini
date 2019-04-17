import { observable } from 'mobx'
import http  from '../service/http'

const commonStore = observable({
  imgBucketUrl:'',
  imgToken:'',
  async getQiniuToken() {
    let res = await http.get('api/v1/getQiniuToken')
    this.imgBucketUrl = res.data.url
    this.imgToken = res.data.token
  }
})
export default commonStore