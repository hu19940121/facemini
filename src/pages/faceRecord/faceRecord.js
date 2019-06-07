import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { AtFab,AtNoticebar  } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { onSetUserFaceRecord,onDeleteRecordImageByIds } from '../../actions/user'

import Work from '../components/work/work'
import OperateMenu from '../components/operateMenu'

import './index.scss'

@connect(({ user }) => ({
  user,
}), (dispatch) => ({
  onSetUserFaceRecord () {
    dispatch(onSetUserFaceRecord())
  },
  onDeleteRecordImageByIds(ids) {
    dispatch(onDeleteRecordImageByIds(ids))
  },
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
    navigationBarTitleText: '未发布记录'
  }

  linkToHome = () =>{
    Taro.switchTab({
      url:'/pages/index/index'
    })
  }
  render () {
    const { userFaceRecord } = this.props.user
    const recordListDom = userFaceRecord.map((record,index)=>{
      return (
        <Work record={record} key={index} />
      )
    })
    const noDataDom = (
      <View className='nodata'>
        <View>暂无记录哦~</View>
        快去测一测你的颜值吧~
      </View>
    )
    const NoticeBarText = userFaceRecord.length === 0  ? '快去测一测你的颜值吧' :'长按图片可以发布到广场哦~  发布到广场的图片可以在我的记录（已发布广场）中删除'
    return (
      <View>
        <AtNoticebar marquee icon='volume-plus' close>{NoticeBarText}</AtNoticebar>
        <View className='faceRecord'>
          {recordListDom}
          { userFaceRecord.length === 0 ? noDataDom :''}
          <View className='home-btn'>
            <AtFab onClick={this.linkToHome}>
              <Text className='at-fab__icon at-icon at-icon-home'></Text>
            </AtFab>
          </View>
        </View>
        <OperateMenu />
      </View>

    )
  }
}

export default FaceRecord 
