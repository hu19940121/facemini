import Taro, { Component } from '@tarojs/taro'
import { View,Image,Text } from '@tarojs/components'
import PropTypes from 'prop-types';
import './index.scss'

class indexWork extends Component {
  constructor (props) {
    super(props)
    this.state = { 
    }
  }
  componentDidMount () {
  }
  previewImage = (current,urls) =>  {
    Taro.previewImage({
      current,
      urls:urls
    })
  }
  render () {
    let { workInfo, workInfo:{ clock } } = this.props
    let faces = clock.face_images ? JSON.parse(clock.face_images) : []
    let imgClass = faces.length === 1 ? 'imgN imgN1': (faces.length === 2 ? 'imgN imgN2':'imgN imgN3')
    let imglist = faces.map((image,index)=>{
      return (
        <Image mode='aspectFill' onClick={() =>this.previewImage(image,faces)} className={imgClass} src={image} key={index} />
      )
    })
    return (
      <View className='indexwork'>
        <View className='title'>
          <Image className='avatar' src={workInfo.avatarUrl} />
          <View className='username'>
            <Text>{workInfo.nickName}</Text>
          </View>
        </View>
        <View className='content-text'>
          <Text>{clock.content}</Text>
        </View>
        <View className='img-list'>
          {imglist}
        </View>
      </View>
    )
  }
}
indexWork.propTypes = {
  workInfo: PropTypes.object
};
indexWork.defaultProps = {
  workInfo:{
    clock:{}
  }
};

export default indexWork 
