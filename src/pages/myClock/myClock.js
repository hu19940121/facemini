import Taro, { Component } from '@tarojs/taro'
import { View ,Text} from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './myClock.scss'
import IndexWork from '../components/indexWork'
import { onGetUserClocklist } from '../../actions/clock'

@connect(({ clock }) => ({
  clock
}), (dispatch) => ({
  onGetUserClocklist() {
    dispatch(onGetUserClocklist())
  }
}))
class Movie extends Component {
  componentDidMount () {
    this.props.onGetUserClocklist()
  }
  render () {
    const { userClockList } = this.props.clock
    const noDataDom = (
      <Text>暂无数据</Text>
    )
    return (
      <View>
          {
            userClockList.map((workInfo,index)=> <IndexWork workInfo={workInfo} key={index} />)
          }
          { userClockList.length === 0 ? noDataDom :'' }
      </View>
    )
  }
}

export default Movie 
