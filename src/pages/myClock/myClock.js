import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './personal.scss'
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
    return (
      <View>
          {
            userClockList.map((workInfo,index)=> <IndexWork workInfo={workInfo} key={index} />)
          }
      </View>
    )
  }
}

export default Movie 
