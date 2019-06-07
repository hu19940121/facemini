import Taro, { Component } from '@tarojs/taro'
import { View,Image,Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types';
import './index.scss'
import del from './images/del.png'
import praise_no_choosed from './images/praise.png'
import praise_choosed from './images/praise_choosed.png'
import { onDeleteUserClock,onPraise } from '../../../actions/clock'

@connect(({ clock }) => ({
  clock,
}), (dispatch) => ({
  onDeleteUserClock(id,callback) {
    dispatch(onDeleteUserClock(id,callback))
  },
  onPraise(clockId,callback) {
    dispatch(onPraise(clockId,callback))
  },
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
        this.props.onDeleteUserClock(~~id,()=>{ Taro.showToast({ title:'删除成功' }) })
      }
    })
  }
  praise= (clockId,isPraise) =>{
    if (isPraise) {
      Taro.showToast({ title:'您已经点过赞了哦~',icon:'none' })
      return false
    }
    this.props.onPraise(clockId,()=>{ Taro.showToast({ title:'点赞成功!',icon:'none' }) })
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
            <View className='praise-wrapper' style={{ display: this.props.showPraiseBtn ? '' :'none' }}>
              <Text className='praise-num'>{ clock.praise_num ? clock.praise_num : '' }</Text>
              <Image onClick={() =>{this.praise(clock.id,workInfo.isPraise)}} className='pra' src={workInfo.isPraise === 1 ? praise_choosed : praise_no_choosed}  />
            </View>
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
  showPraiseBtn: false
};

export default indexWork 
