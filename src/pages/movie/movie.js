import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Movie extends Component {
  componentDidMount () {

  }
  render () {
    return (
      <View>
        <web-view src='https://kaier001.com'></web-view>
      </View>
    )
  }
}

export default Movie 
