import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'
import Handsome from './pages/handsome'
import Personal from './pages/Personal'

// eslint-disable-next-line import/first
import '@tarojs/async-await'
import counterStore from './store/counter'
import commonStore from './store/common'
import imageStore from './store/image'

import './app.scss'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

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
      'pages/handsome/handsome',
      'pages/personal/personal'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#1E90FF',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
    },
    tabBar: {
      selectedColor:'#1E90FF',
      list:[
        { 
          text:'首页', 
          pagePath:'pages/index/index',
          iconPath:'./icons/home_no_selected.png',
          selectedIconPath:'./icons/home_selected.png',
        },
        { 
          text:'个人中心', 
          pagePath:'pages/personal/personal',
          iconPath:'./icons/person_no_selected.png',
          selectedIconPath:'./icons/person_selected.png',
        }
      ]
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
        <Personal />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
