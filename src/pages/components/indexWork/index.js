import Taro, { Component } from '@tarojs/taro'
import { View,Image,Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types';
import './index.scss'
import del from './images/del.png'
import { onDeleteUserClock } from '../../../actions/clock'

@connect(({ clock }) => ({
  clock,
}), (dispatch) => ({
  onDeleteUserClock(id,callback) {
    dispatch(onDeleteUserClock(id,callback))
  }
}))
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
  delete=(id)=> {    
    Taro.showModal({
      title: '提示',
      content: '删除后不再广场显示，若想彻底删除，请到我的记录（未发布记录）中长按图片删除！',
    }).then(res=>{
      if (res.confirm) {
        this.props.onDeleteUserClock(id,()=>{ Taro.showToast({ title:'删除成功' }) })
      }
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
          <View className='title-left'>
            <Image className='avatar' src={workInfo.avatarUrl} />
            <View className='username'>
              <Text>{workInfo.nickName}</Text>
            </View>
          </View>
          <View className='title-right'>
            <Image onClick={() =>{this.delete(clock.id)}} className='del' src={del} style={{ display: this.props.showDelBtn ? '' :'none' }} />
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
  workInfo: PropTypes.object,
};
indexWork.defaultProps = {
  workInfo:{
    clock:{}
  },
  showDelBtn: true,
};

export default indexWork 
