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
    let { workInfo, workInfo:{ faces} } = this.props    
    let imgClass = faces.length === 1 ? 'imgN imgN1': (faces.length === 2 ? 'imgN imgN2':'imgN imgN3')
    let imglist = faces.map((item,index)=>{
      return (
        <Image mode='aspectFill' onClick={() =>this.previewImage(item.face_img,faces)} className={imgClass} src={item.face_img} key={index} />
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
    faces:[]
  }
};

export default indexWork 
