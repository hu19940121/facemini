import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { onSetUserFaceRecord } from '../../actions/user'

import Work from '../components/work/work'
// import http  from '../../service/http'
import './index.scss'

@connect(({ user }) => ({
  user,
}), (dispatch) => ({
  onSetUserFaceRecord () {
    dispatch(onSetUserFaceRecord())
  }
}))
class FaceRecord extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  componentDidMount () {
    this.props.onSetUserFaceRecord()
  }
  config = {
    navigationBarTitleText: '我的记录'
  }

  // getUserFaceRecord() {
  //   const { userStore } = this.props
  //   userStore.getUserFaceRecord()
  // }
  render () {
    const { userFaceRecord } = this.props.user
    const recordListDom = userFaceRecord.map((record,index)=>{
      return (
        <Work record={record} key={index} />
      )
    })
    return (
      <View className='faceRecord'>
        {recordListDom}
      </View>
    )
  }
}

export default FaceRecord 
