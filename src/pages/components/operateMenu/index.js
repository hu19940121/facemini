import Taro, { Component } from '@tarojs/taro'
import { View,Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction,AtTextarea } from "taro-ui"
import { onPublishWorks,onDeleteRecordImageByIds } from '../../../actions/user'
import { onAddUserClock } from '../../../actions/clock'


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
  }
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
      Taro.showToast({
        title:'操作成功',
        icon:'none'
      })
      this.setState({
        visible:false
      })
      this.props.onAddUserClock(res.data)
      this.props.onSetIsEdit(false)
      
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
        title:'请选择要删除的图片~'
      })
      return false
    }
    this.props.onDeleteRecordImageByIds(ids,()=>{
      Taro.showToast({title:'删除成功~'})
      this.props.onSetIsEdit(false)
    })
  }
  //
  openModel = ()=>{
    let ids = this.findOperateIds()
    if (ids.length === 0) {
      Taro.showToast({title:'请先选择图片~',icon:'none'})
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
          <Button onClick={this.delImages}>删除</Button>
          <Button onClick={this.openModel}>发布</Button>
          <Button onClick={()=>this.props.onSetIsEdit(false)}>取消</Button>
        </View>
        <AtModal 
          isOpened={this.state.visible}  
          onClose={this.handleClose}
        >
          <AtModalHeader>说几句话吧~</AtModalHeader>
          <AtModalContent>
          <AtTextarea
            value={this.state.content}
            onChange={this.handleChange}
            maxLength={200}
            placeholder='说几句话吧...'
          />
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
