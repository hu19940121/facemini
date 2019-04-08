import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
// let qiniuUploader = require('../../utils/qiniuUploader.js');
import qiniuUploader from '../../utils/qiniuUploader'
import './index.scss'

@inject('counterStore')
@observer
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      imgBucketUrl: '', //七牛url
      imgToken: '', //七牛token
      imgUrl: '',
      faceInfo: {}
    }
  }
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { 
    this.getQiniuToken()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }
  upLoadImg = () => {
    let that = this
    const { imgBucketUrl,imgToken } = this.state
    Taro.chooseImage().then(res=>{
      qiniuUploader.upload(res.tempFilePaths[0], (respic) => {
        this.setState({
          imgUrl: respic.imageURL
        })
        that.face(respic.imageURL)
        console.log(respic);
      }, (error) => {
        console.log('error: ' + error);
      }, {
        region: 'SCN',
        domain: imgBucketUrl, //如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
        uptoken: imgToken, // 由其他程序生成七牛 uptoken
      });      
    })
  }
  getQiniuToken() {
    Taro.request({url: 'http://192.168.1.102:8080/api/v1/getQiniuToken',method:'get',})
    .then(res => {      
      this.setState({
        imgBucketUrl: res.data.url,
        imgToken: res.data.token
      })
    })
    .catch(err=>console.log(err))
  }
  face(image) {
    Taro.request({url: 'http://192.168.1.102:8080/api/v1/faceAPI',
      method:'get',  
      data: {
        image
      }
    })
    .then(res => {      
      console.log(res.data);
      this.setState({
        faceInfo: res.data.data.face_list[0]
      })
    })
    .catch(err=>console.log(err))
  }
  render () {
    const { imgUrl, faceInfo } = this.state
    const { counterStore: { counter } } = this.props
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>

        <image src={imgUrl}></image>
        <Button onClick={this.upLoadImg}>上传图片</Button>
        <View className={faceInfo.age ? '' : 'display'}>
          <View>年龄{ faceInfo.age }</View>
          <View>性别{ faceInfo.gender.type } 可信度 { faceInfo.gender.probability }</View>
          <View>颜值{ faceInfo.beauty }</View>
          <View>表情{ faceInfo.expression.type } 可信度 { faceInfo.expression.probability }</View>
          <View>脸型{ faceInfo.face_shape.type } 可信度 { faceInfo.face_shape.probability }</View>
        </View>
      </View>
    )
  }
}

export default Index 
