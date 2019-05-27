import Taro, { Component } from '@tarojs/taro'
// import { Provider } from '@tarojs/mobx'
import { Provider } from '@tarojs/redux'
import configStore from './store'


import Index from './pages/index'
import Handsome from './pages/handsome'
import Personal from './pages/Personal'
import Poster from './pages/Poster'
import Movie from './pages/Movie'
import Auth from './pages/Auth'
import FaceRecord from './pages/FaceRecord'
import MyClock from './pages/MyClock'

// eslint-disable-next-line import/first
import '@tarojs/async-await'

import './app.scss'
// eslint-disable-next-line import/first
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/handsome/handsome',
      'pages/personal/personal',
      'pages/poster/poster',
      'pages/movie/movie',
      'pages/auth/auth',
      'pages/faceRecord/faceRecord',
      'pages/myClock/myClock',
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
        <Poster />
        <Movie />
        <Auth />
        <FaceRecord />
        <MyClock />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
