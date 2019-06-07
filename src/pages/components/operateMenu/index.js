import Taro, { Component } from '@tarojs/taro'
import { View,Button,Text,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction,AtTextarea } from "taro-ui"
import { onPublishWorks,onDeleteRecordImageByIds,onSetUserFaceRecord } from '../../../actions/user'
import { onAddUserClock } from '../../../actions/clock'

import del from './images/del.png'
import can from './images/can.png'
import pub from './images/pub.png'

import './index.scss'


@connect(({ user }) => ({
  user,
}), (dispatch) => ({
  onSetIsEdit:(status) => dispatch({
    type:'setIsEdit',
    payload:{ 
      isEdit:status
    }
  }),
  onPublishWorks({ ids,content },callback) {
    dispatch(onPublishWorks({ ids,content },callback))
  },
  onAddUserClock(userClock){
    dispatch(onAddUserClock(userClock))
  },
  onDeleteRecordImageByIds(ids,callback){
    dispatch(onDeleteRecordImageByIds(ids,callback))
  },
  onSetUserFaceRecord (callback) {
    dispatch(onSetUserFaceRecord(callback))
  },
}))
class operateMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      content:'',
      visible:false
    }
  }
  componentDidMount () {
  }
  componentWillUnmount() { //页面卸载取消编辑状态
    this.props.onSetIsEdit(false)
  }
  handleChange = (event) =>{
    this.setState({
      content:event.target.value
    })
  }
  handleClose=()=>{
    this.setState({
      content:'',
      visible:false
    })
  }
  confirmSubmit=()=>{
    const { content } = this.state
    let ids = this.findOperateIds()
    if (!content) {
      Taro.showToast({title:'请先输入哦~',icon:'none'})
      return false
    }
    this.props.onPublishWorks({ids,content},(res)=>{

      this.setState({
        visible:false
      })
      this.props.onAddUserClock(res.data)
      this.props.onSetIsEdit(false)
      Taro.switchTab({
        url:'/pages/index/index'
      })
      // this.props.onSetUserFaceRecord(()=>{

      // })
    })
  }
  //根据选中状态找到要操作的id们
  findOperateIds() {
    let ids = []
    this.props.user.userFaceRecord.map(item=>{
      item.data.map(res=>{
        if (res.isCheck) {
          ids.push(res.id)
        }
      })
    })
    return ids
  }
  //删除图片（批量）
  delImages=()=> {
    let ids = this.findOperateIds()
    if (ids.length===0) {
      Taro.showToast({
        title:'请选择要删除的图片~',
        icon:'none'
      })
      return false
    }
    Taro.showModal({
      title: '提示',
      content: '确认删除?',
    }).then(res=>{
      if (res.confirm) {
        this.props.onDeleteRecordImageByIds(ids,()=>{
          Taro.showToast({title:'删除成功~'})
          this.props.onSetIsEdit(false)
        })
      }
    })

  }
  //
  openModel = ()=>{
    let ids = this.findOperateIds()
    if (ids.length === 0) {
      Taro.showToast({title:'请先选择要发布的图片~',icon:'none'})
      return false
    }
    this.setState({
      visible: true,
      content:'' //模态框关闭触发的回调不行事 只能在打开的时候 清空
    })
  }
  render () {
    const { isEdit } = this.props.user
    return (
      <View>
        <View style={{ 'display': isEdit ? '':'none' }} className='operate-box'>
          <View className='box-item' onClick={this.delImages}>
            <Image src={del} />
            <Text>删除</Text>
          </View>
          <View className='box-item' onClick={this.openModel}>
            <Image src={pub} />
            <Text>发布</Text>
          </View>
          <View className='box-item' onClick={()=>this.props.onSetIsEdit(false)}>
            <Image src={can} />
            <Text>取消</Text>
          </View>
        </View>
        <AtModal 
          isOpened={this.state.visible}  
          onClose={this.handleClose}
        >
          <AtModalHeader>说几句话吧~</AtModalHeader>
          <AtModalContent>
          <View style={{display:this.state.visible ? '':'none'}}>
            <AtTextarea
              value={this.state.content}
              onChange={this.handleChange}
              maxLength={200}
              placeholder='说几句话吧...'
            />
          </View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={()=>{this.setState({visible:false})}}>取消</Button>
            <Button onClick={this.confirmSubmit}>确定</Button> 
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

export default operateMenu 
