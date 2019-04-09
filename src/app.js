import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'
import Handsome from './pages/handsome'

// eslint-disable-next-line import/first
import '@tarojs/async-await'
import counterStore from './store/counter'
import commonStore from './store/common'
import imageStore from './store/image'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore,
  commonStore,
  imageStore
}

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/handsome/handsome'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#1E90FF',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
        <Handsome />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
