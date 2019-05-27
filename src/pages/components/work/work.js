import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import PropTypes from 'prop-types';
import { connect } from '@tarojs/redux'
import { onDeleteRecordImageById,onSetRecordOpenStatus,onSetImageIsCheckedById } from '../../../actions/user'

import './index.scss'

const mapStateToProps = (state) => {  
  return { user: state.user }
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
  showActionSheet=(image)=> {
    this.props.onSetIsEdit(true)
    // let is_open = image.is_open //1公开 0 私密
    // Taro.showActionSheet({
    //   itemList: [`${is_open ? '设为私密' : '设为公开'}`,'删除图片']
    // })
    // //res.errMsg, res.tapIndex
    // .then(res => {
    //   if (res.tapIndex === 0) {
    //     Taro.showModal({
    //       title: '提示',
    //       content: is_open ?'设为私密后首页将不显示哦~':'设为公开后将在首页显示哦~',
    //     }).then(resmsg=>{
    //       if (resmsg.confirm) {
    //         let openStatus = is_open ? 0 : 1
    //         this.props.onSetRecordOpenStatus({id:image.id,openStatus},()=>{
    //           Taro.showToast({
    //             title:'设置成功'
    //           })
    //         })
    //       }
    //     })
    //   }
    //   if (res.tapIndex === 1) {
    //     Taro.showModal({
    //       title: '提示',
    //       content: '是否删除？',
    //     }).then(resmsg=>{
    //       if (resmsg.confirm) {
    //         this.props.onDeleteRecordImageById(image.id,()=>{
    //           Taro.showToast({
    //             title:'删除成功'
    //           })
    //         })
    //       }
    //     })
    //   }
    // })
    // .catch((res) => console.log(res.errMsg))
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
    let { record,record:{ data },user:{ isEdit } } = this.props    
    let imgClass = data.length === 1 ? 'imgN imgN1': (data.length === 2 ? 'imgN imgN2':'imgN imgN3')
    let imglist = data.slice().map((item)=>{
      return (
        <View className={imgClass} key={item.id}>
          <View className={item.isCheck ? 'checkBox choose' : 'checkBox nochoose'} style={{ display: isEdit ? '' :'none' }} onClick={()=>this.chooseOrCancelChoose(item.id)}></View>
          <Image style={{width:'100%',height:'100%'}} mode='aspectFill' onClick={() =>this.previewImage(item.face_img,data)} onLongpress={()=>this.showActionSheet(item)}  src={item.face_img}  />
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
