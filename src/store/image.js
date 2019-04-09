import { observable } from 'mobx'

const imageStore = observable({
  image:'',
  setImage(image) {
    this.image = image
  }
})
export default imageStore