import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import PropTypes from 'prop-types';
import { connect } from '@tarojs/redux'
import { onDeleteRecordImageById,onSetRecordOpenStatus,onSetImageIsCheckedById } from '../../../actions/user'

import './index.scss'

const mapStateToProps = (state) => {  
  return { user: state.user,isEdit: state.user.isEdit }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteRecordImageById:(...args)=> dispatch(onDeleteRecordImageById(...args)),
    onSetRecordOpenStatus:(...args)=> dispatch(onSetRecordOpenStatus(...args)),
    onSetImageIsCheckedById:(id)=> dispatch(onSetImageIsCheckedById({id})),
    onSetIsEdit:(status) => dispatch({
      type:'setIsEdit',
      payload:{ 
        isEdit:status
      }
    })
  }
}
@connect(mapStateToProps, mapDispatchToProps)
class Work extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
  }
  //选中或取消选中图片
  chooseOrCancelChoose = (id)=>{    
    this.props.onSetImageIsCheckedById(id)
  }
  showActionSheet=()=> {
    this.props.onSetIsEdit(true)
  }
  previewImage = (faceInfo,data) =>  {
    if (this.props.isEdit) { //编辑状态下点击图片是选中
      this.chooseOrCancelChoose(faceInfo.id)
    } else {
      let urls = data.map(item=>{ //非编辑状态下预览
        return item.face_img
      })
      Taro.previewImage({
        current:faceInfo.face_img,
        urls:urls
      })
    }

  }
  render () {
    let { record,record:{ data },user:{ isEdit } } = this.props    
    let imgClass = data.length === 1 ? 'imgN imgN1': (data.length === 2 ? 'imgN imgN2':'imgN imgN3')
    let imglist = data.slice().map((item)=>{
      return (
        <View className={imgClass} key={item.id}>
          <View className={item.isCheck ? 'checkBox choose' : 'checkBox nochoose'} style={{ display: isEdit ? '' :'none' }}></View>
          <Image style={{width:'100%',height:'100%'}} mode='aspectFill' onClick={() =>this.previewImage(item,data)} onLongpress={()=>this.showActionSheet(item)}  src={item.face_img}  />
        </View>
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
Work.defaultProps = {
  record:{
    data:[]
  }
}
export default Work 
