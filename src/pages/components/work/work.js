import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import PropTypes from 'prop-types';
import { connect } from '@tarojs/redux'
import { deleteRecordImageById } from '../../../actions/user'

import './index.scss'

@connect(({ user }) => ({
  user,
}), (dispatch) => ({
  deleteRecordImageById ({imageId}) {
    dispatch(deleteRecordImageById({imageId}))
  }
}))
class Work extends Component {
  constructor (props) {
    super(props)
    this.state = { 
    }
  }

  componentDidMount () {
  }
  showActionSheet=(imageId)=> {
    Taro.showActionSheet({
      itemList: ['删除图片']
    })
    //res.errMsg, res.tapIndex
    .then(res => {
      if (res.tapIndex === 0) {
        // eslint-disable-next-line taro/this-props-function
        this.props.deleteRecordImageById({imageId})
      }
    })
    .catch((res) => console.log(res.errMsg))
  }
  previewImage = (current,data) =>  {
    let urls = data.map(item=>{
      return item.face_img
    })
    Taro.previewImage({
      current,
      urls:urls
    })
  }
  render () {
    let { record,record:{ data } } = this.props    
    let imgClass = data.length === 1 ? 'imgN imgN1': (data.length === 2 ? 'imgN imgN2':'imgN imgN3')
    let imglist = data.slice().map((item,index)=>{
      return (
        <Image mode='aspectFill' onClick={() =>this.previewImage(item.face_img,data)} onLongpress={()=>this.showActionSheet(item.id)} className={imgClass} src={item.face_img} key={index} />
      )
    })
    return (
      <View className='work'>
        <View className='title'>{record.create_time}的颜值记录</View>
        <View className='img-list'>
          {imglist}
        </View>
      </View>
    )
  }
}
Work.propTypes = {
  record: PropTypes.object
};
export default Work 
